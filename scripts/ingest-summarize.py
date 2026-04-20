#!/usr/bin/env python3
"""ingest-summarize.py -- summarize watcher outputs into structured INBOX entries.

Reads the JSON outputs from check-youtube.sh, check-civicclerk.sh,
check-news.py, and check-gmail.sh. For news and gmail items, calls `claude -p`
with a strict JSON-schema prompt. For civicclerk items, passes metadata
through without an LLM call (event name is the definitive label, no text body
to summarize). YouTube items are logged but not processed here --
scripts/ingest-meeting.sh handles transcript ingest separately.

Appends structured entries under a dated header to raw/INBOX.md and always
appends a heartbeat line to .claude/watcher-log.md (even on zero-item days).

Usage:
  python3 scripts/ingest-summarize.py \
      --youtube /tmp/yt.json --civicclerk /tmp/cc.json \
      --news /tmp/news.json --gmail /tmp/gmail.json \
      --out-inbox raw/INBOX.md --out-log .claude/watcher-log.md \
      --date 2026-04-20
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


SCHEMA_PROMPT = """You are processing a civic news or correspondence item for a transparency wiki about Paonia, Colorado (a statutory town in Delta County).

Return ONLY valid JSON matching the schema below. No markdown, no prose, no code fences.

{
  "url": string,                 // source URL, preserve exactly
  "source_type": "news"|"gmail", // set based on the item class
  "title": string,               // concise title, <=100 chars
  "summary": string,             // one-line factual summary, <=200 chars
  "verbatim_snippet": string,    // character-for-character quote from the source backing the summary, <=300 chars
  "confidence": 1|2|3|4|5,       // 5=summary explicitly stated in source text; 1=inferred
  "relates_to_paonia": true|false // false if the item concerns only Hotchkiss/Delta/Crawford/other North Fork areas with no Paonia government content
}

Rules:
- verbatim_snippet MUST appear verbatim in the source text provided below. If no supporting quote exists, set confidence <= 2.
- relates_to_paonia is true when the item concerns Paonia town government, officials, ordinances, CORA records, board/commission actions, or town staff. It is false when purely regional or about other towns.
- Do not fabricate URLs. Use the URL provided in the source metadata.
"""


def run_claude(source_text: str, timeout: int = 90) -> dict | None:
    """Invoke `claude -p` with the schema prompt + source text. Returns parsed JSON or None."""
    full_prompt = f"{SCHEMA_PROMPT}\n\nSOURCE ITEM:\n{source_text}"
    try:
        result = subprocess.run(
            ["claude", "-p", full_prompt],
            capture_output=True,
            text=True,
            timeout=timeout,
        )
    except FileNotFoundError:
        print("ERROR: 'claude' CLI not found on PATH", file=sys.stderr)
        return None
    except subprocess.TimeoutExpired:
        print("ERROR: claude -p timed out", file=sys.stderr)
        return None

    if result.returncode != 0:
        print(f"ERROR: claude -p exited {result.returncode}: {result.stderr[:500]}", file=sys.stderr)
        return None

    output = result.stdout.strip()
    # Strip common wrappers the model sometimes adds despite instructions
    if output.startswith("```"):
        lines = output.split("\n")
        lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        output = "\n".join(lines)

    # If there's leading/trailing prose around a JSON object, extract just the first {...} block.
    try:
        return json.loads(output)
    except json.JSONDecodeError:
        import re
        m = re.search(r"\{.*\}", output, re.DOTALL)
        if m:
            try:
                return json.loads(m.group(0))
            except json.JSONDecodeError as e:
                print(f"ERROR: extracted JSON still invalid: {e}", file=sys.stderr)
                print(f"Raw output (first 500 chars): {output[:500]}", file=sys.stderr)
                return None
        print(f"ERROR: no JSON object found in claude output", file=sys.stderr)
        print(f"Raw output (first 500 chars): {output[:500]}", file=sys.stderr)
        return None


def verify_snippet(snippet: str, source_text: str) -> bool:
    """Return True if snippet appears (near-)verbatim in source_text.

    Normalization: lowercase + collapse internal whitespace runs to single space.
    This tolerates RSS-description encoding differences and line wraps while
    still catching quotes that the model fabricated.
    """
    import re
    def norm(s: str) -> str:
        return re.sub(r"\s+", " ", s.lower()).strip()
    return norm(snippet) in norm(source_text)


def validate(result: dict) -> bool:
    """Schema validation. Prints issue and returns False if invalid."""
    required = {
        "url", "source_type", "title", "summary",
        "verbatim_snippet", "confidence", "relates_to_paonia",
    }
    missing = required - set(result.keys())
    if missing:
        print(f"ERROR: missing fields: {missing}", file=sys.stderr)
        return False
    if not isinstance(result["confidence"], int) or not 1 <= result["confidence"] <= 5:
        print(f"ERROR: confidence must be int 1-5, got {result['confidence']!r}", file=sys.stderr)
        return False
    if result["source_type"] not in ("news", "gmail"):
        print(f"ERROR: source_type must be news or gmail for LLM items, got {result['source_type']!r}", file=sys.stderr)
        return False
    if not isinstance(result["relates_to_paonia"], bool):
        print(f"ERROR: relates_to_paonia must be bool, got {type(result['relates_to_paonia']).__name__}", file=sys.stderr)
        return False
    # enforce length bounds (soft: truncate rather than fail)
    result["title"] = result["title"][:100]
    result["summary"] = result["summary"][:200]
    result["verbatim_snippet"] = result["verbatim_snippet"][:300]
    return True


def summarize_news(items: list) -> list:
    out = []
    for a in items:
        source_text = (
            f"Publication: {a.get('source', '')}\n"
            f"Date: {a.get('date', '')}\n"
            f"Author: {a.get('author', '')}\n"
            f"URL: {a.get('url', '')}\n"
            f"Headline: {a.get('title', '')}\n"
            f"Description: {a.get('description', '')}\n"
        )
        result = run_claude(source_text)
        if not result or not validate(result):
            continue
        if not result["relates_to_paonia"]:
            print(f"  skipped (not Paonia-related): {a.get('title', '')[:80]}", file=sys.stderr)
            continue
        # Force URL back to the input URL. Claude is instructed to preserve it but we don't
        # trust LLM output for a link we'll publish. Adversarial article bodies could try to
        # substitute a different URL via prompt injection.
        result["url"] = a.get("url", "")
        # Verify the quote actually appears in the source. If not, the confidence score is
        # meaningless -- the model fabricated support for its summary.
        if not verify_snippet(result["verbatim_snippet"], source_text):
            print(f"  UNVERIFIED quote for: {a.get('title', '')[:80]}", file=sys.stderr)
            result["confidence"] = 1
            result["title"] = f"[UNVERIFIED-QUOTE] {result['title']}"[:100]
        out.append(result)
    return out


def summarize_gmail(items: list) -> list:
    out = []
    for m in items:
        # Gmail has no stable public URL; use a pseudo-URL for traceability.
        pseudo_url = f"gmail://{m.get('id', 'unknown')}"
        source_text = (
            f"From: {m.get('sender', '')}\n"
            f"Subject: {m.get('subject', '')}\n"
            f"Date: {m.get('date', '')}\n"
            f"URL: {pseudo_url}\n"
            f"Snippet: {m.get('snippet', '')}\n"
        )
        result = run_claude(source_text)
        if not result or not validate(result):
            continue
        if not result["relates_to_paonia"]:
            print(f"  skipped (not Paonia-related): {m.get('subject', '')[:80]}", file=sys.stderr)
            continue
        # Force URL back to our pseudo-URL in case the model invented one
        result["url"] = pseudo_url
        # Verify the quote appears in the Gmail snippet. Truncated snippets can miss
        # longer quotes; in that case flag unverified rather than pretending confidence.
        if not verify_snippet(result["verbatim_snippet"], source_text):
            print(f"  UNVERIFIED quote for: {m.get('subject', '')[:80]}", file=sys.stderr)
            result["confidence"] = 1
            result["title"] = f"[UNVERIFIED-QUOTE] {result['title']}"[:100]
        out.append(result)
    return out


def passthrough_civicclerk(items: list) -> list:
    """CivicClerk has no body text to summarize; metadata IS the summary. No LLM call."""
    out = []
    for e in items:
        files = e.get("files", [])
        files_str = ", ".join(f.get("fileName", "") for f in files) if files else "(no files)"
        out.append({
            "url": "https://paoniaco.portal.civicclerk.com/",
            "source_type": "civicclerk",
            "title": f"{e.get('category', 'Event')}: {e.get('name', '')}"[:100],
            "summary": f"{e.get('name', '')} on {e.get('date', '')}. Files: {files_str}"[:200],
            "verbatim_snippet": e.get("name", "")[:300],
            "confidence": 5,
            "relates_to_paonia": True,
        })
    return out


def format_entry(r: dict) -> str:
    """Format a structured summary as a markdown list item for INBOX.md."""
    if r["confidence"] <= 2:
        conf_tag = f"[LOW-CONFIDENCE {r['confidence']}/5]"
    else:
        conf_tag = f"[conf {r['confidence']}/5]"
    return (
        f"- [ ] **{r['title']}** {conf_tag}\n"
        f"  - {r['summary']}\n"
        f"  - Quote: \"{r['verbatim_snippet']}\"\n"
        f"  - Source: {r['url']}\n"
    )


def insert_before_ingested(inbox_path: Path, new_block: str) -> None:
    """Insert new_block before the '## Ingested' line in INBOX.md, or append if missing."""
    if not inbox_path.exists():
        inbox_path.parent.mkdir(parents=True, exist_ok=True)
        inbox_path.write_text(new_block)
        return
    text = inbox_path.read_text()
    marker = "## Ingested"
    idx = text.find(marker)
    if idx == -1:
        # No marker -- append at EOF
        with open(inbox_path, "a") as f:
            f.write(new_block)
        return
    new_text = text[:idx] + new_block + "\n" + text[idx:]
    inbox_path.write_text(new_text)


def load_json_file(path: str) -> list:
    if not os.path.exists(path):
        return []
    with open(path) as f:
        content = f.read().strip()
    if not content:
        return []
    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"WARN: {path} is not valid JSON ({e}); treating as empty", file=sys.stderr)
        return []
    return data if isinstance(data, list) else []


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--youtube", required=True, help="JSON file from check-youtube.sh")
    p.add_argument("--civicclerk", required=True, help="JSON file from check-civicclerk.sh")
    p.add_argument("--news", required=True, help="JSON file from check-news.py")
    p.add_argument("--gmail", required=True, help="JSON file from check-gmail.sh")
    p.add_argument("--out-inbox", required=True, help="path to raw/INBOX.md")
    p.add_argument("--out-log", required=True, help="path to .claude/watcher-log.md")
    p.add_argument("--date", required=True, help="ISO date for the section header (YYYY-MM-DD)")
    args = p.parse_args()

    yt = load_json_file(args.youtube)
    cc = load_json_file(args.civicclerk)
    news = load_json_file(args.news)
    gmail = load_json_file(args.gmail)

    print(f"Loaded: youtube={len(yt)} civicclerk={len(cc)} news={len(news)} gmail={len(gmail)}", file=sys.stderr)

    results: list = []
    # CivicClerk first -- no LLM, fast, always succeeds
    results.extend(passthrough_civicclerk(cc))
    results.extend(summarize_news(news))
    results.extend(summarize_gmail(gmail))

    # Write structured block to INBOX
    inbox_path = Path(args.out_inbox)
    if results:
        block = f"\n## Pending (auto-ingested {args.date})\n\n"
        block += "".join(format_entry(r) for r in results)
        insert_before_ingested(inbox_path, block)
        print(f"Wrote {len(results)} entries to {inbox_path}", file=sys.stderr)
    else:
        print(f"No new INBOX entries this run", file=sys.stderr)

    # Heartbeat log -- always append, even with zero results
    log_path = Path(args.out_log)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).isoformat()
    line = (
        f"- {ts} run: youtube={len(yt)} civicclerk={len(cc)} "
        f"news={len(news)} gmail={len(gmail)} -> {len(results)} INBOX entries"
    )
    with open(log_path, "a") as f:
        f.write(line + "\n")
    print(f"Heartbeat: {line}", file=sys.stderr)

    # NOTE: YouTube items are not processed here. They're handled by
    # scripts/ingest-meeting.sh which auto-downloads transcripts. The
    # orchestrator should call ingest-meeting.sh for each yt[].id
    # before or after invoking this script.
    if yt:
        print(f"NOTE: {len(yt)} YouTube video(s) not summarized here. Run scripts/ingest-meeting.sh for each.", file=sys.stderr)

    return 0


if __name__ == "__main__":
    sys.exit(main())
