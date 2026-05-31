---
title: "CORA C 26-12: M365 Unified Audit Log Response"
type: source
created: 2026-04-24
updated: 2026-05-30
tags: [cora, m365, audit-log, vetter, transparency, obstruction, redactions, cure]
sources: [cora-tracking-log, audit-log-first-viewed-after-cora, reporter-package-email-coverup, cora-c26-12-cure-response, redaction-audit-c26-12-cure, inbox-rules-investigation-closed]
---

# CORA C 26-12: M365 Unified Audit Log Response

> **Status note (updated 2026-05-30):** This page documents the **first C 26-12 production, delivered April 22, 2026**, which the Town later admitted was defective. On **May 27, 2026** the Town issued a cure — it acknowledged four missing exports, delivered roughly 1.13 million un-redacted rows, and removed the blanket `AuditData` redaction. The cure is documented separately at [[cora-c26-12-cure-response]]. The structural problems described below are the record of the original, defective production; they are not the current state. See the "The Cure (May 27, 2026)" section at the bottom.

**Raw files for the original production (under `raw/documents/cora-responses/`):**
- `C 26-12 Response.pdf` — 2-page cover letter
- `Redacted_TownOfPaonia_Audit_Log_Nov2025_v1.xlsx` — 50,000 rows, Nov 1 – Nov 30 2025
- `Redacted_TownOfPaonia_Audit_Log_Dec2025.xlsx` — 50,000 rows, Dec 1 – Dec 31 2025
- `Redacted_TownOfPaonia_Audit_Log_Jan2026.xlsx` — 50,000 rows, Jan 1 – Jan 31 2026
- `Redacted_TownOfPaonia_Audit_Log_Feb2026.xlsx` — 50,000 rows, Feb 1 – Feb 28 2026
- `Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx` — **contains only April 1 – April 9 2026 (identical to the April file)**
- `Redacted_TownOfPaonia_Audit_Log_Apr2026.xlsx` — 50,000 rows, **April 1 – April 9 2026 only (cuts off 13 days before delivery)**

**Type:** CORA response package (first production)
**Request filed:** 2026-04-07
**Received by Clerk:** 2026-04-08
**Standard deadline:** 2026-04-13 (missed)
**Extended deadline:** 2026-04-22
**First production delivered:** 2026-04-22 (used the full extension)
**Cure delivered:** 2026-05-27 — see [[cora-c26-12-cure-response]]
**Custodian:** [[samira-vetter|Samira Vetter]], Town Clerk / Official Custodian of Records
**Requester:** Pete McCarthy
**Fees:** None charged

## What Was Requested

Two items:

1. Complete Microsoft 365 Unified Audit Log export for the Town of Paonia tenant, for **all available dates retained by the system**. Requested as CSV export from the Microsoft Purview compliance portal.
2. The Town's current M365 audit log retention policy, including configured retention period and licensing tier.

## What the Cover Letter Says

- Town uses **Microsoft 365 Business Premium** with **180-day audit retention** (answers item 2).
- Provided audit logs covering "November 2025 through April 2026" (6 monthly Excel files).
- Redactions made under **C.R.S. § 24-72-204(2)(a)(VIII)** — the security-arrangements exemption.
- "Technical audit data fields (including session identifiers, system-generated metadata, and authentication details) have been redacted, as disclosure could expose vulnerabilities in system access controls and monitoring processes."
- "User identifiers not associated with the Town of Paonia domain have been redacted."
- Clerk claims "the records provided reflect the nature and timing of system activity."

## Structural Problems With the First Production (April 22, 2026)

The defects in this section describe the **original April 22, 2026 production**. The Town later acknowledged them and issued a cure on May 27, 2026 (below). They are preserved here because they are the record of how the request was first answered.

### 1. The "March 2026" file is a duplicate of the April 2026 file

Both `Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx` and `Redacted_TownOfPaonia_Audit_Log_Apr2026.xlsx` contain the **exact same 50,000 rows**, spanning **April 1 – April 9, 2026**. Verified by comparing RecordId fingerprints: the first 20 RecordIds are byte-identical between the two files.

Consequence: **actual March 2026 audit log data was not delivered.** March 2026 is the month containing:

- The [[2026-03-30-special-meeting|March 30 special meeting]] about Pete
- Creation and circulation of the board's [[board-letter-2026-03-30|"libelous" letter]]
- The [[mayor-report-agenda-packet|Mayor's report]] materials Pete has challenged
- The period covered by Pete's separate [[cora-libelous-communications|C 26-11 request]]

The month whose email audit log would corroborate or contradict the [[cora-c26-11-libelous-communications-response|C 26-11 communications production]] is the one month that was not delivered.

### 2. Every file is capped at exactly 50,000 rows

All six files contain exactly 50,000 rows of audit data. That number is the legacy UI export cap in Microsoft Purview's in-browser audit search. Programmatic exports via `Search-UnifiedAuditLog` (PowerShell) or the Office 365 Management Activity API have no such cap.

For the months the file actually spans (Nov, Dec, Jan, Feb — 28 to 31 days each), the 50,000-row cap almost certainly truncated the full record:

- **November 2025:** 50,000 rows fit inside 30 days, with a single user ([[samira-vetter|Vetter]]) generating 25,812 events by herself. Events are heavily top-loaded to a few users; the first N events per day fit the cap; later events per day are cut.
- **February 2026:** Same pattern. 17,964 events from Vetter alone.

The request asked for "complete" export, "for all available dates retained by the system." What was produced is **the first 50,000 events from each month**, not the complete month.

A Purview admin with Global Reader or Audit Reader permissions can run a `Search-UnifiedAuditLog -StartDate 2025-11-01 -EndDate 2025-11-30 -ResultSize 5000` with pagination in about 15 minutes of attended time. An API pull through the Management Activity API is scheduled and unattended. The 50K cap is a choice, not a technical limit.

### 3. The AuditData column is 100% redacted

Each file has seven columns:

| Column | Content | Redaction |
|---|---|---|
| CreationDate | Event timestamp | None |
| Operation | Event type (e.g. `MailItemsAccessed`) | None |
| Summary | Clerk-added plain-language description | None (clerk-written) |
| RecordType | Numeric event category | None |
| UserId | Actor's user principal name | Non-Town-domain users redacted |
| RecordId | UUID | None |
| **AuditData** | **Full JSON event payload** | **`[REDACTED]` on every single row** |

`AuditData` is the only column in an M365 unified audit log that contains the *substance* of an event. For a `MailItemsAccessed` event, AuditData contains the client IP, the client application (e.g. Outlook desktop, iPhone Mail, OWA), the session ID, and — most importantly — the `Folders` object listing which folder was accessed and which `InternetMessageIds` (i.e. which specific emails) were read. For a `Send` event, AuditData contains subject lines, recipients, attachments. For `FileAccessed`, AuditData contains the file path and site.

Without AuditData, the produced log answers "which accounts did something" and "at what time," but never "what did they do." A row showing `SamiraV@townofpaonia.com — MailItemsAccessed — 2026-04-06T22:02:51Z` with `AuditData=[REDACTED]` tells the public that the clerk read her mailbox that evening. It says nothing about whether she read Pete's formal complaint, the Board's draft letter, or something routine.

The redaction is applied as a blanket column-wide replace. It is not itemized. It is not a targeted redaction of particular sensitive subjects. The clerk cites C.R.S. § 24-72-204(2)(a)(VIII), which permits withholding "specific details of bona fide research projects" and "particular security arrangements." Colorado records law requires itemized redactions with stated reasons, not categorical redaction of an entire field that contains the substance of every event.

### 4. April 2026 stops at April 9

The April file covers April 1 through April 9, 2026. The request was filed April 7. The clerk's office pulled the data close to the request date and never refreshed before delivery on April 22.

The data from April 10 through April 22 — including the days the clerk's office was actually working on this CORA — **is not in the export**, even though the request explicitly asked for all available retained dates.

### 5. Retention math does not line up with the cover letter

Microsoft 365 Business Premium provides a stated **180-day** unified audit log retention. The response was dated **2026-04-22**. 180 days before April 22 is **October 25, 2025**. A complete export of all dates retained by the system should therefore include data from late October 2025.

The earliest record delivered is from 2025-11-01. **Five to six days of late-October 2025 audit data that should still be within retention was not produced.**

### 6. Format does not match the request

The request asked for CSV from the Purview compliance portal. The response was delivered as Excel `.xlsx` files with a clerk-added "Summary" column. The Summary column is not a Microsoft system field — it is prose written by the Town Clerk (or by someone on her behalf) characterizing what each event means. Summary values like "User accessed mailbox items." for a `MailItemsAccessed` row are clerk editorial, not source data.

## What Was Provided That Is Useful

- **User activity volumes per month.** Who is active, at what scale.
- **Operation type distributions.** `MailItemsAccessed`, `TaskListRead`, `FileAccessed`, `UpdateInboxRules`, `MoveToDeletedItems`, etc.
- **Date ranges** (for the months that were not mislabeled).
- Confirmation of the existence of a `backupadminLefH@townofpaonia.com` account with heavy activity — a previously-undocumented backup admin.

## Retention Policy Disclosure

Confirmed:

- **Licensing tier:** Microsoft 365 Business Premium
- **Audit log retention:** 180 days (standard Business Premium retention, the minimum retention Microsoft sells)

The Town is operating on the shortest retention tier Microsoft offers for unified audit logs. Anything older than 180 days has already aged out. Records from the 2024 Planning Commission period — when Pete originally sought MailItemsAccessed data for the November 12, 2024 meeting and was told the records were "not in custody" — are permanently lost under this retention policy. See [[reporter-package-email-coverup]].

## Significance of the First Production

This is the second M365 unified audit log CORA Pete has filed. The first, in September 2024, was denied outright with a statutory citation CFOIC confirmed was improper. The records were never produced and have now aged out of retention.

The April 22, 2026 production was nominally a fulfillment, but, as delivered:

- The **specific month** whose audit log would corroborate or contradict the [[cora-c26-11-libelous-communications-response|C 26-11 communications response]] was replaced with a duplicate of April.
- The **specific column** containing the substance of every audit event (AuditData) was blanketed out.
- The total volume was **capped at 50,000 rows per month**, a Purview UI artifact, not a complete export.

As first produced, the audit log could not be used to audit anything. The Town later acknowledged these defects and cured them.

## The Cure (May 27, 2026)

On **May 27, 2026** the Town issued a cure to C 26-12. The full record is at [[cora-c26-12-cure-response]]; in summary:

- **Four missing exports admitted.** The Town acknowledged that four exports had been omitted from the April production.
- **Roughly 1.13 million un-redacted rows delivered.** The cure replaced the capped, mislabeled files with ten CSV exports — six monthly files (November 2025 through April 2026) plus four short-window gap-fill/overlap files — totaling about 1,134,799 audit records. This is far less truncated than the 50,000-row-capped original.
- **The `AuditData` column un-redacted.** The blanket `[REDACTED]` on every row was removed. Operation context, user, workload, client application, mailbox owner, folder names, and rule metadata are now readable.
- **Fees waived.**

What the readable records show, and what they do not: with `AuditData` open, the inbox-rule activity attributed to [[stefen-wynn|Stefen Wynn]] could be examined directly. Every populated rule action in the data is a "move sender into folder" operation; there are no delete, external-forward, or redirect actions in any inbox-rule event, and no mailbox exfiltration appears across the 1.13 million records. The large `UpdateInboxRules` bursts are confirmed and, in the uncapped data, larger than previously estimated — but they are overwhelmingly `ModifyMailboxRule` resync events: pre-existing rule IDs re-stamped within seconds from Wynn's own Outlook desktop client. That is the mechanical signature of an Outlook rule-store resync, **not** mail suppression or hidden rules. This activity is benign — see [[inbox-rules-investigation-closed]]. The substance of a modified rule (its name and actions) is absent for those events because Microsoft never records the rule body for a modify/resync operation, not because the Town redacted it.

What the cure did not resolve: it shipped **new over-broad redactions**. The clock time inside the `CreationDate` column was redacted as if it were an IP address, some cmdlet names were partially clipped, and the same identifier categories the Town claims as exempt sit in plaintext in hundreds of thousands of other rows. The redaction is over-broad as a category and inconsistent as applied. Full analysis: [[redaction-audit-c26-12-cure]].

## See Also

- [[cora-c26-12-cure-response]] — the May 27, 2026 cure to this request
- [[redaction-audit-c26-12-cure]] — analysis of the cure's over-broad redactions
- [[inbox-rules-investigation-closed]] — why Wynn's inbox-rule bursts are benign
- [[cora-tracking-log]] — Master CORA tracking
- [[pattern-of-cora-obstruction]] — Analysis across three CORA responses
- [[cora-c26-09-verkada-audit-logs]] — Verkada CORA
- [[cora-c26-11-libelous-communications-response]] — Libelous comms CORA
- [[reporter-package-email-coverup]] — 2024 M365 denial
- [[audit-log-first-viewed-after-cora]] — Related analysis
- [[samira-vetter]]
