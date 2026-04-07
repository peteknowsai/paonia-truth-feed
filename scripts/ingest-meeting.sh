#!/usr/bin/env bash
#
# ingest-meeting.sh — Download a Paonia board meeting transcript from YouTube
# and generate a wiki-ready markdown file in wiki/events/.
#
# Usage:
#   ./scripts/ingest-meeting.sh <youtube-url-or-id>
#   ./scripts/ingest-meeting.sh --list           # show available meetings
#   ./scripts/ingest-meeting.sh --recent [N]     # ingest N most recent (default 1)
#
# Requires: yt-dlp, curl, python3
#
# The script downloads YouTube auto-captions, cleans them into a readable
# transcript, and writes a wiki markdown file with frontmatter. The transcript
# is included in full — run it through Claude Code to get a summary.

set -euo pipefail

WIKI_DIR="$(cd "$(dirname "$0")/.." && pwd)/wiki"
EVENTS_DIR="$WIKI_DIR/events"
RAW_DIR="$(cd "$(dirname "$0")/.." && pwd)/raw/transcripts"
CHANNEL="https://www.youtube.com/@townofpaonia5418/videos"
CIVICCLERK="https://paoniaco.api.civicclerk.com/v1"

mkdir -p "$EVENTS_DIR" "$RAW_DIR"

# ---------- helpers ----------

list_channel_videos() {
  yt-dlp --flat-playlist --print "%(id)s|%(title)s" "$CHANNEL" 2>/dev/null
}

clean_transcript() {
  # Remove VTT headers, timestamps, duplicate lines, and formatting tags
  python3 -c "
import sys, re

lines = sys.stdin.read().split('\n')
seen = set()
out = []
for line in lines:
    line = line.strip()
    # skip VTT metadata
    if not line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:'):
        continue
    # skip timestamp lines
    if re.match(r'^\d{2}:\d{2}', line) or '-->' in line:
        continue
    # strip formatting tags
    line = re.sub(r'<[^>]+>', '', line)
    # dedup consecutive identical lines (YouTube repeats for timing)
    if line not in seen:
        out.append(line)
        seen.add(line)
    else:
        seen = {line}  # reset on repeat to handle new sections

print('\n'.join(out))
"
}

slugify_title() {
  echo "$1" | python3 -c "
import sys, re
t = sys.stdin.read().strip()
# extract date if present (M/D/YYYY or MM/DD/YYYY)
m = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', t)
if m:
    date = f'{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}'
else:
    date = ''
# clean title
name = re.sub(r'\d{1,2}/\d{1,2}/\d{4}\s*', '', t).strip()
name = re.sub(r'[^a-zA-Z0-9\s-]', '', name).strip()
name = re.sub(r'\s+', '-', name).lower()
if date:
    print(f'{date}-{name}')
else:
    print(name)
"
}

extract_date() {
  echo "$1" | python3 -c "
import sys, re
t = sys.stdin.read().strip()
m = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', t)
if m:
    print(f'{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}')
else:
    print('')
"
}

get_civicclerk_files() {
  local date="$1"
  curl -s "${CIVICCLERK}/Events?\$filter=eventDate%20ge%20${date}T00:00:00Z%20and%20eventDate%20le%20${date}T23:59:59Z" 2>/dev/null | \
    python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    for e in data.get('value', []):
        for f in e.get('publishedFiles', []):
            print(f'{f[\"fileId\"]}|{f[\"fileName\"]}|{f[\"fileType\"]}')
except:
    pass
" 2>/dev/null || true
}

# ---------- commands ----------

cmd_list() {
  echo "Available meetings on YouTube channel:"
  echo "======================================="
  list_channel_videos | while IFS='|' read -r id title; do
    echo "  $title"
    echo "    https://www.youtube.com/watch?v=$id"
    echo
  done
}

ingest_video() {
  local video_id="$1"
  local url="https://www.youtube.com/watch?v=$video_id"

  echo "Fetching metadata for $video_id..."
  local title
  title=$(yt-dlp --print "%(title)s" "$url" 2>/dev/null)
  echo "Title: $title"

  local slug
  slug=$(slugify_title "$title")
  local date
  date=$(extract_date "$title")

  local transcript_file="$RAW_DIR/${slug}.vtt"
  local wiki_file="$EVENTS_DIR/${slug}.md"

  if [[ -f "$wiki_file" ]]; then
    echo "Wiki file already exists: $wiki_file"
    echo "Skipping. Delete it first to re-ingest."
    return 0
  fi

  echo "Downloading auto-captions..."
  yt-dlp --write-auto-sub --sub-lang en --sub-format vtt \
    --skip-download --output "$RAW_DIR/${slug}" "$url" 2>/dev/null

  # yt-dlp names the file with .en.vtt suffix
  local vtt_file
  vtt_file=$(ls "$RAW_DIR/${slug}"*.vtt 2>/dev/null | head -1)
  if [[ -z "$vtt_file" ]]; then
    echo "ERROR: No captions found for $video_id"
    return 1
  fi

  echo "Cleaning transcript..."
  local clean_text
  clean_text=$(cat "$vtt_file" | clean_transcript)

  # Check for CivicClerk agenda/minutes
  local civicclerk_note=""
  if [[ -n "$date" ]]; then
    local files
    files=$(get_civicclerk_files "$date")
    if [[ -n "$files" ]]; then
      civicclerk_note="## Meeting Documents (CivicClerk)\n\n"
      while IFS='|' read -r fid fname ftype; do
        civicclerk_note+="- [$fname](${CIVICCLERK}/Meetings/GetMeetingFileStream(fileId=${fid},plainText=false))\n"
      done <<< "$files"
      civicclerk_note+="\n"
    fi
  fi

  # Summarize transcript using Claude CLI (uses OAuth, no API key needed)
  echo "Summarizing transcript with Claude..."
  local summary
  summary=$(echo "$clean_text" | claude --print \
    "You are summarizing a Paonia, Colorado town board meeting transcript (auto-captioned, may have errors). Write a structured summary for a civic transparency wiki. Use this format:

### Key Decisions
- Bullet each motion/vote with the result (passed/failed, vote count if stated)

### Discussion Highlights
- Bullet the substantive topics discussed, with enough detail to be useful

### Public Comment
- Bullet any public comments, noting who spoke and what about (if discernible)

### Notable Quotes
- Include 2-3 direct quotes that capture important moments (clean up obvious caption errors)

Be factual. No editorializing. If the transcript is too garbled to summarize a section, say so." 2>/dev/null) || true

  if [[ -z "$summary" ]]; then
    summary="> Auto-summary failed. Review the transcript below manually."
  fi

  # Write wiki file
  cat > "$wiki_file" << FRONTMATTER
---
title: "${title}"
type: event
created: ${date:-$(date +%Y-%m-%d)}
updated: $(date +%Y-%m-%d)
tags: [board-meeting, transcript]
sources: []
---

**Video:** [YouTube](${url})
${date:+**Date:** ${date}}

$(echo -e "$civicclerk_note")## Summary

${summary}

## Full Transcript (auto-captioned)

${clean_text}
FRONTMATTER

  echo "Created: $wiki_file"
  echo "  $(echo "$clean_text" | wc -l | tr -d ' ') lines of transcript"
}

cmd_recent() {
  local count="${1:-1}"
  local videos
  videos=$(list_channel_videos || true)
  videos=$(echo "$videos" | head -n "$count")

  while IFS='|' read -r id title; do
    [[ -z "$id" ]] && continue
    echo "========================================="
    ingest_video "$id" || echo "WARN: Failed to ingest $id ($title)"
    echo
  done <<< "$videos"
}

# ---------- main ----------

case "${1:-}" in
  --list|-l)
    cmd_list
    ;;
  --recent|-r)
    cmd_recent "${2:-1}"
    ;;
  --help|-h|"")
    echo "Usage:"
    echo "  $0 <youtube-url-or-id>    Ingest a specific meeting"
    echo "  $0 --list                 List available meetings"
    echo "  $0 --recent [N]           Ingest N most recent meetings (default 1)"
    echo "  $0 --help                 Show this help"
    ;;
  *)
    # Accept full URL or just video ID
    input="$1"
    video_id=$(echo "$input" | python3 -c "
import sys, re
url = sys.stdin.read().strip()
m = re.search(r'(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})', url)
print(m.group(1) if m else url)
")
    ingest_video "$video_id"
    ;;
esac
