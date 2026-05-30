---
title: "CORA C 26-15 — Wynn Outbound Emails, November 4, 2024"
type: source
created: 2026-05-30
updated: 2026-05-30
tags: [cora, wynn, public-records, metadata, timestamps, retaliation, pattern]
sources: []
---

# CORA C 26-15 — Wynn Outbound Emails, November 4, 2024

**Raw file:** `raw/documents/cora-responses/C-26-15-Response.pdf` (165 pages, ~17.7 MB); plain-text extract at `C-26-15-Response.txt`

**Type:** CORA response package
**Request filed:** 2026-04-20 (corrected resend the same day)
**Received by clerk:** 2026-04-23
**Extension issued:** 2026-04-28 (7-day extension)
**Fulfilled:** 2026-05-08 (full extension used)
**Custodian:** [[samira-vetter|Samira Vetter]], Town Clerk / Official Custodian of Records
**Requester:** Pete McCarthy
**Fee charged:** $0

## Original Request

All emails sent by Town Administrator [[stefen-wynn|Stefen Wynn]] from any Town of Paonia email account on November 4, 2024. The request was limited to outbound messages (sent only).

The original filing earlier that day carried a blank description field caused by a form-fill script error and was withdrawn; the corrected version was resent the same day at 8:25 AM.

## Why November 4, 2024

November 4, 2024 is the date Pete McCarthy, then a Planning Commissioner, sent Planning Commission meeting comments at 1:13 PM raising procedural concerns. The request seeks to establish what Wynn sent that day, and when, in response. Wynn's actions on that date are referenced in the [[pattern-of-retaliation]] analysis.

## What Was Produced

A single 165-page PDF containing Wynn's outbound messages from that date, including:

- An 11:10 AM forward to himself, "FW: Your new service plan from COOLEYS"
- A 1:59 PM message to Alpine Archaeology and Wright Water Engineers regarding a hydrogeologic study cultural survey
- A forward of McCarthy's 1:13 PM Planning Commission comments to the Mayor, Trustees, and Planning Commission
- A reply to Mary Bachran regarding an October invoice
- A reply to Vetter's 12:32 PM master-plan revision forward, instructing staff to print copies
- Correspondence regarding a P-Hill tower extension

## Production Defect — Format and Missing Timestamps

PDF metadata shows the file was assembled in **Microsoft Word** (the document title field reads "Microsoft Word - C 26-15 Response"; the author field reads "SamiraV") and exported through Adobe Acrobat shortly after midnight Mountain time on 2026-05-08. The PDF is therefore not a direct print from Outlook, and header preservation is inconsistent across the messages.

Two messages retain a complete `From: Stefen Wynn` / `Sent:` header line with a date and time:

- The 11:10 AM "FW: Your new service plan from COOLEYS" forward-to-self
- The 1:59 PM hydrogeologic study cultural survey message

Several other outbound messages were produced **without a top-level `Sent:` timestamp**, including:

- Wynn's forward of McCarthy's 1:13 PM Planning Commission comments
- Wynn's reply to Bachran's invoice
- Wynn's reply to Vetter's master-plan revision forward
- The P-Hill tower extension correspondence

Because these were assembled into a Word document rather than printed natively from Outlook, the send timestamps that establish when each message left Wynn's account were not preserved on the page.

## Why Timestamps Matter

The purpose of the request is to establish what Wynn sent on November 4, 2024 and when. A produced message body without a `Sent:` timestamp confirms that a message exists but does not place it on the timeline relative to McCarthy's 1:13 PM comments. The sequence — whether Wynn forwarded or replied before or after McCarthy's email, and how quickly — is the fact the request was filed to capture. A message stripped of its send time cannot answer that.

The timestamps could not be recovered from the Town's Microsoft 365 audit logs. The Town's M365 audit retention is 180 days (confirmed in the [[cora-c26-12-m365-audit-logs-response|C 26-12]] response). November 4, 2024 is roughly 18 months before the production date — outside that window. The native `.eml` files in Wynn's mailbox, or a direct PDF print from Outlook, are the only remaining sources for the missing send times.

## Follow-up — C 26-21

The missing timestamps are the reason the follow-up request [[cora-c26-21-wynn-eml-native-files|C 26-21]] was filed on 2026-05-20, seeking native `.eml` files for four of the timestamp-stripped messages. That request partially resolved the defect: send timestamps were recovered for two of the four targeted emails (the Planning Commission comments forward and the "Invoice from Mary" message). The other two `.eml` files the Town produced were inbound messages received by Wynn rather than the outbound messages requested. See the [[cora-tracking-log|CORA tracking log]] for the full C 26-21 entry.

## Significance

This response delivers the responsive message bodies but, because of how the file was assembled, does not establish the send times for several of them. That is a metadata gap, not a withholding — the messages were produced. The gap matters only because the timeline of Wynn's November 4 activity is the point of the request, and it is what drove the C 26-21 follow-up.

## See Also

- [[cora-c26-21-wynn-eml-native-files]] — The native `.eml` follow-up that recovered two of the four timestamps
- [[cora-tracking-log]] — Full filing history, deadlines, and the C 26-15 / C 26-21 detail entries
- [[stefen-wynn]] — Town Administrator; subject of the request
- [[samira-vetter]] — Town Clerk and records custodian
- [[pattern-of-retaliation]] — Context for the November 4, 2024 timeline
- [[pattern-of-cora-obstruction]] — Pattern across the 2026 CORA responses
