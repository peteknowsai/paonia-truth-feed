#!/usr/bin/env bash
# check-civicclerk.sh -- Find new CivicClerk events with published files.
# Outputs JSON array of new events. Updates watcher state.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATE_FILE="$PROJECT_DIR/.claude/watcher-state.json"
API="https://paoniaco.api.civicclerk.com/v1"

mkdir -p "$(dirname "$STATE_FILE")"
if [[ ! -f "$STATE_FILE" ]]; then
  echo '{}' > "$STATE_FILE"
fi

# Get last check date from state (default: 30 days ago)
last_date=$(python3 -c "
import json, sys
from datetime import datetime, timedelta, timezone
with open('$STATE_FILE') as f:
    state = json.load(f)
cc = state.get('civicclerk', {})
last = cc.get('last_event_date', '')
if not last:
    last = (datetime.now(timezone.utc) - timedelta(days=30)).strftime('%Y-%m-%d')
print(last)
")

# Query CivicClerk for events since last check
response=$(curl -s "${API}/Events?\$filter=eventDate%20ge%20${last_date}T00:00:00Z&\$orderby=eventDate%20asc&\$top=50" 2>/dev/null || echo '{"value":[]}')

# Filter to events with published files and extract useful data
python3 -c "
import json, sys
from datetime import datetime, timezone

response = json.loads('''$response''')
state_file = '$STATE_FILE'

with open(state_file) as f:
    state = json.load(f)
cc_state = state.get('civicclerk', {})
known_event_ids = set(cc_state.get('known_event_ids', []))

events = response.get('value', [])
new_events = []
max_date = cc_state.get('last_event_date', '')

for e in events:
    eid = e.get('id')
    files = e.get('publishedFiles', [])
    event_date = e.get('eventDate', '')[:10]

    if event_date > max_date:
        max_date = event_date

    if eid in known_event_ids:
        continue

    # Only report events that have published files (agenda, minutes, etc.)
    if not files:
        known_event_ids.add(eid)
        continue

    file_info = []
    for f in files:
        file_info.append({
            'fileId': f.get('fileId'),
            'fileName': f.get('fileName', ''),
            'fileType': f.get('fileType', '')
        })

    new_events.append({
        'id': eid,
        'name': e.get('eventName', ''),
        'date': event_date,
        'category': e.get('eventCategoryName', ''),
        'files': file_info
    })
    known_event_ids.add(eid)

# Update state
cc_state['known_event_ids'] = list(known_event_ids)
cc_state['last_event_date'] = max_date
cc_state['last_checked'] = datetime.now(timezone.utc).isoformat()
state['civicclerk'] = cc_state
with open(state_file, 'w') as f:
    json.dump(state, f, indent=2)

print(json.dumps(new_events))
"
