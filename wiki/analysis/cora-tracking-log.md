---
title: CORA Request Tracking Log
type: analysis
created: 2026-04-09
updated: 2026-06-01
tags: [cora, transparency, public-records, vetter, tracking, log]
sources: [reporter-package-email-coverup, cora-libelous-communications, cora-c26-09-verkada-audit-logs, cora-c26-11-libelous-communications-response, cora-c26-12-m365-audit-logs-response, cora-c26-15-wynn-sent-emails-nov4-2024, pattern-of-cora-obstruction, board-letter-2026-03-30]
---

# CORA Request Tracking Log

A running record of every Colorado Open Records Act request submitted by Pete McCarthy to the Town of Paonia, with filing dates, deadlines, fees, extensions, and outcomes.

This page exists because the pattern of how the Town responds to records requests is itself a story, and because individual requests can get lost in the shuffle without a single place to track them.

**Last updated: 2026-06-01 (Monday, evening watch)** — Pete **sent the C 26-23 § 204(4) follow-up to Vetter at 08:00 MDT**, and **Vetter conceded non-existence the same morning** (two emails ~10:49–10:54): an itemized written **"No such records exist"** on Finance Committee minutes, agendas, sign-ins, and logs — the § 204(3) statement, now on the record. Finding: the Town's #1 cited financial "control" keeps no deliberative records at all. Only open piece is whether Resolution 2024-09 creates the Committee (see C 26-23 detail). **C 26-24** (Wynn non-renewal) remains PENDING, due **June 3**; the CCJRA matters fold into the Laiminger meeting. The five records-request drafts (C 26-25/26/27/28 + Handbook) remain **unsent**. (Separately, Trustee Calla Rose Ostrander emailed Pete a non-CORA "Hello & Water" coffee invite June 1 — noted, not docketed.) Prior update — 2026-05-31 (Sunday): (1) **Draft audit correction:** C 26-25/26/27/28 were found to be **unsent Gmail drafts**, not filed requests — the prior "SENT May 29–30 / deadlines June 3–4" status was wrong; corrected throughout. C 26-28 is duplicated. CCJRA #2 was sent **May 31** (not May 30). (2) Added the C 26-11 incompleteness cross-check against the C 26-12 audit log (withheld drafts named, post-request deletions, audit-log production's own omitted windows), plus the drafted supplemental demand / Board letter / CFOIC request.

## Summary Table

| ID | Date Filed | Subject | Status | Deadline | Fee | Notes |
|---|---|---|---|---|---|---|
| (no #) | 2024-09-27 | M365 audit logs (admin activity, May-Jul 2024) | **DENIED** | n/a | $0 | Vetter cited C.R.S. 24-72-203(2)(a) ("not in custody"). CFOIC confirmed denial improper. |
| (no #) | 2024-11-18 (in complaint) | M365 MailItemsAccessed for Nov 12 email | **NOT FULFILLED** | n/a | $0 | Embedded in formal Board complaint. Board took no action. |
| (no #) | 2025-06-25 | Records of improper executive session | **DENIED** | n/a | $0 | Town denied citing executive session privilege. Filed strategically to put the improper use on the record. |
| **C 26-09** | 2026-03-23 | Verkada Camera System (contract, retention policy, audit logs, written policies) | **FULFILLED** 2026-04-08 | Apr 7 (with extension) | **$167.90** | 5 hours billed for what was largely automated exports. See [[cora-c26-09-verkada-audit-logs]]. |
| **C 26-10** | 2026-04-01 | Caselle ERP User Access Report (Application Rights Report) | **FULFILLED** 2026-04-16 | Apr 16 (with extension) | not stated | Delivered on the extended deadline. Report run Apr 8 — reflects permissions as of Apr 8, not the Apr 1 filing date. Follow-on: C 26-17. |
| **C 26-11** | 2026-04-06 | Communications re: Board's March 30 Response Letter | **FULFILLED** 2026-04-21 (nominal) | Apr 22 (with extension) | $0 | 4 emails produced — 2 were Pete's own. No trustee-to-trustee comms. No drafts. Buchner advice withheld as privileged. See [[cora-c26-11-libelous-communications-response]]. |
| **C 26-12** | 2026-04-07 | M365 Unified Audit Log export + retention policy | **FULFILLED via CURE 2026-05-27** (cure data retrieved & analyzed 2026-05-29) | Apr 22 (with extension) | $0 | Original: "March" file a byte-identical duplicate of April; every file capped at 50,000 rows; AuditData 100% redacted. Cure delivered 10 uncapped CSVs (1.13M rows) with AuditData un-redacted; logged inbox-rule activity is benign (see Pattern 7). See [[cora-c26-12-m365-audit-logs-response]]. |
| (no #) | 2026-04-06 (form date) | M365 Unified Audit Log + OneDrive/SharePoint version history + phone call logs + Teams metadata (four-item "system logs" request) | **UNCERTAIN** — never docketed | unknown | not stated | Form-dated Apr 6; no email filing trace and no acknowledgment found. No C-number ever assigned. Distinct from C 26-12 (which is the two-item audit-log + retention request). |
| **C 26-17** | 2026-04-23 | Caselle permission-change communications (Oct 2024–Apr 2026) + Caselle Management Tracking Report (audit log) | **FULFILLED (PARTIAL)** 2026-05-11 | May 11 (with extension) | not stated | Item 1 (comms) produced as redacted PDF — only two Jul/Aug 2024 emails, predating the Oct-1-2024 scope. Item 2 (audit log) DENIED: "feature not used... record does not exist" — no statutory basis. Aug 5 email reveals a segregation-of-duties failure (Bowman gained invoice auto-approval). |
| (no #) | 2026-05-05 | March 2026 M365 redaction cure (true March log + paginated beyond-50k export + unredacted AuditData / itemized § 204(4) log) | **RESPONDED** — absorbed into C 26-12 cure | never docketed (3-day would have been May 9; 10-day max May 20) | $0 (waived) | Triggered the cure. Vetter's May 6 email delivered the corrected March log + promise; never assigned a C-number; ClayB attorney copy bounced (MAILER-DAEMON). Items 2 and 3-B not confirmed produced. |
| (no # — likely C 26-22) | 2026-05-12 | Current inbox rules on Wynn's mailbox (Get-InboxRule output) | **CLOSED — dropped** | (was May 26) | n/a | Closed 2026-05-30: the C 26-12 cure showed the rule activity is benign (desktop-Outlook resync, no mail suppression), so the request is not being pursued. The May 26 non-response stays on the record as a clean § 203(3)(b) violation but isn't worth chasing. Findings written up at [[inbox-rules-investigation-closed]]. |
| (no #) | 2026-05-14 | Unredacted AuditData for Wynn UpdateInboxRules events on 5 burst dates (Dec 19 2025; Jan 27, Feb 24, Apr 3, Apr 9 2026) | **CLOSED — mooted** | May 28 (10-day max; never answered) | n/a | The cure delivered un-redacted AuditData for these events. They are `ModifyMailboxRule` events, for which Microsoft logs **no** rule body — so there were never rule definitions to un-redact. Closed 2026-05-30 alongside the dropped inbox-rules thread; see [[inbox-rules-investigation-closed]]. |
| **C 26-15** | 2026-04-20 | Wynn outbound emails on November 4, 2024 (sent only) | **FULFILLED** 2026-05-08 | May 8 (with extension) | $0 | 165-page PDF assembled in Microsoft Word (per metadata). Several outbound messages produced **without "Sent:" timestamp metadata**. Partially resolved by follow-up C 26-21. See [[cora-c26-15-wynn-sent-emails-nov4-2024]]. |
| **C 26-21** | 2026-05-20 | Native .eml files for four Wynn emails of Nov 4 2024 (timestamp recovery — follow-up to C 26-15) | **FULFILLED (PARTIAL — 2 of 4)** 2026-05-27 | **May 27** | none noted | Items (a) PC-comments forward and (c) "Invoice from Mary" produced as responsive Wynn-outbound .eml with timestamps recovered. Items (b) master-plan reply and (d) P-Hill are wrong-direction substitutions — inbound messages (Exchange MessageDirectionality: Incoming). Closed as fulfilled despite the substitution. |
| **C 26-23** | 2026-05-13 (submitted; received May 20) | Finance Committee records (minutes, agendas, sign-in sheets, logs, charter), Jan 2024 – May 2026 | **RESOLVED (mostly) — non-existence conceded (itemized) Jun 1; establishing doc still open** | **May 26** | $0.00 | Santiago's May 26 letter redirected to Board-packet Payment Approval Reports; no § 204(3) certification. § 204(4) follow-up sent Jun 1 08:00; **Vetter replied same morning with an itemized written "No such records exist" on minutes, agendas, sign-ins, and logs** — the § 204(3) concession, on the record. Finding: the Finance Committee keeps no minutes/agendas/deliberative log at all. Only open piece: whether Resolution 2024-09 actually creates the Committee (Vetter still searching). |
| (pending # — likely **C 26-24**) | 2026-05-28 | Communications re: Town Administrator (Wynn) non-renewal; Bachran communications; related executive-session records (May 1–27, 2026) | **PENDING** | **June 3** (per Vetter) | none stated | Filed May 28; acknowledged by Vetter May 29 (deadline stated as June 3 — a strict 3-working-day count is June 2). Likely to draw privilege assertions or an extension. |
| (unfiled — **C 26-25** planned) | 2026-05-29 (drafted) | **Flyer response-letter drafting records** — the "I need comments /no later than 2:00" thread, the Mayor's draft report, and the "Revised Letter to Citizens" with ALL retained drafts/revision trail | **⚠ DRAFTED — NOT SENT** | n/a (not filed) | TBD | **Correction 2026-05-31:** never sent — still an unsent Gmail draft (`r-8459924144882024113`); the earlier "SENT" status was an error (the draft was mistaken for a sent message). Built from the C 26-12 audit-log subjects; directly backs the C 26-11 cross-check. **ACTION: send or discard.** |
| (unfiled — **C 26-26** planned) | 2026-05-30 (drafted) | **Special meeting + Planner task + flyer "safety"** — "…Special Meeting…to set the record straight"; Microsoft Planner task "C 26-11 McCarthy -Flyer" + comments; "…Fear for Safety with Flyers Posted…with my Image" | **⚠ DRAFTED — NOT SENT** | n/a (not filed) | TBD | **Correction 2026-05-31:** never sent — still an unsent Gmail draft (`r-7459207121458941464`). **ACTION: send or discard.** |
| (unfiled — **C 26-27** planned) | 2026-05-30 (drafted) | **Verkada audit-log continuation** — same export as C 26-09, Mar 26 2026 → present (covers the Mar 28 No Kings rally + post-Mar-26 Grand Ave) | **⚠ DRAFTED — NOT SENT** | n/a (not filed) | $0 sought | **Correction 2026-05-31:** never sent — still an unsent Gmail draft (`r-5320712872439819788`). Anti-fee framing baked in. **ACTION: send or discard.** |
| (unfiled — **C 26-28** planned) | 2026-05-30 (drafted ×2) | **Wynn "threat/safety" communications** — "…Meeker Resident…Safety" (Mar 12), "CRCP 106 - Threatened Litigation" (Apr 2), the two Apr 7 "Threat of Litigation" emails, "Angry emails, maybe a threat?" (Apr 20) | **⚠ DRAFTED — NOT SENT (duplicated)** | n/a (not filed) | TBD | **Correction 2026-05-31:** never sent. **Two identical unsent Gmail drafts** exist — `r3888469732630765048` (01:22) and `r2023939854420994659` (01:18). **ACTION: delete one, then send or discard the other.** |
| (pending # — likely **C 26-29**) | 2026-05-31 (drafted) | **New Focus HR employee/personnel handbook** — (1) most recently edited version (native + PDF); (2) the "Changes for the Employee Handbook 4-2026" change file + redlines/prior drafts; (3) Town ↔ New Focus HR comms re: the handbook, Jun 1 2025–present | **DRAFTED — ready to send** | TBD on filing | $0 sought | Targets the $7,500 handbook the Town paid for but never adopted or published (see [[hr-contract-without-a-bid]]). Existence proven from the Town's own C 26-12 audit log (draft + change file edited Apr 27–28 2026; firm comms through late Apr). Draft: `raw/documents/cora-requests/cora-newfocushr-handbook.md`. |

## Statutory Framework

Under [C.R.S. 24-72-203](https://leg.colorado.gov/), the records custodian has:

- **3 working days** to make a record available after receipt of a request
- **Up to 7 additional working days** if "extenuating circumstances" exist (must be documented)
- **Maximum total: 10 working days** from receipt

The custodian must respond in writing within the deadline either by producing the record, denying the request with a specific statutory basis, or providing a good-faith cost estimate before charging fees. Fees must be "reasonable and actual" per C.R.S. 24-72-205.

## Detailed Entries

### 2024-09-27 — M365 audit logs (admin activity, May-Jul 2024) — **DENIED**

- **Filed**: 2024-09-27 (Friday)
- **Custodian response**: 2024-09-30 (Monday) — denied
- **Stated basis for denial**: C.R.S. 24-72-203(2)(a), "not in the Town's custody"
- **Counter-argument**: The Town is the M365 licensee and data owner. *Leonard v. Interquest* establishes the licensee is the custodian.
- **CFOIC review**: On 2024-11-25, Jeff Roberts (Executive Director, Colorado Freedom of Information Coalition) confirmed in writing that the denial was improper. C.R.S. 24-72-203(2)(a) is a notification requirement, not a basis for denial. The custodian must produce the records or direct the requester to whoever has them.
- **Outcome**: The records were never produced. Pete's appeal to Wynn was met with: "I'm not the correct person to send a CORA request to... even forwarding this request is not a duty I am obligated to perform and I'm doing this to accommodate you."
- **Source**: [[reporter-package-email-coverup]]

### 2024-11-18 — Embedded request in formal Board complaint

- **Filed**: 2024-11-18, embedded in [[complaint-2024-11-18|the formal complaint to the Board]]
- **Specific request**: M365 MailItemsAccessed audit logs for the November 12, 2024 email exchange to verify whether [[stefen-wynn|Wynn]] had read Pete's email before denying it on camera at the Planning Commission meeting
- **Custodian response**: None. Board took no action.
- **Source**: [[complaint-2024-11-18]]

### 2025-06-25 — Records of Improper Executive Session — **DENIED**

- **Filed**: 2025-06-25
- **Subject**: Records regarding what Pete characterized as an improper use of executive session by the Board
- **Custodian response timeline**: [[ruben-santiago|Ruben Santiago]] responded on June 27 and July 1, 2025
- **Outcome**: **DENIED.** The Town denied production citing executive session privilege under Colorado open meetings law.
- **Strategic significance**: Pete filed this request knowing it would likely be denied. The purpose was to put on the record his formal allegation that the Board's use of executive session was improper, and to force the Town to memorialize its denial in writing. The denial itself becomes evidence that the executive session occurred and that the Town invoked privilege to prevent disclosure of its content. This is a CORA filing where the denial is the intended outcome — a paper trail establishing both the citizen complaint and the institutional refusal.

This is the kind of CORA filing that exists in the record specifically to make a denial visible. If the Board's executive session use is later challenged in court or in front of CFOIC, the existence of a contemporaneous formal request and its written denial become part of the timeline showing that the issue was raised and rejected by the Town in real time.

### 2026-03-23 — CORA C 26-09 — Verkada Camera System — **FULFILLED**

- **Filed**: 2026-03-23 (Mon) at 9:18:55 AM MDT
- **Acknowledged**: 2026-03-25 (Wed) by [[samira-vetter|Vetter]] with stated deadline of 2026-03-27
- **Extension**: 2026-03-26 (Thu) — 7-day extension issued, new deadline 2026-04-07
- **Cost estimate**: 2026-03-30 (Mon) — original estimate $75.55 for full request including 332 emails
- **Scope narrowed**: 2026-03-30 — Pete withdrew item 5 (internal correspondence)
- **Revised estimate**: 2026-03-30 — $67.16 with $33.58 deposit
- **Deposit paid**: 2026-03-30
- **Final fulfillment**: 2026-04-07 (Vetter announced records ready) → 2026-04-08 (records delivered after final payment)
- **Final fee**: **$167.90** (5 hours at $33.58/hour) — 2.5x the revised estimate of $67.16
- **What was produced**: 33-page PDF response letter, signed Mitchell and Company contract, 16 device configuration screenshots, two complete audit log Excel files (32,338 + 25,122 rows)
- **What was NOT produced (despite being requested)**:
  - The "purpose" metadata on archive events (was partially in the details column but not labeled as such)
  - A written policy governing camera use (does not exist)
  - Internal correspondence about Verkada selection/deployment (withdrawn from scope)
- **Notable redaction issues**: Column-wide find-and-replace redactions on user IDs, IP addresses, device IDs, and serial numbers. 189 user UUIDs and 6 IP addresses were missed in the redaction. The `details` field containing employee-name archive labels was not touched. See [[cora-c26-09-verkada-audit-logs]] for the full analysis.
- **Source**: [[cora-c26-09-verkada-audit-logs]]
- **Resulting analyses**: [[cameras-always-on-not-motion]], [[facial-recognition-proof]], [[community-room-surveillance]], [[audit-log-first-viewed-after-cora]], [[wynn-knowledge-of-cameras]], [[employee-surveillance-archives]], [[verkada-usage-patterns]]

### 2026-04-01 — CORA C 26-10 — Caselle ERP User Access Report — **FULFILLED**

- **Filed**: 2026-04-01 (Wed) at 11:14 AM MDT
- **Acknowledged**: 2026-04-02 (Thu) by Vetter — receipt date Apr 2, standard deadline declared April 7, 2026
- **Extension**: 2026-04-07 — 7-day extension invoked; extended maximum deadline **April 16, 2026** (10 working days from Apr 2)
- **Fulfilled**: 2026-04-16 — delivered **on the extended deadline** (cover letter dated Apr 14; email delivery Apr 16). The report was run Apr 8 at 9:02 AM.
- **Fee**: not stated in available records
- **Subject**: The Caselle ERP "Application Rights Report" — who holds what permissions across all Caselle modules.
- **What was produced**: The Application Rights Report showing every module task with Allowed Users and Denied Users. Users include Admin, arodarte (Ashley Rodarte), ProMgmt, ProSolutions, Ruben (Ruben Santiago), TManager ([[stefen-wynn|Stefen Wynn]]), and several denied users.
- **Production note**: The report reflects the state of permissions as of **April 8** (the day it was run), not the April 1 filing date. No historical record of permission *changes* was produced — that was the subject of the follow-on request C 26-17.
- **Correction to prior log**: An earlier draft of this log carried this matter as "PENDING — extended" and a separate claim circulated that it was fulfilled "May 9, three weeks past deadline." Both are wrong. Delivery was Apr 16, on the extended statutory deadline. The May 9 dates are file *download* timestamps, not the response date.
- **Sources**: `raw/documents/cora-responses/C-26-10-Caselle-User-Access.pdf` and `.txt`
- **Follow-up**: C 26-17 (Caselle permission-change communications + audit log).

### 2026-04-06 — CORA C 26-11 — Communications re: Board's March 30 Response Letter — **FULFILLED (NOMINAL)**

- **Filed**: 2026-04-06 (Mon) at 11:22 AM MDT
- **Acknowledged**: 2026-04-07 (Tue) at 9:03 AM MDT — Vetter assigned C 26-11, declared deadline of **April 10, 2026**
- **Standard deadline**: 2026-04-10 (Friday) — 3 working days from receipt on Apr 7 (missed)
- **Extension taken**: by Apr 10 — new deadline 2026-04-22
- **Fulfilled**: 2026-04-21 (letter dated Apr 21) — used virtually the full extension
- **Subject**: Three categories of records — (1) all communications between Mayor Smith, Wynn, Buchner, and trustees regarding Pete's flyer March 25-30, 2026; (2) all drafts, revisions, tracked changes of the board's response letter; (3) all legal opinions or advice from Buchner regarding use of "libelous," "libel," or "defamation."
- **What was produced**: Four emails — Pete's own 3/30 complaint, Paige's 3:37 PM forward of it to Wynn, Lucy's 3/26 "My Flyer" email to Paige, and Lucy's 3/30 individual-capacity reply to Pete. No trustee-to-trustee communications. No scheduling emails for the March 30 special meeting. No drafts or tracked changes (response points to the two already-public published versions). All Buchner advice withheld under attorney-client privilege (no privilege log provided).
- **Source**: [[cora-libelous-communications]] (original request), [[cora-c26-11-libelous-communications-response]] (response analysis)
- **Assessment**: Production is implausibly thin for a six-day window in which the Board convened a special meeting and produced a jointly-signed letter. See [[pattern-of-cora-obstruction]].

**Incompleteness confirmed by the C 26-12 audit log (cross-checked 2026-05-31):** The Town's own Microsoft 365 unified audit log — produced under [[cora-c26-12-m365-audit-logs-response|C 26-12]] (cure dated 2026-05-27) — names email items in the same late-March-2026 window that were neither produced nor logged as withheld. The strongest of these (with one window-edge item flagged below) are within or adjacent to the request:

- **Category 2 — drafts/revisions of the response letter (and NOT the two already-published versions Vetter pointed to):**
  - `Re: draft "letter from Trustee"` — 3/27 15:48 → 3/28 16:44; present in the `paiges`, `samirav`, and `stefenw` mailboxes (the Mayor, the Clerk, the Town Administrator — no attorney on it).
  - `Response to the Citizen's 10 things flyer` — 3/28 20:47; `paiges`.
  - `Response to the Citizen's 10 things flyer . I Need comments /no later than 2:00 tomorrow` — 3/28 21:08 → 3/31 01:33; `paiges`, `ptownlegal` (comment-collection on the response letter; touches the Town legal mailbox).
  - `RE: PLease see the attached drafft Mayor's report for the Special Meeting` — 3/27 20:16 → 3/29 00:13; `lucyh`, `paiges`, `samirav`. The subject is a Mayor's report for the special meeting; the log carries no body, so whether it overlaps the published letter cannot be confirmed from the subject alone — it is named here because it is a same-window special-meeting drafting item the production did not disclose.
- **Window-edge / context (flagged for honesty, not asserted as in-scope):**
  - `Revised Letter to Town of Paonia Citizens including the agreed upon changes approved by the BoT at t...` — 3/31 15:57 → 3/31 18:25; `paiges`, `ptownlegal`, `rubens`. *(Dated 3/31 — one day after the category-2 "created prior to or on March 30" cutoff.)*
- **Category 1 — flyer communications among officials:**
  - `Being Handed Out In Town by McCarthy` / `RE: FW: Being Handed Out In Town by McCarthy` — first seen 3/24 17:07, with a Send from `stefenw` on 3/25 21:39 and replies through 3/31; mailboxes `ashleyr`, `daoineb`, `paiges`, `rubens`, `samirav`, `stefenw`. *(Subject originates 3/24, one day before the 3/25 window start; the 3/25 Send and later replies fall inside the window.)*
  - `FYI - Three display ad Price lists` — 3/27 21:44 (consistent with pricing newspaper ads to rebut the flyer).
  - `agenda topic title for the Special meeting` — 3/26 → 3/30; `paiges`, `samirav`.
  - `Special Meeting Agenda 3/30/2026` — 3/29 → 3/31; `paiges`, `ptownlegal`, `samirav` *(weaker as "communications between officials" — likely a calendar/agenda item)*.

*Caveat:* the audit log carries only subject lines, timestamps, operations, and which mailbox each item sits in. It does **not** contain message bodies and does **not** record To/Cc lists — so it proves these subjects existed in those mailboxes at those times, not their contents, authorship, or direction. Items touching the `ptownlegal` mailbox may be defensible as privileged, but the Town gave no privilege log; the drafts circulating among non-attorneys (`lucyh`/`paiges`/`samirav`/`stefenw`) have no attorney on them at all. This cross-check is what the **C 26-25 draft** (prepared 2026-05-29 but — as of 2026-05-31 — **not yet sent**; see Open Items) targets, and it confirms the C 26-11 production was materially incomplete.

**The withheld drafts were genuinely SENT — verified (2026-06-01):** A from-scratch parse of the cure CSVs, cross-checked by three independent verification agents, confirms every one of the five draft/response threads above carries real `Send` events in the March 24–31 window — they are transmitted emails among officials, not unsent drafts parked in a folder. Send actors/times: `Being Handed Out` (RubenS 3/24 17:09, StefenW ×6 through 3/25 21:39); `letter from Trustee` (paiges 3/27 15:50, StefenW 3/28 16:44); `Mayor's report for the Special Meeting` (paiges 3/27 20:21, SamiraV 3/27 20:58, LucyH 3/28 16:17); `Response to the Citizen's 10 things flyer / I need comments` (paiges 3/28 21:08, PTownLegal 3/29 20:21); `Revised Letter to … Citizens` (paiges 3/31 15:59, RubenS 3/31 18:25). All present in mailboxes including the Clerk's own — so Vetter knew this drafting traffic existed when she certified the only drafts were the published versions. This is the verified, unassailable core of the C 26-11 incompleteness finding.

**The "post-request deletion" angle was investigated and DROPPED (2026-06-01).** An earlier pass flagged "three responsive emails moved to the trash in the Clerk's mailbox within ~25 minutes on April 21, the day she closed the request." **Direct verification against the raw logs does not support a targeted-concealment reading** and it has been pulled from the Board letter: on 2026-04-21 the `samirav` mailbox shows a **164-email bulk inbox cleanup** (`MoveToDeletedItems` from `\Inbox`, ~14:41–20:04 UTC) sweeping spam, newsletters, liquor-license renewals, lease docs, and routine business — the three flyer threads (`letter from Trustee` 15:28, `Being Handed Out` 15:50, `Mayor's report` 15:53 **UTC = 9:28/9:50/9:53 a.m. MDT**) are embedded *within* that indiscriminate sweep, deleted once each, not singled out. All are recoverable `MoveToDeletedItems` from `\Inbox` (zero `HardDelete`/`SoftDelete` on these subjects). The earlier "3:28 PM" was a UTC-vs-MDT misread. Conclusion: routine cleanup, not provable concealment — consistent with the skeptical re-check in `raw/research/deletion-verification.md`. Full verified timeline: `raw/research/c26-11-withheld-drafts-timeline.md`.

- **The audit-log production omitted the windows that matter.** The original C 26-12 production (April 22) was missing all of true March 2026 (a duplicate of April 1–9 was supplied in March's place) and all of April after the 9th (every monthly file capped at exactly 50,000 rows; April's volume filled the cap by the 9th). The complete logs arrived only in the May 27 cure, after objection. The late-March window is exactly where the withheld letter drafts (above) live. The Town attributes this to an export error.
- **Acted on / status as of 2026-06-01:** The Board letter (`raw/documents/board-complaint/letter-2026-05-31-c26-11-withholding.md`) has been **reframed as a pure direct appeal to the Board** — no courts/lawyers, no criminal frame, no penalty threats, deletion paragraph removed (per Pete's June 1 decision + CFOIC guidance). The § 18-8-114 criminal frame and the "$25/day arbitrary-or-capricious" hook were dropped (Jeff Roberts, CFOIC, confirmed the a/c penalty is **format-only**, not a withholding remedy, and gave no opinion on § 18-8-114). The Clerk supplemental/reopen demand (`cora-c26-11-supplemental-demand.md`) still carries the now-abandoned legal-remedy framing and is **on hold pending Pete's decision** (don't-send / strip-to-plain / fold into Board letter). CFOIC responded June 1 (procedural guidance + attorney referrals: Zansberg, Maxfield, Kissinger, Donnelly). All drafted in Gmail; not yet sent.

### 2026-04-07 — CORA C 26-12 — M365 Audit Logs and Retention Policy — **FULFILLED (PARTIAL); CURE ISSUED 2026-05-27**

- **Filed**: 2026-04-07 (Tue) at 11:08 AM MDT
- **Acknowledged**: 2026-04-08 (Wed) at 9:13 AM MDT — Vetter declared deadline of **April 13, 2026**
- **Standard deadline**: 2026-04-13 (Monday) — 3 working days from receipt on Apr 8 (missed)
- **Extension taken**: by Apr 13 — new deadline 2026-04-22
- **Original fulfillment**: 2026-04-22 (letter dated Apr 22) — used the full extension
- **Subject**: Two-item request — (1) Complete M365 Unified Audit Log export for all available dates, CSV format; (2) Town's current M365 audit log retention policy and licensing tier
- **What was produced (Apr 22)**: Six monthly Excel files labeled Nov 2025 through April 2026. Confirmation of M365 Business Premium licensing and 180-day audit retention.
- **Original production defects**:
  - The "March 2026" file (`Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx`) contains April 1-9 2026 data — **identical to the April file** (verified by matching RecordIds). March 2026 data was not produced.
  - Every monthly file is capped at exactly 50,000 rows (the Microsoft Purview UI export cap), not a complete month.
  - The `AuditData` column (the JSON payload containing email subjects, recipients, IP addresses, session IDs, accessed item IDs, and inbox-rule definitions) is 100% redacted across all files under a single column-wide citation of C.R.S. § 24-72-204(2)(a)(VIII).
  - The April file stops at April 9; earliest data is Nov 1 2025 even though 180-day retention at Apr 22 should reach late October 2025.
- **Cure arc**:
  - **May 5** — Pete filed a supplemental cure request (logged separately below, never docketed) objecting to the blanket redaction and the missing March log.
  - **May 6** — Vetter email (subject "C 26-12") delivered a corrected standalone March 2026 log (`Redacted_TownOfPaonia_Audit_Log_Mar2026_from_excel.xlsx`), acknowledged the IT vendor "inadvertently downloaded one incorrectly," acknowledged the 50,000-row cap as a known limitation, and committed to producing complete data.
  - **May 26** — Vetter "Microsoft 365 Update" email: "reviewing and redacting the last 2 logs (March and April 2026) right now; hope to have them today or tomorrow."
  - **May 27** — Formal **Cure Response** cover letter (Vetter, CMC): admits **four** monthly audit-log exports were missing due to a repeated export error; narrows AuditData redactions to technical identifiers only (OAuth/bearer tokens, unique token IDs, immutable IDs, correlation IDs, GUID-style identifiers, application/client/API IDs, TaskList values) while preserving timestamps, operations/events, workloads, user-activity context, and Town email addresses; waives any additional charge because the incomplete first production was not knowing. Cure data delivered as a SharePoint zip (`C 26-12 Cure M365 Audit Logs.zip`) behind an OTP identity-verification gate.
- **Cure retrieved & analyzed (2026-05-29)**: The SharePoint zip (191 MB) was downloaded through the OTP gate and extracted — **10 CSVs, 1,134,799 rows**, AuditData genuinely un-redacted. Findings (full analysis: `raw/research/c26-12-cure-analysis.md`):
  - **Un-cap confirmed**: the cure files are full monthly exports, not 50,000-row-capped. The four previously-missing short-window exports (`2025-12-02`, `2026-02_02`, `2026-03-27`, `202603_02`) fill real gaps — the monthly March file stops Mar 24; the short exports cover the late-March / Apr-1 window.
  - **Redaction state**: narrowed to three tokens — `[REDACTED_ID]`, `[REDACTED_IP]`, `[REDACTED_TOKEN]` (GUIDs, IPs, session/token IDs). Over-redaction bug: the clock in the `CreationDate` column was redacted as `[REDACTED_IP]` in two files, though the ISO `CreationTime` inside AuditData survives (so timing is recoverable). No itemized § 204(4) per-redaction log was provided. **Whether these redactions are CORA-justified is now its own line of inquiry (see redaction audit).**
- **Analytical significance (revised after cure analysis)**: Wynn is confirmed the **sole** tenant user generating `UpdateInboxRules` events across all 1.13M rows — **~19,543 total** (Nov 2025–May 2026), ~3× the earlier 6,357 estimate (the capped files undercounted). Bursts confirmed and larger: Dec 19 (513 in ~2s), Jan 27 (1,173), Feb 24 (2,180), Apr 3 (1,134 in ~44s, touching ~567 distinct rule IDs roughly twice each), Apr 9 (570 in ~3s). **But this is not a mail-suppression scheme on the evidence**: the bursts are overwhelmingly `ModifyMailboxRule` events, for which Microsoft logs no rule body (the blank `Parameters` is native M365 behavior, not Town redaction); every rule body that *is* logged (the `AddMailboxRule` events) is benign — "move to folder," and **every `ForwardTo` across all ten files is internal `@townofpaonia.com`**. No external forwarding, no auto-delete, no redirect, no self-granted mailbox permissions. Mechanics (OUTLOOK.EXE, internal RPC, `ExternalAccess:false`) point to Wynn's desktop Outlook bulk-resyncing a large existing rule set. See Pattern 7.
- **Source**: [[cora-c26-12-m365-audit-logs-response]] (response analysis); cure cover letter `raw/documents/cora-responses/C-26-12-Cure-Response.pdf`; cure analysis `raw/research/c26-12-cure-analysis.md`
- **Assessment**: The first production was both incomplete (four exports missing, admitted) and capped (50k/month); completeness arrived only after a supplemental objection and a free cure. That incompleteness pattern stands. The inbox-rules *content* concern is not borne out by the cured data — but the **scope and basis of the redactions** is the live question now. See [[pattern-of-cora-obstruction]].

### 2026-04-06 (form date) — (no #) — Four-item "system logs" request — **STATUS UNCERTAIN / NEVER DOCKETED**

- **Filed**: form dated 2026-04-06; no email filing trace and no acknowledgment located. Likely submitted in person or via the Town web portal. Exact submission date uncertain.
- **C-number**: none ever assigned in any document on disk. This is a **separate request** from C 26-12 — the docketed C 26-12 response answers only the two-item audit-log + retention request and never mentions Teams, phone, or OneDrive.
- **Subject (four items)**: (1) Complete M365 Unified Audit Log export, all available dates, all event types, CSV/JSON; (2) OneDrive/SharePoint version history for all files in personnel/HR folders; (3) complete call logs from the Town phone system; (4) Microsoft Teams chat and channel message metadata for all Town users (not message content).
- **What was produced**: No response on disk maps cleanly to this four-item request. The M365 audit-log production answers C 26-12; no call logs, Teams metadata, or SharePoint version history have surfaced.
- **Status**: Unknown. No acknowledgment, no deadline, no production confirmed. Logged here so its items (call logs, Teams metadata, SharePoint version history) are not assumed answered by the C 26-12 audit-log production.
- **Source**: `raw/documents/cora-requests/cora-system-logs.pdf`

### 2026-04-23 — CORA C 26-17 — Caselle Permission-Change Communications + Audit Log — **FULFILLED (PARTIAL)**

- **Filed**: 2026-04-23 (emailed; form dated 2026-04-19). Town deemed received 2026-04-27.
- **Acknowledged**: 2026-04-27 by Vetter — "received today, April 27, 2026; deadline April 30, 2026"
- **Extension**: invoked Apr 30 (citing high volume and the need to work with a third party — Caselle/PMS — under C.R.S. 24-72-203(3)(b)(II) and (III)); new deadline **May 11, 2026**
- **Fulfilled**: 2026-05-11 — delivered **on the deadline**
- **Fee**: not stated
- **Subject**: Two items — (1) all communications between Town staff, officials, or contractors (including PMS) regarding any changes to Caselle user permissions, access, rights, role assignments, or segregation of duties, Oct 1 2024 – Apr 19 2026; (2) the Caselle Connect Management Tracking Report (security audit log) filtered to changes in User Rights, Users, and Group Rights tables for the same window, as PDF or CSV.
- **What was produced**:
  - **Item 1** — a redacted PDF containing at minimum two internal email threads: (a) "RE: User name in Caselle" (Michelle Duran / PMS to Wynn and Kaja Bowman, Jul 17 2024) and (b) "RE: Invoice Approval" (Michelle Duran / PMS to Bowman and Wynn, Aug 5 2024), both with email addresses and a PMS phone number redacted.
  - **Item 2** — **DENIED**: "This feature is not used and therefore the record does not exist."
- **Defects**:
  - The Item 2 denial asserts non-existence with no statutory withholding statement under C.R.S. 24-72-204(3) and no independent way to verify that Caselle's Management Tracking Report is in fact disabled — it is a standard module.
  - Both produced emails (Jul and Aug 2024) **predate** the Oct 1 2024 scope window stated in the request; no document from Oct 1 2024 through Apr 19 2026 appears to have been produced for Item 1.
  - Redactions on PMS contact information and email addresses carry no individual statutory justification per C.R.S. 24-72-204(3).
- **Substantive significance**: The **Aug 5 2024** email shows that a PMS-initiated user-permission change caused [[kaja-bowman|Kaja Bowman]] (Staff Accountant) to gain auto-approval on invoices she herself entered — bypassing the control where Wynn (Town Manager) was supposed to approve invoices she created. This is a segregation-of-duties failure. See [[who-controls-the-money]].
- **Sources**: `raw/documents/cora-requests/cora-caselle-permissions-and-audit-log.pdf`, `raw/documents/cora-responses/C-26-17-Caselle-Permissions-and-Audit-Log_Redacted.pdf`, `raw/documents/cora-responses/c26-17-caselle-extension.pdf`
- **Follow-up**: None filed as of 2026-05-29. The "feature not used" denial warrants challenge.

### 2026-05-05 — (no #) — March 2026 M365 Redaction Cure (supplemental to C 26-12) — **RESPONDED (absorbed into C 26-12 cure)**

- **Filed**: 2026-05-05 (emailed evening; Town would deem received the next business day, May 6)
- **Acknowledged**: never formally — no C-number, no statutory deadline. Vetter's May 6 standalone email (subject "C 26-12") delivered the corrected March log and promised the rest but did not docket the request.
- **Subject (three items)**: (1) the true March 1-31 2026 unified audit log via paginated programmatic export, CSV; (2) a complete paginated export beyond the 50,000-row UI cap for all months Nov 2025–May 5 2026; (3) the AuditData column unredacted to the maximum permissible extent OR an itemized per-redaction log under C.R.S. § 24-72-204(4) naming RecordId, subfield(s), statutory subsection, and factual basis.
- **What was produced**: The May 27 C 26-12 Cure Response is the Town's substantive answer, though never labeled with a new C-number. It admits four exports were missing, narrows AuditData redactions to technical identifiers, and waives fees. The cure expressly references Pete's objection: "since you objected to a blanket redaction approach, I completed a more detailed and time-consuming redaction review." Item 2 (paginated beyond-50k) and Item 3-B (itemized § 204(4) log) are **not** confirmed as produced.
- **Defects**: No C-number despite the request being on the standard Town CORA form with all required fields; no statutory acknowledgment with a deemed-received date and deadline; the Town Attorney copy (ClayB@townofpaonia.com) bounced with a permanent delivery failure (MAILER-DAEMON, May 5). The Town treated it as informal correspondence and folded the substance into the C 26-12 cure rather than starting a CORA clock.
- **Sources**: `raw/documents/cora-requests/cora-march-m365-redaction-cure.pdf` and `.md`; `raw/documents/cora-responses/C-26-12-Cure-Response.pdf`

### 2026-05-12 — (no #) — Current inbox rules on Wynn's mailbox (Get-InboxRule output) — **CLOSED (dropped 2026-05-30)**

- **Filed**: 2026-05-12
- **Acknowledged**: 2026-05-20 by Vetter (SamiraV@townofpaonia.com) — bare acknowledgment, no C-number; stated deadline **May 26, 2026**
- **Status as of 2026-05-29**: **OVERDUE** — three calendar days past the stated May 26 deadline. No production, no written denial, no extension (confirmed absent from inbox, spam, and trash).
- **Subject**: The `Get-InboxRule -Mailbox StefenW@townofpaonia.com` output (or equivalent admin-center export) showing all currently configured inbox rules: name, enabled state, conditions, exceptions, actions, and any external forwarding addresses.
- **Why filed**: Targets the anomaly of thousands of `UpdateInboxRules` audit events attributed solely to Wynn (~19,543, Nov 2025–May 2026), with rule definitions redacted in the original C 26-12 production. A discrete PowerShell record; no exemption applies cleanly to operational mailbox configuration.
- **Significance after the C 26-12 cure (2026-05-29)**: The cured audit logs show the logged rule actions are benign (move-to-folder; internal-only forwarding) and the bursts are `ModifyMailboxRule` resyncs with no logged bodies — no evidence of mail suppression. This is **not** a smoking gun and is deprioritized. The statutory violation (no response by the May 26 deadline) stands on its own if Pete chooses to press it.
- **Defect**: Vetter's acknowledgment noted she was out of the office for a week and the request sat unprocessed. That does not constitute a written extension under C.R.S. 24-72-203(3)(b) (which requires written notice within the original 3-day window). The custodian acknowledged a May 26 deadline and then went silent — a clean statutory violation.
- **Follow-up**: **Dropped 2026-05-30.** The cure showed the rule activity is benign, so this is not being pursued; the missed May 26 deadline stays on the record as a procedural violation, but no § 204(5) notice will be filed. The investigation and its benign conclusion are written up at [[inbox-rules-investigation-closed]].

### 2026-05-14 — (no #) — Unredacted AuditData for Wynn UpdateInboxRules on five burst dates — **MOOTED by C 26-12 cure**

- **Filed**: 2026-05-14 (email sent 00:58 MDT; Town would deem received May 14). (An earlier draft of this log listed May 8 — that was a planning/intent date, not the filing.)
- **Acknowledged**: never. No reply, no C-number.
- **Deadline**: 3-day deadline was May 19; **10-day maximum was May 28 — already passed** as of May 29.
- **Status**: **MOOTED** — the Town never acknowledged or answered this request directly (a procedural violation if pressed), but the C 26-12 cure (downloaded May 29) delivered the un-redacted AuditData for these exact events.
- **Subject**: Unredacted `AuditData` JSON payload contents for all `UpdateInboxRules` events attributed to `StefenW@townofpaonia.com` on five dates — Dec 19 2025, Jan 27 2026, Feb 24 2026, Apr 3 2026, Apr 9 2026. These records were already located and exported once under C 26-12; this seeks an unredacted re-export of that subset. The `Parameters` subfield contains the rule definitions (names, conditions, actions, any forwarding/delete configurations).
- **Why these five dates**: Each is a burst date from the cross-month audit log analysis. Apr 3 2026 (951 events in ~2 minutes) falls on the first business day after the Board's March 30 libel letter — the timing linkage between Wynn's mailbox-rule activity and the retaliatory correspondence is the core of the inbox-rules anomaly. See Pattern 7 and [[pattern-of-retaliation]].
- **Answer from the cure**: The cure data was downloaded and analyzed on May 29. The five burst dates are dominated by `ModifyMailboxRule` events, for which Microsoft records **no** rule body — so the `Parameters` are empty at the source, not redacted. There is nothing further to un-redact for these specific events. The handful of `AddMailboxRule` bodies present are benign (move-to-folder; internal-only forwarding). This request is therefore substantively answered (negatively).

### 2026-04-20 — CORA C 26-15 — Wynn outbound emails on November 4, 2024 — **FULFILLED (DEFECTIVE FORMAT)**

- **Filed**: 2026-04-20 (Mon) at 8:25 AM MDT (corrected version; original earlier that day had a blank description due to a fill-script bug, withdrawn the same day)
- **Acknowledged**: 2026-04-23 by Vetter — receipt date used for deadline calculation
- **Extension taken**: 2026-04-28 — 7-day extension issued, new deadline 2026-05-08
- **Fulfilled**: 2026-05-08 — used the full extension
- **Subject**: All emails sent by Town Administrator Wynn from any Town of Paonia email account on November 4, 2024
- **Why this date**: November 4, 2024 is the day Pete McCarthy (then a Planning Commissioner) sent his Planning Commission Meeting Comments at 1:13 PM raising procedural concerns. Wynn's response actions on that date are central to the [[pattern-of-retaliation]] analysis.
- **What was produced**: 165-page PDF (`C 26-15 Response.pdf`, 17.7 MB)
- **Production defect — format**: PDF metadata shows the file was assembled in **Microsoft Word** (title field: `Microsoft Word - C 26-15 Response`; author: `SamiraV`) and exported via **Adobe Acrobat (64-bit) 26.1.21529** at 12:50 AM Mountain Time on 2026-05-08. This is not a direct print from Outlook. As a result, the production exhibits inconsistent header preservation:
  - The 11:10 AM "FW: Your new service plan from COOLEYS" (FW-to-self) and the 1:59 PM "RE: Paonia Hydrogeologic study cultural survey" (to Alpine Archaeology / Wright Water Engineers) retain a complete `From: Stefen Wynn` / `Sent: Monday, November 4, 2024 [time]` header.
  - The forward of Pete McCarthy's 1:13 PM Planning Commission email to "Mayor, Trustees and Planning Commission," the reply to Mary Bachran's invoice ("Invoice from Mary for October. SW"), the reply to Samira Vetter's 12:32 PM "FW: healthy environments Master Plan revision" ("Hi Morgan, Can you print and prepare 10 copies of this attachment please? SW"), and the P-Hill tower extension correspondence are produced **without a top-level Sent timestamp**.
- **Why timestamps cannot be recovered from M365 audit logs**: The Town's M365 audit retention is 180 days (per the C 26-12 response). November 4, 2024 is approximately 18 months prior to the production date — well outside retention. The native `.msg` / `.eml` files in Wynn's mailbox, or direct PDF prints from Outlook, are now the only sources for the missing send timestamps.
- **Follow-up — C 26-21**: Filed 2026-05-20 to recover the four missing timestamps in native `.eml` format. It **partially resolved** this defect — timestamps recovered for two of the four targeted emails (see C 26-21 below).
- **Source**: [[cora-c26-15-wynn-sent-emails-nov4-2024]] (response analysis)

### 2026-05-20 — CORA C 26-21 — Native .eml files for four Wynn emails of Nov 4, 2024 — **FULFILLED (PARTIAL — 2 of 4 responsive)**

- **Filed**: 2026-05-20 (submitted); received by the Clerk 2026-05-21. (An earlier draft of this log carried this as a May 8 "pending" matter — that was an intent date; actual filing was May 20.)
- **Acknowledged**: 2026-05-21 (receipt stamped on the request form; no separate ack email in Gmail)
- **Deadline**: **2026-05-27** (3 working days from May 21; no extension)
- **Fulfilled**: 2026-05-27 — delivered within the deadline
- **Fee**: none noted
- **Subject**: Native `.eml` (or direct Outlook-PDF) files preserving complete header metadata for four emails Wynn sent on November 4, 2024 — all four produced under C 26-15 but with top-level send timestamps stripped: (a) Wynn's forward of McCarthy's Planning Commission comments; (b) Wynn's "Hi Morgan, print 10 copies... SW" reply to Vetter's 12:32 PM master-plan forward; (c) Wynn's "Invoice from Mary for October. SW" email; (d) Wynn's "P-Hill tower extension Paonia" email.
- **What was produced** — four `.eml` files, only two genuinely Wynn-outbound:
  - **(a) responsive** — `C106545E0C5FBD068AF13A8ABE5F767A.eml`: Wynn forwards McCarthy's PC comments; From: StefenW; Date header `Tue 5 Nov 2024 01:10:53 +0000` = **Nov 4 6:10 PM Mountain** (a Nov-4 send despite the UTC date rollover).
  - **(c) responsive** — `60B177499A58440D79E8A013B567FC39.eml`: Wynn's "Invoice from Mary for October. SW." forward; From: StefenW; Date `Mon 4 Nov 2024 15:55:04 +0000` = **Nov 4 8:55 AM Mountain**.
  - **(b) NON-RESPONSIVE** — `55856453240EA8FB230790ECB1A83086.eml` is Vetter's **inbound** message *to* Wynn (the email he was supposed to reply to), not his outbound "Hi Morgan, print 10 copies" reply.
  - **(d) NON-RESPONSIVE** — `2F3CDF22176991B29A52C9E5C479CCF9.eml` is external contractor Lance Bleyhl's email to Delta County Planning, with Wynn merely on Cc; the Exchange header tags it `X-MS-Exchange-Organization-MessageDirectionality: Incoming`. No Wynn-sent P-Hill email was produced.
- **Defects**: Items (b) and (d) are wrong-direction substitutions — the Town produced inbound messages received by Wynn instead of the outbound messages he sent, and closed the request as fulfilled. Open question: do Wynn-sent originals for (b) and (d) exist in the Exchange mailbox, or were they never sent from his account?
- **Sources**: `raw/documents/cora-responses/C 26-21 Request McCarthy.pdf`, `C 26-21 Response.pdf`, and the four `.eml` files listed above
- **Follow-up**: None filed as of 2026-05-29. A targeted re-request or cure could demand Wynn's outbound "Hi Morgan" reply and any Wynn-authored "P-Hill tower extension" email. The board complaint of 2026-05-05 (CORA obstruction) is relevant context.

### 2026-05-13 — CORA C 26-23 — Finance Committee Records — **RESPONDED (DISPUTED)**

- **Filed**: form dated 2026-05-09; submitted to the Clerk 2026-05-13; received by the Clerk 2026-05-20 (the statutory clock ran from the May 20 received date)
- **Acknowledged**: 2026-05-20 (Clerk's office stamp on the returned request form; no separate ack email)
- **Deadline**: **2026-05-26** (no extension invoked) — the response was on-deadline
- **Fee**: $0.00 (15 minutes search time, within the free hour; no pages produced)
- **Subject**: All records of Town of Paonia Finance Committee meetings Jan 1 2024 – May 9 2026 — minutes, agendas, sign-in sheets, and any log/journal/tracking spreadsheet the Committee produces or maintains. The request expressly invoked § 24-72-204(3) and asked for written non-existence confirmation if records did not exist.
- **What was produced**: [[ruben-santiago|Ruben Santiago]]'s May 26 letter redirected Pete to the Board meeting packets on the Town website — specifically the "Disbursements" entry (initialed Payment Approval Reports) — and offered an in-person appointment to review physical invoices. **No** minutes, agendas, sign-in sheets, or logs were produced. **No** § 24-72-204(3) non-existence statement was issued. The request was declared closed.
- **Defects**:
  1. **Redirect without production** — a Payment Approval Report (an accounting-system output with initials) is not a meeting minute, agenda, sign-in sheet, or deliberative log. Treating it as responsive to a request for meeting records is a substantive dodge.
  2. **No § 204(3) certification** — neither the records nor the requested written non-existence confirmation was provided.
  3. **Closed without basis** — the letter declared the request "closed" without addressing five of the six enumerated categories.
  4. **Vetter May 27 admissions** (on the record in Gmail): "I don't believe it is written down anywhere" (no written Finance Committee procedures); "did not locate any resolution or document specific to committee roles" (Resolution 2024-09 offered as "closest," not as responsive); and a refusal to certify non-existence — "I can not say no such records exist because I provided you with a way to access the records that were responsive," a circular position (the existence of one record type does not preclude the non-existence of a different requested type).
- **Follow-up**:
  - **May 27, 2026** — Pete sent a 6-category itemized demand citing § 24-72-204(3), to Vetter and the full Board. Vetter replied the same day with the admissions above but maintained the closed-request position. (`raw/documents/cora-requests/cora-c26-23-follow-up.md`)
  - **Sent 2026-06-01 (08:00 MDT)** — a surgical follow-up reframed on C.R.S. § 24-72-204(4) (a grounds-for-denial demand rather than a non-existence certification), sent to Vetter only ("Re: C 26-23 Records Request Response," threaded into the C 26-23 reply chain; Gmail msg `19e837bf6592073c`). It boxes each missing category into produce / cite-an-exemption / concede-non-existence, and doubles as a § 24-72-204(5) 14-day heads-up — so absent resolution, Pete's earliest district-court filing window opens roughly **2026-06-15**. Drafted May 29; sent the morning of June 1.
  - **2026-06-01 (Vetter response, same day — ITEMIZED NON-EXISTENCE CONCESSION)** — Vetter replied within ~3 hours, in two emails (10:49 and 10:54 MDT; Gmail msgs `19e84172a5f65885`, `19e841bd0063b0aa`). She answered the follow-up's four-item produce/concede list with a clean, **itemized written "No such records exist"** on every category: (1) meeting minutes — none; (2) agendas — none; (3) sign-in / attendance records — none; (4) any log/journal/tracking spreadsheet of invoices questioned, flagged, delayed, or declined — none. Her explanation: *"I have not withheld any records. The only time the Finance Committee 'meets' is to go through invoices, approve disbursements and to sign checks. No agendas, sign-ins, meetings etc."* — questioned invoices are handled in person or at the regular meeting's consent agenda, and the disbursement reports + initialed invoices *"are the only things that would be considered records of the Finance Committee."* **This is the § 204(3) non-existence statement the follow-up demanded** — CORA prescribes no particular form, and a written statement from the custodian that the record does not exist satisfies it. It is now on the record in her own email (no longer the verbal "I don't think it's written down"). **Substantive significance:** the Finance Committee — the Town's #1 cited "control" on Wynn's financial authority — keeps **no minutes, agendas, attendance, or deliberative log of anything questioned**; there is no record that it functions as oversight at all. Feeds [[who-controls-the-money]] and discrepancy #12.
  - **Still open — the establishing document.** In email #2 Vetter said the Committee has existed *"since shortly after the embezzlement,"* Board-created, but *"I have been unable to find a document yet that lists the creation but suspect it will be in meeting minutes."* So whether **Resolution 2024-09** actually creates the Committee and defines its role (vs. being merely "closest") is unresolved — the one piece of C 26-23 not yet pinned. Pete replied again June 1 (msg `19e848e2a786c109`).
- **Sources**: `raw/documents/cora-responses/C 26-23 cora-finance-committee-records.pdf`, `C-26-23-Response_Signed.pdf`, `raw/documents/cora-requests/cora-c26-23-follow-up.md`
- **See also**: [[finance-committee-effectiveness]], [[who-controls-the-money]]

### 2026-05-31 — CORA (pending #) — New Focus HR Employee/Personnel Handbook — **DRAFTED (ready to send)**

- **Drafted**: 2026-05-31. Prepared as `raw/documents/cora-requests/cora-newfocushr-handbook.md`; addressed to Vetter as custodian (custodian-only, no Board CC on the first pass). Not yet sent.
- **Subject (three items)**: (1) a **specifically named file** — `TownofPaonia_EmployeeHandbook_DRAFT_02012026.pdf` (the Feb 1 2026 draft) in original PDF + native source, **plus** any handbook version later than Feb 1 2026 (most recent as of the processing date); (2) the **change/revision records** — the "Changes for the Employee Handbook 4-2026" working file (.xlsx/.ods), any redline/tracked-changes versions, and earlier dated drafts; (3) all **Town ↔ New Focus HR communications** about the handbook (`kristen@`, `alona@`, `newfocushr.com`), June 1 2025–present, most-recent prioritized, incl. the "Personnel Policy Handbook Update" thread.
- **Why this matters**: The Town paid New Focus HR the full **$7,500** for an employee handbook that its own staff reports called "complete" by October 2025 and that has **never been brought to the Board for adoption or made public** (see [[hr-contract-without-a-bid]], [[newfocushr-hr-contract]]). This is the first records request aimed at the handbook itself — the entire New Focus HR record to date was built from public board packets, not CORA.
- **Existence is pre-proven**: The Town's own M365 unified audit log (produced under [[cora-c26-12-m365-audit-logs-response|C 26-12]] cure) records the handbook draft and the change file being created, edited, downloaded, and emailed as recently as **April 27–28, 2026**, and New Focus HR correspondence through **late April 2026** (inbound firm email Apr 22; outbound to `alona@newfocushr.com` Apr 28; "Personnel Policy Handbook Update - DH" cluster Apr 7). A § 24-72-204(3) non-existence certification is therefore foreclosed. Note: the audit log only runs through **Apr 30, 2026** (180-day retention), so any May 2026 revision is invisible to it — which is why Item 1 asks for the most current version as of the processing date, not a fixed date.
- **Anti-dodge framing**: pre-empts the "feature not used / record does not exist" move (C 26-17) and the "redirect-and-close" move (C 26-23) by citing the audit-log proof of existence; addresses the work-product exclusion (§ 24-72-202(6.5)) — a paid consultant's policy deliverable is not an elected official's deliberative work product; demands itemized § 204(3)/(4) basis for any withholding; requires a written cost estimate before any chargeable work (§ 24-72-205(6)).
- **Source for the file-level facts**: `raw/research/` audit-log analysis of the C 26-12 cure CSVs (`raw/documents/cora-responses/C-26-12-cure/`).

### 2026-05-28 — CORA (pending #) — Communications re: Town Administrator (Wynn) non-renewal — **PENDING**

- **Filed**: 2026-05-28 (Thu) at 9:40 AM via email, with a CORA Request Form attached
- **Acknowledged**: 2026-05-29 by Vetter (reply) — deadline stated as **June 3, 2026**. (A strict 3-working-day count from a May 28 filing would land on June 2; the Gmail acknowledgment states June 3, so June 3 is logged.) No C-number assigned in the acknowledgment.
- **Subject**: All communications regarding Town Administrator [[stefen-wynn|Stefen Wynn]]'s non-renewal; all communications with former Mayor Mary Bachran; executive-session records related to these subjects. Period: May 1 – May 27, 2026.
- **Status**: Pending — within the deadline.
- **Outlook**: Given the subject matter (non-renewal, Bachran communications, executive sessions), this is likely to draw privilege assertions and/or an extension request.
- **Source**: Gmail thread 19e6f3b52fd8b72d

## Patterns and Observations

### Pattern 1: Vetter uses extensions liberally on simple requests

The Caselle ERP request (C 26-10) is the clearest example. The underlying record is a single ERP system user access report, producible in 30 minutes by anyone with admin access to the Caselle system. Vetter took the maximum 7-day extension on April 7. This extends the deadline by a full week with no documented "extenuating circumstance" beyond the extension itself.

### Pattern 2: Maximum charging on automated requests

The Verkada CORA C 26-09 was billed at 5 hours of staff time ($167.90) for what was substantially automated exports. The actual production was a click of an Export button in Verkada Command, plus column-wide find-and-replace redactions in Excel. Realistic time: under 60 minutes. Billed time: 5 hours. This is 5x the actual work.

### Pattern 3: 2024 denial that CFOIC confirmed was improper

The M365 audit logs request from September 2024 was denied with a statutory citation (C.R.S. 24-72-203(2)(a)) that CFOIC's executive director confirmed in writing was the wrong basis for denial. The records were never produced. The same request — for the same type of records — has now been re-filed in April 2026 (the M365 audit logs request, C 26-12).

### Pattern 4: Acknowledgment timing is at the edge of the standard window

For each recent request, Vetter acknowledges receipt one calendar day after the email was sent, then declares the standard deadline as 3 working days from acknowledgment. This pushes every standard deadline to the maximum statutory limit. There has been no instance of a CORA being fulfilled before the standard 3-day window expired.

### Pattern 5: A judicial finding of CORA bad faith already exists

In the [[bill-brunner|Brunner CORA case]], Judge Steven Schultz found the Town "failed to exercise reasonable diligence or reasonable inquiry" and ordered the Town to pay Brunner's legal costs. This is a judicial finding of CORA bad faith on the record. The Town has not changed its CORA practices since.

### Pattern 6: Every production is partial on first pass; completeness only arrives under pressure

No recent production has been complete the first time. **C 26-12** delivered a "March" file that was a byte-identical duplicate of April, capped every month at 50,000 rows, and redacted 100% of the AuditData column — and only after a supplemental objection did the Town admit (in the May 27 cure) that *four* exports were missing and produce a free, narrower-redaction cure. **C 26-21** produced two inbound emails in place of the two outbound Wynn emails actually requested, and closed the request as fulfilled anyway. **C 26-11** produced four emails — two of them Pete's own — for a six-day window in which the Board convened a special meeting and signed a joint letter. **C 26-15** produced outbound emails with their Sent timestamps stripped by Word-document assembly. The first production is consistently the floor, not the ceiling; the requester has to push to get the rest.

The strongest documentary proof is now **C 26-11**: Vetter said the only "drafts, revisions, and tracked changes" of the March 30 letter were the two already-published versions, yet the Town's own C 26-12 audit log names non-published draft threads sitting in the Mayor's, Clerk's, and trustees' mailboxes in the same window — including `Re: draft "letter from Trustee"` (3/27–3/28) and `Response to the Citizen's 10 things flyer . I Need comments /no later than 2:00 tomorrow` (3/28–3/31). None of those were produced or logged as withheld. The audit log records only subjects, timestamps, and which mailbox holds each item — not bodies or recipients — but the existence of additional, non-published draft and comment threads in those mailboxes, which the production neither produced nor logged as withheld, is established by the Town's own record. And the same pattern recurs one level up: the C 26-12 audit-log production *itself* first arrived missing exactly the two windows (true March and post-April-9) that would later document both the C 26-11 withholding and the April 21 deletions — completeness again arriving only after objection.

### Pattern 7: The inbox-rules anomaly (real, but not a mail-suppression scheme)

Wynn is the **only** user in the entire Town tenant generating `UpdateInboxRules` events — ~19,543 between November 2025 and May 2026 (the original capped files undercounted at 6,357), fired in bulk bursts: 513 in ~2 seconds on Dec 19 2025; 2,180 on Feb 24 2026; 1,134 in ~44 seconds on Apr 3 2026 (the first business day after the Board's March 30 libel letter, touching ~567 distinct rules roughly twice each); 570 on Apr 9. That one account carries ~567 inbox rules and re-stamps the whole set in seconds is genuinely unusual.

The C 26-12 cure (retrieved and analyzed 2026-05-29) tested the darker reading and **did not support it**. The bursts are overwhelmingly `ModifyMailboxRule` events, for which Microsoft logs no rule body — so the blank rule definitions are native M365 behavior, not Town redaction; no request can surface contents that were never recorded. Every rule body M365 *does* log (the `AddMailboxRule` events) is benign: "move to folder," and **every `ForwardTo` across all ten cure files routes to an internal `@townofpaonia.com` address.** No external forwarding, no auto-delete, no redirect, no self-granted mailbox permissions anywhere. The mechanics — OUTLOOK.EXE over internal RPC, `ExternalAccess:false` — indicate Wynn's own desktop Outlook bulk-resyncing a large pre-existing rule store, not deliberate per-rule editing.

This line of inquiry is now **closed**. The **Get-InboxRule** request (filed May 12) is dropped and the companion **five-burst-dates** request (filed May 14) is mooted — the cure showed the logged rule activity is benign, and the Apr-3-after-the-libel-letter timing is not corroborated by any suppression mechanism. The full write-up of what was checked and why it is benign is at [[inbox-rules-investigation-closed]]. The live records thread has shifted from the rules' *content* to the **scope and legality of the Town's redactions** — see [[redaction-audit-c26-12-cure]] and [[pattern-of-retaliation]].

### Pattern 8: Redirect-and-close

On the Finance Committee request (C 26-23), the Town produced an *adjacent* record — the initialed disbursement (Payment Approval) report from the Board packets — and declared the request closed, while producing none of the actually-requested minutes, agendas, sign-in sheets, or logs and refusing to certify their non-existence under § 24-72-204(3). Vetter's on-record position — "I can not say no such records exist because I provided you with a way to access the records that were responsive" — treats the existence of one record type as discharging a request for a different record type. See [[finance-committee-effectiveness]].

## Open Items as of 2026-05-31

| Request | Action Required | Notes |
|---|---|---|
| New Focus HR handbook (pending #, drafted May 31) | **Send it** | Draft ready at `raw/documents/cora-requests/cora-newfocushr-handbook.md`. Most-recent handbook version + change file + firm comms. Existence pre-proven from the C 26-12 audit log; no plausible exemption. |
| Redaction audit (C 26-12 cure) | **Audit what's redacted & whether it's CORA-justified; recover what's recoverable** | Active focus. Catalog the `[REDACTED_ID]` / `[REDACTED_IP]` / `[REDACTED_TOKEN]` categories, test each against § 24-72-204(2)(a)(VIII), and recover over-redacted/inconsistent values (e.g. timestamps from surviving `CreationTime`). |
| Inbox-rules / Get-InboxRule (no #, May 12) | **Dropped — closed** | Cure showed the rules are benign; not pursued. Findings written up at [[inbox-rules-investigation-closed]]. |
| 5-burst-dates AuditData (no #, May 14) | **Closed — mooted** | Cure delivered the un-redacted AuditData; nothing to un-redact. See [[inbox-rules-investigation-closed]]. |
| C 26-12 cure | **Done** — downloaded & analyzed 2026-05-29 | 1.13M rows, un-redacted; inbox-rule activity benign. Analysis: `raw/research/c26-12-cure-analysis.md`. |
| C 26-23 § 204(4) follow-up | **Confirm sent** | Gmail draft (Vetter-only, threaded) prepared May 29; a "Re: C 26-23" send appears queued for ~June 1 — verify it went out. Boxes each category into produce / cite-exemption / concede non-existence. |
| C 26-21 (May 20) | Reopen for non-responsive items (b) and (d) | Town substituted inbound emails for Wynn's outbound master-plan reply and P-Hill email. |
| C 26-17 (Apr 23) | Challenge the "feature not used" denial of the Caselle audit log | No statutory withholding statement; Management Tracking Report is a standard module. |
| Non-renewal CORA (pending #, May 28) | Watch for production or extension | Due June 3 per Vetter; likely to draw privilege/extension. |
| Four-item "system logs" request (no #) | Confirm whether ever docketed | No C-number, no ack; call logs / Teams metadata / SharePoint version history never produced. |
| 4 audit-log-derived CORA (would be C 26-25/26/27/28) | **⚠ NEVER SENT — still unsent Gmail drafts (found 2026-05-31). ACTION: send or discard.** | The docket previously marked these SENT/PENDING with June 3–4 deadlines; that was wrong — none ever left the Drafts folder, so there are no live deadlines. C 26-28 is **duplicated** (two drafts; delete one). Built from the C 26-12 audit-log forensics on the flyer / "by McCarthy" / retaliation episode. CCJRA #2 (PD bullying thread) **was** sent, but on **May 31** (not May 30); folds into the Laiminger meeting. |

## Escalation Paths

If a CORA request goes past the maximum statutory deadline (10 working days from receipt) without records or a properly documented denial:

1. **Written follow-up** documenting the missed deadline and requesting immediate production
2. **Complaint to the Colorado Freedom of Information Coalition (CFOIC)** at https://coloradofoic.org for guidance and media attention
3. **Written notice of intent to sue** under C.R.S. 24-72-204(5) — must give 14 days' written notice before filing in district court
4. **District court action** for production and reasonable attorney fees (CORA includes a fee-shifting provision in favor of the prevailing requester)

## Related (non-CORA) Matters

These run under different statutes than CORA and are tracked here for context only.

### CCJRA — Colorado Criminal Justice Records Act (C.R.S. § 24-72-301 to § 24-72-309)

| Subject | Date Filed | Status | Notes |
|---|---|---|---|
| Police records re complaints concerning Stefen Wynn | 2026-05-28 | **PENDING** | Filed alongside the May 28 CORA non-renewal request. Acknowledged same day by Chief Matt Laiminger. $50 fee threshold noticed (he will notify before exceeding it). CCJRA has no fixed 3-day clock (§ 24-72-305). Pete set an in-person meeting with Laiminger for June 1. |
| **CCJRA #2** — PD "Bullying and Harassment on Social Media in Advance of 500-600 Political Activists…Rally" thread (Laiminger ↔ Officer Henderson), plus the "No Kings Rally…Fear for Safety…with my Image" thread to the extent in PD custody | 2026-05-31 (sent) | **SENT — PENDING** | Confirmed sent **2026-05-31 (17:23 MDT)** — corrected from an earlier "May 30" note — subject "…PD communications re: flyer / social-media harassment" — covers the Henderson bullying thread, the No Kings rally thread, and any PD records framing the flyer/posts as bullying/harassment/threat, Mar 24–Apr 30 2026, each as the full thread. $50 fee threshold noticed. CCJRA has no fixed clock; folds into the June 1 Laiminger meeting. |

### Citizen-Initiative Petitions — Surveillance Policy Ordinance (C.R.S. § 31-11-106)

Four successive form-review rejections by the Clerk on shifting administrative-function theories, none citing caselaw. The clerk's § 31-11-106(3) review is limited to *form*; subject-matter rejection exceeds that authority. The controlling Colorado Supreme Court cases (*City of Aurora v. Zwerdlinger*, 571 P.2d 1074 (Colo. 1977); *Vagneur v. City of Aspen*, 295 P.3d 493 (Colo. 2013)) cut against the Town's theory.

| Petition | Filed | Rejected | Theory cited | Notes |
|---|---|---|---|---|
| #1 (original) | ~2026-03-29 | 2026-04-03 | "administrative function" (6 grounds) | See [[initiative-process]]. |
| #2 ("Revised Cameras") | ~2026-04-07 | 2026-04-13 | "purely executive acts" (3 grounds) | Narrowed to remove objectionable provisions. |
| #3 | 2026-04-20 | 2026-04-27 (emailed Apr 28) | "managerial and operational function" (1 paragraph) | Rejection letter misnamed the petition as the "Short-Term Lodging Policy" — a template applied without reading the submission. |
| #4 (corrected resubmission) | 2026-05-19 | 2026-05-28 | "managerial and operational function" | Rejected **one business day past** the § 31-11-106(3) 5-day deadline (deadline May 27). Near-identical language to the #3 rejection. |

Pete filed a C.R.C.P. 106 notice of intent (mandamus, Delta County District Court) on April 29, 2026; it remains outstanding and is strengthened by the fourth rejection. (Separate June 2025 STR, "Robot Moratorium," and April 13 "Short-Term Lodging" petitions are distinct matters, not part of this surveillance series.)

## See Also

- [[pattern-of-cora-obstruction]] — Analysis across the 2026 CORA responses
- [[public-records-access]] — Issue page on CORA access patterns
- [[cora-c26-09-verkada-audit-logs]] — The Verkada CORA response
- [[cora-c26-11-libelous-communications-response]] — The libelous-communications CORA response
- [[cora-c26-12-m365-audit-logs-response]] — The M365 audit-log CORA response
- [[cora-c26-15-wynn-sent-emails-nov4-2024]] — The Wynn Nov-4 outbound-emails CORA response
- [[cora-libelous-communications]] — The original libelous-communications CORA request
- [[reporter-package-email-coverup]] — The 2024 M365 audit log denial documentation
- [[who-controls-the-money]] — Segregation-of-duties and financial-control analysis (C 26-17 context)
- [[finance-committee-effectiveness]] — Open question the C 26-23 request targets
- [[pattern-of-retaliation]] — Context for the Wynn inbox-rules anomaly and Nov-4 timeline
- [[stefen-wynn]] — Town Administrator; subject of the audit-log, inbox-rules, and non-renewal matters
- [[samira-vetter]] — Town Clerk and records custodian
- [[ruben-santiago]] — Responding custodian on the Finance Committee request
- [[initiative-process]] — The citizen-initiative petition process
- [[bill-brunner]] — Subject of the prior CORA bad faith ruling
