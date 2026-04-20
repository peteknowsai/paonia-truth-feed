# Daily Ingest Setup (spare Mac)

How to run the 4-hour ingest cycle headless on a dedicated Mac.

## What this does

Every 4 hours, the spare Mac:
1. Runs the four watchers (YouTube, CivicClerk, DCI+HCS news, Gmail).
2. Auto-ingests any new YouTube board-meeting transcripts into `wiki/events/`.
3. Summarizes new news/gmail items via `claude -p` with JSON-schema validation and verbatim-quote verification, writing them to `raw/INBOX.md` under a dated section.
4. Force-updates branch `inbox/YYYY-MM-DD` and pushes to GitHub.

Pete reviews that branch every morning, merges what he wants into `main`, and runs `/deploy`.

## Prereqs on the spare Mac

Install once:
- `git`, `gh` (with `gh auth login` completed)
- `python3` (system default is fine)
- `claude` CLI (Claude Code), authenticated
- `gws` CLI, with Gmail auth completed (`gws gmail auth login`)
- `yt-dlp` (for YouTube transcript download)
- `tmux`
- Project clone at `~/paonia-truth-feed` (or wherever — adjust below)

## One-shot manual test

Before wiring the loop, make sure a single run works end-to-end:

```bash
cd ~/paonia-truth-feed
bash scripts/daily-ingest.sh
```

Expected: exit code 0, a new commit on `inbox/$(date +%F)` pushed to origin, last line of `.claude/daily-ingest-heartbeat.md` updated.

If Gmail auth is expired, the script exits 1 with a clear message. Fix via `gws gmail auth login` and rerun.

## Start the recurring loop

Open a `tmux` session that survives SSH disconnects, prevent the Mac from sleeping, launch `claude`, then ask it to loop every 4 hours:

```bash
tmux new -s ingest \
  "caffeinate -dims -w $$ claude"
```

Inside the Claude Code session that just opened:

```
/loop 4h /daily-ingest
```

Detach from tmux with `Ctrl-B D`. The session keeps running. `tmux attach -t ingest` to peek.

## Surviving a reboot

`tmux` + `/loop` die when the Mac reboots. The cheapest recovery is muscle memory: after a reboot, SSH in and re-run the two commands above.

For hands-off recovery, drop this LaunchAgent at `~/Library/LaunchAgents/site.paoniatruth.loop-starter.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>site.paoniatruth.loop-starter</string>
  <key>RunAtLoad</key><true/>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>-lc</string>
    <string>/usr/local/bin/tmux has-session -t ingest 2>/dev/null || /usr/local/bin/tmux new -d -s ingest "caffeinate -dims claude"</string>
  </array>
</dict>
</plist>
```

Load once: `launchctl load -w ~/Library/LaunchAgents/site.paoniatruth.loop-starter.plist`.

After any reboot, the tmux session is recreated on login. You still have to type `/loop 4h /daily-ingest` once — there's no clean way to automate the slash command itself through login.

(Tradeoff: if you'd rather have full cron-style automation without a persistent Claude Code session, swap `/loop` for a `launchd` plist that calls `bash scripts/daily-ingest.sh` directly every 14400 seconds. See `~/.gstack/projects/peteknowsai-paonia-truth-feed/pete-main-design-20260420-004044.md` §Key Revisions.)

## Morning review ritual

```bash
cd ~/paonia-truth-feed
git fetch origin
git log --oneline -5 origin/inbox/$(date +%F)
git diff main..origin/inbox/$(date +%F) -- raw/INBOX.md
```

If the diff looks right, cherry-pick or merge into `main`, clean INBOX items into wiki pages as needed, then `/deploy`.

Items prefixed `[UNVERIFIED-QUOTE]` mean the structured summarizer could not find the model's quote in the source text. Double-check those against the original article before citing.

## Debugging

- `tail -5 .claude/daily-ingest-heartbeat.md` — last five cycle summaries (committed)
- `ls /tmp/daily-ingest-$(date +%F)/*.err` — watcher-specific stderr from the last run
- `cat /tmp/daily-ingest.lock` — pid of a still-running cycle (if overlap-guard tripped)
- `tmux attach -t ingest` — watch the next cycle fire live
