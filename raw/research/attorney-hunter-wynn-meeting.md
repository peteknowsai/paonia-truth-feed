# Forensic trace: Attorney / Hunter / Wynn meeting coordination

**Source:** Town of Paonia CURED M365 unified audit logs (CORA C-26-12-cure),
10 CSVs, **1,134,799 rows**, Nov 2025 – May 2026.
**Method:** Streamed all rows line-by-line; parsed `AuditData` JSON; keyed on
`MailboxOwnerUPN`, `CreationTime`, and `Item/AffectedItems[].Subject`. Because mail
audit events log only the mailbox *owner* (never recipients), "who ↔ whom" is
inferred by correlating the **same Subject across mailboxes at matching times**.

## The cast (mailbox → person/role)

| Mailbox | Person / role |
|---|---|
| `LucyH@townofpaonia.com` | Trustee **Lucy Hunter** |
| `StefenW@townofpaonia.com` | Town Administrator & Treasurer **Stefen Wynn** |
| `ClayB@townofpaonia.com` | Town Attorney **Clayton Buchner** — **0 events (absent from export)** |
| `PTownLegal@townofpaonia.com` | Shared Town Legal mailbox (the attorney's working mailbox in this export) |
| `paiges@townofpaonia.com` | **Mayor Paige Smith** |
| `samirav@townofpaonia.com` | Town Clerk **Samira Vetter** (organizer of most invites) |
| `rubens@townofpaonia.com` | Asst. Clerk **Ruben Santiago** |
| daoineb, ashleyr, nickip, rodneyb_pw, mlaimingerppd | Town staff |
| karent, mikeh, ricks, walterc | Board / trustees |

## Mailbox event counts (whole window)

| Mailbox | Events |
|---|---|
| Wynn | 67,764 |
| PTownLegal | 4,799 |
| Hunter | 4,072 |
| **ClayB (Buchner personal)** | **0** |

**Confirmed constraint (a):** `ClayB@townofpaonia.com` has **zero** events in the
export, and the string `clayb@townofpaonia.com` appears **nowhere** in the
1.13M-row dataset. The attorney's footprint is entirely via the shared
`PTownLegal@` mailbox. **Confirmed constraint (b):** no recipient fields exist on
mail events — correlation is by Subject + time. No Teams meeting (RecordType
MicrosoftTeams / TeamsMeetingEvents) corresponds to any of the candidate
legal/personnel meetings; those Teams records are unrelated engineering/contract
calls. The candidate meetings were **Outlook calendar appointments**, not Teams.

---

## LEAD CANDIDATE — the meeting that fits "they set up a whole meeting"

### 1. "Attorney Performance Appraisal" — the back-and-forth + the meeting

This is the clearest "emails back and forth that set up a meeting" trace.

**Originating thread — "Attorney Performance Appraisal and can we meet tomorrow":**

| Date/time (UTC) | Mailbox | Folder | Op | Subject |
|---|---|---|---|---|
| 2026-04-01 01:17:06 | Mayor Smith | \Outbox | — | Attorney Performance Appraisal and can we meet tomorrow |
| 2026-04-01 01:17:21 | Mayor Smith | \Drafts | — | (same) |
| 2026-04-01 15:25:53 | **PTownLegal** | \Drafts | — | **Re:** Attorney Performance Appraisal and can we meet tomorrow |
| 2026-04-01 15:26:24 | PTownLegal | \Drafts | — | Re: (same) |
| 2026-04-01 15:26:30 | PTownLegal | \Inbox | — | Attorney Performance Appraisal and can we meet tomorrow |
| 2026-04-01 15:49:36 | Clerk Vetter | \Inbox | — | Re: (same) |
| 2026-04-03 15:28:38 | Clerk Vetter | \Inbox | — | (same) |

→ Mayor Smith proposes the appraisal + a meeting; the Attorney (PTownLegal)
drafts a reply the next morning; Clerk Vetter is looped in.

**The resulting calendar invite — "Attorney Performance Appraisal review":**

- **2026-04-08 22:33** — invite created/sent (originates from clerk/mayor side);
  distributed to Wynn, PTownLegal, and the staff/board distribution
  (daoineb, ashleyr, nickip, rubens, rodneyb_pw, mlaimingerppd, samirav).
- **2026-04-09 14:25** — **Wynn sends "Accepted: Attorney Performance Appraisal review."**
- **2026-04-09 14:26 / 14:50** — copies land in **PTownLegal**.
- **2026-04-15 19:15** — Mayor Smith **"FW: Attorney Performance Appraisal review."**
- **2026-04-20 16:57** — superseded by **"Attorney Performance Appraisal review reschedule"**;
  Wynn accepts 2026-04-20 17:19/19:43; PTownLegal copies 04-20 → 04-28.

Mailboxes confirmed on this meeting chain: **Wynn + PTownLegal (attorney)** + clerk/mayor/staff.
Hunter is NOT on the appraisal invite itself.

### 2. "Discuss Citizen Complaints re: Administrator" — the ONLY item with all three principals + private topic

This is the single non-public-meeting Subject that appears in **Hunter AND Wynn
AND PTownLegal** mailboxes together. It is a meeting *about the Administrator (Wynn)*.

| Date/time (UTC) | Mailbox | Note |
|---|---|---|
| 2026-04-08 22:38:11–15 | paiges, **Wynn**, samirav, daoineb, ashleyr, rubens | invite created/distributed |
| 2026-04-08 22:47:48 | **Hunter** | **sends "Accepted: Discuss Citizen Complaints re: Administrator"** |
| 2026-04-08 22:48:46 | **PTownLegal**, Hunter, Wynn | copies present |
| 2026-04-09 14:25:46 | **Wynn** | **sends "Accepted: ..."** |
| 2026-04-15 18:03–18:09 | **PTownLegal**, Hunter, Wynn (+ staff) | updates/accepts |
| 2026-04-21 15:05 | Wynn | last touch |

→ All three principals (Trustee Hunter, Administrator Wynn, Attorney via PTownLegal)
share this meeting, **created at 22:38 on Apr 8** — minutes after the
"Attorney Performance Appraisal review" invite at 22:33 the same evening. The two
were set up back-to-back in the same sitting.

**Bottom line on the lead:** The "whole meeting set up with emails back and forth"
is the **April 8–9, 2026 cluster** — two paired invites created minutes apart:
- "Attorney Performance Appraisal review" (Wynn + Attorney + clerk/mayor), seeded
  by Mayor Smith's Apr-1 "can we meet tomorrow" email and the Attorney's same-day reply; and
- "Discuss Citizen Complaints re: Administrator" — the **only** subject jointly in
  Hunter + Wynn + Attorney mailboxes — a meeting about complaints regarding the
  Administrator, which Hunter accepted at 22:47 on Apr 8 and Wynn accepted Apr 9.

---

## Other attorney↔Wynn (no Hunter) coordination items

These appear in **Wynn + PTownLegal** only (legal work product / deadlines, not a
3-way meeting):

- "Work Session - Board Training with Town Attorney" — Feb 26 – Mar 4, 2026.
  **Note:** distributed to the *full board + staff* (14 mailboxes incl. trustees
  karent/mikeh/ricks/walterc, Hunter, Wynn, PTownLegal) → a public board work
  session, not a private huddle.
- "Brunner litigation discussion" — Apr 29–30, 2026 (Wynn + PTownLegal + staff).
- "Attorney Performance Appraisal review reschedule" — Apr 20–28, 2026.
- Legal deadlines (Wynn + PTownLegal): "Legal review of CPW Notice of Violation
  Deadline" (Nov 18–20), "Publication Review Deadline" (Nov 13), "Memo on whether
  we can use DCi as our paper of record deadline" (Nov 19), "Ordinance for
  Disbursement publishing Deadline" (Nov 25–26), "Facilities Agreement Review
  Deadline" (Feb 10–11), "Review Deadline for Wright Water / Consor Engineering
  Contract" (Jan), "CDLE Appeal for Clinton Rose" (Feb 3), "Business Licensing"
  (Dec), "1/08/2026 Zoning Board of Adjustments."
- "Security Camera Dashboard Viewing Session - Trustee Hunter" — **Apr 22, 2026**
  (Wynn + Hunter; no attorney). Hunter touched it 16:16–16:45 on Apr 22.

---

## Chronological timeline (attorney/Hunter/Wynn-linked clusters)

| Date | Cluster |
|---|---|
| 2025-11-13→26 | Legal deadlines in Wynn+PTownLegal (Publication Review, CPW NOV, DCi memo, Ordinance for Disbursement). |
| 2025-12-01→07 | Board Work Session 12/05 prep (Wynn+Hunter); DH Meeting + "DH Meeting Notes 12.2.2025" (Wynn). |
| 2026-01 | Board/Planning meeting prep (Wynn+Hunter); Wright Water / Consor contract review deadlines (Wynn+PTownLegal). |
| 2026-02-03 | "CDLE Appeal for Clinton Rose" (Wynn+PTownLegal). |
| 2026-02-10/11 | "Facilities Agreement Review Deadline" (Wynn+PTownLegal). |
| **2026-02-26 → 03-04** | **"Work Session - Board Training with Town Attorney"** — whole board + Wynn + PTownLegal (public). |
| 2026-03-27 | All three (Hunter+Wynn+PTownLegal) updating "3/30/2026 Special Board Meeting." |
| **2026-04-01** | **Mayor Smith emails "Attorney Performance Appraisal and can we meet tomorrow"; Attorney (PTownLegal) drafts same-day reply; Clerk Vetter looped in.** |
| **2026-04-08 22:33** | **"Attorney Performance Appraisal review" invite created** (Wynn + Attorney + clerk/mayor/staff). |
| **2026-04-08 22:38** | **"Discuss Citizen Complaints re: Administrator" invite created** (all three principals). |
| **2026-04-08 22:47** | **Hunter accepts "Discuss Citizen Complaints re: Administrator."** |
| **2026-04-09 14:25** | **Wynn accepts both the Appraisal review and the Citizen-Complaints meeting.** |
| 2026-04-15 | Both meetings updated/forwarded; Mayor Smith "FW: Attorney Performance Appraisal review." |
| 2026-04-20→28 | "Attorney Performance Appraisal review **reschedule**" (Wynn + Attorney). |
| 2026-04-22 | "Security Camera Dashboard Viewing Session - Trustee Hunter" (Wynn + Hunter). |
| 2026-04-29→30 | "Brunner litigation discussion" (Wynn + Attorney + staff). |

**Densest clustering = the evening of Apr 8 into Apr 9, 2026**, when the appraisal
meeting and the "complaints re: administrator" meeting were created back-to-back
and accepted by Wynn (and, for the complaints meeting, Hunter).

---

## Honest gaps / caveats

- **Attorney's personal mailbox (ClayB@) is entirely absent** — his activity is
  visible only through the shared `PTownLegal@` mailbox. Any private ClayB↔Hunter
  or ClayB↔Wynn email cannot be seen in this export.
- **No attendee lists, start times, locations, or organizer fields** survive in the
  calendar `AuditData` (only Subject / ItemClass / ParentFolder / attachment sizes).
  "Who attended" is inferred from which mailboxes hold/accept the invite, not from
  an attendee roster. Meeting *date/time of the event itself* is not in the logs —
  only the audit `CreationTime` of each mailbox action.
- Most "joint" board/packet/agenda items are routine public-meeting logistics that
  naturally hit Hunter + Wynn + Legal; they are not evidence of a private meeting.
- The two April items ("Attorney Performance Appraisal review" and "Discuss Citizen
  Complaints re: Administrator") are the only personnel/legal-flavored meetings, and
  the **Citizen-Complaints meeting is the sole subject jointly present in all three
  principal mailboxes** while being about a private personnel matter (the Administrator).
- All timestamps are the audit `CreationTime` (UTC). Local Colorado time = UTC−6/−7,
  so e.g. the Apr 8 22:33–22:47 UTC actions = ~4:33–4:47 PM MDT on Apr 8.
