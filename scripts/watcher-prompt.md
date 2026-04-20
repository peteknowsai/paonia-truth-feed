# Source Watcher Cycle

You are the automated source watcher for the Paonia civic transparency wiki at paoniatruth.site. Run each step below, report what you found, and move on. Be concise.

> **NOTE (2026-04-20):** This prompt is the *interactive* fallback. The day-to-day ingest now runs headless via `bash scripts/daily-ingest.sh` (triggered by `/loop 4h /daily-ingest` on the spare Mac). Rule #5 below ("Don't commit anything") applies only to this interactive mode. The headless orchestrator commits and pushes to `inbox/YYYY-MM-DD` branches for Pete's morning review.

## Step 1: Check YouTube for new board meeting videos

Run: `bash scripts/check-youtube.sh`

Parse the JSON output. For each new video, auto-ingest it:
```
bash scripts/ingest-meeting.sh {video_id}
```
YouTube videos from this channel are always town meetings -- ingest them all, don't just queue.

## Step 2: Check CivicClerk for new meeting documents

Run: `bash scripts/check-civicclerk.sh`

For each new event with files, append to `raw/INBOX.md` under `## Pending`:
```
- [ ] CivicClerk: {event name} ({date}) -- Files: {comma-separated file names}. [Portal](https://paoniaco.portal.civicclerk.com/) (found {today's date})
```

## Step 3: Check news sources

Run: `python3 scripts/check-news.py`

For each new article, decide if it relates to Paonia town government (board actions, ordinances, officials, budgets, land use, STRs, public records, etc.). Skip articles about restaurants, sports, weather, or general community events.

For relevant articles, download them:
```
bash scripts/download-article.sh "{url}" "{source}" "{title}"
```

Then append to `raw/INBOX.md` under `## Pending`:
```
- [ ] [{title}]({url}) -- {source}: {one-line summary from the RSS description} (found {today's date})
```

## Step 4: Check Gmail for town correspondence

Run: `bash scripts/check-gmail.sh`

If the output contains `"error":"auth"`, note it in your summary and skip this step. Don't try to fix it -- Pete needs to re-auth manually.

For each new email, append to `raw/INBOX.md` under `### Town Emails (via gws)`:
```
- [ ] {sender}: "{subject}" ({date}) -- {snippet} (found {today's date})
```

## Step 5: Log results

Append a timestamped entry to `.claude/watcher-log.md`:

```
## {ISO timestamp} Watcher Cycle
- YouTube: {N} new videos ({N} ingested)
- CivicClerk: {N} new events with documents
- News: {N} new articles ({N} relevant, {N} downloaded)
- Gmail: {N} new emails | auth expired | skipped
```

## Rules

- Don't duplicate entries already in INBOX.md -- read it first before appending.
- If a checker script fails, log the error and continue with the next step.
- Keep your summary brief -- just what was found and what was done.
- Don't modify wiki files other than through ingest-meeting.sh.
- **Interactive mode only:** don't commit anything. Pete reviews and commits manually.
  (The headless `scripts/daily-ingest.sh` pipeline DOES commit and push to `inbox/YYYY-MM-DD` for review — different rule for that path.)
