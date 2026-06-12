---
title: "Public Comment to the Board of Trustees — Pattern of CORA Obstruction by the Town Clerk"
type: source
submitted_via: https://townofpaonia.colorado.gov/board-meeting-agendas-and-minutes
submitted_by: Pete McCarthy
date: 2026-05-05
target_meeting: next regular Board meeting
tags: [cora, public-comment, board-complaint, vetter, obstruction]
---

# Public Comment to the Board of Trustees

**Submitted via the official Town public-comment portal — May 5, 2026.**
**Re: Pattern of CORA Obstruction by the Town Clerk; Request for Board Action.**

---

Dear Mayor Smith and Trustees,

I am writing to ask the Board to consider a pattern that has emerged across my Colorado Open Records Act filings with the Town since September 2024. The conduct I describe below is documented; the supporting records are posted in full at **https://paoniatruth.site**; and the questions it raises are, in my view, ones the Board has both the authority and the responsibility to address.

I have kept this letter short and have placed each underlying record one click away.

## How this started

In September 2024 I filed a CORA request for the Town's Microsoft 365 unified audit log covering administrative activity from May through July of that year. Town Clerk Samira Vetter denied the request, citing C.R.S. § 24-72-203(2)(a) — "not in the Town's custody" — for records held on a Microsoft tenant the Town licenses.

On November 25, 2024, the Colorado Freedom of Information Coalition issued a four-page written memo confirming that the denial was improper. As CFOIC's executive director Jeff Roberts explained, § 203(2)(a) is a notification provision and not a basis for denial; the licensee is the custodian; *Leonard v. Interquest* is controlling.

A week earlier I had also filed a formal complaint with the Board's predecessor asking that the audit logs be obtained and reviewed. The Board did not act. The records were never produced. Microsoft 365 retains audit data for 180 days at the Town's licensing tier, and those events have since aged out of retention.

→ https://paoniatruth.site/wiki/sources/reporter-package-email-coverup
→ https://paoniatruth.site/wiki/sources/complaint-2024-11-18

## What the 2026 productions actually contain

In April 2026 I refiled a comparable request as **CORA C 26-12** — the complete M365 unified audit log for all available retention dates. The Town produced six monthly Excel files and a cover letter representing the production as covering November 2025 through April 2026.

Three features of that production warrant the Board's attention.

First, every file contains exactly 50,000 rows. Fifty thousand is the legacy Microsoft Purview UI export ceiling — a cap an administrator can lift in a single PowerShell command. A single Vetter account generated more than 25,000 events in November 2025 alone; full months across multiple accounts run into hundreds of thousands. The files are not complete months.

Second, the file labeled "Mar2026" — the one month containing the special Board meeting called about me, the drafting of the Board's March 30 letter, and the Mayor's report packet — does not contain March 2026 data. Its first 50,000 RecordIds match the April file. March was not produced.

Third, the AuditData column — the structured JSON field that contains the substance of every audit event (subjects, recipients, IP addresses, items accessed) — is redacted on all of approximately 250,000 rows under a single broad citation to the critical-infrastructure exemption. Per-field redaction within AuditData is a standard Purview operation. A column-wide blackout does not satisfy the per-field analysis the statute requires.

→ https://paoniatruth.site/wiki/sources/cora-c26-12-m365-audit-logs-response

## The companion request

A day before C 26-12 I filed **CORA C 26-11**, which sought the communications around the Board's March 30 letter — emails, drafts, tracked changes, and any legal advice on the use of the word "libelous." The window covered six days during which the Board scheduled a special meeting about me by name, convened it, produced a jointly-signed letter, revised that letter overnight, and republished it.

The production was four emails. Two are messages I sent or received personally. The other two are from a single Trustee. The production includes no trustee-to-trustee communications, no scheduling messages for the special meeting, no drafts, and no tracked changes. All advice from the Town Attorney was withheld categorically as privileged, with no privilege log — which the statute requires under C.R.S. § 24-72-204(4) and § 24-72-205.5. The withholding statement cites § 24-72-204(3)(a)(iv), a subsection that addresses research at state institutions and is not a basis for asserting attorney-client privilege.

The independent record that could have tested the completeness of the C 26-11 production is the March 2026 audit log. As described above, that month was not produced.

→ https://paoniatruth.site/wiki/sources/cora-c26-11-libelous-communications-response
→ https://paoniatruth.site/wiki/analysis/pattern-of-cora-obstruction

## The Verkada records raise the same concern

The pattern is not limited to email. **CORA C 26-09** for the Verkada surveillance system was billed at $167.90 for five staff hours of work that Verkada's "Export" function completes in seconds. The audit logs were produced with a column-wide find-and-replace redaction across user IDs, device IDs, IP addresses, and serial numbers. The redaction missed 189 user UUIDs and six IP addresses, and did not touch the contemporaneous "details" field, which contains employee-name archive labels.

The records that did come through revealed the patterns I have since written about — the IDENTITY_LIST face-recognition events on the Police Chief's account, the "Blurred Faces" archive of ballot-box footage, and the community-room camera-on configurations. Resolving the questions those records raise — who configured what, when, and at whose direction — is in the Town's interest as much as it is in any citizen's. The fields the redactions black out are the fields needed to answer those questions. A per-field redaction analysis would address any genuine infrastructure-security concern without preventing accountability for administrative conduct.

→ https://paoniatruth.site/wiki/sources/cora-c26-09-verkada-audit-logs

## A relevant evidentiary point

I raise this because I believe it is relevant to the Board's evaluation, not as accusation.

A witness — a former Town staff member whose duties brought her into regular contact with the Clerk's office while I was on the Planning Commission — has stated that Ms. Vetter, Town Administrator Stefen Wynn, and Ruben Sanchez routinely spoke disparagingly about me during that period. The witness has agreed to speak with the Board directly. I will provide her name on request.

CORA does not require a Custodian to feel any particular way toward a requester; it requires statutory compliance regardless. The witness account is offered as one piece of context the Board may weigh in evaluating whether the pattern above reflects workload, unfamiliarity, or something else.

## The judicial record

In a separate matter, Judge Steven Schultz of the Delta County District Court found the Town "failed to exercise reasonable diligence or reasonable inquiry" in responding to a CORA request filed by Bill Brunner, and ordered the Town to pay Brunner's legal costs. That ruling is a contemporaneous judicial finding of CORA bad faith involving the same Custodian and the same period.

→ https://paoniatruth.site/wiki/people/bill-brunner

## What I am asking the Board to do

At the next regular meeting I respectfully ask the Board to:

1. Place this complaint on the public agenda.

2. Direct the Custodian, in writing and within fourteen days, to cure the C 26-11 and C 26-12 deficiencies by (a) producing a per-document privilege log, (b) producing the actual March 2026 audit log, (c) producing a paginated complete export rather than a 50,000-row UI cap, and (d) producing a per-field redaction analysis identifying which AuditData fields the Town claims as exempt and the specific basis for each.

3. Confirm in writing that a litigation-hold preservation directive has been issued covering the M365 mailbox contents, audit log records, SharePoint and OneDrive items, and Teams messages identified in my April 23, 2026 deficiency notice to the Custodian. HardDeleted items default to a 14-day Single Item Recovery retention; items deleted in early April are at or past that ceiling, and preservation should not wait on the agenda cycle.

4. Direct re-production of the C 26-09 Verkada audit logs with per-field redaction analysis in place of the column-wide blackout.

5. Authorize a third-party CORA compliance review by the Colorado Municipal League, CFOIC, or outside counsel not currently engaged by the Town.

6. Adopt a written CORA policy that requires per-document privilege logging, per-field redaction with itemized statutory citation, paginated programmatic export for log-format records, and a documented "extenuating circumstances" justification for any extension taken under § 24-72-203(3)(b).

7. Hear the witness. I will provide her name on request.

I will attend the next regular meeting to voice this comment during the public-comment period. Everything referenced in this letter is posted in full at https://paoniatruth.site, and I am available to provide additional documentation or answer questions in whatever forum the Board prefers.

Respectfully,

Pete McCarthy
Paonia, CO
petefromsf@gmail.com
