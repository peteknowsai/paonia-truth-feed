#!/usr/bin/env bash
# check-youtube.sh -- Find new videos on the Town of Paonia YouTube channel.
# Outputs JSON array of new {id, title} pairs. Updates watcher state.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATE_FILE="$PROJECT_DIR/.claude/watcher-state.json"
EVENTS_DIR="$PROJECT_DIR/wiki/events"
CHANNEL="https://www.youtube.com/@townofpaonia5418/videos"

# Ensure state file exists
mkdir -p "$(dirname "$STATE_FILE")"
if [[ ! -f "$STATE_FILE" ]]; then
  echo '{}' > "$STATE_FILE"
fi

# Get all channel videos
all_videos=$(yt-dlp --flat-playlist --print "%(id)s|%(title)s" "$CHANNEL" 2>/dev/null || true)
if [[ -z "$all_videos" ]]; then
  echo '[]'
  exit 0
fi

# Find new videos by checking against existing wiki event files
python3 -c "
import json, os, sys, glob

state_file = '$STATE_FILE'
events_dir = '$EVENTS_DIR'
videos_raw = '''$all_videos'''

# Load state
with open(state_file) as f:
    state = json.load(f)
yt_state = state.get('youtube', {})
known_ids = set(yt_state.get('known_video_ids', []))

# Also check existing wiki files for YouTube links (defense in depth)
existing_ids = set()
for md in glob.glob(os.path.join(events_dir, '*.md')):
    with open(md) as f:
        content = f.read()
    for line in content.split('\n'):
        if 'youtube.com/watch?v=' in line:
            for part in line.split('v='):
                if len(part) >= 11:
                    vid = part[:11].split(')')[0].split('\"')[0].split(' ')[0]
                    if len(vid) == 11:
                        existing_ids.add(vid)

skip_ids = known_ids | existing_ids
new_videos = []
all_ids = []

for line in videos_raw.strip().split('\n'):
    if not line.strip():
        continue
    parts = line.split('|', 1)
    if len(parts) != 2:
        continue
    vid_id, title = parts
    all_ids.append(vid_id)
    if vid_id not in skip_ids:
        new_videos.append({'id': vid_id, 'title': title})

# Update state
from datetime import datetime, timezone
yt_state['known_video_ids'] = list(set(all_ids) | known_ids)
yt_state['last_checked'] = datetime.now(timezone.utc).isoformat()
state['youtube'] = yt_state
with open(state_file, 'w') as f:
    json.dump(state, f, indent=2)

print(json.dumps(new_videos))
"
