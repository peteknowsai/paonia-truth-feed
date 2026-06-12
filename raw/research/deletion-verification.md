# Deletion Verification — Town of Paonia M365 Audit Logs (C-26-12 CURE)

**Question:** Are the flagged DELETION events human-initiated records destruction, or
automated artifacts (retention/MRM, client/mobile sync, or one message logged across many
mailbox copies)? A prior pass labeled many of these "spoliation smoking gun." This is the
skeptical re-check.

**Method:** Streamed all 10 `AuditLog_*.csv` files (1,134,799 rows total) line-by-line with
`python3` + `csv`/`json`; never bulk-loaded. Pulled every Exchange delete
(`HardDelete`/`SoftDelete`/`MoveToDeletedItems`) and SharePoint recycle/restore event whose
`AuditData` JSON matched each cluster's subject/folder, and decoded the discriminating fields.

**Schema note / data caveat:** The CSV header is `CreationDate,UserIds,Operations,RecordType,AuditData`.
The `CreationDate` column is corrupted by redaction — the time-of-day is overwritten with
`[REDACTED_IP]` (e.g. `4/1/2026 [REDACTED_IP] AM`). **All timestamps below come from the
authoritative `CreationTime` field inside the AuditData JSON (UTC), not the broken column.**
Several cluster times/actors in the original tasking were derived from the broken column and
are corrected here.

---

## How to tell a human from a machine in this data (the field key)

| `ClientInfoString` / `ActorInfoString` | `UserType` | `TokenType` | Meaning | Class |
|---|---|---|---|---|
| `Client=MSExchangeRPC` + `ActorInfoString=OUTLOOK.EXE/16...` | 0 | None | Desktop Outlook, interactive | **A (manual)** |
| `Client=OWA;Mozilla/...` (a browser UA) | 0 | V1AppActAs | Outlook on the Web, interactive | **A (manual)** |
| `Client=REST;Client=RESTSystem;UserAgent=[NoUserAgent]` | **5** | **SubstrateProcessorCallbackPft** | Microsoft Substrate **server-side background process** | **B/D (automated)** |
| `Client=ActiveSync;UserAgent=Apple-iPhone...` | 0 | V1AppActAs | Mobile device sync | **C (sync)** |
| `Client=OutlookService;Outlook-iOS/Android` | 0 | V1AppActAs | Outlook mobile app | **C (app)** |
| `Client=WebServices;eMClient/...` or `AppleExchangeWebServices/...` | 0 | V1AppActAs | 3rd-party / Apple Mail client (EWS) | **C (app-driven)** |
| `EventSource=SharePoint`, `UserAgent=Microsoft SkyDriveSync...` | 0 | — | OneDrive/SharePoint sync engine replaying a local delete | A-via-sync |

`LogonType`: 0 = Owner, 1 = Admin, 2 = Delegate. **Almost every event in this data is LogonType 0
(owner) with `ExternalAccess=False`** — there is no external/admin intrusion anywhere.

---

## TENANT BASELINE — deletes are pervasive background noise, not rare deliberate acts

Across all 1,134,799 rows there are **42,315 delete operations**:

| Operation | Count |
|---|---|
| MoveToDeletedItems | 22,546 |
| SoftDelete | 6,975 |
| HardDelete | 3,781 |

**By client class (all delete ops):**

| Class | Count | % |
|---|---|---|
| Interactive Outlook desktop | 14,473 | 43.5% |
| Interactive OWA | 14,161 | 42.5% |
| **Automated Substrate (REST/RESTSystem)** | 2,202 | 6.6% |
| Mobile Outlook app | 1,508 | 4.5% |
| EWS / eM Client / Apple Mail (3rd-party) | 660 | 2.0% |
| REST app | 154 | 0.5% |
| ActiveSync mobile | 142 | 0.4% |

**The crucial cut — what `HardDelete` specifically is made of (3,781 total):**

| Class | Count | % of HardDeletes |
|---|---|---|
| **Automated Substrate (calendar cascade)** | 2,194 | **58%** |
| EWS / eM Client / Apple Mail (auto draft/trash purge) | 637 | 17% |
| Interactive Outlook desktop | 499 | 13% |
| Interactive OWA | 280 | 7% |
| Mobile Outlook app | 159 | 4% |
| ActiveSync mobile | 10 | <1% |

> **~79% of all HardDeletes tenant-wide are automated server cascades or 3rd-party-client
> auto-purges. Only ~21% (779 events) are genuinely interactive (human at Outlook/OWA), and
> almost all of those are mundane mail housekeeping.** HardDelete in this tenant is overwhelmingly
> background noise. Treating a raw HardDelete count as "records destroyed" is the exact error to avoid.

### "Synchronized across N mailboxes at the same second" is routine, not targeting

There are **416 bursts** where the **same `InternetMessageId`** is HardDeleted across **≥3 mailboxes
in the same second** (173 at 3 mailboxes, 153 at 4, 90 at all 5). A random sample of the ≥4-mailbox
bursts shows their subjects are entirely mundane calendar items in `\Calendar` / `\Calendar\<delegate>`
folders: *"4/14/2026 Board of Trustees Work Session," "Daoine Dr. Appointment," "lunch with managers –
476 Eatery Hotchkiss?," "FPPA Webinar," "Packet Cut Off for 2/24/2026 Board Meeting," "Cole C Hire,"
"Arborist RFP."*

**Mechanism:** Town staff hold delegate access to each other's calendars (Stefen Wynn's, Samira V's,
Ruben Santiago's, Daoine B's). When an organizer deletes/cancels a meeting, the Microsoft **Substrate**
(`UserType 5`, `SubstrateProcessorCallbackPft`) removes the duplicate calendar copy from every
attendee/delegate mailbox in the same instant, each logged under that mailbox owner's UPN. This is
**Class D — one item logged across many copies.** The "synchronized cascade across sensitive subjects"
(Verkada, Citizen Complaints, Brunner) are three ordinary instances of a pattern that fires hundreds
of times on lunches and webinars. **There is no evidence sensitive subjects are deleted differently
from anything else.**

### Two specific client artifacts that manufacture fake "HardDelete" signal

- **eM Client / Apple Mail 30-second purge:** Only **two users** generate the EWS HardDeletes —
  **WalterC (571 events)** and **LucyH (66)**. They land in `\Deleted Items` (415, auto-empty-trash),
  `\Drafts` (156, draft-autosave cleanup), `\Inbox` (66). The hallmark is a perfectly regular
  ~30-second cadence (`:17`/`:47` second marks). No human clicks "purge" every 30.000 seconds for
  20 minutes. This is one mail client's timer on two people's machines.
- **Send-then-delete-the-draft:** The normal compose flow `Create (\Drafts) → Send → SoftDelete the
  now-redundant \Drafts copy` (≈1 second apart) appears throughout. The *sent* message is **not**
  destroyed — it remains in Sent Items and in recipients' mailboxes. Only the working draft is removed.

---

## PER-CLUSTER ADJUDICATION

### Cluster 1 — "New CORA request from Mr. McCarthy" (SamiraV/Vetter)
- **Evidence:** `CreationTime 2026-04-01T15:46:41`, `Operation HardDelete`, `UserId=MailboxOwnerUPN=SamiraV`,
  `LogonType 0` (owner), `ClientInfoString=Client=OWA;Mozilla/5.0 ... Edg/...` (interactive web),
  `ExternalAccess False`. **Folder = `\Drafts`** (not Inbox). Two identical records at the same second
  = OWA double-logging one action. Subject confirmed: *"New CORA request from Mr. McCarthy."*
- **Read:** A human (Vetter) interactively HardDeleted an item via OWA. **But it was in `\Drafts`** —
  i.e., an unsent draft titled like the intake auto-notice, not the received intake notice in Inbox.
  Hard-deleting one's own draft is unremarkable and destroys no incoming record.
- **VERDICT: (A) manual interactive deletion — but of a DRAFT, low evidentiary weight.**

### Cluster 2 — SharePoint legal/contract folders (samirav/Vetter) ⭐ THE ONE THAT SURVIVES
- **Evidence (all `EventSource=SharePoint`, `Operation=FolderRecycled`, `UserId=samirav`, `UserType 0`,
  `UserAgent=Microsoft SkyDriveSync`, `Platform=WinDesktop`):**
  - **Nov 19 2025 18:30:49–53:** `CIRSA`, `Kelly PC`, `Clayton M Buchner, Attorney at Law, LLC` recycled
    from `Shared Documents/.../Agreements, Contracts & Leases` (4-second burst).
  - **Dec 30 2025:** `Bachran, Mary` (19:09), `CIRSA` (19:13), `Clayton M Buchner...` (19:14),
    `Kelly PC` (21:58:34), `Legal_2022` (21:58:35).
  - **Dec 30, immediately before the 21:58 recycles (21:43–21:55):** samirav **downloaded** the folder's
    contents to her synced machine — `Attorney 2022-10-20 Paonia Contract.docx` (opened in Word),
    `Attorney Contract-Kelly PC.pdf`, `KellyPC_Engagement_2022.pdf`, `2022-09-14 Town of Paonia
    Engagement Letter.pdf`, `20220113 ENGMT LTR.pdf`, `2023-12-08 Paonia Contract Appendix A.pdf` —
    then recycled the folders.
- **No `FolderRestored`/`FileRestored` ever occurred** on any of these (0 restores across all 10 files),
  and there are **no re-create/move events** placing these named legal folders anywhere else (the later
  "Buchner" hits are unrelated invoice PDFs in `General/Disbursements`).
- **Why this is not retention/sync noise:** SharePoint document libraries have no Managed Folder
  Assistant; named folders don't auto-recycle. The actor is the Town Clerk's own account, the targets
  are specifically the **attorney (Buchner, Kelly PC), insurer (CIRSA), and `Legal_2022`** folders, and
  the Dec 30 "download contents, then delete the shared folder" sequence is the most probative thing in
  the entire dataset. The SkyDriveSync user-agent means the proximate act was a delete in local File
  Explorer that the sync client replayed — human-initiated, but recycle-bin (recoverable ~93 days), and
  a private local copy was taken first.
- **VERDICT: (A) MANUAL, plausibly deliberate removal of sensitive legal/insurer records.** The single
  cluster that withstands skeptical scrutiny. Caveat for honesty: "recycled" ≠ permanent destruction,
  and download-then-delete is also consistent with relocating files. No FolderRestored is the strongest
  point against benign relocation.

### Cluster 3 — "Formal Complaint: Pattern of Retaliation…" (night of Mar 30)
- **Evidence:** The Mar 30 events are **paiges** `SoftDelete` of **`FW: ...`** drafts in `\Drafts`
  (21:37, 21:43; Outlook desktop) and **LucyH** `HardDelete` of **`Re: ...`** drafts in `\Drafts`
  (23:49, 00:04; `Client=WebServices` = eM/Apple Mail). Later: SamiraV `MoveToDeletedItems` of the
  inbound Gmail-origin message from `\Inbox` (Apr 2, OWA); MikeH `MoveToDeletedItems` of the same from
  `\Inbox` (Apr 21, Outlook-Android). The original prompt's "Hunter ×2 Mar 30" maps to LucyH's two
  eM-client draft HardDeletes, not Mike Hunter.
- **Read:** All Mar 30 deletes are of **drafts/forwards**, not the received complaint. The genuine
  inbound complaint was only moved to Deleted Items (recoverable) much later, via routine clients. The
  underlying message demonstrably still existed weeks later (MikeH deleted his copy Apr 21).
- **VERDICT: (C/A-mixed) draft cleanup + routine MoveToDeletedItems; not destruction of the complaint.**

### Cluster 4 — "Questions Re Camera Access." (Apr 13)
- **Evidence:** **LucyH** (not Hunter), **12 HardDeletes** at exact 30-second intervals
  14:46:37 → 14:52:06, all in `\Drafts`, all `Client=WebServices` (eM Client / Apple Mail).
- **Read:** The metronomic 30-second cadence is the EWS client's draft-autosave purge timer chewing
  through stale autosave copies of one composition. Not 8–12 manual purges.
- **VERDICT: (C) CLIENT/APP-DRIVEN auto draft-purge. Benign.**

### Cluster 5 — "Discuss Citizen Complaints re: Administrator" (Apr 9 14:25)
- **Evidence:** Of the "five HardDeletes," **four** are `Client=REST;RESTSystem`, `UserType 5`,
  `SubstrateProcessorCallbackPft`, in `\Calendar\Stefen Wynn`, all carrying the **same
  InternetMessageId** `<DM6PR12MB5005F3DBCEDEF9A214D16F06DE5B2...>` (StefenW, SamiraV, RubenS, AshleyR,
  DaoineB). StefenW's own copy was an interactive Outlook desktop delete; the rest are the Substrate
  cascade. Separately, the actual *email* thread was only MoveToDeletedItems'd by LucyH and PTownLegal
  (routine).
- **VERDICT: (D/B) SAME calendar item logged across copies via automated Substrate cascade.** Not five
  independent human deletions.

### Cluster 6 — "Settlement" (WalterC, Apr 29)
- **Evidence:** **~28 HardDeletes one every ~30 seconds** 14:11:17 → 14:30:10, all in `\Drafts`, all
  `Client=WebServices;eMClient`/Apple Mail. (Prompt's "30 in 5 min / one-per-minute" corrected: actual
  cadence is one per 30 s over ~19 min.) Identical signature to Cluster 4.
- **VERDICT: (C) CLIENT/APP-DRIVEN draft-purge. Benign.** The sole interactive Settlement deletes are
  StefenW SoftDelete of a `RE: Settlement` draft and PTownLegal/SamiraV MoveToDeletedItems of the inbound
  — routine, recoverable.

### Cluster 7 — "Brunner v. Paonia…" — "five HardDeletes in one second" Apr 29 23:37:21
- **Evidence (verified):** At `2026-04-29T23:37:21`, five mailboxes HardDelete the **same
  InternetMessageId** `<DM6PR12MB50054614ACE7F2FD6091CFD4DE342...>`, subject **"Brunner litigation
  discussion"** (a calendar meeting). StefenW deletes it from his own `\Calendar` via Outlook desktop;
  DaoineB/SamiraV/AshleyR/RubenS get `Client=REST;RESTSystem` HardDeletes in `\Calendar\Stefen Wynn`
  in the same second. Separately, WalterC's Apr 29 14:08–14:10 "Brunner" HardDeletes are the eM-client
  draft-purge (Drafts), and SamiraV's 15:22 ones are routine OWA MoveToDeletedItems of email copies.
- **VERDICT: (D/B) SAME calendar item, automated attendee-cascade.** One-second simultaneity across five
  mailboxes is the server, not five humans. The prompt's instinct was right.

### Cluster 8 — "Verkada<>Town of Paonia" (Apr 22)
- **Evidence:** At `2026-04-22T16:50:25`, four mailboxes (RubenS, AshleyR, SamiraV, DaoineB) HardDelete
  the **same InternetMessageId** `<DM6PR12MB5005FEF2D225E98FDA67A54BDE2D2...>` via `Client=REST;RESTSystem`
  in `\Calendar\Stefen Wynn`, one second after StefenW deleted the meeting from his own `\Calendar`
  (Outlook desktop). The surrounding ~40 Verkada email deletes are all interactive OWA/Outlook
  MoveToDeletedItems / SoftDelete (routine inbox/draft housekeeping, mostly Verkada vendor newsletters,
  "archive complete" notices, and CORA-response drafts).
- **VERDICT: (D/B) SAME calendar item, automated cascade.** Not coordinated mailbox purging.

### Cluster 9 — "Stefen's Merit Increase Scoring Sheets…" (Jan)
- **Evidence:** Reconstructed full op sequences show the canonical
  `Create(\Drafts) → Send → SoftDelete/HardDelete of the \Drafts copy` ~1 s later, e.g.
  paiges 17:40:43 Send → 17:40:59 SoftDelete; RubenS 20:16:14 Send → 20:16:15 SoftDelete;
  StefenW 18:56:39 Send → 18:56:40 SoftDelete. The deleted item is the **`\Drafts` working copy**, not a
  Sent Items record. WalterC/LucyH variants are the EWS draft-purge again.
- **VERDICT: (C) KNOWN BENIGN client behavior — draft removed at send time.** No sent record destroyed.

### Cluster 10 — "Audit Logs for CORA" (PTownLegal, Apr 3)
- **Evidence:** `2026-04-03T16:57:07`, `MoveToDeletedItems`, `UserId=MailboxOwnerUPN=PTownLegal`,
  `LogonType 0`, `Client=OWA;Mozilla/5.0...` (interactive web), from `\Inbox`. Subject *"Audit Logs for
  CORA."*
- **Read:** A human interactively moved an inbox email to Deleted Items via OWA. **MoveToDeletedItems is
  the lowest tier of deletion** — the item sits in the recoverable Deleted Items folder; it is the same
  action as hitting Delete on any junk mail. Owner action, but trivially recoverable and not a purge.
- **VERDICT: (A-lite) manual but routine "move to Deleted Items"; not destruction.**

---

## BOTTOM LINE — one-line verdicts

| # | Cluster | Verdict |
|---|---|---|
| 1 | New CORA request from Mr. McCarthy | **Manual (OWA, owner) — but a DRAFT, not the intake notice** |
| 2 | SharePoint legal/contract folders (CIRSA/Buchner/Kelly PC/Legal_2022/Bachran) | **Manual, plausibly deliberate — download-then-recycle, no restore. SURVIVES.** |
| 3 | Formal Complaint: Pattern of Retaliation | **Mostly draft cleanup + routine MoveToDeleted; complaint not destroyed** |
| 4 | Questions Re Camera Access | **Automated — eM/Apple Mail 30-second draft-purge** |
| 5 | Discuss Citizen Complaints re: Administrator | **Same-message calendar cascade (Substrate), automated** |
| 6 | Settlement (WalterC) | **Automated — eM/Apple Mail 30-second draft-purge** |
| 7 | Brunner v. Paonia (one-second ×5) | **Same calendar item, automated attendee cascade** |
| 8 | Verkada<>Town of Paonia | **Same calendar item, automated attendee cascade** |
| 9 | Merit Increase Scoring Sheets (send-then-delete) | **Benign — draft removed at send time; no sent record lost** |
| 10 | Audit Logs for CORA (PTownLegal) | **Manual but routine MoveToDeletedItems; recoverable, not a purge** |

## Overall judgment

**The records-destruction / "spoliation smoking gun" narrative collapses for 8 of the 10 clusters.**
Clusters 4, 6 are a single mail client's 30-second auto-purge on two users' machines; 5, 7, 8 are the
same automated calendar-cancellation cascade (one item, many delegate copies, same InternetMessageId,
same second) that fires hundreds of times tenant-wide on lunches, webinars, and hire dates; 9 is normal
send-then-clean-up-the-draft; 3 and 10 are routine, recoverable MoveToDeletedItems of items that
demonstrably continued to exist. Tenant-wide, ~79% of all HardDeletes are automation/app artifacts and
the multi-mailbox "synchronized" pattern shows **no preference for sensitive subjects** — exactly the
benign bulk pattern the prior pass mistook for a smoking gun.

**Two clusters involve genuine human, owner-initiated, interactive deletion:**
- **Cluster 2 (SharePoint legal folders) is the only one that holds up as plausibly deliberate removal
  of sensitive records.** Vetter's account recycled the Town's attorney (Buchner, Kelly PC), insurer
  (CIRSA), `Legal_2022`, and `Bachran, Mary` folders across two dated sessions (Nov 19 and Dec 30 2025),
  downloading the contract contents locally immediately before the Dec 30 deletions, with **no restore
  and no relocation** anywhere in the logs. This is the lead worth pursuing. Honest caveats: it was
  sync-mediated (so the act was a local-Explorer delete) and "recycled" is recoverable, not shredded —
  frame it as removal-from-the-shared-repository, not permanent destruction, and pull the SharePoint
  recycle-bin/retention status to see whether the items were later hard-purged.
- **Clusters 1 and 10** are real owner-initiated interactive deletes by Vetter (a Drafts HardDelete) and
  PTownLegal (an Inbox MoveToDeletedItems), but they are individually weak: a draft and a
  trivially-recoverable move, respectively. Notable as context (the CORA-related items were touched),
  not as destruction in themselves.

**Recommendation:** Lead with Cluster 2. Do **not** repeat the prior error of citing the calendar
cascades (5/7/8) or the eM-client purges (4/6) or send-then-delete (9) as deliberate destruction — the
field values show they are automation, and that claim would not survive a competent rebuttal.
