---
title: Pattern of CORA Obstruction
type: analysis
created: 2026-04-24
updated: 2026-05-30
tags: [cora, transparency, obstruction, redaction, withholding, vetter, wynn, audit-log]
sources: [cora-c26-09-verkada-audit-logs, cora-c26-11-libelous-communications-response, cora-c26-12-m365-audit-logs-response, cora-c26-12-cure-response, redaction-audit-c26-12-cure, cora-c26-23-finance-committee-records, cora-tracking-log, reporter-package-email-coverup]
---

# Pattern of CORA Obstruction

Across CORA requests filed from March through May 2026, the Town Clerk's office produced a consistent set of responses that, taken together, narrow the record a citizen can actually verify. Looking at what was produced — and especially at what was *not* produced — the responses form a recurring method, not a sequence of one-off mistakes.

This page documents the pattern across those responses, plus the 2024 M365 denial that CFOIC confirmed was improper and that the Town has never remedied.

**Status note (2026-05-30):** This analysis was first written from the *original* C 26-12 production. That production was later cured (cure cover letter dated May 27; data retrieved and analyzed May 29). Sections describing the original C 26-12 export are now stated in the past tense as the **first** production; the cure is described separately below. The cure narrowed the redactions but did not retire the pattern — it added an admission of four missing exports and a new, inconsistent redaction layer. See [[cora-c26-12-cure-response]] and [[redaction-audit-c26-12-cure]].

## The Four Tactics

### Tactic 1 — Redact the column that contains the substance

When Colorado records law requires production, the Town produces the file. But the column of the file that tells a reader *what actually happened* is redacted under a broad security-arrangements citation.

**In C 26-09 (Verkada cameras):** user IDs, IP addresses, device IDs, device serial numbers, organizational IDs, and MAC addresses are redacted across the board. User names, email addresses, timestamps, event types, and camera labels are not. The redactions cluster around fields that would let a reader correlate events across systems (e.g., who logged in from where, from what device). See [[cora-c26-09-verkada-audit-logs]].

**In C 26-12 (M365 audit logs), first production:** the `AuditData` column was redacted on every row of the original export. AuditData is the only column in a unified audit log that contains event substance — email subject lines, recipients, accessed item IDs, client IP, client app. Without AuditData, a `MailItemsAccessed` event reports only that a user opened their mailbox at a timestamp; it does not report which messages they read. The redaction was column-wide and categorical, not itemized. The May 27 cure later un-redacted AuditData — replacing the column-wide blackout with an over-broad, inconsistent identifier redaction described below. See [[cora-c26-12-m365-audit-logs-response]], [[cora-c26-12-cure-response]], and [[redaction-audit-c26-12-cure]].

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

**In C 26-12 (M365 audit logs), first production:** the six monthly audit log files produced included a file labeled `Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx`. That file did not contain March 2026 data. It contained April 1 – April 9 2026 data — identical, byte-for-byte in the first 20 RecordIds, to the separately-delivered April 2026 file. The May 27 cure delivered a corrected standalone March log and admitted that the IT vendor had "inadvertently downloaded one incorrectly" — and that four monthly exports in total were missing from the first production. See [[cora-c26-12-cure-response]].

March 2026 is the month containing:

- The [[2026-03-30-special-meeting|special meeting]] about Pete
- Creation, circulation, and revision of the [[board-letter-2026-03-30|Board's March 30 letter]]
- The [[mayor-report-agenda-packet|Mayor's report materials]] Pete has challenged
- All the activity that would corroborate or contradict the [[cora-c26-11-libelous-communications-response|C 26-11 communications response]]

Replacing it with a duplicate of the April file was not a plausible clerical error in isolation: the files were named with clear month labels; a person responsible for preparing the export would have checked that the correct month was in the correct file. The one month whose data most directly tests the accuracy of the Town's other CORA response was, in the first production, replaced with a duplicate of a different month. The cure produced the true March log, so the record is no longer missing — but the first production stood for over a month, and the gap was corrected only after Pete objected.

### Tactic 4 — Cap the volume at the UI export limit

**In C 26-12, first production:** every monthly file was capped at exactly **50,000 rows**. That is the legacy Microsoft Purview in-browser UI export cap. Programmatic access via PowerShell `Search-UnifiedAuditLog` or the Microsoft Management Activity API has no such cap.

A full month of a Town M365 tenant with 70+ active accounts generates more than 50,000 events. The 50,000-row per-month files were the first 50,000 events the Purview UI would produce for that date range, not a complete month.

The request explicitly asked for "complete" export "for all available dates retained by the system." The Town produced a capped export and called it complete. The May 27 cure replaced the capped files with ten un-capped CSV exports totaling 1,134,799 rows — confirming the first production was truncated. A retention policy of 180 days is also the Microsoft Business Premium *minimum* — the Town is on the shortest retention tier Microsoft sells. Audit evidence for any dispute older than six months is already gone by system design.

## The Cross-CORA Contradiction

The tactics compound across requests.

Pete's C 26-11 sought the emails and drafts around the March 30 special meeting. The Town produced four emails and no drafts. C 26-11's production is therefore not externally verifiable without something else to cross-check it.

The cross-check exists: the M365 unified audit log for March 2026 would independently record every email sent or received by every board member during the six-day window in C 26-11. A person examining the March audit log could see events like `Send` from `PaigeS@townofpaonia.com` to `StefenW@townofpaonia.com` at a given time, with AuditData containing the recipients and subject line. That record would corroborate or contradict the four emails produced in C 26-11.

**The March 2026 file in C 26-12 was, in the first production, the one replaced with a duplicate of April.** The only month whose audit log would validate the C 26-11 production was the one month whose audit log was not produced — and even had it been produced, the AuditData column (subject lines, recipients) was fully redacted at that time. The May 27 cure resolved both: it delivered the true March log with AuditData un-redacted. The recovered March subject lines are now what several follow-up requests are built from (see [[cora-tracking-log]]). That the verifying record was withheld on first pass, and surfaced only under objection, is the point — not that it was permanently lost.

## The C 26-12 Cure — Admission, Then a New Redaction Problem

The May 27 cure is the clearest single illustration of the pattern, because it is the Town's own correction of its own first production. The cure cover letter admits that **four** monthly audit-log exports were missing from the original C 26-12 production due to a repeated vendor export error, delivers a corrected standalone March log, lifts the 50,000-row cap (ten un-capped CSVs, 1,134,799 rows), and un-redacts the AuditData column down to what the Town characterizes as technical identifiers. Fees were waived. See [[cora-c26-12-cure-response]].

So far this reads as a remedy. The problem is what the new redactions did when examined row by row. A line-by-line audit of all 1,134,799 rows found the cure's redactions are **over-broad as a category and inconsistent as applied** (full method and figures: [[redaction-audit-c26-12-cure]]):

- The Town withheld values under C.R.S. § 24-72-204(2)(a)(VIII) ("specialized details of security arrangements") while preserving the email subjects, sender and recipient identities, file names, folder paths, and timestamps those values index. If the subject line of an official's email is producible, the opaque GUID that points to that same message is hard to characterize as a security arrangement.
- The same categories the Town treated as exempt appear un-redacted elsewhere in the data. Identifiers, internal IP addresses, and user email addresses were masked in some rows and left in plaintext in others — the signature of mechanical find-and-replace across multiple inconsistent passes, not a considered field-level legal review. User email addresses survived in plaintext in roughly 99% of rows and were redacted in under 1% — no coherent theory makes the same field a security secret 1% of the time.
- Some redactions are recoverable from a sibling field in the same row. The cure redacted the clock time inside the `CreationDate` column (a regex apparently mistook the time for an IP address), but the precise ISO timestamp survives inside the AuditData JSON of the same row, so the time is fully recoverable.
- The cure provided **no itemized per-redaction log** under C.R.S. § 24-72-204(4) — no record-by-record identification of what was withheld, under which subsection, and why.

A defensible core exists: live session and bearer-token material is a legitimate fit for the exemption. But that is a minority of the redaction weight. The legality of the rest is now the live question. The point for this page is structural: the first production was column-wide blackout; the cure replaced it with a narrower but still over-broad and inconsistent redaction, applied without the itemized log the statute contemplates. The volume of what is withheld went down; the rigor did not arrive.

A separate guardrail belongs here, because the cured data tested a darker reading and did not support it. The cure was partly sought to expose the substance of [[stefen-wynn|Wynn]]'s thousands of `UpdateInboxRules` audit events. The cured logs show those bursts are overwhelmingly `ModifyMailboxRule` events — for which Microsoft logs no rule body at all (the blank rule definitions are native M365 behavior, not Town redaction). The rule bodies that *are* logged are benign move-to-folder rules, and every forwarding target across all ten files is an internal `@townofpaonia.com` address. There is no evidence of mail suppression, hidden inbox rules, or external exfiltration in the 1.13M records. The inbox-rules anomaly is best explained as Wynn's own desktop Outlook bulk-resyncing a large pre-existing rule store. This page does not assert otherwise, and neither does the redaction audit.

## C 26-17 — Deny as Non-Existent, Cite Nothing

C 26-17 (filed April 23) sought, in Item 2, the Caselle Connect Management Tracking Report — the ERP system's own security audit log of changes to user rights, users, and group rights. The Town's May 11 response denied Item 2 in a single sentence: the feature "is not used and therefore the record does not exist."

A "record does not exist" answer can be legitimate. The defect is what is missing around it. The denial carried no statutory withholding statement under C.R.S. § 24-72-204(3), and no independent way to verify the assertion that a standard ERP module is in fact disabled. Item 1 of the same request (permission-change communications) was answered with two emails dated July and August 2024 — both *predating* the October 1, 2024 start of the scope window the request specified — with no document from inside the requested window produced. See [[cora-tracking-log]] for the full entry and the segregation-of-duties context the produced August 5 email revealed.

## C 26-23 — Redirect to an Adjacent Record, Then Close

C 26-23 (received May 20) sought all Finance Committee records for January 2024 through May 2026 — minutes, agendas, sign-in sheets, and any log, journal, or tracking spreadsheet the Committee maintains — and expressly invoked C.R.S. § 24-72-204(3), asking for a written non-existence confirmation if records did not exist.

The May 26 response redirected Pete to the Board meeting packets on the Town website — specifically the initialed Payment Approval Reports filed under "Disbursements" — and declared the request closed. No minutes, agendas, sign-in sheets, or logs were produced. No § 204(3) non-existence certification was issued for the categories that produced nothing. A Payment Approval Report is an accounting-system output; it is not a meeting minute, agenda, sign-in sheet, or deliberative log. Treating it as responsive to a request for *meeting* records, and closing on that basis, addresses one record type while leaving five enumerated categories neither produced nor certified as non-existent.

The custodian's on-record position made the dodge explicit: the Town declined to certify non-existence on the ground that it had "provided you with a way to access the records that were responsive" — treating the existence of one record type as discharging a request for a different one. That is a redirect-and-close, not a production. See [[cora-c26-23-finance-committee-records]].

## An Adjacent Failure — Who They Said the Flyer Was About

A separate transparency problem sits alongside these CORA responses. In its public March 30 letter the Board described the flyer at issue without naming its author, while the Town's internal records — recovered in the C 26-12 cure subject lines and elsewhere — show officials had identified Pete by name internally. The public framing and the internal record do not match. That contradiction is documented at [[they-knew-it-was-mccarthy]] and is relevant here only as context: the same custodial process that controlled what the CORA productions disclosed also controlled what the public letter disclosed.

## The Extension Pattern

Both recent CORAs followed an identical timing pattern:

| Request | Filed | Acknowledged | Standard Deadline | Extension Taken | Extended Deadline | Fulfilled |
|---|---|---|---|---|---|---|
| C 26-11 | 4/6 | 4/7 | **4/10 (Fri)** | By 4/10 | **4/22 (Wed)** | 4/21 |
| C 26-12 | 4/7 | 4/8 | **4/13 (Mon)** | By 4/13 | **4/22 (Wed)** | 4/22 |

The 7-day "extenuating circumstances" extension under C.R.S. § 24-72-203 is supposed to be invoked only when unusual conditions prevent production within the standard 3-day window. The clerk's office takes the maximum extension routinely. The Caselle ERP user access report — a single report any IT admin can produce in 30 minutes — also received a maximum extension in early April. See [[cora-tracking-log]].

## The 2024 Precedent

In September 2024 Pete filed a CORA for the M365 unified audit log (admin activity, May through July 2024). [[samira-vetter|Vetter]] denied citing C.R.S. § 24-72-203(2)(a) — "not in custody." On November 25, 2024, the Executive Director of the Colorado Freedom of Information Coalition wrote a four-page memo confirming the denial was improper: § 203(2)(a) is a notification requirement, not a basis for denial; the licensee of M365 is the custodian; *Leonard v. Interquest* is controlling. The Town never produced the records. The events are now permanently lost because they aged out of the 180-day retention window.

When Pete filed the same category of request again in April 2026 (C 26-12), the Town did not deny. It produced the narrow-column, capped, and mislabeled file described above; only after a supplemental objection did it issue the May 27 cure. The method changed. The friction did not.

## The Brunner Precedent

In a separate matter, Judge Steven Schultz of the Delta County District Court found the Town "failed to exercise reasonable diligence or reasonable inquiry" in responding to a CORA filed by [[bill-brunner|Bill Brunner]] and ordered the Town to pay Brunner's legal costs. That is a judicial finding of CORA bad faith entered in the record against the Town.

[[samira-vetter|Vetter]] remains the Official Custodian of Records. The Town's CORA practices have not changed since the Brunner ruling.

## Combined Effect

For a citizen trying to confirm or challenge what happened around the Board's March 30 action, the CORA responses on first pass produced the following effective outcome:

1. **What happened between Town officials** (emails, texts, Teams messages) was missing from C 26-11 and reconstructible only from the M365 audit log.
2. **The M365 audit log for that month** was, on first production, replaced with a duplicate of a different month — corrected only in the May 27 cure.
3. **The M365 audit log for other months** had the subject-line/recipient column fully redacted and was capped at the UI limit — un-capped and un-redacted only in the cure, which then introduced its own over-broad and inconsistent identifier redaction.
4. **Attorney input on the "libelous" framing** was withheld as privileged, with no privilege log.
5. **Previously-denied records** from the 2024 M365 request have aged out of retention under the minimum retention tier and are permanently lost.

None of those outcomes is a single act of bad faith. Together they form a system. The cure shows the system is responsive to pressure — the right objection, properly framed, moved the Town from blackout to a 1.13M-row production. But every step of that arc required the requester to push, and the cure carried its own redaction defects and no § 204(4) log. The purpose of CORA is to let a citizen verify the official record of what their government did without having to litigate each pillar of verifiability into place one at a time.

## Recommendations

### For the requester

1. **File a CFOIC complaint** documenting the original C 26-12 mislabeled-March file, the C 26-11 production gap, the C 26-17 "feature not used" denial with no statutory statement, and the C 26-23 redirect-and-close with no § 204(3) certification. CFOIC wrote a memo the last time; they will write another.
2. **Demand a privilege log** for every Buchner record withheld under attorney-client privilege in C 26-11. CORA requires identification of each withheld record.
3. **Demand an itemized § 24-72-204(4) redaction log for the C 26-12 cure.** The cure un-redacted AuditData but withheld a large body of identifiers, internal IPs, and file paths under § 204(2)(a)(VIII) with no record-by-record justification — and left the same categories in plaintext elsewhere. The audit in [[redaction-audit-c26-12-cure]] is the factual basis for a § 204(4) grounds-for-denial demand. Concede the live token/session material; contest the rest.
4. **Press the C 26-23 and C 26-17 defects in writing.** For C 26-23, box each missing category into produce / cite an exemption / certify non-existence under § 204(3). For C 26-17, demand a statutory basis for the Item 2 denial or production of the Management Tracking Report.
5. **Send a C.R.S. § 24-72-204(5) 14-day pre-suit notice** on the requests where production or certification is still deficient. That is the statutory predicate for a district-court CORA action with fee-shifting in favor of the prevailing requester.

### For the Board

None of this requires the Town Clerk to act alone. The Board has the authority and obligation to instruct the Town Administrator and the Clerk to comply with records law. The Board has not done so. That inaction is itself subject to CORA and to electoral accountability.

## See Also

- [[cora-tracking-log]]
- [[cora-c26-09-verkada-audit-logs]]
- [[cora-c26-11-libelous-communications-response]]
- [[cora-c26-12-m365-audit-logs-response]]
- [[cora-c26-12-cure-response]] — The May 27 cure
- [[redaction-audit-c26-12-cure]] — Row-by-row audit of the cure's redactions
- [[cora-c26-23-finance-committee-records]] — The redirect-and-close response
- [[inbox-rules-investigation-closed]] — Why the inbox-rules bursts are benign
- [[they-knew-it-was-mccarthy]] — Naming contradiction in the public letter
- [[reporter-package-email-coverup]] — The 2024 denial
- [[audit-log-first-viewed-after-cora]] — Pattern of logs first reviewed only in response to CORA
- [[public-records-access]] — Issue page
- [[samira-vetter]] — Custodian
- [[stefen-wynn]] — Town Administrator (subject of many of the withheld records)
- [[bill-brunner]] — Subject of prior CORA bad-faith judicial finding
