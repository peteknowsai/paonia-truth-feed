# Top 20 CORA Targets — M365 Audit Log Mining (Nov 2025–May 2026)

**Source:** Forensic mining of the Town of Paonia M365 audit logs produced under C-26-12. Every subject below is verbatim from the audit logs and is PROVEN to exist in-window. The logs prove existence and capture mailbox + operation + timestamp, but do **not** log recipients — so each request must cite **subject + date window + mailbox(es)**.

**Window:** November 2025 – May 2026.

**Universal framing for every item below:** Request the email(s) matching the verbatim subject in the named mailbox(es) over the cited window, **including** the message body, all attachments, headers/recipient lists, and — for calendar items — the invite, attendee list, accept/decline responses, and agenda. Where the Town withholds anything, demand a written statement of the statutory grounds under **C.R.S. § 24-72-204(4)**, a privilege log identifying author/recipients/date/basis for each withheld record, and production of all reasonably segregable non-privileged portions (§ 24-72-204(6) is not a basis to withhold; redact and produce). For any subject the logs show as **HardDeleted / SoftDeleted / MoveToDeletedItems / FolderRecycled**, expressly request recovery from backups, the recycle bin, litigation-hold/in-place-hold copies, and the M365 audit record of the deletion itself, and state that the deletion does not extinguish the Town's production obligation.

---

## Rank 1 — `records-obstruction` (smoking gun)
- **Subject:** "New CORA request from Mr. McCarthy"
- **Window:** Apr 1, 2026 09:46 MDT (single timestamp)
- **Mailbox / principals:** Vetter (Clerk)
- **Why it matters:** This subject appears in the audit log ONLY as a **HardDelete** in the records custodian's own mailbox — a notice of an incoming McCarthy public-records request permanently destroyed the day after the Mar 30 letter. A CORA-request notice hard-deleted by the Clerk is the single most direct evidence of records obstruction/spoliation in the entire set.
- **Privilege risk:** Low. A notice of a citizen CORA request is administrative records-custodian business with zero plausible privilege.
- **Framing tip:** The HardDelete *is* the record. Demand the deleted message recovered from backup/recycle/hold, plus the full audit entry showing who deleted it and when. No § 24-72-204(4) ground reaches a records-request intake notice.

## Rank 2 — `records-obstruction`
- **Subject:** "Clayton M Buchner, Attorney at Law, LLC" (SharePoint contract folder)
- **Window:** Nov 19, 2025 11:30 – Dec 30, 2025 12:14 MDT
- **Mailbox / principals:** Vetter (Clerk) — SharePoint path: `Shared Documents/Town/Users/Town Clerk/Administration/Agreements, Contracts & Leases/Clayton M Buchner, Attorney at Law, LLC`
- **Why it matters:** The Town Attorney's own contract/employment-agreement folder was **FolderRecycled** by the Clerk in **two** mass sweeps (Nov 19 and Dec 30, 2025) that also recycled the Bachran, Legal_2022, CIRSA, and Kelly PC legal folders. Across all logs there is exactly **one** FolderRestored event — the bulk was not undone. Direct destruction of the attorney's contract record during the same Nov–Dec Buchner-deletion window.
- **Privilege risk:** Low. A vendor/employment contract folder and its deletion are facts, not legal advice.
- **Framing tip:** Request the full contents of the recycled folder (esp. `emp_agr_paonia_buchner_1.28.25.docx`), the FolderRecycled/FolderRestored audit events, and recovery from the SharePoint preservation hold. A contract folder is plainly non-privileged.

## Rank 3 — `pete-libel`
- **Subject:** "Attorney Client privilege: FW: Formal Demand for Retraction and Notice of Personal Legal Liability"
- **Window:** Mar 31, 2026 13:24 – Apr 3, 2026 09:28 MDT (collapse the "to me from Pete McCarthy" and PD-mailbox RE/FW variants into this one thread; also pursue the Apr 22 follow-up "Retraction demand deadline expired — no response received")
- **Mailbox / principals:** Smith (Mayor), PTownLegal, Vetter (Clerk), Wynn (Admin); McCarthy variant also touches mlaimingerppd (PD)
- **Why it matters:** This IS the libel-letter thread — Pete's own Formal Demand for Retraction, forwarded internally under an "Attorney Client privilege" header the Mayor stamped on a forward of a citizen's own letter, the day after the Mar 30 demand. Then Vetter MoveToDeletedItems it four times and PTownLegal deletes once. Privilege-labeling an inbound citizen letter, then deleting it, is the headline.
- **Privilege risk:** Med. Label was applied by a non-attorney forwarder to McCarthy's OWN letter — a weak privilege claim. The cover note might carry advice; the underlying letter cannot be privileged.
- **Framing tip:** Demand the forwarded underlying demand letter (Pete's own document — not privileged), the transmittal/header, and a § 24-72-204(4) ground for any withheld cover commentary. Challenge the self-applied label: privilege is not created by typing it into a subject line.

## Rank 4 — `pete-libel-coordination`
- **Subject:** "Response to the Citizen's 10 things flyer . I Need comments /no later than 2:00 tomorrow"
- **Window:** Mar 28, 2026 15:08 – Apr 8, 2026 12:05 MDT
- **Mailbox / principals:** PTownLegal, Smith (Mayor), Hunter (Trustee), Wynn (Admin)
- **Why it matters:** The coordination engine for the Board's Mar 30 response to Pete's "Ten Things" flyer — a rush "I need comments by 2:00 tomorrow" thread looping Mayor, Trustee, Administrator and legal in the 48 hours before the Mar 30 special meeting/libel letter. This is the drafting record of the very response Pete is investigating, and it was SoftDeleted/MoveToDeletedItems.
- **Privilege risk:** High. Lawyer on a thread soliciting edits to an official public statement — Town will claim attorney-client. But the deadline-driven "I need comments" framing shows PR/messaging coordination, not pure legal advice; arguably waivable.
- **Framing tip:** Scope to the non-attorney edits, the drafts circulated, the deadline/transmittal mechanics, and any version sent to or from non-lawyers (waiver). Demand a per-message § 24-72-204(4) statement; a blanket privilege claim over a PR-edit thread is improper.

## Rank 5 — `pete-libel`
- **Subject:** "Formal Complaint: Pattern of Retaliation and Request for Board Action"
- **Window:** Mar 30, 2026 15:29 – Apr 24, 2026 17:47 MDT
- **Mailbox / principals:** Smith (Mayor), Hunter (Trustee), PTownLegal, Vetter (Clerk), Wynn (Admin), plus MikeH, KarenT, WalterC, RickS, HectorM (near-full board)
- **Why it matters:** A formal retaliation complaint demanding Board action, landing the afternoon of the Mar 30 special meeting and circulating to essentially the whole Board plus legal. Smith SoftDeletes it twice within minutes; Hunter **HardDeletes it twice** that night (Mar 30 11:49p / Mar 31 12:04a). A retaliation complaint hard-deleted by a Trustee hours after receipt is a serious finding — and reaches more mailboxes than almost any other thread.
- **Privilege risk:** Low. An inbound complaint requesting Board action is a public record by nature; only any lawyer reply commentary could be privileged.
- **Framing tip:** Request the complaint as received in each mailbox plus the deletion audit events (esp. Hunter's HardDeletes). Emphasize the complaint document itself cannot be withheld; carve out only attorney replies and demand a log for those.

## Rank 6 — `surveillance-cameras` (smoking gun)
- **Subject:** "Questions Re Camera Access."
- **Window:** Apr 13, 2026 08:45 – Apr 24, 2026 08:42 MDT
- **Mailbox / principals:** Hunter (Trustee), Wynn (Admin), Smith (Mayor)
- **Why it matters:** Confined to exactly the three principals at the center of the access dispute. Hunter **HardDeleted it ~8 times in a four-minute burst** (Apr 13 08:47–08:50) during the live controversy over who could see the Verkada dashboard — textbook spoliation of a record literally titled "Questions Re Camera Access."
- **Privilege risk:** Low. A trustee-to-administrator exchange about who gets camera access is operational, not legal advice.
- **Framing tip:** Lead with the deletion pattern; demand recovery and the HardDelete audit events. Operational access questions carry no privilege.

## Rank 7 — `wynn-personnel` / `legal-attorney` (cross-mailbox anchor)
- **Subject:** "Discuss Citizen Complaints re: Administrator"
- **Window:** Apr 8, 2026 16:38 – Apr 28, 2026 18:10 MDT
- **Mailbox / principals:** Vetter (Clerk), Wynn (Admin), Hunter (Trustee), PTownLegal, Smith (Mayor), Santiago (Deputy), plus DaoineB, AshleyR
- **Why it matters:** The verbatim Apr 8 agenda title at the heart of the case — the single most cross-mailbox thread in the dataset, coupling "citizen complaints" against Wynn to the executive-session machinery. **Five HardDeletes fire simultaneously at 14:25 Apr 9** across Wynn/AshleyR/DaoineB/Santiago/Vetter, plus Hunter and PTownLegal deletions. Ties complaints, the attorney, and the Wynn non-renewal arc into one synchronized-deletion event.
- **Privilege risk:** Med. Calendar/agenda title and scheduling mechanics are administrative records; PTownLegal's presence invites a privilege argument over substance.
- **Framing tip:** Request the calendar invite, attendee list, accept/decline responses, agenda, and the body — and the synchronized deletion audit events. The title, dates, and distribution are non-privileged metadata; demand a § 24-72-204(4) ground for any withheld attachment.

## Rank 8 — `finance-money` (cross-mailbox + coordinated delete)
- **Subject:** "Invitation to Review Financial Systems, Internal Controls, and FY-2027 Budget Process"
- **Window:** Apr 29, 2026 18:30 – Apr 30, 2026 20:42 MDT
- **Mailbox / principals:** Wynn (Admin), Smith (Mayor), Vetter (Clerk), Santiago (Deputy), WalterC (Trustee), paonia@ (shared), AshleyR, DaoineB, ShereeF, CallaRoseO
- **Why it matters:** A town-wide invitation, days after the Apr 8 cluster and right at the Wynn non-renewal window, explicitly framing a review of FINANCIAL SYSTEMS, INTERNAL CONTROLS and the FY-2027 budget. Smith, Vetter and Wynn all **HardDelete the same instance at 04-30 19:56** — a coordinated deletion of a financial-controls calendar item, going to the heart of who-controls-the-money / segregation-of-duties.
- **Privilege risk:** Low. A meeting invitation about internal controls and budget is not legal advice.
- **Framing tip:** Request the invite, attendees, agenda, attachments, and the synchronized HardDelete audit events. No privilege reaches a budget/controls scheduling item.

## Rank 9 — `legal-attorney` (litigation + spoliation cadence)
- **Subject:** "Settlement"
- **Window:** Apr 28, 2026 16:25 – Apr 29, 2026 09:28 MDT
- **Mailbox / principals:** WalterC (Trustee), Wynn (Admin), Vetter (Clerk), PTownLegal
- **Why it matters:** A 68-event burst on a thread bluntly titled "Settlement," concentrated in Trustee WalterC's mailbox, with PTownLegal and Wynn copied — and **30 HardDeletes by WalterC fired one per minute (14:11–14:16 Apr 29)** plus a Wynn SoftDelete. A trustee methodically hard-deleting a settlement thread minute-by-minute is textbook spoliation tied to money and legal strategy, immediately after the Brunner case-number thread.
- **Privilege risk:** Med. Settlement content may draw FRE 408 / attorney-client claims, but the machine-gun deletion cadence is the non-privileged evidence.
- **Framing tip:** Request the deletion audit events (the minute-by-minute HardDelete sequence) and the transmittal metadata; demand a privilege log for any withheld body. The deletion record itself is plainly non-privileged.

## Rank 10 — `legal-attorney` / `wynn-personnel`
- **Subject:** "Attorney Performance Appraisal review" (collapse with "Attorney Performance Appraisal review reschedule," the Apr 8 original invite, and the Mar 31 originator threads "Attorney Performance Appraisal" / "Attorney Performance Appraisal and can we meet tomorrow at noon?")
- **Window:** Mar 31, 2026 19:08 (Mayor's origin) → Apr 8, 2026 16:33 (Apr 8 invite) → Apr 28, 2026 18:10 (reschedule churn) MDT
- **Mailbox / principals:** Smith (Mayor), PTownLegal, Vetter (Clerk), Wynn (Admin), Santiago (Deputy), DaoineB, AshleyR, RickS, plus full board / Chief Laiminger on invites
- **Why it matters:** The euphemistic agenda label used to run the Wynn-adjacent personnel/attorney review, originated in the Mayor's mailbox at 19:08 Mar 31 (same evening as the libel window) and set up 5 minutes before the "Discuss Citizen Complaints re: Administrator" item. **Five simultaneous HardDeletes** recur on these threads (14:25:44 Apr 9 and 19:44:04 Apr 20), proving the deletions were systematic, not incidental. Highest event volume in the theme (110–118 on the reschedule leg).
- **Privilege risk:** Low. Scheduling/calendar logistics and meeting invites; the title, attendees and timestamps are non-privileged even with legal present.
- **Framing tip:** Request the invite, reschedule chain, attendee/accept-decline records, agenda, and the coordinated HardDelete audit events across the named mailboxes. Carve out only any attached appraisal document and demand a § 24-72-204(4) ground for it.

## Rank 11 — `legal-attorney` (litigation spoliation, full Board)
- **Subject:** "Brunner v. Paonia PC6024358-1" (collapse with the captioned "(Attorney Client Communication)" variant and "Brunner litigation discussion")
- **Window:** Nov 18, 2025 14:32 – Apr 30, 2026 16:29 MDT (core distribution Nov–Mar; Apr 28–30 discussion/HardDelete burst)
- **Mailbox / principals:** Vetter (Clerk), Smith (Mayor), MikeH (Trustee), WalterC (Trustee), Hunter (Trustee), Wynn (Admin), PTownLegal, Santiago (Deputy), DaoineB, AshleyR
- **Why it matters:** The core Brunner litigation thread — **31 of 47 events on the captioned thread are deletions**, with Vetter soft/hard-deleting it more than a dozen times; the Apr 28–30 "discussion" leg shows **five HardDeletes in one second (23:37:21 Apr 29)** plus PTownLegal deletion. The whole Board-plus-Administrator cluster handling Brunner at the exact moment records were being purged.
- **Privilege risk:** High (substance) / not privileged (metadata). The Town will assert privilege over litigation content; existence, recipients, dates and the deletion pattern are the prize.
- **Framing tip:** Do NOT request advice content — request the **distribution metadata** (who held it, when), the deletion audit trail, and a privilege log. The deletion pattern is the story regardless of body.

## Rank 12 — `surveillance-cameras` (widest distribution)
- **Subject:** "CORA Verkada Camera System and Memorandum on Camera Systems"
- **Window:** Apr 14, 2026 12:57 – Apr 30, 2026 16:35 MDT
- **Mailbox / principals:** PTownLegal, Smith (Mayor), Santiago (Deputy), Wynn (Admin), Vetter (Clerk), Hunter (Trustee), Laiminger (PD), Nicki P, KarenT, AshleyR, DaoineB, MikeH, RickS, WalterC, ghendersonppd, paonia@ — **17 mailboxes**
- **Why it matters:** The single widest-distributed camera thread in the corpus, bundling the citizen Verkada CORA with a legal "Memorandum on Camera Systems" — the document at the heart of the surveillance fight — circulated to 17 non-attorney recipients.
- **Privilege risk:** Med. The CORA half is plainly non-privileged; the Town will claim privilege over the memo half, but circulation to 17 recipients undercuts confidentiality and any blanket claim.
- **Framing tip:** Request the CORA-response half outright, and argue waiver on the memo via broad non-attorney distribution. Demand a per-document § 24-72-204(4) statement; 17 recipients is fatal to a confidentiality claim over the whole bundle.

## Rank 13 — `surveillance-cameras` (coordinated multi-mailbox delete)
- **Subject:** "Verkada<>Town of Paonia"
- **Window:** Apr 22, 2026 07:39 – Apr 28, 2026 18:10 MDT
- **Mailbox / principals:** Vetter (Clerk), Santiago (Deputy), Wynn (Admin), AshleyR, DaoineB, rodneyb_pw, Nicki P, Coryheiniger_PW, Laiminger (PD)
- **Why it matters:** A direct Verkada↔Town leadership vendor meeting during the petition fight, with a **synchronized HardDelete cascade at Apr 22 10:50 across five mailboxes at once** (Wynn, AshleyR, DaoineB, Santiago, Vetter) — the strongest coordinated-spoliation pattern in the set.
- **Privilege risk:** Low. A vendor scheduling/meeting item; no plausible privilege.
- **Framing tip:** Request the invite/body and the five simultaneous HardDelete audit events. The synchronized deletion across principals is itself the finding.

## Rank 14 — `surveillance-cameras` / `pete-retaliation`
- **Subject:** "Security Camera Dashboard Viewing Session - Trustee Hunter" (pair with the broader "Opportunity to View Security Camera Dashboard")
- **Window:** Apr 21, 2026 16:21 (broad offer) – Apr 28, 2026 18:10 MDT (Hunter session; Hunter invite Apr 22 09:44)
- **Mailbox / principals:** Vetter (Clerk), Hunter (Trustee), Santiago (Deputy), Wynn (Admin), Coryheiniger_PW, rodneyb_pw, Nicki P, AshleyR, DaoineB, Laiminger (PD), paonia@; broad offer also to full board + Smith + PTownLegal
- **Why it matters:** The named, individualized invite scheduling Trustee Hunter a private surveillance-footage viewing session — directly relevant to whether selective camera access was used as leverage. Multiple HardDeletes (Coryheiniger, Clerk, rodneyb at Apr 22 10:16; Hunter moved hers to Deleted Items Apr 22 10:44) scrub the invite across mailboxes.
- **Privilege risk:** Low. A per-trustee scheduling invite; purely administrative.
- **Framing tip:** Request the invite, attendees, accept/decline, any footage-access notes, and the deletion audit events. No privilege over a viewing-session calendar item.

## Rank 15 — `finance-money` / `records-obstruction`
- **Subject:** "CORA Request - Caselle ERP User Access Report" (collapse with "CORA Request - Caselle Permissions and Audit Log")
- **Window:** Apr 2, 2026 10:09 – Apr 30, 2026 16:00 MDT
- **Mailbox / principals:** Vetter (Clerk), PTownLegal
- **Why it matters:** The Clerk handling the CORA requests for the exact Caselle user-access / permissions / audit-log records at issue, looping in legal. PTownLegal **MoveToDeletedItems Apr 8**, Vetter **MoveToDeletedItems Apr 21**, and on the permissions/audit-log variant Vetter **CREATES then HardDeletes it the same minute (Apr 24 16:09)** before re-sending. The meta-trail of how the Town processed (and may have obstructed) the Caselle CORAs.
- **Privilege risk:** Med (legal cc) / low (subject). Administrative records-request handling; deletion timing is not privileged.
- **Framing tip:** Request the response correspondence and the deletion audit events (esp. the same-minute Create→HardDelete). Carve out only attorney-advice cc content and demand a log; the request handling and deletions are non-privileged.

## Rank 16 — `finance-money` / `records-obstruction`
- **Subject:** "Vendor EFT/ACH Remittance E-mail"
- **Window:** Dec 3, 2025 13:47 – Apr 21, 2026 09:51 MDT
- **Mailbox / principals:** Santiago (Deputy), Vetter (Clerk), paonia@ (shared), AshleyR
- **Why it matters:** Recurring electronic vendor-payment (ACH/EFT) remittance notices (93 events) flowing to the deputy admin, clerk and shared box with frequent SoftDelete/HardDelete/MoveToDeletedItems. Goes straight to segregation-of-duties and disbursement controls — who initiates and approves electronic payments, and whether those payment records were routinely deleted.
- **Privilege risk:** Low. Vendor payment/remittance records are financial-controls material, clearly non-privileged.
- **Framing tip:** Request the remittance notices, the vendor/amount details, and the deletion audit trail across all four mailboxes. Frame as a disbursement-controls / records-retention question — no privilege applies.

## Rank 17 — `pete-libel` (Town's own framing)
- **Subject:** "Being Handed Out In Town by McCarthy"
- **Window:** Mar 24, 2026 11:07 – Apr 30, 2026 12:13 MDT
- **Mailbox / principals:** Wynn (Admin, epicenter — 64 hits), Vetter (Clerk), Smith (Mayor), Santiago (Deputy), PTownLegal, Hunter (Trustee), AshleyR, MikeH, KarenT, nickip, mlaimingerppd (PD), HectorM, WalterC
- **Why it matters:** The internal alarm thread reacting to Pete's flyer being distributed — the trigger event for the whole libel-response saga — starting Mar 24, days before the Mar 30 letter, reaching all six principals plus PD command, with HardDelete activity. Shows the entire leadership mobilizing over a citizen's flyer.
- **Privilege risk:** Low/med. An internal "this is being handed out" alert is operational reaction; PTownLegal's mere presence doesn't make staff chatter privileged.
- **Framing tip:** Request the body/attachments across the named mailboxes and the deletion events. Argue operational alert ≠ legal advice; demand a § 24-72-204(4) ground for any carved-out legal sub-thread.

## Rank 18 — `records-obstruction` (self-referential)
- **Subject:** "Audit Logs for CORA"
- **Window:** Apr 1, 2026 14:35 – Apr 3, 2026 10:57 MDT
- **Mailbox / principals:** Vetter (Clerk), PTownLegal
- **Why it matters:** Self-referential and damning — the Clerk emails the M365 "Audit Logs for CORA" to legal on Apr 1, and PTownLegal **MoveToDeletedItems it on Apr 3**, deleting the very audit-log material being processed under CORA (the C-26-12 workflow these logs answer). The record of handing the logs to counsel was then removed.
- **Privilege risk:** Med (transmittal cover) / low (logs). Audit logs are public records; deletion of a records-transmittal email is a process fact.
- **Framing tip:** Request the transmittal email, the attached audit-log extract, and the deletion audit event. The logs themselves are non-privileged; demand a log for any withheld cover note.

## Rank 19 — `wynn-personnel` / `finance-money`
- **Subject:** "Stefen's Merit Increase Scoring Sheets and Executive Session Agenda Content for the January 27th meeting" (collapse with "Re: Stefen's Merit Increase Scoring Sheets and Executive Session Agenda Content")
- **Window:** Jan 9, 2026 11:36 – Jan 27, 2026 11:25 MDT
- **Mailbox / principals:** Smith (Mayor), PTownLegal, Vetter (Clerk), Santiago (Deputy)
- **Why it matters:** Counsel is looped directly into Wynn's merit-increase scoring and the executive-session agenda content — counsel helping shape a closed-door personnel/pay session months before the non-renewal. Striking pattern: senders **Send then SoftDelete their own sent copy within the same minute** (Smith 11:40, Santiago 11:52–11:53) and Vetter/PTownLegal bulk-MoveToDeletedItems Jan 12–13. Money + personnel + exec-session content-shaping + pre-meditated deletion.
- **Privilege risk:** Med. Counsel input on agenda content may draw a claim, but merit-scoring sheets and exec-session agenda are governance/personnel records.
- **Framing tip:** Request the scoring sheets, the agenda content, and the send-then-delete audit events. Merit increases are compensation facts; demand a § 24-72-204(4) ground for any withheld attorney edits.

## Rank 20 — `finance-money` / `caselle`
- **Subject:** "Caselle Migration to Cloud Today" (pair with "Quote for Moving to Online Caselle Hosting")
- **Window:** Jan 9, 2026 16:38 (quote) – Apr 20, 2026 15:47 MDT (go-live thread, started Mar 28)
- **Mailbox / principals:** Vetter (Clerk), DaoineB, Nicki P; quote thread also Wynn (Admin), paonia@ (shared)
- **Why it matters:** The actual go-live of the Caselle cloud migration on/around Mar 28 — the day the user-permission and audit-log baseline changed — preceded by the procurement quote authorizing the move. Vetter MoveToDeletedItems her copies four times on Mar 28 and again Mar 30 (libel-letter day). This migration is the event the Caselle-permissions and audit-log CORAs are trying to reconstruct.
- **Privilege risk:** Low. Operational/IT notice and a vendor quote; non-privileged.
- **Framing tip:** Request both the procurement quote (who authorized, when) and the go-live notice, plus the deletion events. Establishes the chain of custody for the permission/audit-log baseline change — no privilege applies.

---

## Honest caveats (state these in the cover letter)

1. **The audit log proves existence but logs no recipients.** Each entry captures only mailbox + operation + timestamp + subject. Cite the request by **verbatim subject + date window + mailbox(es)** as done above; the Town cannot credibly claim it "can't find" a record whose subject and custodian are quoted from its own audit log.
2. **Window is Nov 2025 – May 2026.** Bound every request to this window unless the thread itself runs longer.
3. **The attorney's own `ClayB@`/Buchner mailbox was absent from the export.** PTownLegal is the shared legal mailbox that stands in for it. Where a thread shows PTownLegal activity, separately request the corresponding messages from the Town Attorney's individual mailbox and account, and ask the Town to confirm whether that mailbox was searched and why it was excluded from the C-26-12 production.
4. **Deletions do not extinguish production duties.** Many top items survive only as HardDelete/SoftDelete/FolderRecycled events. For each, demand recovery from backups, recycle bin, and litigation/in-place holds, plus the audit record of the deletion — and put the Town on notice that destruction of records responsive to pending requests may constitute spoliation.
