---
title: The Camera Logs Corroborate the Hostile Work Environment Claim
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, hostile-workplace, retaliation, toxic-culture, employees]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns, pattern-of-retaliation, employee-surveillance-archives, audit-log-first-viewed-after-cora, wynn-knowledge-of-cameras]
---

# The Camera Logs Corroborate the Hostile Work Environment Claim

## The Background

Since late 2024, multiple Town employees, former employees, and citizens have documented a pattern of hostile, retaliatory, and surveillance-oriented behavior inside Town Hall. That pattern has been described in:

- [[board-letter-2026-03-30|Pete McCarthy's November 18, 2024 complaint to the Board]] — alleging a hostile environment created by [[stefen-wynn|Town Administrator Stefen Wynn]] and [[samira-vetter|Town Clerk Samira Vetter]]
- [[kaja-bowman|Kaja Bowman]]'s April 2026 letter to the Board, written by the former Deputy Treasurer — independently describing the same pattern from inside the Clerk's office
- [[commissioner-watson|Commissioner Watson]]'s corroborating testimony during the December 2, 2024 Planning Commission meeting
- [[cory-heiniger|Cory Heiniger]]'s resignation with accusations against Wynn
- The broader [[pattern-of-retaliation|pattern of retaliation]] documented across four separate cases from 2024 through 2025

The Town's formal response to these accounts has consistently been to deny them. The [[board-letter-2026-03-30|March 30, 2026 board letter]] dismissed the allegations as "baseless accusations" and "deliberately damaging misinformation."

Before April 2026, the record of hostile workplace behavior rested largely on first-person accounts. Those accounts were dismissible as disputed testimony, although they were internally consistent and independently corroborated by multiple unrelated individuals.

**The CORA C 26-09 response changes that.** The audit log from the Town's own surveillance system, produced by the Town's own Clerk in response to a records request, now provides documentary evidence that corroborates the hostile work environment claim at multiple points.

## What the Audit Log Shows

Four specific findings from the Verkada audit log corroborate the hostile work environment pattern. Each is sourced to a dedicated analysis page.

### Finding 1: The Town's surveillance system is being used against its own employees

The audit log documents permanent video archives, created on interior Town Hall cameras, deliberately labeled with the names of specific identified Town employees. At least one was created at the exact moment an employee was being walked out of the building after termination, with the camera's audio deliberately enabled to 100 percent in the same log second.

- **"Clint Rose Exits post-termination."** — archived by [[ruben-santiago|Assistant Clerk Ruben Santiago]] at 4:06:40 PM MST on 2025-11-20, with audio simultaneously enabled on two cameras
- **"Morgan Reading Email in Ruben's Office"** — archived by Santiago on 2025-11-21, scrubbed from footage of the previous day; the Town subsequently used this archived footage as part of the basis for terminating Morgan, and informed her of the recording only at the moment they fired her
- **"Suzie Kaldis incident - 12/19/2025"** — archived by Santiago on 2025-12-19

[[samira-vetter|Town Clerk Samira Vetter]] logged into the Verkada system at the exact second Santiago was viewing these archives the day after their creation, indicating that the two were reviewing them in conjunction.

Full analysis: [[employee-surveillance-archives]]

### Finding 2: The cameras were installed 13 days after a retaliation-adjacent termination

The Verkada system was installed on October 22, 2025. [[kaja-bowman|Kaja Bowman]], the Deputy Treasurer, was terminated on October 9, 2025, thirteen days earlier. Bowman's termination occurred 23 days after she asked [[mayor-smith|Mayor Paige Smith]] about the Town's complaint process on behalf of staff. The Mayor disclosed Bowman's name to [[stefen-wynn|Wynn]] the same day, Wynn then made backdated entries in Bowman's personnel file, and Bowman was subsequently fired "without cause."

On installation day, Santiago's first actions in the new system were to configure the People Analytics facial recognition infrastructure, a "Persons of Interest" list, and automated Alert Rules. The facial recognition system was built before any camera had been used to capture any footage. It was a day-one priority.

The first four employee-named archives were created within 60 days of the installation of the system.

Full analysis: [[pattern-of-retaliation]], [[facial-recognition-proof]]

### Finding 3: Senior Town staff swept the cameras the morning after the 10 Things flyer

On March 24, 2026, Pete McCarthy distributed his "10 Things Paonia Should Know About Its Town Administrator" flyer around town. The next morning, March 25, 2026, at 8:42 AM MDT, Town Clerk Samira Vetter logged into Verkada and executed 78 events in 14 minutes, live-streaming every camera the Town owns. She viewed the Grand Avenue (front exterior) camera 18 times in that 14-minute window.

Vetter did not scrub through the historical footage of any camera during that session. She did not review the overnight recordings from Grand Avenue or any other exterior camera to attempt to identify who had placed the flyer. She only looked at the live feeds. The sweep is consistent with looking for who was currently on Town property on the morning after the flyer, or with assessing where flyers had been placed so they could be removed.

This behavior is part of a broader pattern of senior staff actions tied to Pete's civic activism.

Full analysis: [[verkada-usage-patterns]], March 25 session detail

### Finding 4: The Town Administrator and Police Chief reviewed the audit log immediately after Pete's CORA request, before the board letter was published

For five months and two days after installation, nobody at the Town had ever opened the Verkada audit log. Not Wynn, not [[laiminger|Police Chief Laiminger]], not Vetter, not Santiago, not anyone. The feature was dormant.

Pete filed CORA C 26-09 at 9:18 AM MDT on March 23, 2026. The Town Clerk formally received it on March 25. Within hours of the Clerk logging the request in the Town's records system, Police Chief Laiminger opened the audit log for the first time ever and ran four queries. The next day, he ran nine more. Town Administrator Stefen Wynn logged in on March 26 at 12:10 PM and ran three audit log queries of his own — the only audit log activity ever recorded by Wynn in the six-month history of the system. On the same day, Laiminger exported the complete audit log to a CSV file and granted Verkada Support one-day account access.

The board's March 30 letter was published four days later.

**This is the behavior of Town leadership coordinating the preparation of a public response by reviewing the documentary evidence the CORA request would produce.** It is not the behavior of administrators who had been routinely auditing their own system for ordinary operational reasons.

Full analysis: [[audit-log-first-viewed-after-cora]], [[wynn-knowledge-of-cameras]]

## Why This Corroborates the Hostile Work Environment Claim

The hostile work environment claim rests on several specific assertions:

1. Senior Town staff use their positions to target, monitor, and retaliate against individuals they perceive as threats or critics.
2. The Town Clerk's office is a central hub of this behavior, not a peripheral participant.
3. The Town Administrator has knowledge of and participates in the pattern.
4. When formal complaints are raised, the response is dismissal, denial, or retaliation rather than investigation.

The CORA audit log independently corroborates each assertion:

| Claim | Audit log evidence |
|---|---|
| Staff target and monitor individuals | Employee-named archives (Clint Rose, "Morgan," Suzie Kaldis) on interior Town Hall cameras with audio deliberately enabled |
| The Clerk's office is central | Assistant Clerk Santiago generated 51 percent of all system activity; Clerk Vetter reviewed archives in tandem with Santiago |
| The Town Administrator participates | Wynn holds Organization Admin access; performed a 204-event camera sweep 27 days before the March 30 letter; reviewed the audit log during letter drafting |
| Response to complaints is coordinated cover-up rather than investigation | Wynn, Laiminger, and Vetter all engaged the audit log immediately after Pete's CORA was received, exported it to CSV, and granted Verkada Support access within 90 minutes of first opening it |

The camera evidence does not replace the first-person accounts. It corroborates them with contemporaneous documentary records from a system the Town's own leadership chose to install.

## The Plain-English Interpretation

**Before CORA C 26-09, the hostile work environment claim was supported by testimony.** Four separate people (Pete McCarthy, Kaja Bowman, Cory Heiniger, and Commissioner Watson) gave consistent independent accounts of the same pattern, but the Town's response was to dismiss them as disputed or false.

**After CORA C 26-09, the hostile work environment claim is supported by the Town's own surveillance logs.** The logs show that:

- The Assistant Town Clerk created permanent video archives of specific Town employees, including one at the exact moment of a termination with audio deliberately enabled
- The Town Clerk reviewed those archives in tandem with her subordinate the following day
- The Town Administrator, Town Clerk, and Assistant Town Clerk collectively generated most of the activity in a surveillance system that was installed 13 days after a retaliation-adjacent termination
- Senior Town staff swept the cameras the morning after a citizen critic distributed a flyer
- The Town Administrator and Police Chief reviewed the audit log for the first time in the system's history specifically during the window when the Town was preparing its public response to that citizen's records request

The audit log is not testimony. It is the Town's own record of its own employees' own behavior in its own system. The Town cannot dismiss it as "baseless." They produced it themselves and charged Pete $167.90 to receive it.

## Open Questions

1. Who is enrolled in the Town's Persons of Interest facial recognition list, and what justification exists for each enrollment?
2. What other Town employees have been archived on interior cameras that Pete has not yet documented?
3. Has the Town ever adopted a written policy prohibiting the surveillance of Town employees in the course of their routine work?
4. Have Clint Rose, the Morgan archive subject, or Suzie Kaldis been informed by the Town that they were video-archived?
5. What is the connection between the audit log activity on March 25-26 and the drafting of the March 30 letter?

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[employee-surveillance-archives]] — Detailed analysis of the labeled archives
- [[audit-log-first-viewed-after-cora]] — The CORA-response cover-up timeline
- [[wynn-knowledge-of-cameras]] — Proof that Wynn knew the system's capabilities
- [[community-room-surveillance]] — Public meeting room surveillance pattern
- [[pattern-of-retaliation]] — Cross-case retaliation pattern
- [[kaja-bowman]] — Former Deputy Treasurer
- [[retaliation-pattern]] — Short-form pattern page
- [[surveillance]] — Issue overview
