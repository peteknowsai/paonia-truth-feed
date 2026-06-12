#!/usr/bin/env python3
"""Analyze the disbursements ledger for vendor patterns."""
import json, os, re
from collections import defaultdict

D = os.path.dirname(__file__)
rows = json.load(open(os.path.join(D, 'disbursements-ledger.json')))

# normalize vendor names (strip case/punct noise)
def norm(v):
    v = re.sub(r'\s+', ' ', v).strip().upper()
    v = v.rstrip('.,')
    return v

by_vendor = defaultdict(lambda: {'total': 0.0, 'count': 0, 'meetings': set(), 'descs': set(), 'gls': set()})
for r in rows:
    v = norm(r['vendor'])
    bv = by_vendor[v]
    bv['total'] += r['amount']
    bv['count'] += 1
    bv['meetings'].add(r['meeting_date'])
    bv['descs'].add(r['description'][:40])
    bv['gls'].add(r['gl_title'][:30])

meetings = sorted(set(r['meeting_date'] for r in rows))
print(f"=== LEDGER: {len(rows)} line items, {len(by_vendor)} distinct vendors, "
      f"{len(meetings)} meetings ({meetings[0]}..{meetings[-1]}) ===\n")

print("=== TOP 30 VENDORS BY TOTAL $ (across parsed registers) ===")
ranked = sorted(by_vendor.items(), key=lambda x: -x[1]['total'])
for v, d in ranked[:30]:
    print(f"  ${d['total']:>12,.2f}  {d['count']:>4} items  {len(d['meetings']):>2} mtgs  {v[:46]}")

print("\n=== MOST RECURRING VENDORS (appear in most separate meeting registers) ===")
for v, d in sorted(by_vendor.items(), key=lambda x: -len(x[1]['meetings']))[:25]:
    print(f"  {len(d['meetings']):>2} mtgs  ${d['total']:>12,.2f}  {d['count']:>4} items  {v[:46]}")

print("\n=== BIGGEST SINGLE LINE ITEMS ===")
for r in sorted(rows, key=lambda x: -x['amount'])[:25]:
    print(f"  ${r['amount']:>12,.2f}  {r['meeting_date']}  {norm(r['vendor'])[:32]:<32}  {r['description'][:34]}  [{r['gl_title'][:24]}]")

print("\n=== VENDORS ON 'LEGAL, ENGINEERING & PROF' GL ACCOUNTS (professional services $) ===")
prof = defaultdict(lambda: {'total': 0.0, 'count': 0, 'meetings': set()})
for r in rows:
    if re.search(r'LEGAL|ENGINEER|PROFESSIONAL|CONSULT', r['gl_title'], re.I):
        v = norm(r['vendor'])
        prof[v]['total'] += r['amount']
        prof[v]['count'] += 1
        prof[v]['meetings'].add(r['meeting_date'])
for v, d in sorted(prof.items(), key=lambda x: -x[1]['total'])[:20]:
    print(f"  ${d['total']:>11,.2f}  {d['count']:>3} items  {len(d['meetings']):>2} mtgs  {v[:50]}")

print("\n=== GL TITLE distribution (where the money is coded) ===")
gl = defaultdict(float)
for r in rows:
    gl[r['gl_title'][:34]] += r['amount']
for t, a in sorted(gl.items(), key=lambda x: -x[1])[:20]:
    print(f"  ${a:>12,.2f}  {t}")

print("\n=== WATER-SYSTEM VENDOR CLUSTER (tank rehab + water CIP + water engineering) ===")
WATER_RE = re.compile(r'water tank|tank reha|water cip|water system|2mg|2 mg|raw water|hydrogeolog|water power', re.I)
WATER_VENDORS = ['RESPEC', 'SGM', 'KLM', 'WRIGHT WATER', 'MARKLEY', 'EARTHWORX', 'BROWNS HILL',
                 'MISCOWATER', 'COLORADO WATER', 'WESTWATER', 'SUSTAINABLE FUTURES']
wc = defaultdict(lambda: {'total': 0.0, 'count': 0, 'meetings': set()})
for r in rows:
    v = norm(r['vendor'])
    if WATER_RE.search(r['description']) or WATER_RE.search(r['gl_title']) or any(w in v for w in WATER_VENDORS):
        wc[v]['total'] += r['amount']
        wc[v]['count'] += 1
        wc[v]['meetings'].add(r['meeting_date'])
wtot = sum(d['total'] for d in wc.values())
print(f"  water-cluster total in parsed registers: ${wtot:,.2f}")
for v, d in sorted(wc.items(), key=lambda x: -x[1]['total']):
    print(f"  ${d['total']:>12,.2f}  {d['count']:>3} items  {len(d['meetings']):>2} mtgs  {v[:46]}")

print("\n=== SINGLE-APPEARANCE BIG VENDORS (>=$15k, only 1 meeting — possible one-off contracts) ===")
for v, d in sorted(by_vendor.items(), key=lambda x: -x[1]['total']):
    if d['total'] >= 15000 and len(d['meetings']) == 1:
        print(f"  ${d['total']:>12,.2f}  {d['count']:>3} items  {v[:46]}  ({list(d['meetings'])[0]})")
