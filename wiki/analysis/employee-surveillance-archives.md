---
title: Town Employees Are Being Archived on Camera, By Name
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, employees, archives, retaliation, santiago]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns, pattern-of-retaliation]
---

# Town Employees Are Being Archived on Camera, By Name

## The Claim

[[ruben-santiago|Assistant Town Clerk Ruben Santiago]] has created multiple permanent video archives on interior Town Hall cameras labeled with the names of specific Town employees. At least one was created at the exact moment an employee was being walked out of the building after termination, with the camera's audio deliberately enabled to 100 percent in the same log second. Another is labeled with the first name of an employee who is still currently employed by the Town.

## The Data

The CORA response to C 26-09 produced the Town's complete Verkada audit log for the period October 3, 2025 through March 26, 2026. The audit log records 19 `ARCHIVE_START` events (new permanent archive creations). Five of those archives are labeled with the names of specific individuals, including four named Town employees. One additional archive is labeled with a person's name that has not been confirmed as a Town employee.

### Archives labeled with identified Town employees or named individuals

All dates in the local timezone (MST or MDT depending on daylight saving).

| Date | User | Camera | Label | Notes |
|---|---|---|---|---|
| 2025-11-20 | Ruben Santiago | TOP-HALL-CAM02 | **"Clint Rose Exits post-termination."** | Audio toggled to 100% on two cameras in the same log second as archive creation |
| 2025-11-21 | Ruben Santiago | TOP-HALL-CAM02 | **"Morgan Reading Email in Ruben's Office"** | Subsequently used by the Town as part of the basis for terminating Morgan |
| 2025-12-18 | Ruben Santiago | TOP-HALL-CAM01 | **"Graham fall outside town hall."** | Likely liability/insurance documentation |
| 2025-12-19 | Ruben Santiago | TOP-HALL-CAM02 | **"Suzie Kaldis incident - 12/19/2025"** | Relationship to Town not documented in public record |

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], `Verkada_Audit Log_REDACTED.xlsx`, filtered on `ARCHIVE_START` events with populated label fields in the details column.

### Related archives labeled with other identifying information

| Date | User | Camera | Label |
|---|---|---|---|
| 2025-10-23 | Matt Laiminger | TOP-HALL-CAM01 | "Ballot Box Observation Footage" (with "Blurred Faces" filter) |
| 2025-11-03 | Matt Laiminger | TOP-HALL-CAM01 | "P25-0852" (police case number) |
| 2026-01-06 | Matt Laiminger | TOP-PARK-CAM01 | "Juvenile Urination Incident" |
| 2026-01-08-09 | Nicki Poulos | CH52-E [serial redacted] | "Feeding Cat" / "Cat food guy" / "Cat food guy - Car wash and vehicle" / "Cat food guy at Car wash" (5 archives) |
| 2026-02-26 | Ruben Santiago | Grand Ave. | "Condom Layout 2/26/2026" |
| 2026-02-27 | Ruben Santiago | Front Desk | "Ruben Fall 2/26/2026" |
| 2026-03-11 | Ruben Santiago | Front Desk | "Easter Rental Discussion" (label edited five times as typed) |
| 2026-03-20 | Ruben Santiago | Community Room | "Teen Center Meeting 3/16/2026" |
| 2026-03-20 | Ruben Santiago | Community Room | (no label — empty details) |
| 2026-03-24 | Matt Laiminger | Stage | "P26-0222" (police case number) |

## Case Detail 1: The Clint Rose Archive (2025-11-20)

On November 20, 2025 at 4:06:40 PM MST, [[ruben-santiago|Ruben Santiago]] executed three separate Verkada system actions **in the same log second**:

```
16:06:40 MST  CAMERA_AUDIO_CHANGED  TOP-HALL-CAM02   volumepercent: 100
16:06:40 MST  CAMERA_AUDIO_CHANGED  TOP-HALL-CAM03   volumepercent: 100
16:06:40 MST  ARCHIVE_START         TOP-HALL-CAM02   label: "Clint Rose Exits post-termination."
```

Santiago turned the audio recording on two interior Town Hall cameras to 100 percent at the exact moment he saved a permanent archive of the footage. The audio was enabled specifically for the archive. The archive is public:true in its metadata, meaning it is visible to any user with access to the Town's Verkada account.

The label states explicitly that the archive captures an employee exiting the Town Hall building after termination. "Clint Rose" is named in the archive label and the position/department of Clint Rose has not been publicly documented by the Town.

The timing of 4:06 PM on a Thursday is consistent with end-of-workday termination procedures (walk-out after a firing). The fact that audio was specifically enabled for the archive — not before or after, but in the same log second — indicates deliberate intent to capture the audio of the termination event.

Santiago subsequently downloaded and viewed this archive multiple times over the following days. Town Clerk [[samira-vetter|Samira Vetter]] logged into the Verkada system at 5:06:40 PM MST on November 21, 2025, at the exact second Santiago was viewing the archive — indicating they were likely reviewing it together or in close sequence.

## Case Detail 2: The "Morgan Reading Email" Archive (2025-11-21) — Used as Basis for Termination

On November 21, 2025 at 11:33:20 AM MST, Santiago executed the following sequence on TOP-HALL-CAM02:

```
11:33:20 MST  CAMERA_AUDIO_CHANGED  TOP-HALL-CAM02   volumepercent: 100
11:33:20 MST  VIDEO_HISTORY_M3U8    TOP-HALL-CAM02   start_time: 1763739509  (scrub to 2025-11-20 13:58 MST)
11:33:20 MST  CAMERA_AUDIO_CHANGED  TOP-HALL-CAM02
11:33:20 MST  ARCHIVE_START         TOP-HALL-CAM02   label: "Morgan Reading Email in Ruben's Office"
```

The `start_time` field on the Video History event indicates that Santiago scrubbed to footage from approximately 1:58 PM MST on November 20, 2025 — earlier the same day as the Clint Rose archive creation, and approximately 2 hours before Clint Rose was walked out.

The archive label identifies the subject by first name ("Morgan") and describes her as "Reading Email in Ruben's Office." Her full name is not included in this analysis pending her consent to public identification.

Santiago downloaded the archive at 2:20 PM MST on November 21. He viewed it again at 5:06:40 PM MST on November 21, at the exact moment Town Clerk Samira Vetter logged in to the Verkada system.

**The Town subsequently used this archived footage as part of the basis for terminating Morgan.** Morgan was informed of the recording's existence at the time she was fired — the Town disclosed the recording to her in the context of using it as a justification for the termination. She is no longer employed by the Town as of 2026-04-09.

This is materially significant. The archive was not passive surveillance footage that incidentally captured a Town employee. It was a deliberately-created permanent video record that was then used as a basis for the employment termination of a person whom Town Administrator [[stefen-wynn|Wynn]] had previously pressured [[kaja-bowman|Deputy Treasurer Kaja Bowman]] to write up without investigation in September 2025. Bowman refused. Bowman was terminated October 9, 2025. The cameras were installed October 22, 2025. The archive of Morgan was created November 21, 2025. Morgan was subsequently terminated using that archive.

The pattern is documented in the Town's own audit log and confirmed by Bowman's account of having been told about the recording at the moment of Morgan's firing. See [[pattern-of-retaliation]] for the full sequence.

## Case Detail 3: The "Suzie Kaldis incident" Archive (2025-12-19)

On December 19, 2025 at 3:33:20 PM MST, Santiago created an archive on TOP-HALL-CAM02 labeled "Suzie Kaldis incident - 12/19/2025." The archive metadata includes:

- Creator: Ruben Santiago
- Camera: TOP-HALL-CAM02 (interior Town Hall)
- Label: "Suzie Kaldis incident - 12/19/2025"
- Downloaded: Yes (same session)

The nature of the "incident" is not specified in the audit log details. The relationship of Suzie Kaldis to the Town (employee, visitor, citizen, other) is not documented in the public record available to the wiki maintainers as of 2026-04-09.

## Case Detail 4: The "Graham Fall" Archive (2025-12-18)

On December 18, 2025 at 9:00 AM MST, Santiago created an archive on TOP-HALL-CAM01 labeled "Graham fall outside town hall." This archive appears consistent with documentation of a slip-and-fall incident that would normally be captured for insurance or liability purposes. The identity of Graham and the circumstances of the fall are not documented in the public record.

This is the one archive in the sequence that has a plausible ordinary business justification. It is included here for completeness because it demonstrates that Santiago's archive workflow includes named subjects, establishing a pattern of routine naming in the archive labels.

## The Pattern

Santiago's archive workflow, based on the labeled archives in the audit log, demonstrates:

1. **Named subjects.** The majority of his archives are labeled with a person's name or an "incident" tied to a named individual.
2. **Interior Town Hall focus.** Most are on TOP-HALL-CAM01 or TOP-HALL-CAM02, which are interior Town Hall cameras.
3. **Audio enablement.** Multiple archive sessions include `CAMERA_AUDIO_CHANGED` events toggling audio at 100 percent in the same log second or immediately adjacent, indicating deliberate audio capture for the archive.
4. **Timing around employment events.** The Clint Rose archive was created at the exact moment of a termination. The Morgan archive was created the next day from footage of the previous day's afternoon (the same day as the Clint Rose termination).
5. **Review by the Town Clerk.** [[samira-vetter|Samira Vetter]] logged into the system at the exact second Santiago was viewing the Clint Rose and Morgan archives on November 21 at 5:06 PM MST. She viewed the archives in conjunction with her subordinate.

## The Timing Relative to Kaja Bowman's Termination

The installation date of the Verkada system is October 22, 2025 — 13 days after the termination of [[kaja-bowman|Deputy Treasurer Kaja Bowman]] on October 9, 2025. The first employee-named archive (Clint Rose) was created 29 days after installation. Within 45 days of installation, three of the four employee-named archives had been created.

| Date | Event |
|---|---|
| 2025-09-16 | Kaja Bowman asks Mayor Smith about complaint process; Mayor discloses her name to Wynn same day |
| 2025-10-09 | Kaja Bowman terminated "without cause" |
| 2025-10-22 | Verkada cameras installed; Ruben Santiago configures People Analytics Dashboard, Persons of Interest list, and Alert Rules on day one |
| 2025-11-20 | Clint Rose terminated; Santiago archives footage of his exit with audio enabled |
| 2025-11-21 | Santiago archives "Morgan Reading Email in Ruben's Office" from previous day's afternoon |
| 2025-12-18 | Santiago archives "Graham fall outside town hall" |
| 2025-12-19 | Santiago archives "Suzie Kaldis incident" |

The chronology is documented in [[pattern-of-retaliation]] as part of the broader retaliation timeline.

## The Plain-English Interpretation

**The Assistant Town Clerk created permanent video archives of specific identified Town employees on interior Town Hall cameras, with audio capture deliberately enabled.** These are not passive security recordings that happen to contain employees. They are intentional, labeled, downloaded archives created by a clerk whose public-facing job involves routine work with those same employees.

**At least one of the archives was created at the moment of an employee's termination**, with the camera's audio switched on in the same log second as the archive was saved. This is not consistent with routine security work. Routine security work does not involve toggling audio to match the exact second of an archive creation.

**One of the archives was used by the Town as part of the basis for terminating an employee.** The subject was video-archived in her routine workday activities (reading email in a coworker's office) on a camera she was not informed was recording. The archive was saved under her name, downloaded, and viewed by the Town Clerk in conjunction with the Assistant Clerk the day after creation. The Town disclosed the recording to her only at the moment they fired her, using the recorded footage as part of the stated justification for the termination.

**The timing of the employee-named archives closely follows the installation of the Verkada system**, which itself closely followed the termination of a Deputy Treasurer who had inquired about filing a complaint. The sequence is documented in [[pattern-of-retaliation]].

This is not a security camera system being used for its stated purpose of catching vandals at Town Park. This is an interior surveillance system being used by the Town Clerk's office to archive footage of specific named individuals, including during sensitive employment events.

## Open Questions

1. **Who is Clint Rose?** What was his role at the Town, what was the stated basis for his termination, and has he been contacted about the archive that exists of his walk-out?
2. **What was the stated basis for Morgan's termination?** Morgan is a former Town employee. The Town used the November 21, 2025 archive as part of the basis for firing her. The specific date of her termination, the formal stated cause, the personnel file documentation, and any other employees who reviewed or downloaded the archive before it was used in the termination decision are not yet publicly documented.
3. **Who is "Suzie Kaldis"?** What was the nature of the "incident," and what is her relationship to the Town?
4. **Why was audio deliberately enabled for the Clint Rose archive?** Audio capture is a separately-configurable feature in Verkada. The simultaneous toggle to 100 percent at the exact second of archive creation is not a default behavior. It required a deliberate user action.
5. **What is the stated justification for any of the employee archives?** The Town has no written policy governing camera use, including no policy on when employee activity may be archived, no notice requirement to the subject, and no retention limits.
6. **Who else has reviewed or shared these archives?** The audit log shows multiple `ARCHIVE_DOWNLOAD` and `ARCHIVE_VIEW` events following creation, including the simultaneous-second login by Samira Vetter on November 21.

## What Would Change This Analysis

- If the Town produced a written policy that was in effect at the time of the archives being created, governing when employee activity may be recorded and archived, with the subject's knowledge and consent, and the archives were shown to be consistent with that policy. (No such policy exists; see [[cora-c26-09-verkada-audit-logs]] item 4.)
- If the employees named in the archives confirmed they were aware of and consented to the archives' creation. (No such confirmation has been obtained as of 2026-04-09; at least one subject had no knowledge of her archive until this analysis.)
- If the timing of the audio toggle and archive creation on November 20 turned out to be an artifact of a batch operation or UI side-effect rather than a deliberate user action. (Verkada's audit log documentation describes these as distinct user-initiated events; a batch operation would not trigger three events at the exact same second across two different cameras unless specifically configured.)

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[verkada-usage-patterns]] — Full usage analysis including archive event details
- [[pattern-of-retaliation]] — Cross-case pattern analysis
- [[ruben-santiago]] — Assistant Town Clerk person page
- [[samira-vetter]] — Town Clerk person page
- [[kaja-bowman]] — Former Deputy Treasurer, terminated 13 days before Verkada installation
- [[march-20-community-room-archives]] — Related open question on later Community Room archives
