#!/usr/bin/env bash
# check-gmail.sh -- Check Gmail for new town correspondence via gws CLI.
# Outputs JSON array of new messages, or {"error":"auth"} if token expired.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATE_FILE="$PROJECT_DIR/.claude/watcher-state.json"

mkdir -p "$(dirname "$STATE_FILE")"
if [[ ! -f "$STATE_FILE" ]]; then
  echo '{}' > "$STATE_FILE"
fi

# Check auth first. gws prints a "Using keyring backend: keyring" diagnostic line
# before its JSON output, so grep is used (tolerant of the prefix). The Python steps
# below use _extract_json() to slice off that prefix before json.loads.
auth_check=$(gws gmail users getProfile --params '{"userId":"me"}' 2>&1 || true)
if echo "$auth_check" | grep -qE '"error"[[:space:]]*:[[:space:]]*"(auth|invalid_grant|unauthorized)"'; then
  echo '{"error":"auth","message":"Gmail token expired. Run: ! gws gmail auth login"}'
  exit 0
fi

# Get last check date from state
last_date=$(python3 -c "
import json
from datetime import datetime, timedelta, timezone
with open('$STATE_FILE') as f:
    state = json.load(f)
gm = state.get('gmail', {})
last = gm.get('last_checked', '')
if last:
    # Convert to Gmail date format (YYYY/MM/DD)
    dt = datetime.fromisoformat(last.replace('Z', '+00:00'))
    print(dt.strftime('%Y/%m/%d'))
else:
    dt = datetime.now(timezone.utc) - timedelta(days=7)
    print(dt.strftime('%Y/%m/%d'))
")

# Search for town emails
query="(from:townofpaonia.com OR from:paoniagov.com) after:${last_date}"
result=$(gws gmail users messages list --params "{\"userId\":\"me\",\"q\":\"${query}\",\"maxResults\":20}" 2>&1 || echo '{}')

# Parse messages and fetch details. gws prepends a "Using keyring backend: keyring"
# diagnostic line to its output, so _extract_json finds the first '{' or '[' and
# parses from there.
python3 -c "
import json, subprocess, sys
from datetime import datetime, timezone

def _extract_json(text):
    for i, ch in enumerate(text):
        if ch in '{[':
            return text[i:]
    return text

result_raw = '''$result'''
try:
    result = json.loads(_extract_json(result_raw))
except json.JSONDecodeError:
    print('[]')
    sys.exit(0)

state_file = '$STATE_FILE'

with open(state_file) as f:
    state = json.load(f)
gm_state = state.get('gmail', {})
known_ids = set(gm_state.get('known_message_ids', []))

messages = result.get('messages', [])
new_messages = []

for msg in messages:
    msg_id = msg.get('id', '')
    if msg_id in known_ids:
        continue
    known_ids.add(msg_id)

    # Fetch message details (same keyring prefix issue)
    try:
        detail = subprocess.run(
            ['gws', 'gmail', 'users', 'messages', 'get',
             '--params', json.dumps({'userId': 'me', 'id': msg_id, 'format': 'metadata',
                                     'metadataHeaders': ['From', 'Subject', 'Date']})],
            capture_output=True, text=True, timeout=10
        )
        data = json.loads(_extract_json(detail.stdout))
    except Exception:
        continue

    headers = {h['name']: h['value'] for h in data.get('payload', {}).get('headers', [])}
    new_messages.append({
        'id': msg_id,
        'subject': headers.get('Subject', '(no subject)'),
        'sender': headers.get('From', 'unknown'),
        'date': headers.get('Date', ''),
        'snippet': data.get('snippet', '')[:200]
    })

# Update state
gm_state['known_message_ids'] = list(known_ids)
gm_state['last_checked'] = datetime.now(timezone.utc).isoformat()
state['gmail'] = gm_state
with open(state_file, 'w') as f:
    json.dump(state, f, indent=2)

print(json.dumps(new_messages))
"
