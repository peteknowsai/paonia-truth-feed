---
title: Stefen Wynn Had Full Knowledge of the Verkada System's Capabilities
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, wynn, knowledge, board-letter]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns, final-published-letter, original-draft-with-libelous, mayor-report-agenda-packet]
---

# Stefen Wynn Had Full Knowledge of the Verkada System's Capabilities

## The Question

On March 30, 2026, the Paonia Board of Trustees published an official letter claiming the Town's Verkada surveillance cameras "are not face recognition, or private property surveillance apparatus" and are "motion activated." Both claims are false under Verkada's own documentation (see [[cameras-always-on-not-motion]] and [[facial-recognition-proof]]).

Town Administrator [[stefen-wynn|Stefen Wynn]] was one of the people who coordinated the original draft of that letter. Per the [[mayor-report-agenda-packet|mayor's report]], Wynn also vetted Trustee Hunter's separate counter-flyer for accuracy.

**Did Wynn know the statements in the letter were false when he helped draft and vet it?**

The answer, based on the Town's own records produced in CORA C 26-09, is that Wynn had every possible opportunity to know. He signed the contract. He has the highest permission level in the system. He has been using it actively for six months. He was accessing the audit log during the drafting period. The facts were available to him at every step.

## Evidence 1: Wynn Signed the Mitchell and Company Contract

On August 18, 2025, Stefen Wynn signed the Mitchell and Company quote for the Verkada camera system in his capacity as Town Administrator & Treasurer. The quote is a 5-page document specifying:

- 23 cameras across 5 sites
- Specific camera models (CF81-E, CH52-E, CB52-E, CM42, CF83-E)
- Five-year Cloud Camera License on every camera with "Capacity Increase"
- 30-day retention on every camera
- Total cost: $50,288

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], pages 3-8.

Every camera model Wynn signed to purchase is a Verkada cloud camera that records continuously per Verkada's Adaptive Quality Recording specification. The "Cloud Camera License, Capacity Increase" line items are Verkada's licensing tier that enables People Analytics features. The signed contract is itself evidence that Wynn was aware of the product he was purchasing.

## Evidence 2: Wynn Is Listed as an Organization Admin

The CORA response includes a screenshot of the Verkada user management page showing 11 users with access to the Town's account. Three users are marked as "Organization Admin" — the highest permission level Verkada provides. Stefen Wynn is one of them.

| User | Email | Role |
|---|---|---|
| Kirk Hinderberger | kirk@mitchandco.com | Organization Admin |
| Matt Laiminger | mlaimingerppd@townofpaonia.com | Organization Admin |
| **Stefen Wynn** | **stefenw@townofpaonia.com** | **Organization Admin** |

Organization Admin access provides full visibility and control of every feature in Verkada Command, including:

- The People Analytics dashboard
- The Persons of Interest enrollment interface
- Alert Rule configuration
- Audit log review and export
- User permission management
- Camera configuration and settings

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], user management screenshot.

## Evidence 3: Wynn Has 545 Events in the Audit Log

Across the period October 2025 through March 2026, Wynn generated **545 events** in the Verkada audit log. This is not a dormant account. He was actively using the system.

Of those 545 events:

- **484** are live stream views (LIVE_STREAM_START events) of individual cameras
- Dozens are administrative actions modifying user permissions, roles, and camera settings
- The remainder include login events, configuration changes, and audit log queries

Source: [[verkada-usage-patterns|verkada-usage-patterns]], statistical breakdown by user.

## Evidence 4: The March 3, 2026 Full-System Sweep

On March 3, 2026, between 11:04 AM and 11:17 AM MDT (a 13-minute window), Wynn executed 204 events in the Verkada system. This single session includes:

**Camera viewing** — live stream events on every camera in the Town's Verkada system:

- TOP-PARK-CAM01 (22 views)
- SW Pavillion (20 views)
- Stage (16 views)
- TOP-PARK-CAM03 (14 views)
- Skate Park (14 views)
- WW Door (12 views)
- WTP Front (12 views)
- WTP Interior (12 views)
- Shop Door (10 views)
- Shop Parking Lot (10 views)
- TOP-PARK-CAM02 (10 views)
- Bulk Fill Station (8 views)
- Community Room (8 views)
- WW Lagoon (6 views)
- Grand Ave. (4 views)
- West Side Shop (2 views)
- Front Desk (2 views)
- TH Rear Door (2 views)
- TH Parking Lot (2 views)
- TH North Alley (2 views)
- TH South Alley (2 views)

**Administrative actions** during the same 13-minute session:

- User Permissions Set (3 events)
- User Permissions Modified (3 events)
- User Roles Modified (3 events)
- Key Contact Updated (3 events)
- Communication Recipient Updated (1 event)

These are admin-panel actions. To execute them, Wynn had to be logged into the Verkada Command admin interface. The admin interface displays People Analytics, Persons of Interest, and Alert Rules as items in its main navigation. A user performing permission changes and camera configuration is looking at the same interface that shows the People Analytics feature set.

This session occurred **27 days before the board's March 30 letter was published**, during a period when the letter was being drafted and edited.

Source: [[verkada-usage-patterns|verkada-usage-patterns]] — specific dated events section.

## Evidence 5: Wynn Reviewed the Audit Log Four Days Before the Letter Was Published

On March 26, 2026, at 12:10 PM MDT, Wynn logged into Verkada and for the next 59 seconds ran three audit log queries:

1. A 7-day rolling window (March 19 → March 26, no filters)
2. The same 7-day window, 12 seconds later
3. A 90-day window (December 26 → March 26, no filters)

Then he logged out. No further activity that day.

These three queries are **the only audit log activity ever recorded by Wynn** in the six-month history of the Town's Verkada system. His first ever use of the audit log feature was during the active drafting period for the March 30 letter.

The 90-day window he queried corresponds exactly to the date range of the Excel file the Town Clerk later produced to Pete McCarthy in response to CORA C 26-09 (December 26, 2025 through March 26, 2026). The match to the day suggests that the window being reviewed is what ultimately got exported.

Source: [[audit-log-first-viewed-after-cora|audit-log-first-viewed-after-cora]] — full timeline and query analysis.

## Evidence 6: Wynn Coordinated the Board's Response Letter

Per the mayor's own report (documented in [[mayor-report-agenda-packet]]), Wynn reviewed Trustee Hunter's rebuttal flyer "to ensure her flyer content was 100% accurate." The board's formal letter on March 30 was a coordinated response drafted with input from Wynn, Town Attorney [[clayton-buchner|Clayton Buchner]], and Trustee [[lucy-hunter|Lucy Hunter]].

Wynn's role in the response is not in dispute. He coordinated it. He was involved in reviewing the content. The same individual who has full administrative access to the Verkada system, who has been actively using it for six months, and who accessed the audit log four days before the letter was published, is the individual responsible for reviewing the content of the letter for accuracy.

Source: [[mayor-report-agenda-packet|mayor-report-agenda-packet]], [[stefen-wynn|stefen-wynn]] person page.

## Evidence 7: The Publicly-Available Verkada Documentation

Verkada's own product blog and help center describe the camera recording behavior and People Analytics features in plain language, publicly accessible to anyone with an internet connection:

- "The standard quality video retention is unaffected by motion and is recorded continuously up to the designated retention of 15, 30, 60, 90, 120 or 365 days." (Verkada blog, "Recording in Adaptive Quality")
- "Person of Interest Notifications... The feature works by matching the face detected in frame with an existing image from the organization or an uploaded photo." (Verkada blog, "Person of Interest Notifications")
- "People Analytics builds on those tools by combining intelligent edge-based video processing with computer vision in the cloud..." (Verkada blog, "Introducing People Analytics")

These are not internal documents. They are the vendor's public marketing. Any administrator of a Verkada system who wanted to know what the product does could read them in 10 minutes. The Town Administrator is the person who signed the contract to buy this vendor's product.

## The Plain-English Interpretation

**Stefen Wynn had every possible form of access and awareness to know what the Town's Verkada cameras do.**

- He signed the contract to buy them.
- He holds the highest permission level in the system.
- He has been actively using the system for six months.
- He performed a 13-minute full-system sweep 27 days before the March 30 letter, during which he also modified user permissions and settings.
- He accessed the Verkada audit log for the first time in the history of the system four days before the letter was published, during active drafting.
- He coordinated the drafting of the response letter along with the Town Attorney and Trustee Hunter.
- Verkada's own publicly-available product documentation contradicts both of the letter's camera claims in plain English.

**There is no scenario in which Wynn could have helped draft the March 30 letter without knowing its camera claims were inaccurate.** Either:

1. He knew the claims were inaccurate and let them be published anyway.
2. He coordinated a public statement of fact about a surveillance system he had been actively administering for six months without ever once reading Verkada's own product documentation.

There is no third scenario. Both options are disqualifying for a Town Administrator. The first involves signing off on a misrepresentation of material fact in a public statement. The second involves signing contracts for, administering, and publicly describing a $50,288 surveillance system without understanding what it does.

## Open Questions

1. What did Wynn review in his March 3 full-system sweep of the cameras?
2. What specifically was he looking at during his March 26 audit log queries?
3. What did Wynn and Laiminger communicate about during the March 25-26 period when both of them were reviewing the audit log?
4. What was the Verkada Support ticket opened by Laiminger on March 26 actually about, and did Wynn participate in it?

## What Would Change This Analysis

- If Wynn provided a written account of his understanding of the Verkada system, including whether he understood it to record continuously and whether he understood People Analytics to be facial recognition, and that account was consistent with the March 30 letter's claims. (He has not yet done so.)
- If documentation emerged showing that the Verkada sales team, Mitchell and Company, or another party had represented the product to Wynn as "motion activated" and "not face recognition." (No such documentation has been produced, and it would contradict Verkada's own publicly-available product documentation.)

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[cameras-always-on-not-motion]] — Fact-check of the motion activation claim
- [[facial-recognition-proof]] — Fact-check of the facial recognition claim
- [[audit-log-first-viewed-after-cora]] — The March 25-26 audit log review
- [[verkada-usage-patterns]] — Full usage analysis
- [[stefen-wynn]] — Town Administrator person page
- [[final-published-letter]] — The March 30 letter being fact-checked
- [[mayor-report-agenda-packet]] — Mayor's report documenting Wynn's role in coordination
