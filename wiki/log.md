# Wiki Log

Chronological record of wiki operations.

---

## [2026-04-15] ingest | Wynn's Verkada Rebuttal Memorandum & Factual Corrections

**Raw files:**
- `raw/documents/their-responses/wynn-verkada-memo-2026-04-14.md` — Transcription of the seven-page memo Town Administrator Wynn submitted at the April 14 meeting
- `raw/documents/board-complaint/factual-corrections-2026-04-15.md` — Pete's one-page written correction filed with the Board on April 15
- `raw/documents/board-complaint/attachments/130-events-exhibit.csv` — CSV of the 130 POI / analytics / alert / Blurred Faces events from the audit log
- `raw/documents/board-complaint/attachments/laiminger-identity-list-chronology.csv` — 65 distinct days of face-identity-database access under Chief Laiminger's account
- `raw/meeting-agendas/2026-04-14/` — Work session agenda, regular agenda, full packet

**Pages created (5):**

Sources:
- `sources/wynn-verkada-memo-2026-04-14.md`
- `sources/factual-corrections-2026-04-15.md`

Events:
- `events/2026-04-14-regular-board-meeting.md`

Analysis:
- `analysis/wynn-memo-vs-audit-log.md` — Point-by-point comparison of the memo's factual claims to the audit log

**Key findings:**
- Memo characterizes the POI-related activity as "two isolated audit log entries"; the audit log contains at least 130 events across 8 event codes directly tied to People Analytics and facial-recognition surfaces.
- Memo attests that features "were disabled" on April 14, 2026, but does not state whether they were enabled at any prior time. CORA response does not cover March 27 – April 14 period, so any toggle-off event is not visible in produced records.
- October 23, 2025 `ARCHIVE_START` event with tag `"Blurred Faces"` (per Verkada docs, requires face detection) is not addressed in the memo.
- 100 `IDENTITY_LIST` events under Chief Laiminger's account across 65 distinct days, October 22, 2025 through March 16, 2026, is characterized in the memo as "testing in October 2025."
- Memo endorses adoption of Trustees Hunter and Mejorado's draft ordinance.

## [2026-04-05] init | Wiki scaffolded

Created directory structure and schema. Directories: `wiki/` (people, events, issues, sources, analysis, open-questions, assets) and `raw/` (meeting-minutes, articles, documents, correspondence). 87 raw files copied from Desktop (81MB).

## [2026-04-05] ingest | Board Complaint Letter (2026-03-30)

**Raw file:** `raw/documents/board-complaint/board-letter-2026-03-30.md`

27-citation formal complaint from Pete McCarthy to all Board of Trustees members, documenting a pattern across four individuals who challenged Town Administrator Stefen Wynn.

**Pages created (20):**

Source:
- `sources/board-letter-2026-03-30.md`

People (8):
- `people/stefen-wynn.md` -- Town Administrator
- `people/samira-vetter.md` -- Town Clerk
- `people/clayton-buchner.md` -- Town Attorney
- `people/mayor-smith.md` -- Mayor
- `people/bill-brunner.md` -- Former trustee (removed)
- `people/kaja-bowman.md` -- Former Deputy Treasurer (terminated)
- `people/cory-heiniger.md` -- Former Public Works Director (resigned)
- `people/lucy-hunter.md` -- Trustee

Events (4):
- `events/2024-08-15-brunner-removal.md`
- `events/2025-05-28-str-initiative-rejection.md`
- `events/2025-10-09-bowman-termination.md`
- `events/2026-03-30-special-meeting.md`

Issues (5):
- `issues/board-oversight.md`
- `issues/public-records-access.md`
- `issues/initiative-process.md`
- `issues/retaliation-pattern.md`
- `issues/surveillance.md`

Open questions (3):
- `open-questions/complaint-response-process.md`
- `open-questions/bowman-termination-circumstances.md`
- `open-questions/verkada-approval-process.md`

## [2026-04-06] ingest | Paonia Accountability Collection (batch)

Ingested the organized paonia-accountability collection: Facebook posts, retraction demand, initiative fight documents, attorney outreach, their responses, and citation sheet.

**New source pages (14):**
- `sources/fb-01-appeal-to-neighbors.md` -- First public post
- `sources/fb-02-they-didnt-edit-a-word.md` -- Vote breakdown, unedited publication
- `sources/fb-03-legal-analysis-libelous.md` -- Legal analysis, resignation call
- `sources/fb-04-point-by-point-rebuttal.md` -- Board claims vs record
- `sources/fb-05-initiative-rejected-again.md` -- Second initiative rejection
- `sources/retraction-demand-2026-03-31.md` -- Formal retraction demand
- `sources/rejection-response-to-vetter.md` -- Legal rebuttal of 6 rejection grounds
- `sources/split-initiatives.md` -- Three split single-subject petitions
- `sources/rule-106-petition-draft.md` -- Draft court filing
- `sources/v5-cover-letter.md` -- Revised initiative resubmission
- `sources/citation-sheet.md` -- One-page source list for flyer
- `sources/attorney-outreach-emails.md` -- Draft emails to 5 attorneys
- `sources/lucy-hunter-response-2026-03-31.md` -- Only board response

**New event pages (2):**
- `events/2026-03-25-ten-things-flyer.md`
- `events/2026-04-03-surveillance-initiative-rejection.md`

**Updated pages:**
- `people/lucy-hunter.md` -- voting record, response to complaint, complaint process acknowledgment
- `people/mayor-smith.md` -- voting record, retraction demand, resignation call
- `people/samira-vetter.md` -- detailed rejection pattern, legal responses
- `events/2026-03-30-special-meeting.md` -- vote breakdown with names, post-vote editing discrepancy
- `issues/initiative-process.md` -- legal framework, current status with all filings
- `open-questions/complaint-response-process.md` -- partially addressed by Hunter response

## [2026-04-06] ingest | Town responses, CORA, and reporter package

Ingested the town's side of the record (original draft, final published letter, mayor's report), the CORA request for "libelous" communications, and the reporter package documenting the email deception and CORA cover-up timeline.

**New source pages (5):**
- `sources/original-draft-with-libelous.md` -- Unedited draft with "erroneous and libelous," "smear campaign," "ill-willed players"
- `sources/final-published-letter.md` -- Edited version with inflammatory language removed, substantive claims unchanged
- `sources/mayor-report-agenda-packet.md` -- Mayor's report proposing taxpayer-funded ads, revealing concern about lenders
- `sources/reporter-package-email-coverup.md` -- Detailed timeline: Nov 4 email deception, CFOIC confirms CORA denial improper
- `sources/cora-libelous-communications.md` -- CORA request targeting "libelous" decision-making process

**Updated pages:**
- `people/stefen-wynn.md` -- email deception timeline, CORA deflection quotes, "advisory not legislative" dismissal
- `issues/public-records-access.md` -- full CORA timeline, CFOIC confirmation, new CORA request added

**Key new information:**
- CFOIC Executive Director Jeff Roberts confirmed on 2024-11-25 that Vetter's CORA denial was improper
- Video evidence of Wynn acting surprised by email he received hours earlier (YouTube, Nov 4 2024, ~13:41)
- Town's original draft vs final published version shows language was softened but published unedited first
- Mayor's primary concern was lending relationships, not factual accuracy of the flyer

## [2026-04-06] ingest | Meeting transcripts and Neptune Beach case

Processed 4 of 5 meeting transcript SRTs (Nov 4, Nov 12, Nov 20, Dec 2) and the Neptune Beach court case (22 filings).

**New source pages (5):**
- `sources/meeting-2024-11-04.md` -- "Oh we do have an email from Pete" moment at ~13:41
- `sources/meeting-2024-11-12.md` -- Verkada camera budget discussion, $50K
- `sources/meeting-2024-11-20.md` -- Walk-out threat, stonewalling, resignation catalyst
- `sources/meeting-2024-12-02.md` -- Resignation read into record, Commissioner Watson corroborates Pete's claims
- `sources/neptune-beach-case.md` -- Full litigation arc of Wynn v. Neptune Beach (23-CA-8801)

**Key new information:**
- Nov 4 meeting confirms on video that Wynn acted surprised by email sent hours earlier
- Nov 20 work session has Wynn threatening to walk out, Mayor and Wynn dismissing documentation requests in tandem
- Dec 2 meeting: Commissioner Watson independently says she was excluded from emails, accuses Wynn of slandering her to the Board
- Neptune Beach complaint details: Wynn reported police budget overspending and conflict of interest, was harassed by Councilor Key, forced to apologize, then fired on pretextual grounds (water tower permitting)

**Skipped:** Nov 26 SRT (minimal relevant content), individual court filing pages (processed as single case arc instead)

## [2026-04-06] ingest | Flyers, Verkada deep-dive, cleanup

Final batch. Ingested the original 10 Things flyer, Hunter's rebuttal flyer, and the Verkada 10 Things document. Removed 17 non-Paonia screenshots from raw/assets/. Confirmed town-responses folder is all duplicates.

**New source pages (3):**
- `sources/ten-things-flyer.md` -- Original flyer with all 10 claims and sources
- `sources/hunter-rebuttal-flyer.md` -- Hunter's unsigned counter-flyer, vetted by Wynn and Buchner
- `sources/verkada-10-things.md` -- Deep dive on Verkada: AI capabilities, breach, FTC fine, Axon integration

**Updated pages:**
- `issues/surveillance.md` -- Substantially expanded with Verkada capabilities, AI features, Axon integration
- `open-questions/verkada-approval-process.md` -- Added questions about vendor selection and capability disclosure

**Removed:**
- 17 screenshots from `raw/assets/` (all consulting/dev work, not Paonia-related)

**Key discrepancy surfaced:**
Board states cameras are "not nefarious face recognition." Verkada's own product documentation shows the cameras include facial recognition, People Analytics (filter by clothing, sex, backpack), and photo-based person search as standard features.

## [2026-04-06] analysis | First analysis pages and Watson person page

Created 4 new pages: 3 analysis pages and 1 new person page.

**New pages (4):**
- `people/commissioner-watson.md` -- Independent corroborating witness from Dec 2 meeting
- `analysis/master-timeline.md` -- Every dated event, chronological
- `analysis/what-the-board-did-not-dispute.md` -- Systematic comparison of 10 flyer claims vs. board/Hunter responses
- `analysis/the-brunner-standard.md` -- Brunner removal standard applied to Wynn and Vetter's documented conduct
- `analysis/discrepancies-register.md` -- 9 factual conflicts in the record, 5 unresolved

**Key findings from analysis:**
- Zero of 10 underlying factual sources were disputed by the board. All disagreements are about interpretation.
- By the standard used to remove Brunner, Wynn's documented conduct meets or exceeds the threshold on every measure.
- 9 discrepancies documented in the record, including the Verkada facial recognition contradiction and the "voted to edit, published unedited" sequence.
- Watson independently corroborates the hostile environment from a position the board cannot dismiss as a grievance.

## [2026-04-08] ingest | CORA C 26-09 Verkada Audit Logs Response

**Raw files:**
- `raw/documents/cora-requests/c26-09-response/C 26-09 Response.pdf` (33 pages)
- `raw/documents/cora-requests/c26-09-response/Verkada_Audit Log_REDACTED.xlsx` (32,338 rows)
- `raw/documents/cora-requests/c26-09-response/VERKADA- Audit Logs_REDACTED.xlsx` (25,122 rows)

The Town's response to CORA C 26-09 (Verkada camera records), delivered 2026-04-07 after a $167.90 fee. The response produced the Mitchell and Company contract, 16 camera configuration screenshots, a user management screenshot, and two audit log exports covering 2025-10-03 to 2026-03-26.

**New source page (1):**
- `sources/cora-c26-09-verkada-audit-logs.md` -- Full summary of what was produced, what was redacted, and what was not produced

**New analysis page (1):**
- `analysis/verkada-usage-patterns.md` -- Statistical reconstruction of Verkada usage from the 57,460 audit log rows

**New person page (1):**
- `people/ruben-santiago.md` -- Assistant Town Clerk; largest single user of the Verkada system

**New open question (1):**
- `open-questions/march-20-community-room-archives.md` -- Why were four permanent archives of the public meeting room created by the Assistant Clerk over the weekend of March 20-21, 2026?

**Updated pages:**
- `issues/surveillance.md` -- Added "Documented Usage (CORA C 26-09)" section, expanded timeline, updated key people
- `people/samira-vetter.md` -- Added Verkada usage section with dated sessions, CORA C 26-09 administration section
- `people/stefen-wynn.md` -- Added Verkada procurement and usage section including March 3 sweep, March 13 Front Desk review, March 26 audit log check
- `open-questions/verkada-approval-process.md` -- Partially answered; total cost, contract, vendor, retention, and no-policy confirmed
- `index.md` -- Added Santiago, CORA C 26-09 source, verkada-usage-patterns analysis, and march-20-community-room-archives question

**Key findings from the audit log exports:**

1. **The Town Clerk's office accounts for 53% of all Verkada activity.** Assistant Town Clerk Ruben Santiago alone accounts for 51.5% of all events (16,653 of 32,338).

2. **The Community Room camera has been live-streamed 1,938 times.** Santiago accounts for 1,670 of those views. The Community Room is Town Hall's public meeting space where the Board, Planning Commission, and public committees meet and where citizens make public comment.

3. **Santiago's Community Room viewing pattern does not match a meeting-minutes workflow.** Sunday is the highest day of the week (342 views). 35% of views occur on weekends. 428 views occur after 5 PM. 408 views occur before 9 AM. 93.6% are Live Stream Started (real-time), only 4.8% are Video History Streamed (retrospective).

4. **Santiago created four permanent archives of the Community Room camera on Friday 2026-03-20 afternoon and Saturday 2026-03-21 morning.** The Friday session included three audio-toggle events. Archive Action Taken permanently preserves clips beyond the 30-day retention window. The archive metadata (name, description, case number) was not produced.

5. **Wynn swept every camera in 13 minutes on 2026-03-03** (204 events, 11:04-11:17 AM) concurrent with User Permissions Set, User Permissions Modified, User Roles Modified, and Key Contact Updated administrative actions.

6. **Vetter swept every camera in 14 minutes on 2026-03-25** (78 events, 8:42-8:56 AM) the morning the 10 Things flyer was distributed, including 18 views of the Grand Ave. exterior camera facing the front of Town Hall.

7. **Wynn accessed the Verkada audit log on 2026-03-26**, one day after the flyer was distributed, 4 days before the special meeting response, and 12 days before the audit log was produced in response to CORA C 26-09.

8. **The Town has no written policy governing Verkada use.** The clerk's response to item 4 (written policies, procedures, or guidelines) refers back to Verkada device configuration screenshots. No policy document was produced because none exists.

9. **The "purpose" metadata requested in item 3 was not produced.** The audit logs show Archive Action Taken events but not the archive labels, descriptions, case numbers, or notes associated with them.

10. **The redaction rationale is inconsistent with the redactions applied.** The clerk claimed redactions were needed to prevent phishing and social engineering, but internal user IDs (UUIDs that cannot be phished) were redacted while full names and email addresses (the actual phishing surface) were left visible.
