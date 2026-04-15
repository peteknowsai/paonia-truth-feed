---
title: The Community Room Camera Is the Most-Watched in the System
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, community-room, public-meetings, first-amendment]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns]
---

# The Community Room Camera Is the Most-Watched in the System

## The Claim

The single most-viewed camera in the Town of Paonia's entire Verkada surveillance network is the one inside the Community Room at Town Hall, the room where the Board of Trustees, Planning Commission, and every public committee holds meetings, and where citizens make public comment. It has been live-streamed 1,938 times in six months.

## The Data

Verkada audit log viewing events by camera, sorted by total live stream count (2025-12-26 through 2026-03-26 — the period covered by the cleaner export file):

| Camera | Live Stream Views |
|---|---|
| **Community Room** | **1,938** |
| CH52-E Multisensor Camera (interior Town Hall) | 1,941 |
| Front Desk | 1,779 |
| Grand Ave. | (next highest) |
| Other interior Town Hall cameras | lower |
| Town Park cameras | lower |
| Water treatment / Wastewater cameras | lowest |

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], `VERKADA- Audit Logs_REDACTED.xlsx` device_name column.

### Who is watching the Community Room

Breakdown of Community Room live stream views by user:

| User | Role | Community Room views |
|---|---|---|
| Ruben Santiago | Assistant Town Clerk | **1,670** |
| Matt Laiminger | Police Chief | 214 |
| Samira Vetter | Town Clerk | 32 |
| Stefen Wynn | Town Administrator | 12 |
| Troy Martin | Peak 2 Peak vendor | 6 |
| Nicki Poulos | Public Works Director | 4 |

The Town Clerk's office (Santiago + Vetter) generated 1,702 of the 1,938 total Community Room live stream views — **87.8 percent**. A single employee, Assistant Town Clerk Ruben Santiago, generated 1,670 — **86.2 percent**.

### When the Community Room is watched

Day-of-week distribution of Ruben Santiago's Community Room live stream events:

| Day | Views |
|---|---|
| Sunday | 342 |
| Monday | 290 |
| Saturday | 277 |
| Tuesday | 274 |
| Friday | 239 |
| Thursday | 212 |
| Wednesday | 149 |

Sunday is the highest day. Weekends (Saturday + Sunday combined) account for 619 views, or 35 percent of the total. The Board of Trustees does not hold regular meetings on weekends. The Planning Commission does not hold meetings on weekends. Town Hall is closed on weekends.

Hour-of-day distribution of Ruben Santiago's Community Room live stream events:

| Hour (MDT) | Views |
|---|---|
| 6 AM | 65 |
| 7 AM | 191 |
| 8 AM | 152 |
| 5 PM | 210 |
| 6 PM | 145 |
| 7 PM | 147 |
| 8 PM | 59 |
| 9 PM | 22 |
| 10 PM | 31 |
| 11 PM | 24 |

Views at or after 5 PM: **428**. Views at or before 9 AM: **408**. These are outside regular Town office hours, which are typically 8:30 AM to 4:30 PM Monday through Friday.

Source: [[verkada-usage-patterns|verkada-usage-patterns]] statistical analysis.

## The Community Room Verkada Camera Is Not the Official Meeting Recording Camera

The Town of Paonia broadcasts and archives its public meetings on a YouTube channel at https://www.youtube.com/channel/UC2mZDPKrwEAf5T-x3Camtow. The meeting recordings posted there are made by a separate public-record recording system, not by the Verkada security camera inside the Community Room.

The Verkada Community Room camera is a private security feed accessed through Verkada Command by authenticated Town staff. Footage from it is not posted publicly. Any viewing of this feed is invisible to the public and to the person being recorded. This is fundamentally different from a public-record meeting broadcast.

## The Plain-English Interpretation

The most-watched camera in the Town of Paonia's Verkada surveillance system is not a vandalism deterrent at Town Park. It is not at the water treatment plant. It is not at the wastewater plant. It is not at the skate park.

**It is inside the Community Room at Town Hall**, where citizens stand up to speak to their own government during public comment, where the Board of Trustees holds its regular meetings, and where the Planning Commission and every public committee conducts the public's business.

**It has been watched 1,938 times in six months** by a private security feed visible only to Town staff. 86 percent of those views came from a single employee in the Town Clerk's office. 35 percent of those views happened on weekends when the Community Room should be empty and locked. 428 of them happened after 5 PM and 408 happened before 9 AM — outside regular Town office hours.

This is not consistent with the board's March 30 description of the cameras as "a tool used routinely across the country in cities and towns to monitor and protect the public use of publicly provided spaces." The data describes a pattern of private, routine, after-hours surveillance of the physical room where Town residents exercise their First Amendment right to petition their government.

## Open Questions

1. **Why is the Community Room camera being watched primarily outside of public meeting hours?** Public meetings happen on weekday evenings. The viewing pattern is concentrated on weekends, early mornings, and late nights.
2. **Who is watching, and what are they watching for?** 86 percent of the views come from one employee who has no documented responsibility for security.
3. **What is the written policy governing the use of this camera?** The Town's response to CORA C 26-09 confirms no written policy exists.
4. **Are citizens who speak at public comment being monitored before, during, or after their appearance?** The audit log does not distinguish between routine surveillance and targeted surveillance of specific individuals.

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[verkada-usage-patterns]] — Full statistical analysis
- [[facial-recognition-proof]] — Facial recognition is enabled on this same system
- [[cameras-always-on-not-motion]] — The cameras run continuously
- [[surveillance]] — Issue overview
- [[pattern-of-retaliation]] — Pattern of targeted surveillance
