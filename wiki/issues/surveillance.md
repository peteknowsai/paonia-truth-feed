---
title: Surveillance and Cameras
type: issue
created: 2026-04-05
updated: 2026-04-08
tags: [surveillance, cameras, verkada, privacy]
sources: [board-letter-2026-03-30, verkada-10-things, hunter-rebuttal-flyer, meeting-2024-11-12, guardian-flock-cameras-privacy, cora-c26-09-verkada-audit-logs, verkada-usage-patterns]
---

# Surveillance and Cameras

Whether the Town of Paonia should deploy surveillance cameras on public property, whether the decision followed appropriate public process, and what capabilities the system actually has.

## The System

The town purchased a Verkada cloud camera system for approximately $52,000. [[verkada-10-things|source]]

**Locations:** Town Hall, Town Park, Public Works Shop, Lamborn Water Treatment Plant, Wastewater Treatment Plant. Install scheduled for October 22/23, 2025.

**Verkada's track record:**
- 2020: Male employees used the company's own facial recognition to photograph female coworkers and shared images in a Slack channel called "RawVerkadaDawgs." Three fired. (The Verge)
- 2021: Hackers breached 150,000 Verkada cameras, accessing live feeds inside hospitals, schools, police stations, Tesla factories. Over 100 employees had "super admin" access to every customer's cameras. (Bloomberg / The Verge)
- 2024: FTC fined Verkada $2.95M for failing to secure customer video data, false HIPAA compliance claims, and spamming. (FTC)

**Capabilities the board's response does not mention:**
- Built-in facial recognition and "People Analytics" (filter by clothing color, apparent sex, backpack detection)
- License plate recognition and heat mapping, all processed on-camera
- Photo upload to search for a "person of interest" across all camera history
- Integration with Axon's Evidence.com (law enforcement digital evidence platform)
- All footage stored in Verkada's cloud, not locally controlled by the town

The board's response states: "These are not nefarious face recognition, or private property surveillance apparatus." Verkada's own product documentation shows the cameras include facial recognition and AI-powered person tracking as standard features. [[verkada-10-things|source]]

## Public Process

- Cameras were "the topic of discussion during at least six public meetings held between October 2024 and December 2025." [[hunter-rebuttal-flyer|source]]
- Board approved unanimously with zero public comment. [[board-letter-2026-03-30|source]]
- [[hunter-rebuttal-flyer|Hunter's rebuttal]] acknowledges "No, there was no public comment, because no one from the public cared to speak on the matter."
- The Nov 12, 2024 budget work session included a presentation on the cameras; the discussion was about locations and costs, not surveillance policy. [[meeting-2024-11-12|source]]
- **The Town has no written policy, procedure, or guideline governing use, access, or retention of Verkada camera footage.** Confirmed by the Town's response to CORA C 26-09, which produced manufacturer device configuration screenshots in place of a policy. [[cora-c26-09-verkada-audit-logs|source]]

## Documented Usage (CORA C 26-09)

In response to [[cora-c26-09-verkada-audit-logs|CORA C 26-09]] (filed 2026-03-23, fulfilled 2026-04-07), the Town produced Verkada audit log exports covering October 3, 2025 through March 26, 2026. The logs contain 57,460 event rows across 23 cameras and 11 users. Full analysis in [[verkada-usage-patterns]].

Key findings from the audit log:

- **The Town Clerk's office accounts for 53% of all user activity.** Assistant Town Clerk [[ruben-santiago|Ruben Santiago]] alone accounts for 51.5% of all events.
- **The Community Room camera — where public meetings and public comment occur — has been live-streamed 1,938 times.** Santiago accounts for 1,670 of those views.
- **Santiago's Community Room viewing pattern is heavily concentrated on weekends (35% of views) and outside regular office hours** (428 views after 5 PM, 408 views before 9 AM). The Board does not meet on weekends.
- **93.6% of Santiago's Community Room events are Live Stream Started** (watching in real time) rather than Video History Streamed (reviewing past meetings).
- **Santiago created 4 permanent Community Room archives on Friday March 20 and Saturday March 21, 2026**, along with 13 Front Desk archives on January 30, February 27, and March 11. Archive Action Taken events preserve clips beyond the 30-day retention window.
- **[[stefen-wynn|Wynn]] swept every camera in 13 minutes on March 3, 2026** (204 events) concurrent with administrative actions modifying user permissions, roles, and key contacts.
- **[[samira-vetter|Vetter]] swept every camera the morning of March 25, 2026** (78 events in 14 minutes), the day the [[ten-things-flyer|10 Things flyer]] was distributed. Grand Ave. exterior camera was viewed 18 times.
- **[[stefen-wynn|Wynn]] accessed the Verkada audit log itself on March 26, 2026**, one day after the flyer was distributed and 12 days before the audit log was produced to Pete.

The "purpose" metadata requested in the original CORA (archive labels, descriptions, case numbers, notes) was not produced. See [[march-20-community-room-archives]] for the pending follow-up.

## Timeline

- **2024-10 to 2025-12**: Cameras discussed at budget meetings
- **2025-07-08**: Mitchell and Company issues quote for $50,288 (23 cameras, 47 labor hours) [[cora-c26-09-verkada-audit-logs|source]]
- **2025-08-12**: Board approves cameras unanimously, zero public comment
- **2025-08-18**: [[stefen-wynn|Wynn]] signs the Mitchell quote [[cora-c26-09-verkada-audit-logs|source]]
- **2025-10-22**: Installation begins (per original request date range)
- **2026-03-03**: [[stefen-wynn|Wynn]] sweeps every camera in 13 minutes, 204 events, concurrent with user permission and role modifications [[verkada-usage-patterns|source]]
- **2026-03-20/21**: Assistant Clerk [[ruben-santiago|Santiago]] creates 4 permanent Community Room archives [[verkada-usage-patterns|source]] [[march-20-community-room-archives|open question]]
- **2026-03-23**: Pete files CORA C 26-09 for Verkada records
- **2026-03-25**: [[samira-vetter|Vetter]] sweeps every camera the morning of the [[ten-things-flyer|10 Things flyer]] distribution [[verkada-usage-patterns|source]]
- **2026-03-26**: [[stefen-wynn|Wynn]] accesses the Verkada audit log [[verkada-usage-patterns|source]]
- **2026-03-27**: Pete submits citizen initiative to ban surveillance cameras on public property
- **2026-04-03**: [[samira-vetter|Town Clerk Vetter]] rejects the initiative
- **2026-04-03**: Pete files formal response rebutting all 6 rejection grounds
- **~2026-04-06**: Revised initiative resubmitted; split initiatives prepared; Rule 106 petition drafted
- **2026-04-07**: CORA C 26-09 fulfilled ($167.90 fee, 33-page PDF, 2 Excel audit log exports) [[cora-c26-09-verkada-audit-logs|source]]

## Open Questions

- [[verkada-approval-process]] -- Procurement details, who selected Verkada, whether capabilities were evaluated
- [[march-20-community-room-archives]] -- Why did the Assistant Clerk create four permanent archives of the public meeting room on March 20-21, 2026?

## Key People

- [[stefen-wynn]] -- Signed Mitchell quote 2025-08-18, 545 logged Verkada events, swept every camera on 2026-03-03, checked audit log on 2026-03-26
- [[samira-vetter]] -- Rejected citizen initiative to ban cameras, 394 logged Verkada events, swept every camera on 2026-03-25 (flyer day), pulled Front Desk history on 2026-03-11
- [[ruben-santiago]] -- Assistant Town Clerk, 16,653 logged events (largest single user), 1,670 Community Room views, 4 Community Room archives on 2026-03-20/21
- [[lucy-hunter]] -- Acknowledged zero public comment in her rebuttal

## Related Initiatives (Truth Feed app)

- `camera-ban` -- Surveillance camera prohibition
- `robot-moratorium` -- Autonomous surveillance ban

## National Context

Cities across the country are canceling or pausing surveillance camera contracts over privacy concerns and ICE data-sharing risks. Mountain View, Santa Cruz, South Pasadena, Flagstaff, and Denver have all terminated or paused contracts. Security researchers demonstrated cameras could be hacked by pushing a button three times. The EFF calls it a systemic problem beyond any single vendor. [[guardian-flock-cameras-privacy|Guardian investigation (Apr 2026)]]

## See Also

- [[initiative-process]]
- [[2026-04-03-surveillance-initiative-rejection]]
- [[verkada-10-things]]
