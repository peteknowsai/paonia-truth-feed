# CORA C 26-12 "Cure" — Microsoft 365 Unified Audit Log Analysis

**Analyzed:** 2026-05-29
**Source:** `raw/documents/cora-responses/C-26-12-cure/` — 10 CSV exports, ~3.1 GB, **1,134,799 audit records** total.
**Method:** Streaming, line-by-line CSV parsing (Python `csv` module + `grep`/`awk`); no file ever loaded whole. Operation counts, per-user `UpdateInboxRules` tallies, burst timestamps, and rule-body inspection done in one pass per file.

---

## HEADLINE (Question 4): Are the inbox-rule definitions now visible?

**Partially — and the part that matters for the bursts is still blank, but NOT because of redaction.**

The cure did un-redact the `AuditData` column (the original C 26-12 redacted it 100%). Operation context, user, workload, client app, SIDs, mailbox owner, folder names, and rule metadata are now readable. **But the substance of a rule (name, conditions, actions) is only present for a specific subset of events, and its presence is governed entirely by Microsoft's own logging — not by the Town's redaction.**

There are two flavors of `UpdateInboxRules`, distinguished by the `RuleOperation` field inside `OperationProperties`:

| `RuleOperation` | Meaning | Rule body in the log |
|---|---|---|
| `AddMailboxRule` | A **new** rule is created | **FULLY POPULATED** — `RuleName`, `RuleCondition` (sender), `RuleActions` all present |
| `ModifyMailboxRule` | An **existing** rule is touched/re-synced | **BLANK** — `RuleName` empty, `RuleCondition` = `{}`, `RuleActions` = `[]`, only `RuleId` survives |

This split is **100% deterministic** and identical in every file. In April: 12 `AddMailboxRule` events → all 12 populated; 3,402 `ModifyMailboxRule` events → all 3,402 blank. In February: 26 add → all populated; 7,020 modify → all blank. **The blank bodies are native M365 behavior** (Exchange does not re-serialize the full rule body for a modify/sync operation; it logs the `RuleId` and the operation type only). It is not the Town blanking them out.

**What this means:** the giant bursts (Dec 19, Jan 27, Feb 24, Apr 3, Apr 9) are overwhelmingly `ModifyMailboxRule` events, so even an unredacted log will never show rule contents for them — Microsoft never recorded those contents. On Apr 3, the 1,134 burst events touch **567 distinct `RuleId`s, most appearing ~2×** — the signature of Outlook bulk **re-stamping the entire existing rule collection** (a client resync / RuleOrganizer pass), not the creation of 1,134 new hidden rules.

**Where rule contents ARE visible**, they are mundane mail-filing rules. Two verbatim (truncated) populated `AddMailboxRule` payloads, both Stefen Wynn, 2026-04-02:

```
"OperationProperties":[{"Name":"RuleOperation","Value":"AddMailboxRule"},{"Name":"RuleId","Value":"0"},
{"Name":"RuleState","Value":"Enabled, ExitAfterExecution"},
{"Name":"RuleCondition","Value":"{([RssServerLockStartTime=1, =/o=ExchangeLabs/...cn=...-b2fca060-e0,
=Rodney Byrge, DisplayType=0], ((SenderSearchKey Equal EX:/O=EXCHANGELABS/...)))}"},
{"Name":"RuleName","Value":"Rodney Byrge"},{"Name":"RuleProvider","Value":"RuleOrganizer"},
{"Name":"RuleActions","Value":"[{\"ActionType\":\"Move\",\"DestinationFolderId\":\"...\",
\"FolderIsInThisStore\":\"True\"}]"}], ... "ParentFolder":{...,"Name":"Inbox","Path":"\\Inbox"}}
```

```
"RuleOperation","Value":"AddMailboxRule" ... "RuleCondition","Value":"{([...,
=Help@grantsolutions.gov, DisplayType=0], ((SenderSearchKey Equal SMTP:HELP@GRANTSOLUTIONS.GOV)))}"},
{"Name":"RuleName","Value":"Help@grantsolutions.gov"}, ...
"RuleActions","Value":"[{\"ActionType\":\"Move\",\"DestinationFolderId\":\"...\",\"FolderIsInThisStore\":\"True\"}]"
```

A blank `ModifyMailboxRule` payload (the kind that makes up the bursts), Stefen Wynn:

```
"OperationProperties":[{"Name":"RuleOperation","Value":"ModifyMailboxRule"},
{"Name":"RuleId","Value":"-4412630970188955647"},{"Name":"RuleState"},
{"Name":"RuleCondition","Value":"{}"},{"Name":"RuleName"},{"Name":"RuleProvider"},
{"Name":"RuleActions","Value":"[]"}], ... "Item":{...,"Name":"Inbox","Path":"\\Inbox"}}
```

**Every populated rule action across all 10 files is `ActionType: Move` to a folder `FolderIsInThisStore:True`.** There are ZERO `DeleteMessage`, `ForwardTo`, `RedirectTo`, `MarkAsRead`, `ForwardAsAttachmentTo`, or `ForwardingSmtpAddress` actions in any `UpdateInboxRules` event. The visible Wynn rules are just "move mail from sender X into folder Y" (e.g., "Rodney Byrge", "Help@grantsolutions.gov").

---

## Q1 — Operation inventory & row counts

**Total rows across all files: 1,134,799.** Per file (rows; date span by ISO `CreationTime`):

| File | Date span | Rows |
|---|---|---|
| AuditLog_2025-11_REDACTED.csv | 2025-11-01 → 2025-12-01 | 134,244 |
| AuditLog_2025-12-02_REDACTED.csv | 2025-12-02 (1 day) | 4,427 |
| AuditLog_2025-12_REDACTED.csv | 2025-12-01 → 2026-01-01 | 161,723 |
| AuditLog_2026-01_REDACTED.csv | 2026-01-01 → 2026-02-01 | 153,377 |
| AuditLog_2026-02_02_REDACTED.csv | 2026-02-27 → 2026-03-01 | 11,242 |
| AuditLog_2026-02_REDACTED.csv | 2026-02-01 → 2026-02-28 | 201,581 |
| AuditLog_2026-03-27_REDACTED.csv | 2026-03-27 (1 day) | 6,169 |
| AuditLog_2026-03_REDACTED.csv | 2026-03-01 → 2026-03-24 | 204,315 |
| AuditLog_2026-04_REDACTED.csv | 2026-04-01 → 2026-05-01 | 199,902 |
| AuditLog_202603_02_REDACTED.csv | 2026-03-23 → 2026-04-01 | 57,819 |

**Dominant operations** (consistent across files): `MailItemsAccessed`, `TaskListRead`, `TaskRead`, `FileAccessed`, `Update`, `Create`, `FilePreviewed`, `FileDownloaded`, `MoveToDeletedItems`, `Send`, `UserLoggedIn`. `UpdateInboxRules` ranges from ~6th to ~14th most common per file.

Mail/deletion ops of interest, summed across files (approx):
- `MoveToDeletedItems` ≈ 30,374 — `SoftDelete` ≈ 7,993 — `HardDelete` ≈ 4,470 (routine, spread across many users; no single-user mass-purge burst observed).
- `Set-Mailbox` ≈ 3,489 (mostly Nov; routine config).
- `Send` / `SendAs` / `SendOnBehalf` present at normal volumes.
- A handful of admin ops: `Add-MailboxPermission`, `Add-RecipientPermission`, `New-InboxRule`, `Set-InboxRule`, `Remove-InboxRule`, `New-Mailbox`, `Remove-Mailbox`, `Set-TransportConfig`, `Set-AdminAuditLogConfig` — all low-count and consistent with normal IT administration.

Some operation *names* are themselves over-redacted to `[REDACTED_TOKEN]` (e.g., `Set-[REDACTED_TOKEN]`, `Install-[REDACTED_TOKEN]`, `New-[REDACTED_TOKEN]`, a 5,596-count `[REDACTED_TOKEN]` op in Nov) — the redaction script clobbered parts of some cmdlet names.

## Q2 — UpdateInboxRules by user

**Stefen Wynn (StefenW@townofpaonia.com) is the SOLE actor for every `UpdateInboxRules` event in all 10 files.** A scan of all 1.13M rows found no other UserId emitting that operation.

| Month / file | Wynn `UpdateInboxRules` |
|---|---|
| Nov 2025 | 1,530 |
| Dec 2025 (monthly) | 1,026 |
| Dec-02 (1-day) | 0 |
| Jan 2026 | 4,291 |
| Feb 2026 (monthly) | 7,046 |
| Feb_02 (overlap) | 0 |
| Mar 2026 (monthly) | 1,674 |
| Mar-27 (1-day) | 0 |
| 202603_02 (Mar 23–Apr 1) | 562 |
| Apr 2026 | 3,414 |
| **GRAND TOTAL** | **19,543** |

**Compared to the ~6,357 prior figure:** the cured set shows **~19,543** Wynn `UpdateInboxRules` events — roughly **3×** the prior estimate. The prior figure was from the capped original export (Nov 2025–Apr 9 2026); the cure's monthly files are far less truncated and run through May 1, so they capture many more events. Note ~562 of these (the `202603_02` file) overlap the Mar/Apr monthly files and would be double-counted if naively summed; the de-duplicated true total is still well above 6,357 — the bursts are real and larger than previously thought, but they are `ModifyMailboxRule` resync events (see Headline).

Distinct from `UpdateInboxRules`, the admin cmdlets `New-InboxRule`/`Set-InboxRule` were used by **RubenS, paonia@, DaoineB, SamiraV** — not Wynn (see Q5).

## Q3 — Burst confirmation (Wynn, all `UpdateInboxRules`, all from a single Outlook client)

All bursts confirmed and **larger** than the prior estimates; all are tightly time-clustered, which is the fingerprint of an automated client resync, not hand-editing:

| Date | Wynn UIR that day | Time window | Peak clustering |
|---|---|---|---|
| 2025-12-19 | **513** | 00:34:53 → 00:34:54 | **all 513 within 2 seconds** (285 in one second, 228 in the other) |
| 2026-01-27 | **1,173** | 16:31:05 → 21:04:40 | two clusters; 353 within the single second 21:04:39, +274 the next second |
| 2026-02-24 | **2,180** | 19:25:02 → 23:51:36 | 287 @22:36:56, 283 @22:37:23, 263 @22:37:24 |
| 2026-04-03 | **1,134** | 18:43:43 → 18:44:27 | **~1,134 within ~44 seconds**; 567 distinct RuleIds each touched ~2× → bulk re-stamp of the full rule set |
| 2026-04-09 | **570** | 14:26:56 → 14:26:59 | **all 570 within ~3 seconds** (245 + 214 + 73 across three consecutive seconds) |

Prior figures were 240 (Dec 19), 405 (Jan 27), 601 (Feb 24), 951 (Apr 3), 484 (Apr 9). The cured counts are higher on every date. Apr 3 is the first business day after the Board's Mar 30 libel letter; Apr 9 is also a documented burst. **Caveat on intent:** these are hundreds-to-thousands of `ModifyMailboxRule` events firing in seconds, touching pre-existing RuleIds — mechanically this is Outlook/RuleOrganizer mass-resyncing the rule blob (e.g., after a profile rebuild, OST recreation, or rules-corruption repair), not a human creating/altering hundreds of rules by hand in 2 seconds. The log does not reveal what any of these modified rules *do*, because M365 didn't record it.

## Q4 — see HEADLINE above.

## Q5 — Forwarding / deletion / external redirect

**No external mail forwarding or redirection anywhere. No `ForwardingSmtpAddress`, no `ForwardAsAttachmentTo`, no auto-delete rule actions in any file.**

`ForwardTo` appears only in legitimate admin `New-InboxRule`/`Set-InboxRule` events, and **every `ForwardTo` target across all 10 files is an internal `@townofpaonia.com` address.** Unique targets seen: `nickip@`, `Jordan_PPW@`, `derekh_ppw@`, `JustinD_pw@`, `RubenS@`, `paonia@` — all townofpaonia.com. The rules themselves are operational:

- **RubenS / paonia@ (Mar 19), "Locates" rule:** From `exactix@colorado811.org`, SubjectContainsWords `UNCC PAON01`, MoveToFolder `Locates`, ForwardTo the Public Works crew (nickip, Jordan_PPW, derekh_ppw, JustinD_pw, RubenS) — distributing Colorado 811 utility-locate tickets to field staff. Fully visible `Parameters`.
- **DaoineB (Mar 20), "Voicemail Forwarding":** SubjectContainsWords `New voicemail received`, ForwardTo `paonia@townofpaonia.com`. Visible.
- **SamiraV (Feb_02), "Clerkslist":** From `CLERKSLIST@LIST.CML.ORG`, MoveToFolder `CLERKSLIST`. Visible.

`RedirectTo` produced exactly one grep hit — a **false positive**: emartinez's `Set-HostedContentFilterPolicy` (Mar 4) contains the spam-policy *setting name* `IncreaseScoreWithRedirectToOtherPort`, not a mail redirect.

`Add-MailboxPermission` grants (≤3 per file) are issued by the system principal `NT SERVICE\MSExchangeAdminApiNetCore` granting `Discovery Management` FullAccess to the `DiscoverySearchMailbox` — standard built-in eDiscovery plumbing, not a human granting themselves access to a coworker's mailbox.

Deletions (`MoveToDeletedItems`/`SoftDelete`/`HardDelete`) occur at routine volumes distributed across many users; no single-actor mass-purge event was found.

## Q6 — Short-window export coverage

The four small files are gap-fillers / overlaps, not new months:

| File | Actual span | Role |
|---|---|---|
| `AuditLog_2025-12-02_REDACTED.csv` | **2025-12-02 only** (1 day) | Fully inside the Dec monthly file's range (2025-12-01→2026-01-01). Overlap, not a gap-fill. No Wynn UIR. |
| `AuditLog_2026-02_02_REDACTED.csv` | **2026-02-27 → 2026-03-01** | Straddles the Feb/Mar boundary; the Feb monthly ends 2026-02-28 and the Mar monthly starts 2026-03-01, so this covers the 02-28→03-01 seam. No Wynn UIR; contains the SamiraV "Clerkslist" New-InboxRule. |
| `AuditLog_2026-03-27_REDACTED.csv` | **2026-03-27 only** (1 day) | The Mar monthly file ends **2026-03-24**, so this single day (03-27) **fills a real gap** the monthly missed. No Wynn UIR. |
| `AuditLog_202603_02_REDACTED.csv` | **2026-03-23 → 2026-04-01** | Bridges the Mar monthly's 03-24 cutoff and the Apr monthly's 04-01 start — **fills the 03-24→04-01 gap** (the late-March tail). Contains 562 Wynn UIR (overlaps a few with the monthlies). |

Net: `2026-03-27` and `202603_02` genuinely fill the late-March hole left when the March monthly stopped at 2026-03-24; the other two mostly overlap existing coverage.

## Q7 — Redaction state

**Redaction tokens (literal):** `[REDACTED_ID]`, `[REDACTED_IP]`, `[REDACTED_TOKEN]`. No `XXXX` or blank-cell redaction style. Volume is enormous (April file alone: ~1.41M `[REDACTED_ID]`, ~338K `[REDACTED_IP]`, ~19K `[REDACTED_TOKEN]`).

**Redacted:** GUIDs/correlation IDs/session IDs/OAuth token IDs/API IDs (`[REDACTED_ID]`), IP addresses (`[REDACTED_IP]`), and mailbox/item ImmutableIds (`[REDACTED_TOKEN]`).

**Over-redaction bugs:**
- In `AuditLog_2026-04` and `AuditLog_202603_02`, the **clock time inside the `CreationDate` column** was redacted as `[REDACTED_IP]` (e.g., `4/1/2026 [REDACTED_IP] AM`). It's a timestamp, not an IP. *Workaround:* the precise ISO `CreationTime` survives inside the `AuditData` JSON, so time-clustering analysis is unaffected.
- Some operation **cmdlet names** were partially clobbered to `[REDACTED_TOKEN]` (`Set-[REDACTED_TOKEN]`, `Install-[REDACTED_TOKEN]`, etc.).

**Preserved (substantive):** Operation, UserId, RecordType, Workload, ResultStatus, ClientProcessName/`ActorInfoString` (e.g., `OUTLOOK.EXE/16.0.x`), ClientInfoString (`Client=MSExchangeRPC`), LogonType, MailboxOwnerUPN/SID, OrganizationName (`townofpaonia.onmicrosoft.com`), folder names/paths (`Inbox`, `Locates`, `CLERKSLIST`), and — critically — `OperationProperties`/`Parameters` including rule `Name`, `Identity`, `From`, `SubjectContainsWords`, `ForwardTo`, `MoveToFolder`, `StopProcessingRules`, and `RuleActions` **for the events where Microsoft logged them** (i.e., `AddMailboxRule` / admin cmdlets). The cure's claim that it preserved "operations, workloads, user activity context" is accurate.

## Q8 — Other notable items

- **Single-client signature for Wynn's rule churn:** every Wynn `UpdateInboxRules` event carries `ClientProcessName: OUTLOOK.EXE`, `ClientInfoString: Client=MSExchangeRPC`, `ExternalAccess: false`, same `LogonUserSid`/`MailboxOwnerSid`. The bursts come from his own logged-in Outlook desktop client, not an external attacker or admin acting on his mailbox.
- **After-hours timing:** Dec 19 (00:34 AM), Feb 24 (19:25–23:51, into late night), Apr 9 (14:26). Some bursts are off-hours, consistent with a client resync triggered by a background event rather than interactive work.
- **`RuleState` on the few visible adds:** `Enabled, ExitAfterExecution` / `ExitAfterExecution` — normal.
- **Telemetry-style ops** appear starting Feb (`BaselineSecurityModeThirdPartyAppHPA`) and April (`IDCRLBlockedDueToSoftEnforcement` ~6,744, `AttachmentAccess` spikes) — security/identity enforcement noise, not user actions.
- **No mailbox-permission self-grants, no external recipient permissions, no transport-rule exfil:** the only `Add-MailboxPermission`/`Add-RecipientPermission`/`Set-TransportConfig` entries are system/admin routine.

---

### Bottom line
The cure substantially un-redacted `AuditData` and the preserved content is genuine and useful. But it does **not** reveal what Wynn's burst rules do — because those events are `ModifyMailboxRule` resyncs that Microsoft never records the rule body for. The events where rule contents *are* logged (new-rule creations and admin cmdlets) show only ordinary "move sender → folder" rules and **internal-only** forwarding for legitimate workflows (Colorado 811 locates, voicemail, the CML clerks listserv). **No external forwarding, no auto-delete rules, no mailbox exfiltration appears anywhere in 1.13M records.** The bursts remain unexplained as to purpose, but their mechanical nature (hundreds of pre-existing RuleIds re-stamped in seconds from Wynn's own Outlook client) points to client/rule-store resync rather than deliberate per-rule editing — and the cure cannot prove otherwise either way, because the underlying rule contents were never in the M365 log to begin with.
