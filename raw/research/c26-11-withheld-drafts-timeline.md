# C 26-11 — Verified Timeline of the Withheld Drafting Records

**Built:** 2026-06-01
**Source of truth:** the Town's own Microsoft 365 Unified Audit Log, produced under C 26-12 (cure dated 2026-05-27) — 10 CSVs, 1,134,799 rows, in `raw/documents/cora-responses/C-26-12-cure/`.
**Method:** streaming line-by-line parse (`python3` `csv`/`json`; never bulk-loaded), matching the five draft/response thread subjects and decoding `Operation`, `CreationTime` (authoritative UTC inside `AuditData`), mailbox (`UserId`/`MailboxOwnerUPN`), folder, and client.
**Verification:** every claim below was independently re-derived from scratch by **three separate verification agents** (run `wf_a7fcd088-4fe`, 2026-06-01); all three returned **CONFIRMED, high confidence**. Where an earlier pass overreached (the "April 21 deletions"), this document records the correction.

> All times in the audit log are **UTC**. Paonia is **MDT (UTC−6)** in late March/April 2026. UTC times are given first; subtract 6 hours for local.

---

## 1. What C 26-11 asked for

Filed 2026-04-06. Three categories about the flyer and the Board's March 30, 2026 response letter:

1. communications among the Mayor, Administrator, Town Attorney, and trustees about the flyer and the response, **March 25–30**;
2. **all drafts, revisions, and tracked changes** of the response letter;
3. the Town Attorney's advice about calling the flyer "libelous."

## 2. What the Town produced (2026-04-21, request then closed)

Four documents — **two of them Pete's own** (his complaint; the Mayor's forward of his complaint) and two from a single trustee. On the drafts: *"the two drafts of the letter requested are already publicly available"* — pointing to the two already-published versions. Anything touching the attorney was withheld as privileged, **with no privilege log**.

## 3. The records that existed and were not produced — and were actually SENT

The audit log names draft/response threads, in the same window, that the production neither produced nor logged as withheld. **These are not unsent drafts** — each carries real `Send` events, i.e. they were transmitted and received among officials. (CONFIRMED by all three verifiers: every thread has ≥1 `Send`; none is drafts-only.)

| Thread (verbatim subject seed) | `Send` events (UTC) → who | In mailboxes of | Attorney on it? | C 26-11 category |
|---|---|---|---|---|
| **Being Handed Out In Town by McCarthy** | 3/24 17:09 RubenS; 3/24 17:20–17:51 StefenW (×5, FW); 3/25 21:39 StefenW (RE) | AshleyR, DaoineB, MikeH, RubenS, SamiraV, StefenW, paiges | **No** | Cat 1 (officials' comms) |
| **draft "letter from Trustee"** | 3/27 15:50 paiges; 3/28 16:44 StefenW (RE) | SamiraV, StefenW, paiges | **No** | Cat 2 (draft/revision) |
| **PLease see the attached drafft Mayor's report for the Special Meeting** | 3/27 20:21 paiges; 3/27 20:58 SamiraV; 3/27 21:13 paiges (RE); 3/28 16:17 LucyH | LucyH, SamiraV, paiges | **No** | Cat 2 (draft/revision) |
| **Response to the Citizen's 10 things flyer . I Need comments /no later than 2:00 tomorrow** | 3/28 21:08 paiges; 3/29 20:21 PTownLegal; 3/29 20:48 paiges | PTownLegal, paiges | partly (a reply) | Cat 2 (draft/revision) |
| **Revised Letter to Town of Paonia Citizens including the agreed upon changes approved by the BoT…** | 3/31 15:59 paiges; 3/31 18:25 RubenS (RE) | PTownLegal, RubenS, SamiraV, paiges | partly (a reply) | Cat 2 (post-meeting revision) |

**Why this matters:** three of the five threads — including both clean Category-2 drafts (`letter from Trustee`, `Mayor's report`) — have **no attorney on them at all**. They are trustees and staff editing a public letter, so attorney-client privilege does not reach them. They were responsive, they were sent, they sat in the Clerk's own mailbox, and they were neither produced nor logged as withheld.

**The "she knew" point (clean):** because these messages were received into Vetter's own `\Inbox` and she was a `Send` participant on the Mayor's-report thread, the custodian knew this drafting traffic existed when she certified that the only drafts were the two published versions. Knowledge by receipt — no spoliation theory required.

## 4. Full per-thread operation timeline (for the record)

Each thread shows the normal Outlook compose cycle — `Create` (\Drafts) → `Send` → `SoftDelete`/`HardDelete` of the now-redundant \Drafts working copy ~1 second later. **That draft-cleanup is benign and is not "deletion of a record"** — the sent message persists in Sent Items and recipients' mailboxes. The meaningful receipts are the `Send` events (above) and the `\Inbox` `MoveToDeletedItems` (below).

- **Being Handed Out** (25 rows): Create/Send/SoftDelete by RubenS & StefenW 3/24; AshleyR HardDelete (\Drafts) 3/24; SamiraV MoveToDeletedItems (\Inbox) 3/25 13:54; paiges HardDelete (\Drafts, mobile) 3/30; DaoineB MoveToDeletedItems (\Inbox) 3/31; MikeH MoveToDeletedItems (\Inbox) 4/18; SamiraV MoveToDeletedItems (\Inbox) 4/21 15:50.
- **letter from Trustee** (11 rows): paiges Create/Send/SoftDelete 3/27; SamiraV HardDelete (\Drafts) 3/27 17:37 and MoveToDeletedItems (\Inbox) 3/27 22:07; StefenW Send/SoftDelete 3/28; SamiraV MoveToDeletedItems (\Inbox) ×2 on 4/21 15:28.
- **Mayor's report** (18 rows): paiges/SamiraV/LucyH Create/Send 3/27–3/28; SamiraV MoveToDeletedItems (\Inbox) 3/28 23:14, 3/29 00:13, **4/21 15:53**; LucyH HardDelete (\Drafts, eM/AppleMail) 3/28; paiges MoveToDeletedItems (\Drafts) 4/23 03:03 (a FW draft copy).
- **Response to flyer / I need comments** (11 rows): paiges & PTownLegal Create/Send/Update 3/28–3/29; PTownLegal MoveToDeletedItems (\Inbox) 3/31 01:33; paiges SoftDelete (\Drafts) 3/28.
- **Revised Letter** (8 rows): paiges Send 3/31; RubenS Send 3/31; PTownLegal MoveToDeletedItems (\Inbox) 3/31 & 4/1; SamiraV MoveToDeletedItems (\Inbox) 4/1 15:25 & 4/3 15:34.

## 5. The April 21 "deletions" — investigated and NOT pursued

An earlier pass framed the April 21 `samirav` `MoveToDeletedItems` of three flyer threads (within ~25 minutes, on the day the request closed) as possible concealment. **The raw log refutes the targeted reading**, and three verifiers confirmed it:

- On **2026-04-21** the `samirav` mailbox logged **171 delete operations** — **164 `MoveToDeletedItems` from `\Inbox`** (≈14:41–20:04 UTC) plus 7 `HardDelete` (5 calendar, 2 \Drafts). It is a **broad, indiscriminate inbox cleanup**: spam and marketing ("Solve ALL of Your Meter Reading Problems," "Meet with Paycom. Win a night you'll never forget," "Microsoft 365 … quarantine," ARMA/CML digests), liquor-license renewals, variance applications, TYMCO lease docs, disbursements, and dozens of routine items.
- The three flyer threads are **embedded inside that sweep**, deleted **once each**: `letter from Trustee` 15:28:00–01, `Being Handed Out` 15:50:24, `Mayor's report` 15:53:02 UTC. The `Being Handed Out` delete sits between "DH Meeting 3.24.2026" and "Welcome Email" in a dense ~60-item burst. Not singled out.
- **Times corrected:** 15:28/15:50/15:53 UTC = **9:28 / 9:50 / 9:53 a.m. MDT** (the earlier "3:28 p.m." read UTC as local).
- **Nature corrected:** all are `MoveToDeletedItems` (moved to the recoverable Deleted Items folder). **Zero `HardDelete`/`SoftDelete`** on any of these subjects that day. Recoverable, not destroyed.

**Conclusion:** routine inbox cleanup, not provable concealment. This matches the skeptical re-check in `raw/research/deletion-verification.md`. The deletion angle has been **removed** from the Board letter and is **not** part of the records-incompleteness case. The case stands on Section 3.

## 6. Caveats (kept for honesty)

- The audit log carries subject lines, timestamps, operations, and the mailbox each item sits in — **not** message bodies and **not** To/Cc lists. `Send` events prove transmission; they do not reveal recipients or content.
- Two window edges, flagged honestly: `Being Handed Out` originates 3/24, one day before the 3/25 start (its 3/25 `Send` and later activity are in-window); `Revised Letter` is dated 3/31, one day after the "on or before March 30" cutoff. The two clean in-window, no-attorney drafts (`letter from Trustee`, `Mayor's report`, both 3/27–3/28) carry the argument.
- The `Response to flyer` and `Revised Letter` threads touch the `ptownlegal` mailbox; portions may be privilege-defensible — but the Town gave no privilege log identifying any withheld record.

## 7. Bottom line

The Town's own log shows that responsive drafting communications about the March 30 letter were **sent and received among officials** in the request window, sat in the Clerk's own mailbox, and were **neither produced nor logged as withheld** — while the production handed back four documents, two of them Pete's own, and called the only drafts "already public." That is the verified C 26-11 incompleteness finding. The deletion narrative is not needed and is not used.
