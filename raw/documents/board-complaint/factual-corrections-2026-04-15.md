**From:** Pete McCarthy, 119 1/2 Dorris Ave, Paonia, CO 81428
**Date:** April 15, 2026
**To:** Paonia Board of Trustees
**CC:** Samira Vetter, Town Clerk; Clayton Buchner, Town Attorney

**Re: Factual Corrections to the Administrator's April 14, 2026 Memorandum on the Verkada Security Camera System**

---

I have reviewed Town Administrator Wynn's memorandum presented at the April 14, 2026 regular meeting. The following statements in that memorandum are not supported by the CORA C 26-09 audit log the Town itself produced on April 8, 2026. I am submitting these corrections to the public record.

## 1. "Two isolated audit log entries out of 32,339 separate log entries, referencing a 'person_of_interests_id' appear to coincide with system installation and testing in October 2025."

The audit log contains, at minimum, the following event rows directly related to People Analytics, facial-recognition infrastructure, and Persons of Interest:

| Event code | Count | Notes |
|---|---|---|
| `IDENTITY_LIST` | 114 | Queries of the face identity database |
| `IDENTITY_PEOPLE_LIST_BULK_GET` | 6 | Bulk retrieval of the face identification database |
| `LPOI_LIST` | 4 | License Plate of Interest list queries |
| `ANALYTICS_DASHBOARD_CREATED` | 1 | Created on 2025-10-23 |
| `ANALYTICS_DASHBOARD_MODIFIED` | 1 | Renamed to "Ruben's Dashboard" on 2025-10-23 |
| `ALERT_RULE_CREATED` | 1 | Rule ID 73fe69a5-99cd-4eba-9089-6f13b0cf0e3c |
| `ALERT_RULE_UPDATED` | 2 | Configured as "Crowd Out Front" with SMS, email, and push notifications enabled 24/7 |
| `ARCHIVE_START` with tag `"Blurred Faces"` | 1 | 2025-10-23, user account Matt Laiminger, label "Ballot Box Observation Footage" |

Total: 130 events, not two. Source: `Verkada_Audit Log_REDACTED.xlsx`, column `message_code`.

## 2. "Testing in October 2025"

Of the 114 `IDENTITY_LIST` events, 100 are logged under the user account of Police Chief Matt Laiminger and span **65 distinct calendar days from October 22, 2025 through March 16, 2026** — ten days before the CORA request was received. This is a sustained 5-month access pattern, not an October testing window.

## 3. "Administrator verification conducted on April 14, 2026, confirmed that these features were disabled."

The memorandum describes the system's state on April 14, 2026. It does not state that the features were never enabled. It does not state when the features were first enabled or when they were last disabled. It does not address whether the features were enabled between October 22, 2025 and March 26, 2026, the period covered by the produced log.

The CORA response did not include audit log data from March 27, 2026 onward, so any feature-state change during that interval is not visible to the public from the records produced to date.

## 4. The "Blurred Faces" archive

Per Verkada's public documentation (help.verkada.com/en/articles/9321844-selective-face-blur-for-archives), the Blurred Faces feature operates by detecting faces in footage and applying a blur filter. The presence of this tag on a saved archive from October 23, 2025 is inconsistent with the memorandum's statement that only basic people-detection functionality has ever been active.

## 5. Redaction rationale

The memorandum states redactions were limited to "MAC addresses, IP addresses, device identification numbers, and serial numbers." The produced audit log also redacts internal Verkada user IDs (opaque UUIDs) while leaving full user names and email addresses in plain text. If the stated concern is phishing and social-engineering risk, the names and email addresses are a larger attack surface than opaque UUIDs. The narrow-tailoring claim is not supported by the pattern of what was redacted and what was not.

---

## Requested Board Actions

1. Request from the Administrator a written, dated response specifying: (a) whether the People Analytics and related facial-recognition features were ever enabled on the Town's Verkada organization; (b) if so, when they were enabled and when they were disabled; (c) the audit log event code corresponding to each such change.

2. Direct the Clerk to produce the audit log from March 27, 2026 to the present, together with a timestamped, unredacted screenshot of every facial-recognition-related toggle in the Verkada Feature Manager as it exists today.

3. Address, on the record, whether the March 30, 2026 "Letter to Town of Paonia Citizens" statement that "These are not face recognition, or private property surveillance apparatus" was accurate at the time it was published.

Respectfully,

Pete McCarthy
119 1/2 Dorris Ave
Paonia, CO 81428
petefromsf@gmail.com

---

**Attachments available on request:**
1. CSV extract of the 130 events tabulated above with timestamps and user names.
2. Verkada help-center documentation for each cited feature.
3. Chronological table of the 100 `IDENTITY_LIST` events logged under Chief Laiminger's account, by date.
