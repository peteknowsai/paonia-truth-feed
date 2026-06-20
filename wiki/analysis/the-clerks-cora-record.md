---
title: "The Clerk's CORA Record"
type: analysis
created: 2026-06-20
updated: 2026-06-20
tags: [cora, transparency, vetter, records-requests, scorecard, accountability]
sources: [pattern-of-cora-obstruction, cora-tracking-log, cora-c26-09-verkada-audit-logs, cora-c26-11-libelous-communications-response, cora-c26-12-m365-audit-logs-response, cora-c26-12-cure-response, cora-c26-17-caselle-permissions-audit-log, cora-c26-21-wynn-eml-native-files, cora-c26-23-finance-committee-records, cora-c26-30-verkada-poi-denial, samira-vetter]
---

# The Clerk's CORA Record

This page is a request-by-request ledger of records requests to the Town of Paonia where the response had a defect that can be verified from the documents alone. The companion page [[pattern-of-cora-obstruction]] groups these by method; this page counts them, one request at a time.

**The standard for inclusion.** Every entry below is established by the record itself: what was requested, what the response produced, and where the Town's own documents (its audit logs, its later productions, its own letters) show that responsive material existed or that a required step was skipped. This page does not characterize anyone's intent or state of mind. It records what each production did and did not contain, and what the controlling statute requires. Where an outside authority has already made a finding, that finding is cited as the authority's own words, not as a conclusion of this page.

Samira Vetter is the Town's Official Custodian of Records; see [[samira-vetter]].

## The scorecard

| # | Request (filed → answered) | What the record shows | At issue | Source |
|---|---|---|---|---|
| 1 | **M365 audit log** (Sep 2024 → denied) | Denied as "not in custody" under § 24-72-203(2)(a). CFOIC's Executive Director wrote a memo (Nov 25 2024) stating that subsection is a notification requirement, not a basis for denial, and that the M365 licensee is the custodian. Never produced; the events later aged out of the 180-day retention window. | Denial on a basis an outside authority found improper; records now permanently gone | [[reporter-package-email-coverup]] |
| 2 | **C 26-09** Verkada audit logs (2026-03-23 → 2026-04-08) | Produced, but a band of identifier columns was redacted under § 24-72-204(2)(a)(VIII) while user names, email addresses, timestamps, and camera labels were left visible. The requested written Verkada-use policy was not produced (none exists). | Redaction rationale inconsistent with the redactions applied | [[cora-c26-09-verkada-audit-logs]] |
| 3 | **C 26-11** flyer / "libelous" communications (2026-04-06 → certified complete 2026-04-21) | Six-day window covering a special meeting and a collectively-drafted, overnight-revised Board letter produced **four emails**, two of them Pete's own. No drafts. Attorney advice withheld with no privilege log. The Town's own C 26-12 audit log names draft threads in that window (e.g. "Response to the Citizen's 10 things flyer"). Those drafts were later produced under C 26-29 (see #8). | Incomplete production; no privilege log under § 24-72-204(3) | [[cora-c26-11-libelous-communications-response]] |
| 4 | **C 26-12** M365 audit logs, first production (2026-04-07 → 2026-04-22; cured 2026-05-27) | First production: the `AuditData` column (subjects, recipients) redacted on every row; the file labeled "March 2026" held April 1–9 data byte-identical to the April file; every monthly file capped at exactly 50,000 rows. The cure admitted four monthly exports were missing, delivered the true March log, lifted the cap (1,134,799 rows), and un-redacted AuditData — then applied a new identifier redaction inconsistently, with no itemized § 24-72-204(4) log. | Wrong file, column-wide redaction, capped export; corrected only after objection | [[cora-c26-12-m365-audit-logs-response]] · [[cora-c26-12-cure-response]] |
| 5 | **C 26-17** Caselle permissions (2026-04-23 → 2026-05-11) | Item 2 (the Management Tracking Report) denied in one sentence — "feature is not used and therefore the record does not exist" — with no § 24-72-204(3) statement and no way to verify it. Item 1 was answered with two emails dated July/August 2024, outside the request's October-2024-forward window. | Non-existence denial with no § 204(3) certification; out-of-window production | [[cora-c26-17-caselle-permissions-audit-log]] |
| 6 | **C 26-21** Wynn Nov-4-2024 emails (2026-05-20) | Of the four inbound emails requested, two were answered with different emails than the ones requested; the request was closed as fulfilled. | Wrong records substituted, then closed as fulfilled | [[cora-c26-21-wynn-eml-native-files]] |
| 7 | **C 26-23** Finance Committee records (2026-05-20 → 2026-05-26) | Request for minutes, agendas, sign-in sheets, and logs (Jan 2024–May 2026), expressly invoking § 24-72-204(3), was redirected to the Board packets' Payment Approval Reports and closed. No minutes, agendas, sign-in sheets, or logs produced; no § 204(3) non-existence certification for the categories that produced nothing. | Redirect-and-close; no § 204(3) certification | [[cora-c26-23-finance-committee-records]] |
| 8 | **C 26-29** records behind the March 30 letter — the flyer re-request (2026-06-01 → 2026-06-19) | The extension letter was emailed June 10, the day after the June 9 deadline; the production landed June 19, the day after the extended June 18 deadline. Substantively, it produced the response-letter and Mayor's-report drafts that C 26-11 had not — establishing that those records existed and were producible at the time of C 26-11. | Late notice and late production; cures and thereby confirms the C 26-11 gap | [[cora-c26-29-march30-letter-drafts]] |
| 9 | **C 26-30** Verkada person-of-interest / license-plate lists (2026-06-04 → denied 2026-06-11) | Filed Thursday June 4 but stamped received the following Monday June 8 (the next business day was Friday June 5), which set the deadline at June 11 — against the Town's recent habit of acknowledging within about one business day. The Board erased all Verkada data June 10, while the request was pending; the Town then certified "no data exists to be searched" — even though its own C 26-09 production (billed at $167.90) recorded the person-of-interest list (`IDENTITY_PEOPLE_LIST_BULK_GET`) and license-plate list (`LPOI_LIST`). A one-business-day acknowledgment, as on its other recent requests, would have set the deadline on June 10, the day of the erasure. Pete had asked the Board on camera May 12 to preserve the data pending an audit. | Late acknowledgment against its recent norm; responsive records destroyed while the request was pending; non-existence certified afterward | [[cora-c26-30-verkada-poi-denial]] · [[person-of-interest-list-erased]] |
| 10 | **C 26-33** Verkada audit-log continuation (2026-06-08 → denied 2026-06-12) | Acknowledged 8:00 AM June 12, denied 11:36 PM the same day, on the same June-10 erasure: "no data exists." | Same destruction-while-pending as #9 | [[cora-c26-30-verkada-poi-denial]] |

## By the numbers

Across these requests, the records show:

- **1** denial an outside authority (CFOIC) put in writing as improper — never cured; the records aged out and are gone (#1).
- **2** productions that delivered the wrong records — a different month's audit log (#4) and the wrong emails (#6).
- **1** production capped at the software export limit and called "complete" (#4).
- **2** responses that redacted or withheld substance with no itemized § 24-72-204(4) log (#2 first-pass and #4 cure).
- **2** "the record does not exist" / redirect responses with no § 24-72-204(3) certification (#5, #7).
- **1** production missing the drafts that the Town later produced under a re-request, with no privilege log (#3 → #8).
- **2** requests answered after the destruction of the very records sought, while those requests were pending (#9, #10).
- **0** stated reasons, on the record, for the withholdings later reversed (#3, the "no flyer emails" representation), or for the four-day acknowledgment on #9 — see below.
- **Every** routine request that drew the maximum 7-day "extenuating circumstances" extension under § 24-72-203, including a single-report ERP export (see [[pattern-of-cora-obstruction]]).

## The two that need no inference

Two entries are provable end-to-end from the Town's own documents, with nothing left to interpretation:

**The flyer drafts (C 26-11 → C 26-29).** In April the Town produced four emails and no drafts, and certified the production complete. In June, under a re-request, it produced the drafts — the same March-30-letter and Mayor's-report drafts, with no exemption ever cited for leaving them out the first time. The records existed (the Town's audit log names them), they were producible (the Town produced them), and the first production did not produce them, log them as withheld, or certify them non-existent.

**The erased Verkada lists (C 26-30 / C 26-33).** The Town produced and billed for the audit log that records the person-of-interest and license-plate lists. It was then asked for those lists. On its other recent requests the Town had been acknowledging within about one business day; C 26-30, filed Thursday June 4, was stamped received the following Monday June 8 (the next business day was Friday June 5), which set the response deadline at June 11. The data was erased June 10. A one-business-day acknowledgment, as on the other requests, would have set the deadline on June 10, the day of the erasure; the later stamp placed it the day after. The data was erased while the requests were live, and the Town certified that no responsive data exists. The existence of the records, the acknowledgment timing, the date of the erasure, the pendency of the requests, and the non-existence certification are each a dated document; none requires reading anyone's mind.

## A related representation

On June 18, 2026, the Police Department, producing the "No Kings Rally" emails it had obtained from the Clerk, relayed that the Clerk stated she "could not find any emails related to the 'Ten Things' flyer" ([[ccjra-nokings-rally-2026-06-18]]). The next day, June 19, under C 26-29, the Clerk produced emails whose subjects reference drafts of the Town's response to that flyer. (These were two different requests; the records simply show the statement and the production one day apart.)

## What the record never contains: a reason

C.R.S. § 24-72-204(3) requires a custodian who denies or withholds a record to state the grounds in writing. Across these requests, that written reason is missing at each reversal and delay:

- The drafts in #3 / #8 were left out of the first production, then produced months later under a re-request, with no reason stated for the original omission.
- Records the Town described as not locatable ("could not find any emails related to the 'Ten Things' flyer," June 18) were produced the next day, with no reason stated for the reversal.
- The denials it did issue (#5 "feature not used"; #7 redirect-and-close) carried no § 24-72-204(3) certification.
- The four-day acknowledgment on #9, against the Town's recent one-business-day habit, was not explained.

This is itself a record fact: the productions, the reversals, and the delay are documented, and the § 24-72-204(3) statements that would explain them are absent. The Town has produced records it once withheld, reversed positions it once stated, and let a request sit until the records were destroyed, without putting a reason for any of it on the record.

## What the law provides

- **Fee-shifting.** Under C.R.S. § 24-72-204(5), a requester who applies to the district court and is found to have been improperly denied is awarded court costs and reasonable attorney fees.
- **Two outside findings already on the record.** CFOIC's Executive Director found the 2024 denial improper (#1). In the [[bill-brunner|Brunner]] matter, Judge Steven Schultz of the Delta County District Court found the Town "failed to exercise reasonable diligence or reasonable inquiry" in responding to a CORA and ordered the Town to pay costs. The custodian and the practices that produced the entries above have not changed since that ruling.

## See Also

- [[pattern-of-cora-obstruction]] — the same responses grouped by method
- [[records-they-wont-hand-over]] — the short version
- [[cora-tracking-log]] — every request, with full per-request write-ups
- [[samira-vetter]] — the custodian
- [[public-records-access]] — issue page
- [[clerk-rejection-vs-playbook-2026-04-27]] — the Clerk's handling of citizen *initiatives* (a separate function from records requests)
