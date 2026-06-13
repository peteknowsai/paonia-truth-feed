---
title: "CORA C 26-30 & C 26-33 — The Person-of-Interest List Erased While the Request Was Pending"
type: source
created: 2026-06-13
updated: 2026-06-13
tags: [cora, verkada, surveillance, poi, person-of-interest, lpoi, vetter, spoliation, public-records, destruction, audit-log]
sources: [cora-c26-09-verkada-audit-logs, cora-tracking-log, pattern-of-cora-obstruction, audit-log-first-viewed-after-cora, samira-vetter, surveillance]
---

# CORA C 26-30 & C 26-33 — The Person-of-Interest List Erased While the Request Was Pending

**The short version:** Pete asked the Town for two existing Verkada records — the **Person of Interest / People List** and the **License Plates of Interest (LPOI) list**, plus the add/remove audit trail for both (C 26-30), and separately the continuation of the Verkada Command audit log the Town had already produced once under [[cora-c26-09-verkada-audit-logs|C 26-09]] (C 26-33). The Clerk sat on the first request for **four days** before acknowledging it. **Two days after acknowledging it** — while both requests were live, and roughly four weeks after Pete had stood up in a public Board meeting and asked the trustees on the record *not to delete this exact data because it may be the subject of legal action* — the Board voted to terminate Verkada and, by the Town's own account, **erased all the data**. The Clerk then answered both requests with the identical letter: *"all data was erased … there are no responsive records … no data exists to be searched."* The Town's **own prior production proves those lists existed**. They destroyed the records they had been asked for — after being told on camera to preserve them — then certified there was nothing to find.

This is the most serious entry in the [[cora-tracking-log|CORA tracking log]] to date: not a slow response, not an over-redaction, but the **destruction of records that were the subject of two pending open-records requests**.

---

## The two requests

### C 26-30 — Person of Interest & License Plates of Interest lists

- **Filed:** Thursday, **June 4, 2026, 8:00 AM** (form dated 6/2/26). Gmail thread `19e919f5274919dd`.
- **What was requested** (verbatim scope, `raw/documents/cora-requests/cora-c26-30-verkada-poi-lpoi.pdf`):
  1. **Person of Interest / People List** — (a) the current list as a native Verkada Command export; (b) the People List / POI **add and remove events** from the built-in Export Audit Log, **October 22, 2025 → the date the request is processed**.
  2. **License Plates of Interest (LPOI)** — (a) the current list as a native export; (b) the LPOI add/remove events from the audit-log export, same date range.
- The request expressly noted: *"The Town's own C 26-09 audit log shows these lists exist (IDENTITY_PEOPLE_LIST_BULK_GET)"* and *"(LPOI_LIST in the C 26-09 log)."* It asked only for **native exports** ("no compilation is requested") and barred chargeable time without a written estimate.

### C 26-33 — Verkada audit-log continuation (the "next quarter" log)

- **Filed:** Monday, **June 8, 2026, 8:00 AM** (form dated 5/29/26). Gmail thread `19e77476c75d3eda`.
- **What was requested** (`raw/documents/cora-requests/cora-c26-33-verkada-audit-log-continuation.pdf`): *"The Verkada Command audit log (user-activity log) export — the SAME report the Town already produced under CORA C 26-09 … for the period beginning March 26, 2026 (where the C 26-09 production ended) through the date this request is processed."* Native CSV/Excel, same minimal redactions as C 26-09, no extended "redaction review" billing.

These are the same family of records the Town **already produced and charged $167.90 for** under [[cora-c26-09-verkada-audit-logs|C 26-09]] in April 2026. There was nothing novel or burdensome about either request.

---

## Timeline

| Date | Event |
|---|---|
| **2026-05-12 (Tue)** | **At the regular Board meeting, in public comment and on camera, Pete asks the Board to preserve the Verkada data and not delete it.** Naming the Town's *"own Verkada audit log, produced under Records Request C 26-09,"* which *"shows a Persons of Interest list … identity-database queries … [and] permanent video archives labeled with the names of specific Town employees,"* he asks the Board, when it votes to terminate, to *"Direct that no Verkada-stored footage be deleted between now and the completion of an independent audit"* (prepared remarks). As delivered, he adds that the archives should be preserved *"because they may be the subject of … legal action."* Committed sources: `raw/documents/public-comments/2026-05-12-speech-deck.html` (prepared) and `raw/documents/public-comments/2026-05-12-verkada-termination-public-comment-as-delivered.txt`; the meeting video is the primary record. |
| **2026-05-05 / 05-14** | Separately, Pete had also asked the **full Board** in writing to *"confirm … a litigation-hold preservation directive … covering the M365 mailbox contents, **audit log records**, SharePoint and OneDrive items, and Teams messages"* (Public Comment "Submission 2 of 2," portal May 5; emailed May 14; Gmail `19e27f3abd698e8f`). |
| **2026-06-04 (Thu)** | Pete files **C 26-30** (POI/LPOI lists + add/remove audit events). |
| **2026-06-08 (Mon)** | Pete files **C 26-33** (audit-log continuation). The Clerk **acknowledges C 26-30** the same day — *"received today, June 8, 2026 … deadline June 11"* — **four days** after it was filed (the Town's own policy deems a request received the **next business day**, which would have been Fri June 5). |
| **2026-06-10 (Wed)** | **The Board votes unanimously to terminate the Verkada system. The cameras are turned off and — per the Town — "all data was erased."** Both C 26-30 and C 26-33 are live, unanswered requests for that exact data at this moment. |
| **2026-06-11 (Thu)** | C 26-30 denial letter **dated** (the day *after* the erasure). |
| **2026-06-12 (Fri)** | C 26-30 denial **emailed**, 8:00 AM (`raw/documents/cora-responses/C-26-30-Response.pdf`). C 26-33 is **acknowledged** at 8:00 AM (*"deadline June 17"*) and then **denied** at 11:36 PM the same day (`raw/documents/cora-responses/C-26-33-Response.pdf`). |

Both denials are the same template, signed by Clerk [[samira-vetter|Samira Vetter]] as "Official Custodian of Records":

> *"The Town of Paonia terminated its use of the Verkada system on June 10, 2026, by unanimous vote of the Board of Trustees. With the termination of that agreement and the turning off of the cameras, all data was erased. Therefore, there are no responsive records to your request because no data exists to be searched."*

---

## Why "no records exist" is false

The Town's **own** [[cora-c26-09-verkada-audit-logs|C 26-09]] production — the Verkada Command audit log it generated, redacted, and **billed Pete $167.90 for** on April 8, 2026 — contains an `event_type` column whose values include:

- **`IDENTITY_PEOPLE_LIST_BULK_GET`** — the People List / Person-of-Interest list being read/exported, and
- **`LPOI_LIST`** — the License-Plates-of-Interest list.

(Verified directly in the produced files `raw/documents/cora-requests/c26-09-response/Verkada_Audit Log_REDACTED.xlsx` and `raw/documents/cora-requests/c26-09-response/VERKADA- Audit Logs_REDACTED.xlsx`, archived in the repo under `raw/documents/cora-requests/c26-09-response/`.) The C 26-09 cover letter also confirms the system had been running and logging **"from installation (October 22, 2025) to present."**

So the records were **demonstrably real** and in the Town's custody:

1. The **POI and LPOI lists existed** — the Town's own audit log names them.
2. The **add/remove and access events existed** continuously from Oct 22, 2025 forward — the Town produced exactly this kind of log once already.
3. They were still in the system on **June 4 and June 8**, when Pete filed, and on **June 8**, when the Clerk acknowledged C 26-30.

"No data exists to be searched" is not a denial of a record that never existed. It is a description of records that **existed when the request was made and were destroyed while it was pending.**

A further technical doubt: the Verkada **Command audit log and list membership are cloud-side organizational data**, distinct from camera video. "Turning off the cameras" does not, by itself, wipe the Command organization's audit trail — that typically persists for the org's retention window or until the org is affirmatively deleted, and the vendor commonly retains backups. The Town's flat assertion that powering down the cameras "erased all data" should not be taken at face value; whether the Command org / audit log is actually irretrievable from Verkada the vendor is an open question worth pressing.

---

## The preservation problem

The Town did not stumble into this. **Three** independent things put it on notice — before June 10 — that this exact data had to be preserved:

1. **An explicit, on-the-record demand at a public Board meeting.** On **May 12, 2026**, during public comment at the regular Board meeting — on camera, in front of the trustees who would later vote to erase — Pete specifically named the Verkada audit log, the **Persons of Interest list**, the identity-database (facial-recognition) queries, and the named-employee video archives, and asked the Board, *"when it votes to terminate,"* to *"Direct that no Verkada-stored footage be deleted between now and the completion of an independent audit"* (prepared remarks). As delivered, he made the preservation point explicit: *"that you preserve for the record and you do not delete the archives … because they may be the subject of … legal action."* This is not an inference from a CORA filing — it is a direct, recorded instruction to the decision-making body, ~4 weeks before that same body voted to erase the data. (Committed sources: `raw/documents/public-comments/2026-05-12-speech-deck.html` and `raw/documents/public-comments/2026-05-12-verkada-termination-public-comment-as-delivered.txt`; the meeting video is the primary record.)
2. **The pending requests themselves.** C 26-30 was filed June 4 and **acknowledged June 8**; C 26-33 was filed June 8. A custodian cannot destroy records that are the subject of a pending CORA request and then certify non-existence. The June 8 acknowledgment is written proof the Clerk had the POI request **in hand two days before the Board voted to erase.**
3. **A standing written litigation-hold demand.** On May 5 and again May 14, Pete asked the entire Board, in writing, to confirm a litigation-hold preservation directive covering the Town's records, including **"audit log records"** (Gmail `19e27f3abd698e8f`).

Item 1 is the heart of it: the Town was told, out loud and on the record, *don't delete this because it may be litigated* — and then deleted it. That moves this from "records happened to be destroyed" to **records destroyed after an express, recorded preservation request to the very body that ordered the destruction.**

---

## What the Town should have produced (and didn't)

Based on the Town's own records, the following responsive records existed and were owed:

- **The current Person of Interest / People List** (native export) — owed under C 26-30 item 1(a).
- **The current LPOI list** (native export) — owed under C 26-30 item 2(a).
- **The People-List add/remove audit events, Oct 22 2025 → June 2026** — owed under C 26-30 item 1(b); the event types that record these are present in the C 26-09 log.
- **The LPOI add/remove audit events, same window** — owed under C 26-30 item 2(b).
- **The Verkada Command user-activity log, Mar 26 2026 → June 2026** — owed under C 26-33; a direct continuation of the C 26-09 export.

Instead of producing any of it, or itemizing a withholding under C.R.S. § 24-72-204(4) as the requests demanded, the Town destroyed the underlying system on June 10 and answered both requests with "no records exist."

---

## Statutory and legal exposure

- **CORA, C.R.S. § 24-72-203 / 204 / 205** — records responsive to a pending request were destroyed rather than produced or lawfully withheld with a stated basis.
- **Colorado records-retention law, C.R.S. § 24-80-101 et seq.** — destruction of public records outside an authorized retention schedule.
- **Common-law spoliation** — destruction of evidence with notice of a request/claim supports an adverse inference and sanctions; here the Board had an **express, on-camera preservation request (May 12)**, the custodian had written notice of the pending request (the June 8 acknowledgment), and a standing written hold — all before the June 10 vote.
- **Prior judicial finding of CORA bad faith** already exists against the Town (the [[bill-brunner|Brunner]] ruling — "failed to exercise reasonable diligence or reasonable inquiry"). This is not a first offense in kind.

*(Framing only — not legal advice. Whether to escalate via CFOIC, a § 24-72-204(5) notice, or district court is Pete's call; the value of this page is the dated, documented record.)*

---

## Documents

All archived under `raw/documents/`:

- **Requests:** `cora-requests/cora-c26-30-verkada-poi-lpoi.pdf`, `cora-requests/cora-c26-33-verkada-audit-log-continuation.pdf`
- **Denials:** `cora-responses/C-26-30-Response.pdf`, `cora-responses/C-26-33-Response.pdf`
- **Proof the records existed:** `cora-requests/c26-09-response/Verkada_Audit Log_REDACTED.xlsx`, `cora-requests/c26-09-response/VERKADA- Audit Logs_REDACTED.xlsx`, and the C 26-09 cover letter (see [[cora-c26-09-verkada-audit-logs]])
- **On-the-record preservation demand (May 12, 2026):** `raw/documents/public-comments/2026-05-12-speech-deck.html` (prepared remarks) and `raw/documents/public-comments/2026-05-12-verkada-termination-public-comment-as-delivered.txt` (as delivered) + the May 12, 2026 meeting video (primary)
- **Standing written preservation demand:** Gmail `19e27f3abd698e8f` (Public Comment Submission 2 of 2, May 14, 2026)

---

## See also

- [[person-of-interest-list-erased]] — the narrative story built on this record
- [[cora-c26-09-verkada-audit-logs]] — the April production that proves the POI/LPOI lists existed
- [[cora-tracking-log]] — full request docket (see Pattern 9: destroy-the-record-then-deny)
- [[pattern-of-cora-obstruction]] — the cross-request obstruction analysis
- [[audit-log-first-viewed-after-cora]] — related Verkada-log timing analysis
- [[surveillance]] — the underlying surveillance issue
- [[samira-vetter]] — Town Clerk and Official Custodian of Records
