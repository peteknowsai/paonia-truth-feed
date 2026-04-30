---
title: Pattern of CORA Obstruction
type: analysis
created: 2026-04-24
updated: 2026-04-24
tags: [cora, transparency, obstruction, redaction, withholding, vetter, wynn, audit-log]
sources: [cora-c26-09-verkada-audit-logs, cora-c26-11-libelous-communications-response, cora-c26-12-m365-audit-logs-response, cora-tracking-log, reporter-package-email-coverup]
---

# Pattern of CORA Obstruction

Three CORA requests filed between March 23 and April 8, 2026 have all been nominally fulfilled by the Town Clerk. Looking at what was produced — and especially at what was *not* produced — the three responses are a consistent pattern of obstruction. Not one-off mistakes. A method.

This page documents the pattern across the three responses, plus the 2024 M365 denial that CFOIC confirmed was improper and that the Town has never remedied.

## The Four Tactics

### Tactic 1 — Redact the column that contains the substance

When Colorado records law requires production, the Town produces the file. But the column of the file that tells a reader *what actually happened* is redacted under a broad security-arrangements citation.

**In C 26-09 (Verkada cameras):** user IDs, IP addresses, device IDs, device serial numbers, organizational IDs, and MAC addresses are redacted across the board. User names, email addresses, timestamps, event types, and camera labels are not. The redactions cluster around fields that would let a reader correlate events across systems (e.g., who logged in from where, from what device). See [[cora-c26-09-verkada-audit-logs]].

**In C 26-12 (M365 audit logs):** the `AuditData` column is redacted on every single one of the ~300,000 rows produced. AuditData is the only column in a unified audit log that contains event substance — email subject lines, recipients, accessed item IDs, client IP, client app. Without AuditData, a `MailItemsAccessed` event reports only that a user opened their mailbox at a timestamp; it does not report which messages they read. The redaction is column-wide and categorical, not itemized. See [[cora-c26-12-m365-audit-logs-response]].

The legal basis asserted each time is a narrow exemption: C.R.S. § 24-72-204(2)(a)(VIII) for the Verkada and M365 responses; § 24-72-204(2)(a) generally. The exemption is for "specific details" that "would compromise security." The Town applies it as "entire-column" redaction.

### Tactic 2 — Withhold the responsive records and claim they do not exist

**In C 26-11 (libelous communications):** the request asked for all communications between the Mayor, Wynn, Buchner, and any Trustee regarding Pete or the flyer during the six days leading up to and including the Board's March 30 special meeting. The response produced **four emails**, two of which Pete sent himself or received individually:

1. Pete's own complaint (3/30, 3:29 PM)
2. Paige's forward of Pete's complaint to Wynn (3/30, 3:37 PM)
3. Lucy Hunter's 3/26 email telling Paige about her flyer
4. Lucy Hunter's 3/30 6:04 PM reply to Pete

That is the entire production of a six-day window during which the Board:

- Scheduled a special meeting about a named citizen (which requires at least 24-hour notice under [C.R.S. § 24-6-402](https://leg.colorado.gov/); so *somebody* called the meeting, posted notice, drafted the agenda)
- Convened on March 30 and discussed the Mayor's report in open session
- Produced a signed board letter published to the town website and civicclerk portal — a document produced collectively by seven officials
- Revised that letter overnight to remove the word "libelous" by March 31 — revisions that implied drafting, review, and consensus

The only way the production is complete is if seven elected officials orchestrated a special meeting and a group letter, revised overnight, **without a single trustee-to-trustee email, text, or Teams message**. That is not credible. Either the communications exist and were withheld, or they occurred on channels (personal email, phone, in-person) that the Board routinely uses for Town business in deliberate avoidance of records law.

See [[cora-c26-11-libelous-communications-response]] for the complete production. See [[2026-03-30-special-meeting]] for the meeting it should have documented.

### Tactic 3 — Deliver the wrong file

**In C 26-12 (M365 audit logs):** the six monthly audit log files produced include a file labeled `Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx`. The file does not contain March 2026 data. It contains April 1 – April 9 2026 data — identical, byte-for-byte in the first 20 RecordIds, to the separately-delivered April 2026 file.

March 2026 is the month containing:

- The [[2026-03-30-special-meeting|special meeting]] about Pete
- Creation, circulation, and revision of the [[board-letter-2026-03-30|Board's March 30 letter]]
- The [[mayor-report-agenda-packet|Mayor's report materials]] Pete has challenged
- All the activity that would corroborate or contradict the [[cora-c26-11-libelous-communications-response|C 26-11 communications response]]

Replacing it with a duplicate of the April file is not a plausible clerical error in isolation: the files are named with clear month labels; a person responsible for preparing the export would have checked that the correct month was in the correct file. The one month whose data most directly tests the accuracy of the Town's other CORA response was replaced with a duplicate of a different month.

### Tactic 4 — Cap the volume at the UI export limit

**In C 26-12:** every monthly file is capped at exactly **50,000 rows**. That is the legacy Microsoft Purview in-browser UI export cap. Programmatic access via PowerShell `Search-UnifiedAuditLog` or the Microsoft Management Activity API has no such cap.

A full month of a Town M365 tenant with 70+ active accounts generates more than 50,000 events. The November 2025 file has a single user account ([[samira-vetter|Vetter]]) generating 25,812 events by itself. The 50,000-row per-month files are the first 50,000 events the Purview UI would produce for that date range, not a complete month.

The request explicitly asked for "complete" export "for all available dates retained by the system." The Town produced a capped export and called it complete. A retention policy of 180 days is also the Microsoft Business Premium *minimum* — the Town is on the shortest retention tier Microsoft sells. Audit evidence for any dispute older than six months is already gone by system design.

## The Cross-CORA Contradiction

The tactics compound across requests.

Pete's C 26-11 sought the emails and drafts around the March 30 special meeting. The Town produced four emails and no drafts. C 26-11's production is therefore not externally verifiable without something else to cross-check it.

The cross-check exists: the M365 unified audit log for March 2026 would independently record every email sent or received by every board member during the six-day window in C 26-11. A person examining the March audit log could see events like `Send` from `PaigeS@townofpaonia.com` to `StefenW@townofpaonia.com` at a given time, with AuditData containing the recipients and subject line. That record would corroborate or contradict the four emails produced in C 26-11.

**The March 2026 file in C 26-12 is the one that was replaced with a duplicate of April.** The only month whose audit log would validate the C 26-11 production is the one month whose audit log was not produced. Even if it had been produced, the AuditData column (subject lines, recipients) would have been fully redacted.

## The Extension Pattern

Both recent CORAs followed an identical timing pattern:

| Request | Filed | Acknowledged | Standard Deadline | Extension Taken | Extended Deadline | Fulfilled |
|---|---|---|---|---|---|---|
| C 26-11 | 4/6 | 4/7 | **4/10 (Fri)** | By 4/10 | **4/22 (Wed)** | 4/21 |
| C 26-12 | 4/7 | 4/8 | **4/13 (Mon)** | By 4/13 | **4/22 (Wed)** | 4/22 |

The 7-day "extenuating circumstances" extension under C.R.S. § 24-72-203 is supposed to be invoked only when unusual conditions prevent production within the standard 3-day window. The clerk's office takes the maximum extension routinely. The Caselle ERP user access report — a single report any IT admin can produce in 30 minutes — also received a maximum extension in early April. See [[cora-tracking-log]].

## The 2024 Precedent

In September 2024 Pete filed a CORA for the M365 unified audit log (admin activity, May through July 2024). [[samira-vetter|Vetter]] denied citing C.R.S. § 24-72-203(2)(a) — "not in custody." On November 25, 2024, the Executive Director of the Colorado Freedom of Information Coalition wrote a four-page memo confirming the denial was improper: § 203(2)(a) is a notification requirement, not a basis for denial; the licensee of M365 is the custodian; *Leonard v. Interquest* is controlling. The Town never produced the records. The events are now permanently lost because they aged out of the 180-day retention window.

When Pete filed the same category of request again in April 2026 (C 26-12), the Town did not deny. It produced the narrow-column, capped, and mislabeled file described above. The method changed. The outcome did not.

## The Brunner Precedent

In a separate matter, Judge Steven Schultz of the Delta County District Court found the Town "failed to exercise reasonable diligence or reasonable inquiry" in responding to a CORA filed by [[bill-brunner|Bill Brunner]] and ordered the Town to pay Brunner's legal costs. That is a judicial finding of CORA bad faith entered in the record against the Town.

[[samira-vetter|Vetter]] remains the Official Custodian of Records. The Town's CORA practices have not changed since the Brunner ruling.

## Combined Effect

For a citizen trying to confirm or challenge what happened around the Board's March 30 action, the three CORA responses together produce the following effective outcome:

1. **What happened between Town officials** (emails, texts, Teams messages) is missing from C 26-11 and would be reconstructible only from the M365 audit log.
2. **The M365 audit log for that month** is replaced with a duplicate of a different month.
3. **The M365 audit log for other months** has the subject-line/recipient column fully redacted and is capped at the UI limit.
4. **Attorney input on the "libelous" framing** is withheld as privileged, with no privilege log.
5. **Previously-denied records** from the 2024 M365 request have aged out of retention under the minimum retention tier.

None of those outcomes is a single act of bad faith. Together they form a system. The purpose of CORA is to let a citizen verify the official record of what their government did. Each of these tactics removes a specific pillar of verifiability. In combination, they leave a record that cannot be audited.

## Recommendations

### For the requester

1. **File a CFOIC complaint** documenting the C 26-12 mislabeled-March file and the C 26-11 production gap. CFOIC wrote a memo the last time; they will write another.
2. **Demand a privilege log** for every Buchner record withheld under attorney-client privilege in C 26-11. CORA requires identification of each withheld record.
3. **Refile a targeted M365 CORA** specifically asking for:
   - All `Send` and `SendAs` events from the eight named official accounts between March 25 and March 30 2026, including AuditData.
   - A CSV export produced via `Search-UnifiedAuditLog -ResultSize 5000` pagination, not a Purview UI export.
   - A written explanation of which specific AuditData fields the Town asserts are exempt under § 204(2)(a)(VIII) and why the exemption applies to each field as opposed to the whole column.
4. **Send a C.R.S. § 24-72-204(5) 14-day pre-suit notice** on C 26-11 and C 26-12 identifying the specific production failures. That is the statutory predicate for a district-court CORA action with fee-shifting in favor of the prevailing requester.

### For the Board

None of this requires the Town Clerk to act alone. The Board has the authority and obligation to instruct the Town Administrator and the Clerk to comply with records law. The Board has not done so. That inaction is itself subject to CORA and to electoral accountability.

## See Also

- [[cora-tracking-log]]
- [[cora-c26-09-verkada-audit-logs]]
- [[cora-c26-11-libelous-communications-response]]
- [[cora-c26-12-m365-audit-logs-response]]
- [[reporter-package-email-coverup]] — The 2024 denial
- [[audit-log-first-viewed-after-cora]] — Pattern of logs first reviewed only in response to CORA
- [[public-records-access]] — Issue page
- [[samira-vetter]] — Custodian
- [[stefen-wynn]] — Town Administrator (subject of many of the withheld records)
- [[bill-brunner]] — Subject of prior CORA bad-faith judicial finding
