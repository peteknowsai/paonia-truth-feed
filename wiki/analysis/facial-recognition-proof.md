---
title: Facial Recognition Is Enabled on the Town's Verkada System
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, facial-recognition, cameras, fact-check]
sources: [cora-c26-09-verkada-audit-logs, final-published-letter, verkada-10-things, verkada-usage-patterns]
---

# Facial Recognition Is Enabled on the Town's Verkada System

## The Claim Being Tested

On March 30, 2026, the Paonia Board of Trustees published an official letter on the Town website, signed by all seven trustees, stating:

> "**These are not face recognition, or private property surveillance apparatus.** Instead they are a tool used routinely across the country in cities and towns to monitor and protect the public use of publicly provided spaces."

Source: [[final-published-letter|Final Published "Letter to Town of Paonia Citizens" (2026-03-30)]]

## What Verkada Says About Its Own "People Analytics" Product

Verkada's own product blog and help center explicitly describe People Analytics as face-based identification. The following quotes are directly from Verkada's public documentation.

From Verkada's Person of Interest Notifications announcement (publicly accessible at https://www.verkada.com/blog/person-of-interest-notifications/):

> **"Person of Interest Notifications deliver real-time alerts when a specific individual is detected onsite… The feature works by matching the face detected in frame with an existing image from the organization or an uploaded photo."**

> "Once the person's face is detected, users receive a notification via email or SMS with an image and a link to review associated footage… users can track additional movement across their Verkada cameras."

From Verkada's People Analytics product announcement (https://www.verkada.com/blog/introducing-people-analytics/):

> "People Analytics builds on those tools by combining intelligent edge-based video processing with computer vision in the cloud to give users high-quality images of all individuals identified in the scene… Users can also click on the Face Search tab to see thumbnails of people seen in frame. Clicking on a thumbnail finds all matches for that face, sorted by date."

From Verkada's help center article on creating a Person of Interest (https://help.verkada.com/verkada-cameras/analytics/people-analytics/create-a-person-of-interest):

> The Persons of Interest photo upload "should clearly show the face of only one person (close up), in JPG or PNG format… less than 15 MB."

Verkada's own help documentation further specifies that the matching algorithm uses "the distance between someone's eyes, ears, nose, and mouth to identify unique individuals" — the classic face-geometry biometric signature.

Independent corroboration comes from the surveillance industry publication IPVM, which published a report titled ["Verkada False And Manipulative Facial Recognition Strategy"](https://ipvm.com/reports/verkada-not-fr). IPVM's reporting documents that Verkada deliberately markets the feature as "People Analytics" to municipalities that have banned "facial recognition," while shipping the same face-matching technology under the marketed name. This is a direct third-party confirmation that People Analytics is facial recognition by any functional definition.

## What the Town's Audit Log Shows

On October 22, 2025 — the very first day the cameras were installed — [[ruben-santiago|Assistant Town Clerk Ruben Santiago]] logged into the Verkada admin panel and performed a specific sequence of actions that configured the facial recognition and related surveillance infrastructure. Every one of those actions is recorded in the audit log produced in response to [[cora-c26-09-verkada-audit-logs|CORA C 26-09]].

### Evidence 1: The Face Identity database was queried

| Event code | Count | What it means |
|---|---|---|
| `IDENTITY_PEOPLE_LIST_BULK_GET` | **6** | Bulk retrieval of the face identification database |

`IDENTITY_PEOPLE_LIST_BULK_GET` is the Verkada event code logged when a user queries the identified-people database. This database stores face signatures of individuals whose faces have been captured by the cameras and indexed by Verkada's People Analytics system. A user retrieving this list is a facial-recognition operation.

### Evidence 2: A People Analytics Dashboard was created

| Event code | User | What it means |
|---|---|---|
| `ANALYTICS_DASHBOARD_CREATED` | Ruben Santiago | Created an Analytics Dashboard named "Ruben's Dashboard" |
| `ANALYTICS_DASHBOARD_MODIFIED` | Ruben Santiago | Updated the dashboard configuration |

Verkada's Analytics Dashboard is the product interface for People Analytics. It presents the facial recognition results, person match history, Face Search results, and attribute filters (clothing color, apparent sex, backpack detection). The dashboard does not exist until a user creates it. "Ruben's Dashboard" exists because Ruben Santiago manually created it on installation day.

### Evidence 3: Automated Alert Rules with filter IDs were configured

| Event code | Count | What it means |
|---|---|---|
| `ALERT_RULE_CREATED` | 1 | A new alert rule was defined |
| `ALERT_RULE_UPDATED` | 2 | Alert rules were modified |

The alert rule created on installation day contains a `filter_id` field referencing a stored filter configuration. Verkada's Alert Rules can be configured to fire when a known Person of Interest is detected, when specific attributes appear in frame, or when other People Analytics conditions are met. The presence of configured alert rules with filter IDs is evidence of active People Analytics automation.

### Evidence 4: The "Blurred Faces" filter was used on an archive

On October 23, 2025 (the day after installation), Police Chief Matt Laiminger created two archives of a camera labeled "TOP-HALL-CAM01" titled "Ballot Box Observation Footage." The details field of the second archive includes:

```
{"filter_type":"4~1af7d81c","label":"Ballot Box Observation Footage",
 "public":false,"tags":["Blurred Faces"]}
```

The `"Blurred Faces"` tag is a Verkada feature documented at https://help.verkada.com/en/articles/9321844-selective-face-blur-for-archives. The feature automatically detects faces in footage and applies a blur filter to them. Verkada also announced the capability at https://www.verkada.com/blog/announcing-live-face-blur/.

**Selective face blurring requires face detection.** You cannot selectively blur faces you haven't first detected. The presence of the "Blurred Faces" tag on an archive the Town created confirms that facial detection is active on the system.

### Evidence 5: Verkada also sells a separate license plate tracking system, and the Town has that configured too

In addition to the facial recognition infrastructure above, the audit log contains:

| Event code | Count | What it means |
|---|---|---|
| `LPOI_LIST` | **4** | List of License Plates of Interest queries |

LPOI stands for **License Plate of Interest** (documented at https://help.verkada.com/en/articles/5482979-license-plate-of-interest-alerts). This is Verkada's automatic license plate reader (ALPR) feature, a separate product from People Analytics. Enrolling a license plate generates automatic alerts when the plate is detected on any camera with ALPR enabled.

The Town's Verkada account has BOTH facial recognition AND automatic license plate reader functionality configured and in active use. These are two separate surveillance systems, not one.

## The Plain-English Interpretation

**Verkada's People Analytics is facial recognition.** Verkada's own product documentation says so explicitly. The feature "works by matching the face detected in frame with an existing image." It requires uploading "a photo that clearly shows the face of only one person." It uses the geometric measurements of a person's face to identify them. An independent surveillance industry publication has documented that Verkada brands the feature as "People Analytics" specifically to sell it to jurisdictions that have banned "facial recognition."

**On October 22, 2025, the Town of Paonia's Assistant Town Clerk manually configured this system.** He queried the face identity database. He created an Analytics Dashboard named after himself. He configured Alert Rules with filter IDs. The next day, the Police Chief created an archive using the "Blurred Faces" feature, which requires face detection to function.

**The Town also has Automatic License Plate Reader (ALPR) enabled.** This is a separate surveillance system. The audit log shows four queries to the License Plates of Interest list, which is Verkada's license plate tracking feature. The Town is running two surveillance systems in parallel: facial recognition AND license plate recognition.

**The board's March 30 statement that these cameras "are not face recognition, or private property surveillance apparatus" is contradicted by three independent sources:**

1. Verkada's own public product documentation describing People Analytics as face-matching technology
2. The specific audit log event types that only exist when the facial recognition features are configured and queried
3. Independent surveillance industry reporting that explicitly identifies Verkada's People Analytics as facial recognition

## Open Question the Town Has Not Answered

**Who is currently enrolled in the Town's Persons of Interest list, and what is the stated justification for each enrolled person?**

The audit log proves that a People Analytics system is configured and has been queried. It does not reveal who is enrolled. The enrollment data is stored in Verkada Command's admin interface, separate from the audit log. To answer this question, the Town must produce:

- The current People Analytics / Persons of Interest enrollment list
- For each enrolled person: the uploaded photo, the date of enrollment, the enrolling user, any notes or case references, and any alert rules tied to the enrollment
- The written policy under which enrollment decisions are made (or confirmation that no such policy exists)

This is the subject of a pending follow-up CORA request. See [[march-20-community-room-archives]] for related open questions.

## What Would Change This Analysis

- If Verkada updated its product documentation to state that People Analytics is not facial recognition. (Verkada has not, and its own documentation explicitly describes the feature as face-matching.)
- If the Town produced evidence that the specific audit log events (`IDENTITY_PEOPLE_LIST_BULK_GET`, `ANALYTICS_DASHBOARD_CREATED`, `ALERT_RULE_CREATED` with filter IDs, `Blurred Faces` tag) do not correspond to active facial recognition features. (They do, per Verkada's documented feature set.)
- If the Town produced evidence that the People Analytics dashboard and Persons of Interest infrastructure were subsequently disabled after creation. (No such event appears in the audit log.)

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[verkada-10-things]] — Verkada product capabilities documentation
- [[verkada-usage-patterns]] — Full usage analysis
- [[cameras-always-on-not-motion]] — The other false claim in the same letter
- [[final-published-letter]] — The board letter being fact-checked
- [[surveillance]] — Issue overview

## External Sources Cited

- Verkada, "Person of Interest Notifications": https://www.verkada.com/blog/person-of-interest-notifications/
- Verkada, "Introducing People Analytics": https://www.verkada.com/blog/introducing-people-analytics/
- Verkada, "Create a Person of Interest": https://help.verkada.com/verkada-cameras/analytics/people-analytics/create-a-person-of-interest
- Verkada, "Selective Face Blur for Archives": https://help.verkada.com/en/articles/9321844-selective-face-blur-for-archives
- Verkada, "Announcing Live Face Blur": https://www.verkada.com/blog/announcing-live-face-blur/
- Verkada, "License Plate of Interest Alerts": https://help.verkada.com/en/articles/5482979-license-plate-of-interest-alerts
- IPVM, "Verkada False And Manipulative Facial Recognition Strategy": https://ipvm.com/reports/verkada-not-fr
