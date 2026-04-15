---
title: Verkada Camera Usage Patterns (Oct 2025 – Mar 2026)
type: analysis
created: 2026-04-08
updated: 2026-04-08
tags: [surveillance, verkada, cameras, audit-log, analysis, vetter, wynn]
sources: [cora-c26-09-verkada-audit-logs, surveillance, verkada-10-things]
---

# Verkada Camera Usage Patterns (Oct 2025 – Mar 2026)

This analysis reconstructs how the Town's Verkada surveillance system has been used, based on the audit log exports produced in response to [[cora-c26-09-verkada-audit-logs|CORA C 26-09]]. All figures below are counts of events in the logs the Town itself produced.

## Dataset

Two audit log exports spanning **October 3, 2025 to March 26, 2026** — approximately six months from installation through the date of the CORA request.

- Total events (file 1, Verkada internal format): **32,338**
- Total events (file 2, Verkada cleaner export): **25,122**
- Cameras covered: **23**
- Users with access: **11**

All user names and email addresses are visible in the produced exports. The Town redacted device IDs, serial numbers, MAC addresses, internal IP addresses, and internal user IDs, citing C.R.S. § 24-72-204(2)(a).

## Top Users (by total events, file 1)

| User | Role | Events | Live Streams |
|---|---|---|---|
| Ruben Santiago | Assistant Town Clerk | 16,653 | 15,509 |
| Matt Laiminger | Police Chief (Org Admin) | 10,325 | 8,753 |
| Nicki Poulos | Public Works Director | 852 | 770 |
| Kirk Hinderberger | Mitchell & Co. vendor (Org Admin) | 806 | 497 |
| Jordan Redden | Public Works (WTP/WWTP) | 683 | 600 |
| [[stefen-wynn\|Stefen Wynn]] | Town Administrator (Org Admin) | 545 | 484 |
| [[samira-vetter\|Samira Vetter]] | Town Clerk | 394 | 360 |
| Troy Martin | Peak 2 Peak Communications vendor | 128 | 80 |
| Garrett Henderson | Police Department | 120 | 104 |
| Rodney Byrge | Public Works | 69 | 58 |
| Derek Heiniger | Public Works (WTP/WWTP) | 45 | 28 |

**The Town Clerk's office accounts for more than half of all user activity.** Assistant Clerk Ruben Santiago alone accounts for 51.5% of events. Combined with Town Clerk [[samira-vetter|Samira Vetter]] at 394 events, the two-person clerk's office represents approximately 17,047 of 32,338 events, or **53%** of all camera activity in the logged period.

## The Community Room Camera

The Community Room camera is mounted in the Town Hall meeting space where the Board of Trustees, Planning Commission, and public committees hold their meetings and where citizens make public comment.

**Total live stream views of the Community Room camera in the logged period: 1,938**

| User | Community Room live views |
|---|---|
| Ruben Santiago | 1,670 |
| Matt Laiminger | 214 |
| [[samira-vetter\|Samira Vetter]] | 32 |
| [[stefen-wynn\|Stefen Wynn]] | 12 |
| Troy Martin | 6 |
| Nicki Poulos | 4 |

### Day-of-week distribution for Ruben Santiago's Community Room views

| Day | Views |
|---|---|
| Sunday | 342 |
| Monday | 290 |
| Saturday | 277 |
| Tuesday | 274 |
| Friday | 239 |
| Thursday | 212 |
| Wednesday | 149 |

Sunday is the highest day. Weekends (Saturday and Sunday combined) account for 619 views, or 35% of the total. The Board of Trustees does not meet on weekends. The Planning Commission does not meet on weekends. Town offices are not open on weekends.

### Hour-of-day distribution for Ruben Santiago's Community Room views

| Hour (MDT) | Views |
|---|---|
| 06:00 | 65 |
| 07:00 | 191 |
| 08:00 | 152 |
| 09:00 | 68 |
| 10:00 | 91 |
| 11:00 | 91 |
| 12:00 | 107 |
| 13:00 | 122 |
| 14:00 | 65 |
| 15:00 | 118 |
| 16:00 | 75 |
| 17:00 | 210 |
| 18:00 | 145 |
| 19:00 | 147 |
| 20:00 | 59 |
| 21:00 | 22 |
| 22:00 | 31 |
| 23:00 | 24 |

The 5 PM hour is the highest of any hour. 428 views occur at or after 5 PM (after regular office hours). 408 views occur at or before 9 AM (before regular office hours).

### Live Stream vs Video History ratio

Of Santiago's 1,783 total Community Room events:
- Live Stream Started: **1,670 (93.6%)**
- Video History Streamed: 86 (4.8%)
- Archive Action Taken: 4 (0.2%)
- Camera Audio Changed: 23 (1.3%)

Live Stream is watching the feed in real time. Video History is reviewing past recordings. Archive is permanently saving a clip. The ratio shows the activity pattern is dominated by real-time viewing of the meeting room, not retrospective review.

## Specific Dated Events

### 2026-03-03 — Wynn sweeps every camera in 13 minutes

[[stefen-wynn|Stefen Wynn]] logged 204 events between 11:04 AM and 11:17 AM MDT on 2026-03-03. He viewed every single camera in the system: TOP-PARK-CAM01 (22), SW Pavillion (20), Stage (16), TOP-PARK-CAM03 (14), Skate Park (14), WW Door (12), WTP Front (12), WTP Interior (12), Shop Door (10), Shop Parking Lot (10), TOP-PARK-CAM02 (10), Bulk Fill Station (8), Community Room (8), WW Lagoon (6), Grand Ave. (4), West Side Shop (2), Front Desk (2), TH Rear Door (2), TH Parking Lot (2), TH North Alley (2), TH South Alley (2).

During the same session he performed administrative actions: User Permissions Set (3), User Permissions Modified (3), User Roles Modified (3), Key Contact Updated (3), Communication Recipient Updated (1).

### 2026-03-11 — Vetter reviews Front Desk history

[[samira-vetter|Samira Vetter]] logged 71 events at 1:21 PM MDT. Of those, 18 were Live Stream Started on the Front Desk camera and **7 were Video History Streamed on the Front Desk camera** — scrubbing recorded past footage of the counter where citizens file records requests and petitions.

### 2026-03-13 — Wynn and Vetter back-to-back on Front Desk

At 11:27 AM MDT, [[samira-vetter|Vetter]] started streaming multiple cameras including Front Desk. At 11:29 AM MDT, [[stefen-wynn|Wynn]] began streaming the same cameras. Wynn's session included **Video History Streamed on Front Desk (4 times)** and Camera Audio Changed on Front Desk (2 times). Both users viewed the same camera sequence within minutes of each other.

### 2026-03-20 — Santiago creates three Community Room archives (Friday afternoon)

Between 2:41 PM and 3:54 PM MDT on Friday 2026-03-20, Ruben Santiago performed the following sequence of actions on the Community Room camera:

```
14:41:44  Live Stream Started
14:41:46  Live Stream Started
14:42:16  Camera Audio Changed
14:45:34  Archive Action Taken      [archive #1]
15:18:37  Camera Audio Changed
15:18:58  Video History Streamed
15:19:37  Camera Audio Changed
15:19:44  Archive Action Taken      [archive #2]
15:24:53  Video History Streamed
15:36:08  Archive Action Taken      [archive #3]
15:36:19  Video History Streamed
15:53:59  Video History Streamed
```

Archive Action Taken events are permanent saves of footage clips beyond the 30-day retention window. Camera Audio Changed events toggle audio recording on or off for the camera. In this session the Assistant Clerk toggled the camera's audio three times, scrubbed through historical footage, and created three permanent archives.

### 2026-03-21 — Fourth Community Room archive (Saturday morning)

Between 11:51 AM and 11:52 AM MDT on Saturday 2026-03-21, Santiago created one additional archive:

```
11:51:54  Live Stream Started
11:51:58  Live Stream Started
11:52:03  Archive Action Taken      [archive #4]
11:52:03  Video History Streamed
```

### 2026-03-25 — Vetter sweeps every camera on flyer day

[[samira-vetter|Samira Vetter]] logged 78 events between 8:42 AM and 8:56 AM MDT on 2026-03-25. This was the day the [[ten-things-flyer|10 Things flyer]] was distributed. She viewed every camera the Town owns in 14 minutes. Camera counts: Grand Ave. (18), Community Room (10), Front Desk (10), TH South Alley (8), TH Rear Door (8), TH Parking Lot (6), Shop Parking Lot (6), TH North Alley (4), Shop Door (4), Bulk Fill Station (2). She also performed User Settings Modified during the same session.

Grand Ave. is the exterior camera facing the front of Town Hall on the street.

### 2026-03-26 — Wynn checks the audit logs

On 2026-03-26, the day after the [[ten-things-flyer|10 Things flyer]] was distributed and four days before the [[2026-03-30-special-meeting|special meeting]] where the board issued its response, [[stefen-wynn|Wynn]] logged 22 events including **3 "Audit Log Related Actions"** — Wynn viewed the Verkada audit log itself.

## Archive Actions (Complete List)

The audit log shows 33 Archive Action Taken events across the entire logged period. Archives are permanent saves of footage clips that survive the 30-day retention window.

| Date | User | Camera |
|---|---|---|
| 2026-01-06 | Matt Laiminger | TOP-PARK-CAM01 (4 archives) |
| 2026-01-06 | Matt Laiminger | TOP-HALL-CAM02 |
| 2026-01-06 | Live Link Viewer | TOP-PARK-CAM01 |
| 2026-01-08 | Nicki Poulos | CH52-E [camera serial redacted] (6 archives) |
| 2026-01-09 | Nicki Poulos | CH52-E [camera serial redacted] |
| 2026-01-10 | Rodney Byrge | CH52-E [camera serial redacted] |
| 2026-01-30 | Ruben Santiago | Front Desk (4 archives) |
| 2026-02-26 | Ruben Santiago | Grand Ave. |
| 2026-02-27 | Ruben Santiago | Front Desk (3 archives) |
| 2026-03-11 | Ruben Santiago | Front Desk (6 archives) |
| 2026-03-20 | Ruben Santiago | Community Room (3 archives) |
| 2026-03-21 | Ruben Santiago | Community Room (1 archive) |
| 2026-03-24 | Matt Laiminger | Stage |

The associated archive metadata (name, description, case number, tags, time window, sharing history) was not produced in the CORA response. See [[march-20-community-room-archives]].

## What the Record Shows

1. **53% of all Verkada activity comes from the two-person clerk's office.** Assistant Clerk Ruben Santiago accounts for more events than any other user, more than the Police Chief, more than the Town Administrator, and more than the entire Public Works department combined.

2. **The Community Room camera — where public meetings and public comment occur — has been live-streamed 1,938 times.** Santiago accounts for 1,670 of those views.

3. **Santiago's Community Room viewing pattern does not match meeting schedules.** The highest day-of-week is Sunday. 35% of views are on weekends. 428 views are after 5 PM and 408 are before 9 AM. 93.6% of his Community Room events are Live Stream Started, not Video History Streamed, meaning he was watching in real time rather than reviewing past meetings.

4. **Santiago created four permanent archives of the Community Room on March 20 and 21, 2026.** The Friday afternoon session includes three archives, four audio-toggle events, and multiple scrubbing actions. These archives still exist and are preserved beyond the 30-day retention window.

5. **[[stefen-wynn|Wynn]] performed a 204-event sweep of every camera on 2026-03-03** concurrent with administrative actions modifying user permissions, user roles, and key contacts.

6. **[[samira-vetter|Vetter]] swept every camera the morning of the [[ten-things-flyer|10 Things flyer]]**, with 18 views of the Grand Ave. exterior camera, 14 minutes of activity starting at 8:42 AM.

7. **[[stefen-wynn|Wynn]] accessed the Verkada audit log itself on 2026-03-26**, one day after the flyer was distributed and 12 days before the audit log was produced in response to CORA C 26-09.

8. **There is no written policy.** The CORA response confirms the Town has no written policy, procedure, or guideline governing the use, access, retention, or sharing of Verkada footage beyond manufacturer default settings. See [[cora-c26-09-verkada-audit-logs|the source page]].

## What Would Change This Analysis

- **Archive metadata.** If the Town produces the archive labels, descriptions, case numbers, and notes, any archive with a legitimate law-enforcement or operational purpose would be identifiable. Until that metadata is produced, the "what and why" of each archive is unknown. See [[march-20-community-room-archives]].

- **Events occurring in the Community Room on the specific dated windows.** If the Friday 2026-03-20 afternoon and Saturday 2026-03-21 morning windows correspond to public meetings, private meetings, CORA record inspections, or specific incidents, that context would shape the interpretation of the four archives.

- **Internal correspondence.** The CORA response excluded item 5 (internal communications among [[stefen-wynn|Wynn]], Laiminger, and Poulos about the system). If that correspondence is produced by a future request, it may reveal written guidance or instructions about camera use that are not otherwise visible in the audit log.

- **Comparative data from peer municipalities.** Whether the volume and distribution of use documented here is typical for similarly-sized Colorado municipalities deploying Verkada cameras is unknown without comparison data.

## See Also

- [[cora-c26-09-verkada-audit-logs]] — Source CORA response
- [[surveillance]] — Issue page
- [[verkada-10-things]] — Verkada product capabilities
- [[verkada-approval-process]] — Open question (partially answered)
- [[march-20-community-room-archives]] — Open question raised by this analysis
- [[ruben-santiago]]
- [[samira-vetter]]
- [[stefen-wynn]]
- [[public-records-access]]
