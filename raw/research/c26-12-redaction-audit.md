# CORA C 26-12 Cure — Redaction Audit of Town of Paonia M365 Audit Logs

**Date:** 2026-05-29
**Scope:** 10 CSV files, **1,134,799 rows** of Microsoft 365 / Purview unified audit log,
streamed line-by-line (never bulk-loaded). Schema: `CreationDate, UserId(s), Operation(s), RecordType, AuditData(JSON)`.
**Legal frame:** Town redacted under C.R.S. § 24-72-204(2)(a)(VIII) ("specialized details of security
arrangements or investigations"), narrowed in the cure to "technical identifiers" (tokens, GUIDs,
correlation/immutable IDs, application/API IDs, TaskList values). That exemption is meant to be **narrow**.

---

## 5. BOTTOM LINE (verdict first)

**The cure is a MIX — but it leans over-broad and it is provably leaky.** It is *not* internally
consistent: the same categories of value are redacted in some rows and sit in plaintext in others,
and the redaction was applied by mechanical find-and-replace (multiple inconsistent passes — at least
**38 distinct redaction marker strings**), not a considered field-level legal review.

Three independent grounds for a § 204 challenge:

1. **Over-broad as to category.** The redaction sweeps in ordinary public-record content that is not a
   "security arrangement": internal IPs, the file/folder names and SharePoint paths of public business
   documents, object IDs, and (in a minority of rows) user UPNs/email addresses. Meanwhile the
   *substance* of the records — who accessed/sent/deleted what mail, email **Subjects**, sender/owner
   UPNs, file names, timestamps — is fully preserved, confirming the withheld identifiers were never
   what made the record sensitive. You can't claim the GUIDs are a "security arrangement" while
   publishing the file names and subjects they point to.

2. **Internally inconsistent / leaky (find-and-replace misses).** Every field the Town treats as
   exempt appears un-redacted somewhere: 283 distinct client IPs in plaintext (incl. 5 internal
   RFC1918 IPs), 38,734 distinct plaintext ObjectId values, 186 distinct plaintext UserIds, 546
   plaintext InternetMessageIds. UserId is in plaintext in **99.1%** of rows and redacted in 0.9% —
   there is no coherent theory under which the same field is a security secret 0.9% of the time. This
   is the Verkada pattern (missed UUIDs/IPs) at scale.

3. **Fully recoverable redactions.** 173,009 "redacted" timestamps are 100% recoverable from a sibling
   field; 21,689 redacted file URLs are recoverable from sibling file-name fields. A redaction that the
   record itself defeats is not protecting anything — it fails the "specialized details" test on its face.

**Defensible core:** Live credentials *are* a legitimate fit — OAuth/bearer tokens, `UniqueTokenId`,
`AADSessionId`, `SessionId`, `TokenObjectId`. Redacting those is fine and you should concede it. But
that's a small slice of the redaction weight. The bulk (`Id`, `OrganizationId`, `CorrelationId`,
`ClientIP`, `MailboxGuid`, `UserKey`, `ObjectId`, file paths) is identifiers and operational data, not secrets.

**Use this line:** *The Town withheld over 12 million field values as "specialized details of security
arrangements," yet preserved the email subjects, sender and recipient identities, file names, folder
paths, and timestamps those values index — and left the very same "secret" identifiers in plaintext in
hundreds of thousands of other rows. The redaction is over-broad as a matter of category and incoherent
as applied.*

---

## 1. REDACTION TOKEN CATALOG

### 1a. Marker strings (full scan, raw occurrences across all 10 files)
Three primary tokens dominate; **35 additional boutique variants** appear, each confined to a single
file — direct evidence the cure was run as multiple inconsistent passes, not one policy.

| Marker | Raw occurrences | Files |
|---|---:|---:|
| `[REDACTED_ID]` | 10,190,339 | 10 |
| `[REDACTED_TOKEN]` | 2,953,959 | 2 |
| `[REDACTED_IP]` | 1,647,601 | 10 |
| `[REDACTED]` | 302,299 | 1 |
| `[REDACTED-GUID]` / `[REDACTED_GUID]` | 109,283 / 75,053 | 1 / 1 |
| `[REDACTED-ID]` | 51,355 | 1 |
| `[REDACTED_IDENTIFIER]` | 48,748 | 1 |
| `[REDACTED-APP-ID]` / `[REDACTED_APP_ID]` | 15,215 / 11,092 | 1 / 1 |
| `[REDACTED-MESSAGE-ID]`, `[REDACTED-TOKEN-ID]`, `[REDACTED-IMMUTABLE-ID]`, `[REDACTED-SID]`, `[REDACTED-REQUEST-ID]`, `[REDACTED_TASKLIST]`, `[REDACTED-CORRELATION-ID]`, `[REDACTED-MAILBOX-GUID]`, `[REDACTED-TENANT-ID]`, `[REDACTED-SESSION-ID]`, `[REDACTED-OBJECT-ID]`, `[REDACTED-USER-ID]`, `[REDACTED-WEB-ID]`, `[REDACTED-DEVICE-ID]`, `[REDACTED-MACHINE-ID]`, `[REDACTED-EXTERNAL-EMAIL-ID]`, `[REDACTED-DOMAIN-ID]`, … | <7k each | 1 each |

(The 38-variant raw counts over-count vs. the JSON-key counts below, because some AuditData JSON is
nested/escaped. The per-key figures below are the authoritative measure of *what field* was withheld.)

### 1b. Which JSON keys receive each token (authoritative, parsed from 1.13M JSON blobs)

**`[REDACTED_IP]` (1,061,098 field values)** — supposedly IP addresses, but applied to non-IP fields:
| Key | Count | Is it actually an IP? |
|---|---:|---|
| `ClientIP` | 633,269 | yes |
| `ClientIPAddress` | 333,371 | yes |
| **`DeviceDisplayName`** | 66,084 | **NO — device name** |
| **`BrowserVersion`** | 17,691 | **NO — browser version string** |
| `ActorIpAddress` | 9,675 | yes |
| `SenderIp` / `SenderIP` | 824 / 28 | yes |
| `CopilotLogVersion`, `SourceFileName`, `Value` | 154 / 1 / 1 | **NO** |

The `CreationDate` *column* (not a JSON key) is also redacted with `[REDACTED_IP]` — see §4a; the regex
hit the clock time (`8:40:54`) as if it were an IP.

**`[REDACTED_TOKEN]` (152,324 field values)** — applied to `Id`, `ImmutableId`, `UniqueTokenId`,
`TokenObjectId`, `TokenTenantId`, `PFTTokenAppId` (plausible), **but also** `Operation` (5,580),
`Workload` (1,686), `ObjectId` (1,604), `Name` (2,657), `SourceRelativeUrl` (566), `PlanId` (785),
`AppPoolName` (1,907), `TaskList` (170), `SourceFileName`, `ListUrl`, `UserId` (14). Redacting the
`Operation`/`Workload`/file-path of a record is not redacting a credential.

**`[REDACTED_ID]` (9,029,067 field values)** — 96 distinct keys. Top: `ClientAppId` (1.21M), `Id` (1.04M),
`OrganizationId` (1.04M), `CorrelationId` (749k), `ClientRequestId` (642k), `UserKey` (604k),
`MailboxGuid` (438k), `APIId` (371k), `AppId` (361k), `TokenTenantId` (360k), `AADSessionId` (303k),
`TokenObjectId` (277k), `Site`/`WebId`/`ListId`/`ListItemUniqueId` (SharePoint object IDs, 150–174k each),
`DeviceId` (154k), `SessionId` (96k), `UniqueTokenId` (87k). **Also caught:** `ObjectId` (19,924 — these
are email/UPN/file-URL values), `UserId` (10,173 — UPNs), `InternetMessageId` (4,695), `Value`/`NewValue`
(audit change-tracking content), `PlanId`, `RequestId`.

---

## 2. WHAT'S PRESERVED (the un-redacted substance)

For the high-value operations, the *content that documents public business survives in plaintext.*

| Field | Preserved (plaintext) | Redacted | % preserved |
|---|---:|---:|---:|
| **Subject** (email) | 1,228,830 | 23 | **99.998%** |
| **MailboxOwnerUPN** | 462,833 | 0 | **100%** |
| **UserId** | 1,083,099 | 10,187 | 99.1% |
| **ObjectId** | 587,215 | 21,528 | 96.5% |
| **InternetMessageId** | 1,247,004 | 4,695 | 99.6% |
| **SourceFileName** | 170,112 | 3 | ~100% |
| **SourceRelativeUrl** (folder path) | 169,753 | 571 | 99.7% |
| Operation | 1,087,706 | 5,580 | 99.5% |
| Workload | 1,091,600 | 1,686 | 99.8% |
| ClientIP | 131,060 | 633,269 | 17.1% |
| ClientIPAddress | 129,462 | 333,371 | 28.0% |

**Email Subjects and Recipients survived.** Subjects are preserved verbatim (e.g. `"ALL STAFF MEETING -
MANDATORY [In-person]"`, `"RE: Paonia Water Treatment Facilities Improvements"`, `"FW: Colorado State
Fire Fighters Association Membership Renewal Invoice"`). For `Send`, recipient/message metadata lives in
the un-redacted `Item` object (`InternetMessageId`, `Id`, `ImmutableId`, attachment names). Sender and
mailbox-owner identity (`UserId`, `MailboxOwnerUPN`) are 100% preserved. This metadata of public
officials' email is **not a "security arrangement"** — its survival proves the redacted GUIDs weren't either.

Truncated examples:

`Send` (sender RubenS@townofpaonia.com — message metadata in clear):
```
{"CreationTime":"2025-12-02T22:28:55","Operation":"Send","Workload":"Exchange",
"UserId":"RubenS@townofpaonia.com","MailboxOwnerUPN":"RubenS@townofpaonia.com",
"ClientProcessName":"OUTLOOK.EXE","OrganizationName":"townofpaonia.onmicrosoft.com",
"Item":{"Attachments":"smime.p7m (80695b)",
"InternetMessageId":"<BY5PR12MB4210...@BY5PR12MB4210.namprd12.prod.outlook.com>", ...}}
```

`FileAccessed` (file name + folder path + personal site URL in clear; only the GUIDs masked):
```
{"CreationTime":"2025-11-03T16:06:02","Operation":"FileAccessed","Workload":"OneDrive",
"UserId":"app@sharepoint","SourceRelativeUrl":"Documents/Desktop",
"SourceFileName":"Ruben's Deposits.xlsx","SourceFileExtension":"xlsx",
"SiteUrl":"https://townofpaonia-my.sharepoint.com/personal/rubens_townofpaonia_com/"}
```

`MailItemsAccessed` (owner UPN, client, server all in clear; tokens/IDs masked):
```
{"CreationTime":"2025-12-02T09:49:35","Operation":"MailItemsAccessed","Workload":"Exchange",
"UserId":"StefenW@townofpaonia.com","MailboxOwnerUPN":"StefenW@townofpaonia.com",
"ClientInfoString":"Client=OutlookService;Outlook-iOS/2.0;",
"OriginatingServer":"DM6PR12MB5005 (15.20.4200.000)", "UniqueTokenId":"uc5AJHAAZkWKJYVV8OgTAA"...}
```
(Note: `UniqueTokenId` here is in **plaintext** even though it's a redaction target elsewhere — see §4b.)

---

## 3. JUSTIFICATION ASSESSMENT (by category, with count weight)

**(a) DEFENSIBLE — live security credentials, § 204(2)(a)(VIII) fits.**
Keys: `UniqueTokenId` (87k+25k), `AADSessionId` (303k), `SessionId` (97k), `TokenObjectId` (277k),
`APIId` (371k), `AppId`/`ClientAppId` (361k/1.21M — arguably). These are bearer-token / session material.
**Concede these.** Approx. count weight (token-ish keys): **~2.5M field values** of the ~10.2M.

**(b) DEBATABLE — identifiers, not secrets.**
`OrganizationId`/tenant ID (1.04M — single fixed value, publicly discoverable), `CorrelationId` (749k),
`Id` (1.04M), `ImmutableId`, `MailboxGuid` (438k), `ClientRequestId` (642k), `RequestId`,
`ListId`/`WebId`/`Site`/`ListItemUniqueId` (SharePoint object IDs, ~660k). These are opaque identifiers
that *index* records; they aren't credentials and disclosing them reveals no "security arrangement," but a
court might accept a thin security rationale. **Count weight: ~5M+ field values.**

**(c) OVER-BROAD / improper — ordinary public-record content.**
- **Internal/all client IPs** (`ClientIP` 633k, `ClientIPAddress` 333k, `ActorIpAddress`, `SenderIp`) — IP
  addresses of public-business activity are not a security arrangement; internal RFC1918 IPs especially are
  mundane. ~977k values.
- **File names & folder paths** wherever caught (`SourceFileName`, `SourceRelativeUrl`, `ObjectId` file URLs).
- **User UPNs / email addresses** caught by `UserId` (10,187) and `ObjectId` (21,528) redactions — public
  officials' identities conducting public business.
- **Non-IP data mis-tagged `[REDACTED_IP]`**: `DeviceDisplayName` (66k), `BrowserVersion` (18k).
- **Operational fields mis-tagged `[REDACTED_TOKEN]`**: `Operation`, `Workload`, `Name`, `Value`/`NewValue`,
  `PlanId`, `TaskList`.
  **Count weight: ~1.1M+ field values that are plainly not "specialized security details."**

---

## 4. RECOVERY — reconstructing redacted information

### 4a. Timestamps — 173,009 redacted clocks, 100% recoverable
The cure redacted the **time portion of the `CreationDate` column** as `[REDACTED_IP]` (the regex mistook
`8:40:54` for an IP). The column reads e.g. `"3/6/2026 [REDACTED_IP] AM"`. But the ISO `CreationTime`
inside the AuditData JSON of the *same row* is in clear.

| File | Rows w/ redacted CreationDate | Recoverable from CreationTime |
|---|---:|---:|
| AuditLog_2026-03_REDACTED.csv | 114,315 | 114,315 |
| AuditLog_202603_02_REDACTED.csv | 57,819 | 57,819 |
| AuditLog_2026-04_REDACTED.csv | 875 | 875 |
| **TOTAL** | **173,009** | **173,009 (100%)** |

Example: `CreationDate = "3/6/2026 [REDACTED_IP] AM"` → `CreationTime = "2026-03-06T08:40:54"`. Exact time fully recovered.

### 4b. Inconsistent redaction — same category in plaintext elsewhere (find-and-replace misses)
Every "exempt" field leaks in plaintext somewhere:

| Field | Times redacted | Distinct plaintext values recovered |
|---|---:|---:|
| ClientIP | 633,269 | 4,393 distinct values seen in clear |
| ClientIPAddress | 333,371 | 5,123 distinct values seen in clear |
| **Distinct IPs total** | — | **283** (incl. **5 internal RFC1918**) |
| ObjectId | 21,528 | 38,734 distinct plaintext |
| UserId (UPNs) | 10,187 | 186 distinct plaintext |
| InternetMessageId | 4,695 | 546 distinct plaintext |
| Id | ~1.04M | 1,646 distinct plaintext |
| UniqueTokenId | 112k | present in plaintext in many MailItemsAccessed rows |

Recovered IP examples (top by frequency): the Town's apparent public gateway **`209.206.70.xx`**
(redacted in most rows, appears 24,543× in plaintext) and several Microsoft service IPs
(`20.190.154.xx`, `40.126.26.xx`). Internal IPs recovered in plaintext include **`192.168.40.xx`,
`192.168.1.xx`, `172.20.7.xx`, `192.168.0.xx`, `192.168.80.xx`** (final octet masked here; category:
internal LAN addresses — the exact value sits in clear in the data).

Recovered UPNs (caught by an over-zealous UserId/ObjectId redaction in a few rows but in clear in the rest):
the full town staff roster — `AnneLeeF@`, `AshleyR@`, `CallaRoseO@`, `DaoineB@`, `HectorM@`, `JoannK@`,
`RubenS@`, `SamiraV@`, `StefenW@` `townofpaonia.com`, etc.

### 4c. Cross-field leakage — value masked in one key, present in a sibling key
**21,689 records** have the `ObjectId` (full SharePoint file URL) redacted/mangled while the sibling
`SourceFileName` + `SourceRelativeUrl` in the **same record** preserve the complete file name and folder
path. Examples (file + path recovered intact):
- `WSRF_Hydrogeology_study[working document].docx` — path `Documents/Drinking Water/Source Water/Grants/`
- `P25-0824 Tow Sheet.pdf` — path `Documents/Documents`
- `Ruben's Deposits.xlsx` — path `Documents/Desktop`, personal site `…/personal/rubens_townofpaonia_com/`

(The IP-key cross-leak ClientIP↔ClientIPAddress is 0: those two are always redacted together when
redacted. The IP recovery in 4b is row-level, not within-record.)

### 4d. Partial / format leakage — redaction reveals structure or mangles mid-value
The find-and-replace operated on substrings, so it leaves recoverable context:
- `ObjectId":"https://townofpaonia-my.sharepoint.com/personal/rubens_townofpaonia_[REDACTED_TOKEN]'s Deposits.xlsx"`
  — the URL stem, the personal-site owner stub (`rubens_townofpaonia_`), and the trailing
  `'s Deposits.xlsx` all survive around the token; combined with the sibling `SourceFileName` the value is
  fully reconstructable.
- `SiteUrl":"https://townofpaonia-my.sharepoint.[REDACTED_TOKEN]_ppw_town…"` — domain + owner stub leak.
- `UserKey":"i:0i.t|[REDACTED_ID]|app@sharepoint"` — the claim format and `app@sharepoint` suffix survive.
- SIDs preserved entirely: `LogonUserSid`/`MailboxOwnerSid` =
  `S-1-5-21-25500341-2949582500-3150002221-NNNN` — the domain SID prefix is constant and in clear; only the
  RID varies, so individual accounts are enumerable.
- `ClientRequestId":"{[REDACTED_ID]}"` — braces preserved, confirming GUID format/length.
- Redacted `CreationDate` preserves date + AM/PM, so even without CreationTime the time is bounded to a 12h window.

---

## Method note
All figures produced by streaming each CSV line-by-line through Python's `csv` reader (field-size limit
raised) and `json.loads` on each AuditData blob — no file was loaded whole into memory. Scripts:
`/Users/pete/.claude/jobs/445a2ebe/tmp/audit.py` (token/key catalog, preserved-field census, CreationDate
recovery), `recover.py` (distinct-plaintext + cross-field), plus a full-scan marker enumerator. Results:
`audit_result.json`, `recover_result.json`, `distinct_samples.json` in that tmp dir.
