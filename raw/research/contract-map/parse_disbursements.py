#!/usr/bin/env python3
"""Parse Caselle 'Payment Approval Report' disbursement registers from all packet txt files.
Outputs a structured vendor payment ledger: raw/research/contract-map/disbursements-ledger.csv + .json
"""
import re, json, csv, glob, os

PKT_DIR = os.path.join(os.path.dirname(__file__), 'packets')

# A data row: leading spaces, vendor#, vendor name, invoice#, description, MM/DD/YYYY, amount, GL acct, GL title, MM/DD/YYYY
ROW = re.compile(
    r'^\s*(\d{3,5})\s+(.+?)\s{2,}(\S.*?)\s+'
    r'(\d{1,2}/\d{1,2}/\d{4})\s+'
    r'([\d,]+\.\d{2})\s+'
    r'(\d{2}-\d{3,4}|\d{2}-\d{2}-\d{2})\s+'
    r'(.+?)\s+(\d{1,2}/\d{1,2}/\d{4})\s*$'
)
TOTAL = re.compile(r'^\s*Total\s+(.+?):\s+([\d,]+\.\d{2})\s*$')
REPORT_DATES = re.compile(r'Report dates:\s*([\d/]+)\s*-\s*([\d/]+)')
HEADER = re.compile(r'Payment Approval Report', re.I)

def amt(s): return float(s.replace(',', ''))

rows = []
packet_summary = []

for txt in sorted(glob.glob(os.path.join(PKT_DIR, '*.txt'))):
    base = os.path.basename(txt)[:-4]
    date = base.split('-evt')[0]
    lines = open(txt, errors='replace').read().split('\n')
    has_header = any(HEADER.search(l) for l in lines)
    rpt_dates = ''
    n_rows = 0
    vendor_totals = {}
    in_report = False
    for ln in lines:
        # scope parsing to within a Payment Approval Report section
        if HEADER.search(ln):
            in_report = True
        elif re.search(r'Grand Total', ln, re.I):
            in_report = False
        m = REPORT_DATES.search(ln)
        if m:
            rpt_dates = f'{m.group(1)}-{m.group(2)}'
        r = ROW.match(ln) if in_report else None
        if r:
            vnum, vname, desc, idate, a, gl, gltitle, gldate = r.groups()
            vname = re.sub(r'\s+', ' ', vname).strip()
            rows.append({
                'meeting_date': date, 'packet': base,
                'report_dates': rpt_dates,
                'vendor_num': vnum, 'vendor': vname,
                'description': re.sub(r'\s+', ' ', desc).strip(),
                'invoice_date': idate, 'amount': amt(a),
                'gl_account': gl, 'gl_title': re.sub(r'\s+', ' ', gltitle).strip(),
            })
            n_rows += 1
        t = TOTAL.match(ln)
        if t:
            vendor_totals[re.sub(r'\s+', ' ', t.group(1)).strip()] = amt(t.group(2))
    packet_summary.append({
        'packet': base, 'meeting_date': date,
        'has_report_header': has_header,
        'rows_parsed': n_rows,
        'vendor_total_lines': len(vendor_totals),
        'sum_parsed': round(sum(r['amount'] for r in rows if r['packet'] == base), 2),
        'sum_vendor_totals': round(sum(vendor_totals.values()), 2),
    })

# write outputs
with open(os.path.join(os.path.dirname(__file__), 'disbursements-ledger.json'), 'w') as f:
    json.dump(rows, f, indent=1)
with open(os.path.join(os.path.dirname(__file__), 'disbursements-ledger.csv'), 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['meeting_date', 'packet', 'report_dates', 'vendor_num',
                                      'vendor', 'description', 'invoice_date', 'amount',
                                      'gl_account', 'gl_title'])
    w.writeheader()
    w.writerows(rows)

# report
print(f'TOTAL line items parsed: {len(rows)}')
print(f'TOTAL dollars (parsed line items): ${sum(r["amount"] for r in rows):,.2f}')
print()
print('Coverage by packet (meetings WITH a parseable register):')
got = [p for p in packet_summary if p['rows_parsed'] > 0]
print(f'  {len(got)} of {len(packet_summary)} packets yielded register rows')
for p in sorted(got, key=lambda x: x['meeting_date']):
    flag = '' if abs(p['sum_parsed'] - p['sum_vendor_totals']) < p['sum_vendor_totals'] * 0.05 or p['sum_vendor_totals'] == 0 else '  <-- parse gap'
    print(f"  {p['meeting_date']}  rows:{p['rows_parsed']:>4}  parsed:${p['sum_parsed']:>13,.2f}  vendorTotals:${p['sum_vendor_totals']:>13,.2f}{flag}")
print()
print('Packets with report header but ZERO rows parsed (likely scanned-image registers — need OCR):')
for p in sorted(packet_summary, key=lambda x: x['meeting_date']):
    if p['has_report_header'] and p['rows_parsed'] == 0:
        print(f"  {p['meeting_date']}  {p['packet']}")
