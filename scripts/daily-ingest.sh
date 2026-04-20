#!/usr/bin/env bash
#
# daily-ingest.sh -- run the full ingest cycle: watchers -> summarizer -> push branch.
#
# Designed to be called by /loop 4h on a spare Mac, but runs identically when
# invoked directly for manual testing or debugging.
#
# Exit codes:
#   0 = success (committed and pushed, or no changes and heartbeat logged)
#   1 = handled failure (Gmail auth expired, watcher crashed, etc.)
#   2 = concurrency skip (previous run still holding the lockfile)
#
# Requires on PATH: bash, python3, git, claude, gws, yt-dlp, curl

set -euo pipefail

cd "$(dirname "$0")/.."
REPO_ROOT="$(pwd)"
TODAY="$(date +%Y-%m-%d)"
LOCK="/tmp/daily-ingest.lock"
STAGING="/tmp/daily-ingest-$TODAY"

# ---- concurrency guard ----
if [ -e "$LOCK" ] && kill -0 "$(cat "$LOCK" 2>/dev/null)" 2>/dev/null; then
  echo "daily-ingest: previous run (pid $(cat "$LOCK")) still active, skipping this slot" >&2
  exit 2
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

mkdir -p "$STAGING"

echo "=== daily-ingest $TODAY start $(date -u +%H:%M:%SZ) ==="

# ---- 0. Prepare a clean inbox/$TODAY branch, accumulating today's earlier runs ----
# Must happen BEFORE writing any files. Otherwise the summarizer's writes to
# raw/INBOX.md and .claude/daily-ingest-heartbeat.md would block the checkout
# on the next cycle ("local changes would be overwritten").
#
# Branch strategy:
#   - First run of the day: origin/inbox/$TODAY does not exist, start from origin/main.
#   - Subsequent runs of the same day: continue origin/inbox/$TODAY so earlier runs'
#     content accumulates. Without this, each run wipes the prior run's additions.
#   - New day: $TODAY changes, branch doesn't exist, fresh start from origin/main.
#
# The worktree is dedicated to this pipeline, so discarding local changes (from a
# crashed prior run) is always safe.
git fetch origin --quiet || true
git reset --hard HEAD --quiet 2>/dev/null || true
git clean -fd --quiet 2>/dev/null || true

if git show-ref --verify --quiet "refs/remotes/origin/inbox/$TODAY"; then
  echo "Continuing today's inbox branch (accumulating run)" >&2
  git checkout -B "inbox/$TODAY" "origin/inbox/$TODAY" --quiet
else
  echo "Starting today's inbox branch from origin/main (first run of the day)" >&2
  git checkout -B "inbox/$TODAY" origin/main --quiet
fi

# ---- 1. Run the four watchers ----
# Each writes JSON to a staging file. Non-zero exit is tolerated here because
# one watcher failing should not take down the others. The summarizer reads
# whatever files exist.
bash   scripts/check-youtube.sh    > "$STAGING/yt.json"    2> "$STAGING/yt.err"    || echo "check-youtube failed (non-fatal)" >&2
bash   scripts/check-civicclerk.sh > "$STAGING/cc.json"    2> "$STAGING/cc.err"    || echo "check-civicclerk failed (non-fatal)" >&2
python3 scripts/check-news.py      > "$STAGING/news.json"  2> "$STAGING/news.err"  || echo "check-news failed (non-fatal)" >&2
bash   scripts/check-gmail.sh      > "$STAGING/gmail.json" 2> "$STAGING/gmail.err" || echo "check-gmail failed (non-fatal)" >&2

# ---- 2. Gmail auth hard-fail ----
# If gws auth is expired, the gmail watcher returns {"error":"auth"}.
# Treat this as a fatal error: the whole pipeline is degraded until Pete re-auths.
if grep -q '"error":"auth"' "$STAGING/gmail.json" 2>/dev/null; then
  echo "FATAL: Gmail auth expired. Run 'gws gmail auth login' on the spare Mac and restart the loop." >&2
  exit 1
fi

# ---- 3. Ingest YouTube transcripts ----
# The summarizer does not handle YouTube; ingest-meeting.sh auto-writes wiki/events/
# entries directly. Walk the yt.json array and ingest each video.
if [ -s "$STAGING/yt.json" ] && [ "$(cat "$STAGING/yt.json")" != "[]" ]; then
  python3 -c "
import json, sys
with open('$STAGING/yt.json') as f:
    for v in json.load(f):
        print(v['id'])
" | while read -r vid; do
    [ -n "$vid" ] || continue
    echo "ingest-meeting: $vid" >&2
    bash scripts/ingest-meeting.sh "$vid" || echo "ingest-meeting failed for $vid (non-fatal)" >&2
  done
fi

# ---- 4. Summarize non-YouTube items into INBOX ----
python3 scripts/ingest-summarize.py \
  --youtube    "$STAGING/yt.json" \
  --civicclerk "$STAGING/cc.json" \
  --news       "$STAGING/news.json" \
  --gmail      "$STAGING/gmail.json" \
  --out-inbox  "$REPO_ROOT/raw/INBOX.md" \
  --out-log    "$REPO_ROOT/.claude/daily-ingest-heartbeat.md" \
  --date       "$TODAY"

# ---- 5. Commit + push branch ----
# Branch was already reset to origin/main at the top. Just stage + commit + push
# the day's changes. --force-with-lease is safer than --force: fails if someone
# pushed to this branch from another machine since our last fetch.
git add raw/ wiki/events/ .claude/daily-ingest-heartbeat.md 2>/dev/null || true

if ! git diff --cached --quiet; then
  git commit -m "chore(inbox): daily ingest $(date -u +%Y-%m-%dT%H:%MZ)" >&2
  git push --force-with-lease origin "inbox/$TODAY" >&2 || {
    echo "git push failed. Is gh auth configured on this machine?" >&2
    exit 1
  }
else
  echo "No changes to commit this run" >&2
fi

echo "=== daily-ingest $TODAY done $(date -u +%H:%M:%SZ) ==="
