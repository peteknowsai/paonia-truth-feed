# C 26-12 Cure — People, the Attorney, and Who the Town Hid

Forensic dig into the Town of Paonia's *cured* M365 Unified Audit Log production
(CORA C 26-12). Ten `AuditLog_*.csv` files, **1,134,799 rows**, Nov 2025 – early May 2026.
Schema: `CreationDate,UserId,Operation,RecordType,AuditData` (AuditData = nested JSON).
Streamed line-by-line; nothing bulk-loaded. Client IPs / browser / device fields ignored by request.

**Headline:** The redaction is cosmetic and self-defeating. It hides specific *named people*
(mostly the Town Clerk and Town Administrator) behind a token in the UserId column while
leaving their Microsoft PUID in the very next field — so every "redacted" row is trivially
re-identified. Meanwhile the **Town Attorney's activity is fully in the clear**: invoices,
an employment agreement, calendar invites, and emails about him are all visible, including
the dates Town staff *deleted* them.

---

## Q1 — THE ATTORNEY (Clayton M. Buchner, `ClayB@townofpaonia.com`)

### The attorney's own mailbox is NOT in the production at all
`ClayB@townofpaonia.com` appears **0 times** as a mailbox owner, sender, or logged-in user
across all ten files. His personal Town mailbox was not part of the export. Everything we see
is the attorney's name/work surfacing inside **Town staff** mailboxes and SharePoint/OneDrive.

### What IS visible: 939 audit events, all UN-redacted
- **939 events** mention `clayton` (792) or `buchner` (147). (Literal `clayb` only appears as
  part of the address, which is absent.)
- **Date range: 7 Nov 2025 → 1 May 2026.**
- **Every one of the 939 rows has a CLEAR (non-redacted) UserId column. Zero are masked.**
- Subjects/filenames in the clear on attorney rows: **620 subject fields present, 1 redacted.**
  Redaction rate on attorney content ≈ **0.1%**, *below* the 0.9% baseline — attorney activity
  is **not** singled out for masking. If anything it is more visible than average.

Where the attorney's name actually lands (per-row classification of the carrying field):
| Location of the term | rows |
|---|---|
| `Subject` (email/calendar) | 170 |
| `ObjectId` (SharePoint file path) | 154 |
| `SourceFileName` + `ObjectId` | 132 |
| `SourceFileName` | 2 |
| elsewhere in AuditData (folder paths, attachments, meeting titles) | 481 |

By operation (top): MailItemsAccessed 560, FileAccessed 79, FileDownloaded 67,
FileSyncUploadedFull 43, **Send 33**, **MoveToDeletedItems 28**, FilePreviewed 19,
SharingSet 16, Create 16, **SoftDelete 9**, FileMoved 7, SharingLinkCreated 6.

Town mailboxes/owners handling attorney material (by event count):
`ClerkOperations-M-ThAM` 259, **RubenS (Town Administrator) 194**, **SamiraV (Town Clerk) 97**,
`paonia@` 51, StefenW 11, **PTownLegal@townofpaonia.com 4**, AshleyR 1.

### Verbatim sample of attorney-related events (date | op | what carried the name)
```
11/07/2025  SharingLinkCreated   FILE: Clayton M. Buchner 0888.pdf            (invoice shared via link)
11/07/2025  FileDownloaded       FILE: Clayton M. Buchner 0888.pdf
11/07/2025  MailItemsAccessed    path: \Inbox\Invoices\Buchner (attorney)
11/12/2025  MailItemsAccessed    SUBJ: "Clay Buchner has joined your meeting - 11/10/2025..."
11/18/2025  SoftDelete           attachment: emp_agr_paonia_buchner_1.28.25.docx   (employment agreement, DELETED)
11/19/2025  FolderRecycled       FILE: "Clayton M Buchner, Attorney at Law, LLC"   (whole folder recycled)
11/20/2025  MailItemsAccessed    SamiraV  SUBJ: "RE: Buchner_July invoice"
11/25/2025  MoveToDeletedItems   SUBJ: calendar invites "(Clayton Buchner)" — several moved to Deleted Items
11/25/2025  MoveToDeletedItems   attachment: emp_agr_paonia_buchner_1.28.25.docx   (employment agreement, DELETED again)
12/04/2025  Create               paonia@  path: \Inbox\Invoices\Buchner (attorney), size 364002
12/12/2025  MoveToDeletedItems   SamiraV  SUBJ: "Accepted: Business Licensing @ Mon Dec 15 ... (Clayton Buchner)"
12/12/2025  MoveToDeletedItems   SamiraV  SUBJ: "Proposed new time: Business Licensing ... (Clayton Buchner)"
12/15/2025  MoveToDeletedItems   SamiraV  SUBJ: "Accepted: Business Licensing @ Mon Dec 29 ... (Clayton Buchner)"
12/22/2025  FileDownloaded       FILE: Clayton M. Buchner 0888.pdf
12/22/2025  FileDownloaded       FILE: Buchner-0883.pdf
12/22/2025  SharingLinkCreated   FILE: Buchner - 0897.pdf
```
Invoice numbers seen as filenames: 0824, 0836, 0860, 0867, 0876, 0883, 0888, 0897, 0902,
0909, 0913, 0919 plus "Buchner_July invoice", "Clayton Request.pdf", "Clayton Response.pdf/.zip".

### External / law-firm domains
No recurring outside law-firm domain shows up as a correspondent. The attorney corresponds
from his Town address (absent from the export) and via the shared `PTownLegal@townofpaonia.com`
mailbox. External domains that *do* recur are vendors/peers, not a law firm: `istonish.com`
(126, IT contractor), `phonz.com` (88), `fcgov.com` (47, Fort Collins), `townofhotchkiss.com`
(39), `respec.com` (4), plus a handful of gmail.

### Bottom line (Q1)
We can see the **existence, timing, and subjects** of attorney-related email and documents in
the clear — invoices, an employment agreement, meeting invites, and notably a cluster of
**deletes** (SoftDelete / MoveToDeletedItems / FolderRecycled) of attorney invoices and the
employment-agreement attachment in Nov–Dec 2025. The attorney is **not** hidden. What's missing
is simply his own mailbox, which was never exported.

---

## Q2 — WHO IS HIDDEN IN THE REDACTED 0.9% OF UserId?

**It is people, not machines.**

- Rows where the **UserId column itself is a redaction token: 10,203 (0.899%** of 1,134,799 — confirms the ~0.9% baseline).
- Of those, **10,083 carry a surviving Microsoft PUID** in the sibling `UserKey` field; only
  **94 are unrecoverable** and 14 sit under `[REDACTED_TOKEN]`.
- A PUID (16-hex "passport/NetID", e.g. `10032001EA59EC28`) is a **stable per-person account ID**.
  Cross-referencing every PUID against rows where the same PUID appears next to a *plaintext* UPN
  resolves **9,969 of the redacted rows to a named Town employee.**
- **Service/app principals among the redacted-UserId rows: ZERO.** Every PUID is the 16-hex
  human shape; none are GUID app-IDs, SIDs, or `ServicePrincipal_*` strings. The masking is not
  protecting benign service accounts — it is masking identifiable humans.

### The named people hidden behind the token (redacted-UserId rows → real person)
| Hidden person | rows | dominant operations |
|---|---:|---|
| **SamiraV@townofpaonia.com** (Town Clerk) | **6,575** | TaskUpdated 4881, TaskCreated 669, TaskDeleted 437, TaskRead 302, Search 201 |
| **RubenS@townofpaonia.com** (Town Administrator) | **2,420** | TaskUpdated 2216, TaskCreated 104, TaskDeleted 95, Search 5 |
| DaoineB@townofpaonia.com | 400 | TaskCreated/Updated, LinkedEntityUpdated |
| AshleyR@townofpaonia.com | 170 | TaskCreated 113, LinkedEntityUpdated 38 |
| StefenW@townofpaonia.com | 150 | TaskUpdated 99, TaskCreated 35 |
| (PUID 100320037C41928D, human, unmapped) | 114 | TaskUpdated 105 |
| JoannK@townofpaonia.com | 87 | Planner tasks |
| DWhite@townofpaonia.com | 60 | Search 60 |
| EMartinez@townofpaonia.com | 48 | Search 48 |
| PaigeS@townofpaonia.com | 24 | Planner tasks |
| KHeinigerPPD, RickS, Phonz, MLaimingerPPD, LucyH, NickiP | <11 each | tasks/search |

Disproportionate representation: **SamiraV alone = 64% of all hidden-UserId rows; SamiraV + RubenS
= 88%.** The attorney is NOT among the hidden — Buchner has no PUID in this set (his mailbox isn't
in the export). The hidden activity is overwhelmingly **Microsoft Planner / To-Do task activity**
(`TaskUpdated/Created/Deleted`) and `Search`, by the Clerk and Administrator.

### Bottom line (Q2)
When the Town redacts the UserId column, it is hiding the **name of a specific person** — almost
always the Town Clerk (SamiraV) or Town Administrator (RubenS) doing Planner-task and search
activity. The redaction is reversible in one step (read the adjacent `UserKey` PUID), so it
protects nothing; it merely obscures, on its face, who was acting.

---

## Q3 — WHAT DID THEY PATTERN-MATCH ON? (the redaction logic)

The dominant pass (9 of 10 files) is **VALUE-pattern / regex on content, not key-name based.**
Proof:

- **`[REDACTED_ID]` ≈ GUID regex (8-4-4-4-12 hex).** It lands on ~80 different JSON keys
  (ClientAppId, Id, OrganizationId, CorrelationId, UserKey, MailboxGuid, AppId, …). A key-name
  filter would not touch that many unrelated keys; a GUID-shaped value regex would.
- **`[REDACTED_IP]` = IPv4 regex, and it MISFIRES.** It replaces values under `ClientIP`/
  `ClientIPAddress`/`ActorIpAddress` (expected) **but also `BrowserVersion` (17,691×) and
  `CopilotLogVersion` (154×)** — because dotted version strings look like IPv4:
  - `BrowserVersion: "142.0.7444.102"` → `[REDACTED_IP]`  (Chrome version, 4 dotted parts)
  - `CopilotLogVersion: "1.0.0.0"` → `[REDACTED_IP]`
  - But `BrowserVersion: "601.2.4"` / `"604.1"` (3 or 2 parts) **survive** — exactly what an
    IPv4 `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` regex would do. Decisive proof the rule reads the
    *value's shape*, not the field name. (A key-name rule would never redact a "BrowserVersion".)
- **`[REDACTED_TOKEN]` = long opaque base64/JWT-ish blobs.** It lands on Id, ImmutableId,
  UniqueTokenId, AppPoolName, and — tellingly — on `Operation` 5,580× where the operation
  value itself was a long token-like string. Pattern is "long high-entropy string", not a key list.

**The one exception:** `AuditLog_2026-04_REDACTED.csv` was run through a **second, key-name-aware**
tool (see Q4) that labels each masked value by its JSON key. So the corpus contains *two
incompatible redaction methodologies*: value-regex (9 files) + key-name labeling (April only).

Inferred rules, plainly:
1. If a value matches a GUID regex → `[REDACTED_ID]`.
2. If a value matches an IPv4 regex → `[REDACTED_IP]` (catches version strings by accident).
3. If a value is a long opaque token/base64/JWT → `[REDACTED_TOKEN]`.
4. April only: replace by key name → `[REDACTED-MAILBOX-GUID]`, `[REDACTED-SID]`, etc.

---

## Q4 — THE BOUTIQUE ONE-OFF TOKENS (full token set)

**38 distinct redaction tokens** in total. Three are the consistent value-regex pass (all 10 files);
the other **35 appear in exactly ONE file — `AuditLog_2026-04_REDACTED.csv`** — produced by a
different, key-name-aware tool/pass.

The big three (every file):
| token | count | example field replaced |
|---|---:|---|
| `[REDACTED_ID]` | 10,190,339 | APIId, ClientAppId, OrganizationId, UserKey, MailboxGuid, … |
| `[REDACTED_TOKEN]` | 2,953,959 | Id, ImmutableId, UniqueTokenId, even the Operation value |
| `[REDACTED_IP]` | 1,647,601 | ClientIP, ClientIPAddress, + BrowserVersion/CopilotLogVersion misfires |

The 35 boutique tokens — **all only in the April file** — each named by the JSON key it masked
(count, example field):
```
[REDACTED]                 302299  ClientAppId/Id/ImmutableId/CorrelationId/OrganizationId/...
[REDACTED-GUID]            109283  UserKey (e.g. after BackupAdminLefH@townofpaonia.com)
[REDACTED_GUID]             75053  (alt spelling, same pass)
[REDACTED-ID]               51355  PlanId on PlannerTask rows
[REDACTED_IDENTIFIER]       48748  APIId in AppAccessContext
[REDACTED-APP-ID]           15215  ClientAppId
[REDACTED_APP_ID]           11092  ClientAppId (alt spelling)
[REDACTED-MESSAGE-ID]        6267  InternetMessageId
[REDACTED-TOKEN-ID]          6207  UniqueTokenId
[REDACTED-IMMUTABLE-ID]      6113  ImmutableId
[REDACTED-SID]               6012  LogonUserSid
[REDACTED-TOKEN]             5737  ImmutableId
[REDACTED-REQUEST-ID]        4796  ClientRequestId
[REDACTED_IMMUTABLE_ID]      4581  ImmutableId (alt spelling)
[REDACTED_TASKLIST]          4207  TaskList (Planner)
[REDACTED_CORRELATION_ID]    3725  CorrelationId
[REDACTED-MAILBOX-GUID]      3005  MailboxGuid
[REDACTED-CORRELATION-ID]    2976  CorrelationId (alt spelling)
[REDACTED-TENANT-ID]         2727  TokenTenantId
[REDACTED-SESSION-ID]        1944  SessionId
[REDACTED_SESSION_ID]        1756  AADSessionId (alt spelling)
[REDACTED-OBJECT-ID]         1669  ObjectId
[REDACTED-LIST-ID]           1450  ListId
[REDACTED-USER-ID]           1270  UserId (next to UserKey 10032001EA59EC28 = SamiraV)
[REDACTED-TASKLIST]          1247  TaskList (alt spelling)
[REDACTED-WEB-ID]             739  WebId
[REDACTED-DEVICE-ID]          715  DeviceId
[REDACTED-EVENT-SIGNATURE]    412  EventSignature
[REDACTED-MACHINE-ID]         169  MachineId
[REDACTED-CONTEXT-ID]         126  ActorContextId
[REDACTED-SYSTEM-ID]          126  InterSystemsId
[REDACTED-EXTERNAL-EMAIL-ID]   40  UserId (external email masked — but only in this one file)
[REDACTED-SHARING-ID]          10  UniqueSharingId
[REDACTED-DOMAIN-ID]            9  MachineDomainInfo
[REDACTED-EVENT-DEEPLINK]       3  EventDeepLink
```

Note the inconsistency *within* the April pass: both dash and underscore spellings of the same
concept (`[REDACTED-GUID]` vs `[REDACTED_GUID]`, `[REDACTED-CORRELATION-ID]` vs
`[REDACTED_CORRELATION_ID]`, etc.), implying ad-hoc/hand-built rules. And
`[REDACTED-EXTERNAL-EMAIL-ID]` shows external emails were masked in the April file but left in
the clear everywhere else — the redaction standard changed file-to-file.

### Bottom line (Q4)
Two completely different redaction tools were used: a crude 3-token value-regex on nine files,
and a key-name-aware tool (with internally inconsistent dash/underscore naming) on the April file
alone. This is textbook evidence of an inconsistent, multi-pass, partly hand-rolled redaction.

---

## Q5 — SUBJECTS + WHO-EMAILED-WHOM

### Subjects survive almost completely
Across mail-type operations: **352,012 subject fields present, only 56 redacted = 0.016%.**
Email/calendar **Subject lines are effectively NOT redacted** — content is fully readable.

### What M365 logs about correspondents — and what survives
On mail operations the only correspondent field the Unified Audit Log records (and that survives)
is **`MailboxOwnerUPN`** (the mailbox where the event happened) — present 392,090×.
- `SendAsUserSmtp` present 678× (delegate "send as").
- `SendOnBehalfOfUserSmtp` present 16×.
- **No `From` / `Sender` / `To` / `Cc` / `Bcc` / `Recipients` fields exist on these records.**
  M365's MailItemsAccessed/Send/Delete events log the *mailbox owner and the subject*, not the
  full recipient list. So **who↔whom can only be partially reconstructed**: we get the mailbox
  owner + subject + InternetMessageId, and can infer counterparties from subjects
  (e.g. "(Clayton Buchner)") and InternetMessageId server strings — but there is **no clean
  To/From list** in this data. This is a property of the Microsoft log, not the redaction.

### Top mailbox owners by mail-event volume
SamiraV 64,462 · StefenW 57,826 · RubenS 39,891 · NickiP 26,541 · DaoineB 24,127 ·
MLaimingerPPD 21,637 · paonia@ 19,011 · AshleyR 17,742 · RodneyB_PW 9,941 · Jordan_PPW 9,126 ·
JoannK 8,022 · PaigeS 7,995 · departmentheads@ 7,305 · GHendersonPPD 5,036 · KHeinigerPPD 4,108 ·
**PTownLegal@ 4,012** · BBardessonAPPD 3,855 · TSeeleyPPD 3,773 · LucyH 3,635 · grants@ 3,146.

### Example mail events (date | op | mailbox owner | subject, verbatim/truncated)
```
11/03/2025  Update  StefenW   ALL STAFF MEETING - MANDATORY [In-person]
11/03/2025  Update  joannk    ALL STAFF MEETING - MANDATORY [In-person]
11/03/2025  Update  nickip    ALL STAFF MEETING - MANDATORY [In-person]
11/03/2025  Update  Coryheiniger_PW   Matt Taylor discussion
11/03/2025  Update  nickip    Mountain Harvest Festival Debrief
11/03/2025  Update  Coryheiniger_PW   Grass Demo
11/20/2025  MailItemsAccessed  SamiraV   RE: Buchner_July invoice
12/12/2025  MoveToDeletedItems SamiraV   Accepted: Business Licensing @ Dec 15 ... (Clayton Buchner)
12/12/2025  MoveToDeletedItems SamiraV   Proposed new time: Business Licensing ... (Clayton Buchner)
12/15/2025  MoveToDeletedItems SamiraV   Accepted: Business Licensing @ Dec 29 ... (Clayton Buchner)
```

### Bottom line (Q5)
Subjects are in the clear (99.98%). We can see *what* every mailbox owner sent/read/deleted and
*when*, but the full recipient list is genuinely absent from the source M365 records — so
who↔whom is reconstructable in outline (mailbox owner + subject + message-id), not as a clean
sender→recipient ledger.

---

## Cross-cutting takeaways

1. **The redaction hides people, not secrets.** 0.9% of rows mask the actor's name in the UserId
   column, but the adjacent PUID re-identifies 98% of them — almost entirely the Town Clerk
   (SamiraV) and Town Administrator (RubenS).
2. **The Town Attorney is fully visible**, including a Nov–Dec 2025 cluster of *deletions* of his
   invoices and the Town's employment agreement with him. His personal mailbox simply wasn't exported.
3. **Two incompatible redaction tools** were used across the ten files (value-regex on 9, key-name
   labeler on April), with internally inconsistent token naming and an IPv4 regex that mangles
   browser/Copilot version strings — strong evidence of an ad-hoc, multi-pass, unstandardized cure.

*Data: `/Users/pete/Projects/paonia/paonia-truth-feed/raw/documents/cora-responses/C-26-12-cure/AuditLog_*.csv`.
Analysis artifacts: `/Users/pete/.claude/jobs/445a2ebe/tmp/` (people_result.json, puid_result.json,
att_result.json, tokens_result.json).*
