---
title: "The 'Suzie Kaldis incident - 12/19/2025' Archive"
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, employees, archives, citizens, kaldis, santiago]
sources: [cora-c26-09-verkada-audit-logs, employee-surveillance-archives, verkada-usage-patterns]
---

# The "Suzie Kaldis incident - 12/19/2025" Archive

## What This Page Documents

This page documents what the Town of Paonia's own Verkada audit log records about a permanent video archive labeled "Suzie Kaldis incident - 12/19/2025." All facts on this page come from the audit log produced by the Town Clerk in response to [[cora-c26-09-verkada-audit-logs|CORA C 26-09]] on April 7, 2026. Nothing on this page is speculation. It is a description of what the Town's own records show.

This page exists so that the person identified in the archive label, and anyone who knows her, can see exactly what the Town's records say about her without needing to read a full statistical analysis to find the information that concerns her specifically.

## The Archive Event

On Friday, December 19, 2025, at approximately 2:33 PM Mountain Standard Time, [[ruben-santiago|Assistant Town Clerk Ruben Santiago]] created a permanent video archive on an interior Town Hall camera. The archive was labeled in the Town's Verkada admin panel as:

> **"Suzie Kaldis incident - 12/19/2025"**

The audit log records the following metadata for the archive:

| Field | Value |
|---|---|
| **Date created** | December 19, 2025 |
| **Approximate time created (wall clock)** | ~2:33 PM MST |
| **Camera** | TOP-HALL-CAM02 (interior Town Hall camera) |
| **Creator** | Ruben Santiago, Assistant Town Clerk |
| **Label** | "Suzie Kaldis incident - 12/19/2025" |
| **Public flag** | `true` (visible to all users with access to the Town's Verkada account) |
| **Tags** | (none in the metadata) |

The archive was both **viewed and downloaded** within the same session by Santiago, per the audit log's `ARCHIVE_VIEW` and `ARCHIVE_DOWNLOAD` events on December 19, 2025.

## What Footage Is in the Archive

The audit log does not directly include the start and end timestamps of the saved video clip. However, the `LIVE_STREAM_START` events on TOP-HALL-CAM02 from the same session contain `event_time` fields that record the exact Unix timestamps of the video frames being viewed. Those event times reveal what time window of footage Santiago was reviewing immediately before and during the archive creation.

The video content reviewed in the session corresponds to the following times on **Friday, December 19, 2025**:

- **Approximately 1:42 PM to 1:44 PM MST** (multiple short clips between 13:42:36 and 13:43:55 MST)
- **Approximately 2:28 PM MST** (short clips around 14:28:26 to 14:28:28 MST)

In other words, Santiago was reviewing camera footage from about an hour before he created the archive, and from about five minutes before he created the archive. The "incident" the archive captures is something visible on the interior Town Hall camera (TOP-HALL-CAM02) during one or both of those time windows on Friday afternoon, December 19, 2025.

If a person named Suzie Kaldis was inside the Town Hall building during either of those windows, the audio and video of her presence is what is preserved in the archive.

## Audio Was Deliberately Enabled

The same session contains a `CAMERA_AUDIO_CHANGED` event on TOP-HALL-CAM02 with `{"volumepercent":100}`. Audio recording on the camera was set to 100 percent during the archive session.

This is the same pattern observed with the [[employee-surveillance-archives|"Clint Rose Exits post-termination" archive]], which was also created by Ruben Santiago on an interior Town Hall camera with audio recording deliberately enabled at the moment of archive creation.

## What the Archive Likely Contains

Based on the audit log and the metadata:

- **A video clip of footage from inside Town Hall on the afternoon of Friday, December 19, 2025**
- **Captured by an interior Town Hall camera (TOP-HALL-CAM02)**, which faces a part of the building used for routine staff and visitor activity
- **With audio enabled at 100 percent**, meaning any speech audible in the camera's microphone range during the captured time window was preserved
- **Permanently saved** in the Town's Verkada cloud account, beyond the standard 30-day retention window
- **Reviewed and downloaded** by Santiago at the time of creation
- **Labeled as an "incident"**, a term Santiago has used in other archive labels of named individuals (see [[employee-surveillance-archives]])

The archive remained in the Town's Verkada account at the time CORA C 26-09 was fulfilled on April 7, 2026, and presumably remains there now.

## What Is Not Yet Publicly Documented

- **The full identity of "Suzie Kaldis."** The first name "Suzie" and the last name "Kaldis" appear in the archive label as Santiago typed them. This wiki cannot independently confirm her full legal name, address, or contact information from the audit log alone.
- **Her relationship to the Town of Paonia.** Whether she is an employee, a former employee, a contractor, a vendor, a permit applicant, a license applicant, a business owner, a resident, a visitor, or some combination is not stated anywhere in the audit log.
- **The nature of the "incident."** The label uses the word "incident" but provides no description of what the incident was. It is not clear from the audit log whether the "incident" was a complaint, a disagreement, a routine business interaction, or something else entirely.
- **Whether Suzie Kaldis knows the archive exists.** As of this writing (April 9, 2026), there is no public record indicating that the subject of the archive has been notified by the Town that her presence in the building was video-archived with audio enabled.
- **Whether the archive has been shared, downloaded by anyone besides Santiago, or viewed by other Town staff.** The audit log shows Santiago's own actions on the archive but not whether it has subsequently been accessed, shared internally, or shared externally.

## What Suzie Kaldis Can Do, If She Wants To

Under Colorado Open Records Act (C.R.S. 24-72-201 et seq.), the subject of a public record about herself has the strongest possible legal standing to request that record. The Town cannot withhold a record of a person from that same person on standard privacy grounds, because the privacy interest the law protects is hers.

If Suzie Kaldis wants to know exactly what the archive contains and what context the Town has attached to it, she has the right to file a CORA request for:

1. **A complete copy of the archive file itself** (the saved video clip)
2. **The full archive metadata**, including: the exact start and end timestamps of the captured footage, any case number or notes attached to the archive, the creator and creation timestamp, the camera(s) involved, the sharing history (whether the archive has been shared with anyone, internally or externally, and with whom), and the download history (who has downloaded the archive and when)
3. **Any internal communications between Town staff** referencing her by name in connection with the archive or the underlying "incident"
4. **Any related records the Town holds about her**, including but not limited to license applications, permit applications, complaints, correspondence, or other written records that may relate to the December 19, 2025 visit or the broader relationship she has with the Town

The request can be sent to the Town Clerk's office at the address listed on the [Town of Paonia's CORA page](https://townofpaonia.colorado.gov). She is not required to explain why she is requesting her own records.

A draft CORA request modeled on this approach is available; contact Pete McCarthy through the [paoniatruth.site](https://paoniatruth.site) contact channel for assistance.

## The Pattern This Archive Sits Within

The "Suzie Kaldis incident" archive is one of at least four permanent video archives created by Assistant Town Clerk Ruben Santiago on interior Town Hall cameras between November 20 and December 19, 2025, each labeled with the name of a specific identified individual:

| Date | Camera | Label | Subject |
|---|---|---|---|
| 2025-11-20 | TOP-HALL-CAM02 | "Clint Rose Exits post-termination." | Identified Town employee, terminated |
| 2025-11-21 | TOP-HALL-CAM02 | "Morgan Reading Email in Ruben's Office" | Former Town employee; archive used as basis for termination |
| 2025-12-18 | TOP-HALL-CAM01 | "Graham fall outside town hall." | Identified individual |
| **2025-12-19** | **TOP-HALL-CAM02** | **"Suzie Kaldis incident - 12/19/2025"** | **(this archive)** |

Three of the four archives are on TOP-HALL-CAM02. Three of the four were created by Santiago. Two of the four (Clint Rose and Suzie Kaldis) involve audio specifically enabled to 100 percent in the same session as the archive creation.

For full context on the pattern, see [[employee-surveillance-archives]] and [[pattern-of-retaliation]].

## Open Questions

1. **What was the "incident"** captured in this archive on the afternoon of December 19, 2025?
2. **Why was audio recording deliberately enabled at 100 percent** during the archive creation session?
3. **Has the archive been shared, viewed, or referenced** by any Town staff besides Ruben Santiago since its creation?
4. **Is there any written policy** that authorizes the Assistant Town Clerk to create permanent video archives of identified individuals on interior Town Hall cameras?
5. **Has Suzie Kaldis been informed** by the Town that this archive exists?
6. **Are there other archives, not yet identified**, of the same individual or related individuals that have not been documented in the public record?

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source page
- [[employee-surveillance-archives]] — The complete pattern of employee-named archives
- [[verkada-usage-patterns]] — Full usage analysis of the Verkada system
- [[ruben-santiago]] — Assistant Town Clerk person page
- [[pattern-of-retaliation]] — Cross-case retaliation pattern
- [[cameras-and-hostile-workplace]] — How the camera evidence corroborates the hostile workplace claim
- [[surveillance]] — Issue overview
