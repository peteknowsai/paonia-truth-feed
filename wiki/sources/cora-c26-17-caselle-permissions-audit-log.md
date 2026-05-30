---
title: "CORA C 26-17 — Caselle Permission-Change Communications & Audit Log"
type: source
created: 2026-05-30
updated: 2026-05-30
tags: [cora, caselle, audit-log, permissions, segregation-of-duties, bowman, denial]
sources: []
---

# CORA C 26-17 — Caselle Permission-Change Communications & Audit Log

**Type:** CORA response package (partial fulfillment + one denial)
**Request filed:** 2026-04-23
**Received by clerk:** 2026-04-27
**Extension invoked:** 2026-04-30 (new deadline May 11, 2026)
**Fulfilled (partial):** 2026-05-11 (on the deadline)
**Requester:** Pete McCarthy
**Fees charged:** not stated

C 26-17 is the follow-on to [[cora-c26-10-caselle-user-access|C 26-10]]. C 26-10 produced a snapshot of Caselle user permissions as they stood on the day the report was run, not a history of how those permissions changed. C 26-17 asked two questions C 26-10 could not answer: how the permissions got that way (the communications), and what the system's own change log records (the audit log). It is tracked in the [[cora-tracking-log|CORA tracking log]].

## The Two Items Requested

1. **Permission-change communications.** All communications among Town staff, officials, or contractors (including the Town's Caselle vendor, PMS) regarding any change to Caselle user permissions, access, rights, role assignments, or segregation of duties, for the window **October 1, 2024 through April 19, 2026**.

2. **The Caselle audit log.** The Caselle Connect Management Tracking Report (the system's security audit log) filtered to changes in the User Rights, Users, and Group Rights tables over the same window, as PDF or CSV.

## What Was Produced

### Item 1 — communications (PARTIAL; out of scope)

Item 1 was produced as a redacted PDF. The production contained two internal email threads, both from **July and August 2024** — a "RE: User name in Caselle" thread (PMS to the Town, July 17, 2024) and a "RE: Invoice Approval" thread (PMS to the Town, August 5, 2024). Email addresses and a PMS phone number were redacted.

Both emails predate the **October 1, 2024** start of the requested scope. Nothing dated within the actual window — October 1, 2024 through April 19, 2026 — appears in the production. The Town produced records from before the period it was asked about and none from inside it.

### Item 2 — audit log (DENIED)

Item 2 was denied. The response stated, in substance, that the feature is not used and therefore the record does not exist.

The denial carries **no statutory withholding statement** under C.R.S. § 24-72-204(3). It is a bare assertion of non-existence rather than a claim that the record exists and is being withheld. The Management Tracking Report is a **standard Caselle module**, not a custom feature, and the request provided no independent way to confirm that it had in fact been left disabled. On that basis the denial is challengeable.

## Substantive Finding: a Segregation-of-Duties Failure

The one substantive item the production does reveal sits in the August 5, 2024 "RE: Invoice Approval" email — and it is grounded in the email's stated subject and content, not in any audit-log row, because no audit log was produced.

The email records a permission change in which [[kaja-bowman|Kaja Bowman]], Deputy Treasurer, was given **auto-approval on invoices**. The effect is that invoices she entered could be approved without independent sign-off, collapsing the control under which the Town Administrator was to approve invoices she created. One person entering and approving the same invoices is a segregation-of-duties failure — the kind of control gap examined in [[who-controls-the-money]].

What the record shows: a July/August 2024 permission change granting Bowman invoice auto-approval. What the record does **not** show: any communication from inside the requested October-2024-to-April-2026 window, and any audit-log entry confirming when the change was made, by whom, or whether it was ever reversed. The audit log that would document the change history was the very record denied as "not used."

## Defects in the Response

- **Item 1 missed the window.** Every produced email predates the October 1, 2024 scope start. No responsive document from within the requested period was produced.
- **Item 2 denial lacks a statutory basis.** "Feature not used / record does not exist" is asserted without a C.R.S. § 24-72-204(3) withholding statement and without verification that a standard module was disabled.
- **Redactions are unexplained.** PMS contact information and email addresses were redacted with no individual statutory justification stated per C.R.S. § 24-72-204(3).

## Significance

C 26-17 confirms, from the Town's own production, that a Caselle permission change gave the Deputy Treasurer invoice auto-approval — a documented segregation-of-duties gap. It does not establish when that change occurred within the requested window or whether it persisted, because the records that would answer that (the in-window communications and the audit log) were either absent or denied.

The denial of the audit log warrants a challenge: the Management Tracking Report is a standard Caselle feature, and the denial offered no statutory ground.

## See Also

- [[cora-c26-10-caselle-user-access]] — the prior request this one follows; produced the permissions snapshot
- [[who-controls-the-money]] — segregation-of-duties and financial-control analysis
- [[kaja-bowman]]
- [[cora-tracking-log]]
