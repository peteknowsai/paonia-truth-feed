#!/usr/bin/env bash
set -uo pipefail
cd /Users/pete/Projects/paonia-truth-feed
API="https://paoniaco.api.civicclerk.com/v1"
OUT="raw/research/contract-map/packets"
LOG="raw/research/contract-map/download.log"
echo "=== download started $(date) ===" > "$LOG"
python3 - <<'PY' >> "$LOG" 2>&1
import json,subprocess,os,time
m=json.load(open('raw/research/contract-map/meeting-manifest.json'))
tb=[x for x in m if ('Town Board' in x['name'] or 'Council' in x['name'] or 'Board Meeting' in x['name'])
    and 'Tree Board' not in x['name'] and x['packet_fileId']]
tb.sort(key=lambda x:x['date'])
print(f"{len(tb)} packets to fetch")
API="https://paoniaco.api.civicclerk.com/v1"
ok=skip=fail=0
for i,x in enumerate(tb):
    fn=f"raw/research/contract-map/packets/{x['date']}-evt{x['id']}.pdf"
    if os.path.exists(fn) and os.path.getsize(fn)>1000:
        skip+=1; continue
    url=f"{API}/Meetings/GetMeetingFileStream(fileId={x['packet_fileId']},plainText=false)"
    r=subprocess.run(['curl','-s','--max-time','180','-o',fn,'-w','%{http_code}|%{size_download}',url],
                     capture_output=True,text=True)
    code=r.stdout.split('|')[0] if r.stdout else '?'
    size=os.path.getsize(fn) if os.path.exists(fn) else 0
    if code=='200' and size>1000:
        ok+=1; print(f"[{i+1}/{len(tb)}] OK   {x['date']} evt{x['id']} {size//1024}KB")
        # extract text immediately
        txt=fn[:-4]+'.txt'
        subprocess.run(['pdftotext','-layout',fn,txt],capture_output=True)
    else:
        fail+=1; print(f"[{i+1}/{len(tb)}] FAIL {x['date']} evt{x['id']} code={code} size={size}")
        if os.path.exists(fn) and size<=1000: os.remove(fn)
    time.sleep(0.4)
print(f"\nDONE: {ok} downloaded, {skip} already had, {fail} failed")
PY
# extract text for the 3 pre-seeded ones too
for p in raw/research/contract-map/packets/*.pdf; do
  t="${p%.pdf}.txt"
  [[ -f "$t" ]] || pdftotext -layout "$p" "$t" 2>/dev/null
done
echo "=== download finished $(date) ===" >> "$LOG"
echo "ALL DONE" >> "$LOG"
