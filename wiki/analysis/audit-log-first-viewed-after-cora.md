---
title: Nobody Looked at the Audit Log Until the Day They Received the CORA Request
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, cora, cover-up, wynn, laiminger]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns]
---

# Nobody Looked at the Audit Log Until the Day They Received the CORA Request

## The Claim

For the first five months and two days of the Town's Verkada surveillance system operation, no user ever opened the audit log page. Not the Town Administrator, not the Police Chief, not the Town Clerk, not anyone. The feature sat dormant. Every single audit log view event in the entire six-month record happened on March 25 or March 26, 2026 — the day the Town Clerk received Pete McCarthy's CORA request C 26-09 for the Verkada records, and the day after.

## The Data

Every audit log view event in the full six-month audit log export produced in response to [[cora-c26-09-verkada-audit-logs|CORA C 26-09]]:

| Date & Time (MDT) | User | Event | Query Window |
|---|---|---|---|
| 2026-03-25 ~11:13 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 7-day rolling (Mar 18 → Mar 25) |
| 2026-03-25 ~11:14 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 7-day rolling |
| 2026-03-25 ~11:14 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | Oct 22 – Oct 24, 2025 (installation day) |
| 2026-03-25 ~11:14 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 90-day (Dec 26 – Mar 26) |
| 2026-03-26 ~11:58 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 7-day rolling (Mar 19 → Mar 26) |
| 2026-03-26 ~11:58 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 7-day rolling |
| 2026-03-26 ~11:58 AM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 90-day (Dec 27 – Mar 27) |
| 2026-03-26 ~12:10 PM | Stefen Wynn | USER_LOGIN_SUCCESS | — |
| 2026-03-26 ~12:11 PM | Stefen Wynn | AUDIT_LOG_VIEW_LIST | 7-day rolling (Mar 19 → Mar 26) |
| 2026-03-26 ~12:11 PM | Stefen Wynn | AUDIT_LOG_VIEW_LIST | 7-day rolling (same window) |
| 2026-03-26 ~12:11 PM | Stefen Wynn | AUDIT_LOG_VIEW_LIST | 90-day (Dec 26 – Mar 26) |
| 2026-03-26 ~12:25 PM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | 90-day |
| 2026-03-26 ~12:33 PM | Matt Laiminger | **AUDIT_LOG_EXPORT_CSV** | Full export to CSV file |
| 2026-03-26 ~12:33 PM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | additional 90-day |
| 2026-03-26 ~12:33 PM | Matt Laiminger | AUDIT_LOG_VIEW_LIST | extended window |
| 2026-03-26 ~12:33 PM | Matt Laiminger | **SUPPORT_ACCESS (Verkada Support granted)** | 1-day access, video_access: False |

**Total audit log view events in the entire 6-month log: 16.**
**Total audit log view events before March 25, 2026: 0.**

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], `Verkada_Audit Log_REDACTED.xlsx`, filtered on `message_code` containing `AUDIT_LOG`.

## The Timeline

| When | Event |
|---|---|
| **2025-10-22** | Verkada cameras installed. System operational. |
| **2025-10-23 through 2026-03-24** | **Five months and two days with zero audit log view events.** |
| **2026-03-23 09:18:55 MDT** | Pete McCarthy files CORA C 26-09 via email to Town Clerk |
| **2026-03-25** | Town Clerk formally records the CORA in the Town's records system |
| **2026-03-25 ~11:13 AM** | Police Chief Laiminger opens the Verkada audit log for the first time in the history of the account |
| **2026-03-25 ~11:13–11:14 AM** | Laiminger runs 4 audit log queries (7-day, installation day, 90-day windows) |
| **2026-03-26 ~11:58 AM** | Laiminger runs 3 more audit log queries |
| **2026-03-26 ~12:10 PM** | Town Administrator Stefen Wynn logs in |
| **2026-03-26 ~12:11 PM** | Wynn runs his first 3 audit log queries (same 7-day and 90-day windows as Laiminger) — this is the only audit log activity ever recorded by Wynn |
| **2026-03-26 ~12:25 PM** | Laiminger runs 1 more audit log query |
| **2026-03-26 ~12:33 PM** | Laiminger exports the complete audit log to a CSV file (`AUDIT_LOG_EXPORT_CSV` event) |
| **2026-03-26 ~12:33 PM** | Laiminger grants **Verkada Support** one-day access to the Town's account, with `video_access: False` (support access without footage access) |
| **2026-03-26 13:00** | All audit log activity ceases |
| **2026-04-07** | Town Clerk Vetter produces the audit log export to Pete in response to C 26-09, charging $167.90 |
| **2026-04-08** | Pete receives the CORA response and begins analysis |

## Characteristics of the Queries

### No filters applied

In all 16 audit log view events, the `filters` field in the event details is empty (`{}`). This means none of the queries were targeted — Laiminger and Wynn were not filtering by a specific user, camera, event type, or date range that would indicate they were investigating a specific incident. They were reviewing **all system activity** in broad rolling windows.

### The 7-day and 90-day windows are Verkada UI presets

The "7-day" queries (604,800 seconds, ending at the moment of the query) and "90-day" queries (7,776,000 seconds) correspond to standard preset time ranges in the Verkada Command audit log interface. This is consistent with a user clicking "Last 7 days" and "Last 90 days" buttons rather than typing in custom date ranges.

### The 90-day window matches the CORA response date range

The 90-day windows queried by Wynn and Laiminger cover December 26, 2025 to March 26, 2026. This is the **exact date range** of the audit log export subsequently produced to Pete in the CORA response (specifically the `VERKADA- Audit Logs_REDACTED.xlsx` file). The correspondence to the day suggests that the window being reviewed is what ultimately got exported.

### Laiminger exported the audit log to CSV on March 26

At approximately 12:33 PM MDT on March 26, 2026, Laiminger triggered an `AUDIT_LOG_EXPORT_CSV` event. This is the Verkada feature that generates a spreadsheet file of the audit log for download. The exported file has the same structure and date range as the one subsequently produced to Pete in the CORA response.

**The Town Clerk then sat on the exported file for eleven days before producing it to Pete on April 7.**

### Verkada Support was granted access that same day

Immediately after the CSV export, Laiminger created a `SUPPORT_ACCESS` event granting Verkada Support one-day access to the Town's account. The `video_access` field in the event is `False`, meaning support was not given access to video footage — only to the account configuration and logs. This is consistent with a support ticket involving the audit log or account settings, not with a video review.

The fact that the Town contacted Verkada Support specifically at the moment of audit log review is suggestive. Verkada Support is used to answer questions about the system, interpret its behavior, and assist with configuration. Contacting Verkada Support with `video_access: False` while simultaneously running audit log queries and exporting the log is consistent with seeking vendor assistance with a records request rather than investigating a security incident.

## The Plain-English Interpretation

**For five months and two days after the cameras were installed, no one at the Town of Paonia ever looked at the Verkada audit log.** Not Wynn. Not Laiminger. Not Vetter. Not Santiago. Not anyone. The audit log feature sat dormant. No reviews, no exports, no checks.

**On March 23 at 9:18 AM, Pete McCarthy filed a Colorado Open Records Act request for the Verkada system records.** On March 25, the Town Clerk formally received that request in the Town's records system.

**Within hours of the Clerk receiving the CORA, the Police Chief logged into Verkada and opened the audit log for the first time ever.** He ran four queries that morning covering broad rolling time windows. The next day, March 26, he ran three more queries. Town Administrator Stefen Wynn logged in at 12:10 PM that day and ran three queries of his own — those three queries are the only audit log activity ever recorded by Wynn in the system's history. Laiminger then exported the audit log to a CSV file, granted Verkada Support one-day access to the account, and logged out.

**The Town Clerk then held onto that exported file for eleven days before producing it to the person who had requested it.**

**The complete audit log viewing history of the Town's Verkada system consists of 16 events, all concentrated in approximately 90 minutes across two consecutive days, all occurring immediately after a records request was filed by a citizen.** There are zero audit log views before those 90 minutes, and zero audit log views after.

This is not a pattern of routine system administration. A routine administrator would check the audit log occasionally during normal operation. It is not a pattern of incident response. An incident response would involve filtered queries targeting a specific user, camera, or time window. It is a pattern consistent with one thing only: reviewing what records exist before producing them to a person who has asked for them.

## What Would Change This Analysis

- If the Town produced evidence of routine audit log review during the five months before the CORA request. (No such evidence exists in the audit log itself.)
- If the Town identified a specific incident or investigation that would have caused Laiminger and Wynn to simultaneously review the audit log on those two specific days. (No such incident has been publicly identified, and the timing corresponds exactly to the CORA filing.)
- If the Verkada Support ticket opened on March 26 was about a technical issue unrelated to audit log review. (The Town has not disclosed what the support ticket was about.)

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[verkada-usage-patterns]] — Full statistical analysis
- [[wynn-knowledge-of-cameras]] — What Wynn knew and when
- [[surveillance]] — Issue overview
