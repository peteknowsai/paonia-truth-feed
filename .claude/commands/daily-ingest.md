---
description: Run one ingest cycle (watchers + YouTube transcripts + structured summarizer + push inbox branch)
---

Run the daily ingest orchestrator:

```bash
bash scripts/daily-ingest.sh
```

Report the exit code. If exit 0, tail the last 3 lines of `.claude/daily-ingest-heartbeat.md` so Pete can see the heartbeat. If exit 1, surface the fatal error from stderr clearly. If exit 2, say "skipped — previous run still active" and stop.

Do NOT interpret the watcher output, re-run failed watchers, or modify wiki files. The shell script owns all logic; this command just triggers it once.
