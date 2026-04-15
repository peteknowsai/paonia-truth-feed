---
title: "CORA C 26-09: Verkada Audit Logs Response"
type: source
created: 2026-04-08
updated: 2026-04-08
tags: [cora, verkada, surveillance, cameras, audit-log, vetter, wynn]
sources: [verkada-10-things, surveillance, meeting-2024-11-12]
---

# CORA C 26-09: Verkada Audit Logs Response

**Raw files:**
- `raw/documents/cora-requests/c26-09-response/C 26-09 Response.pdf` (33 pages)
- `raw/documents/cora-requests/c26-09-response/Verkada_Audit Log_REDACTED.xlsx` (32,338 rows)
- `raw/documents/cora-requests/c26-09-response/VERKADA- Audit Logs_REDACTED.xlsx` (25,122 rows)

**Type:** CORA response package
**Request submitted:** 2026-03-23
**Request received by clerk:** 2026-03-25
**Deadline (with extension):** 2026-04-07
**Fulfilled:** 2026-04-07 (delivered 2026-04-08 after payment)
**Custodian:** [[samira-vetter|Samira Vetter]], Town Clerk / Official Custodian of Records
**Requester:** Pete McCarthy
**Fees charged:** $167.90 (total for 5 hours at $33.58/hour)

## Original Request

Five items submitted on the Town's official CORA Records Request Form:

1. Complete executed contract between Town of Paonia and Mitchell and Company for the Verkada Security Camera System, including all amendments and the Verkada service agreement.
2. Data retention policy for Verkada security camera footage, including automatic deletion period settings.
3. Access logs for all Verkada cameras showing who viewed feeds, dates/times, and purpose, from installation (October 22, 2025) to present.
4. All written policies, procedures, or guidelines governing use, access, and retention of Verkada camera footage.
5. All internal correspondence (emails, memos, texts) between Town Administrator Wynn, Police Chief Laiminger, and PW Director Poulos regarding selection, procurement, and deployment of the Verkada system from January 1, 2022 to present.

## Narrowed Scope

On 2026-03-30, after the clerk issued an initial cost estimate that included a 1-hour "research and retrieval of audit logs and archived emails (332 emails by search parameters)" line item, Pete withdrew item 5 (internal correspondence) from the request. The remaining scope was the contract, retention policy, audit logs, and written policies.

## What Was Produced

### Item 1 — Contract
- **Mitchell and Company signed quote (P_9113_Cameras, 5 pages)** dated 2025-07-08
- Total estimate: **$50,288** ($41,593 materials + $8,695 labor, 47 estimated hours)
- Signed by [[stefen-wynn|Stefen Wynn]], Town Administrator & Treasurer, on **2025-08-18**
- Deposit: $41,593
- 23 cameras across 5 sites: Town Hall (exterior and interior), Town Park, Wastewater Influent Building, Wastewater Main Building, Water Treatment Plant
- All cameras specified as "30 days retention"
- Five-year cloud camera licenses included

### Item 2 — Data retention policy
The clerk's letter states "Attached are the documents responsive to your request" and lists:
- Additional information contained within the Mitchell and Company quote
- 16 screenshots of individual camera configuration pages from the Verkada admin panel

The screenshots show each camera's settings page with "Max Retention Days: 30" as a device configuration value. No written data retention policy was produced.

### Item 3 — Access logs
Two Excel files totaling **57,460 rows** spanning **October 3, 2025 to March 26, 2026**:

- `Verkada_Audit Log_REDACTED.xlsx` — 32,338 rows, internal Verkada event format (message_code field like `LIVE_STREAM_START`, `VIDEO_HISTORY_M3U8`, `ARCHIVE_DOWNLOAD`)
- `VERKADA- Audit Logs_REDACTED.xlsx` — 25,122 rows, cleaner export format with parsed device names

Both exports include: event ID, event name, timestamp, user name, user email, camera/device name, site name.

Both exports redact: organizational ID, user ID, IP address, device ID, device serial number, MAC address. User names and email addresses are NOT redacted.

### Item 4 — Written policies, procedures, or guidelines
The clerk's letter says: "See screenshots referenced above under 'Data retention policy…'"

No written policy, procedure, or guideline was produced. The response points back to the same device configuration screenshots provided for item 2.

### Item 5 — Internal correspondence
Not produced. Withdrawn by requester after cost estimate.

## Redaction Rationale

From the clerk's response letter:

> "Device identifiers associated with the Town's security camera system have been redacted pursuant to C.R.S. § 24-72-204(2)(a), as disclosure would reveal internal security configurations and technical identifiers whose release could compromise the integrity and safety of public security infrastructure."

> "User IDs reflected in the audit logs have been redacted because they are system access identifiers tied to authentication and account management within the Town's security camera platform."

The letter claims the redactions protect against:
- Unauthorized access attempts
- Phishing, credential-stuffing, or social engineering attacks
- Revealing internal access controls and security monitoring practices
- Exposing personally identifying information of Town employees or contractors

The letter identifies what was disclosed:
- When security cameras were accessed
- What type of action occurred (e.g., viewing, export, system check)
- Which camera location or zone was involved (where appropriate)
- The role or classification of the user account (without exposing login identifiers)

## Notable Features of the Response

**User names and emails were not redacted, but internal user IDs were.** The claimed rationale for redaction is phishing and social engineering risk. Full names and email addresses are a larger attack surface for phishing than opaque internal UUIDs. See [[verkada-usage-patterns]] for analysis.

**There is no written policy.** The response produces camera device configuration pages and describes them as the retention policy. Item 4 was answered by pointing back to the same screenshots. The Town has no written document governing use, access, or retention of Verkada footage beyond manufacturer default settings.

**The "purpose" field from item 3 was not produced.** The original request asked for access logs showing "who viewed feeds, dates/times, **and purpose**." The exports produced show when and what but not the purpose metadata that Verkada associates with archived clips (archive names, labels, case numbers, notes). See [[march-20-community-room-archives]].

**The fee structure:** $167.90 was charged for 5 hours of staff time. The Excel exports are produced by Verkada's built-in "Export Audit Log" function. The PDF is largely screenshots of device admin pages.

**The Town's prior CORA record:** [[samira-vetter|Vetter]] is the same clerk and [[public-records-access|custodian of records]] subject to the judicial finding in the Brunner CORA case where Judge Steven Schultz found the Town "failed to exercise reasonable diligence or reasonable inquiry" and ordered the Town to pay legal costs.

## Users With Verkada Access (from User Management screenshot)

The response includes a screenshot of the Verkada user management page showing 11 users with access:

| Name | Email | Role | Groups |
|---|---|---|---|
| Derek Heiniger | derekh_ppw@townofpaonia.com | — | WTP and WWTP Only |
| Garrett Henderson | ghendersonppd@townofpaonia.com | — | All Sites |
| Jordan Redden | jordan_ppw@townofpaonia.com | — | WTP and WWTP Only |
| Kirk Hinderberger | kirk@mitchandco.com | **Organization Admin** | [SYSTEM - INTERNAL] |
| Matt Laiminger | mlaimingerppd@townofpaonia.com | **Organization Admin** | [SYSTEM - INTERNAL] |
| Nicki Poulos | nickip@townofpaonia.com | — | All Sites |
| Rodney Byrge | rodneyb_pw@townofpaonia.com | — | — |
| Ruben Santiago | rubens@townofpaonia.com | — | Town Hall Only |
| Samira Vetter | samirav@townofpaonia.com | — | Town Hall Only |
| Stefen Wynn | stefenw@townofpaonia.com | **Organization Admin** | [SYSTEM - INTERNAL] (+1) |
| Troy Martin | tmartin@peak2peakcommunications | — | All Sites |

Three Organization Admins: [[stefen-wynn|Wynn]], Police Chief Matt Laiminger, and Mitchell and Company contractor Kirk Hinderberger.

## Cameras Covered (23 total)

**Town Hall site (13 cameras):**
Bulk Fill Station, Shop Door, Shop Parking Lot, West Side Shop, Community Room, Front Desk, Grand Ave., TH North Alley, TH Parking Lot, TH Rear Door, TH South Alley, and additional devices per the Mitchell quote.

**Town Park site:**
Skate Park, Stage, SW Pavillion, TOP-PARK-CAM01, TOP-PARK-CAM02, TOP-PARK-CAM03.

**Wastewater Treatment Plant:**
WW Door, WW Lagoon.

**Water Treatment Plant:**
WTP Front, WTP Interior. Cloud Backup marked "Not Enabled" for both WTP cameras.

All cameras marked Max Retention Days: 30.

## Significance

This CORA response is the first public-record documentation of how the Town's Verkada system is actually being used since its October 2025 installation. It confirms several things the board's [[board-letter-2026-03-30|March 30 letter]] did not address:

1. **The Town has no written policy governing the surveillance system it spent $50,288 on.** The CORA response confirms this by producing manufacturer configuration screens in place of a policy.

2. **The cameras have been used heavily.** The 57,460 event rows across ~5 months document substantial day-to-day use of the system.

3. **Most activity comes from a two-person clerk's office and the police chief.** See [[verkada-usage-patterns]] for the user-level breakdown.

4. **Archives have been created.** The audit log shows Archive Action Taken events, meaning specific clips have been saved permanently beyond the 30-day retention window. The underlying archive metadata (labels, case numbers, notes) was not produced.

## See Also

- [[verkada-usage-patterns]] — Analysis of what the audit log reveals
- [[surveillance]] — Issue page
- [[verkada-10-things]] — Deep dive on Verkada product capabilities
- [[verkada-approval-process]] — Open question (partially answered by this CORA)
- [[march-20-community-room-archives]] — Open question raised by this CORA
- [[samira-vetter]]
- [[stefen-wynn]]
- [[ruben-santiago]]
- [[public-records-access]]
