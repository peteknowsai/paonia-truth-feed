# Email to Chief Laiminger — Facial Recognition Logs Follow-up

**To:** mlaimingerppd@townofpaonia.com
**From:** petefromsf@gmail.com
**Subject:** Following up on what we discussed Tuesday - the IDENTITY_LIST entries

---

Chief Laiminger,

Thanks for coming up to me after Tuesday's meeting. I appreciated it. I want to get this right, and if there is a benign explanation for what I have been seeing in the audit log, I would rather hear it from you than assume the worst.

The records I have been working from are the two Verkada audit log Excel files the Town produced in response to CORA C 26-09 (Verkada_Audit Log_REDACTED.xlsx and VERKADA- Audit Logs_REDACTED.xlsx). When I refer to "facial recognition logs," I am pointing to a specific event code in those files: `IDENTITY_LIST`.

`IDENTITY_LIST` is what Verkada Command writes to the audit log when the identified-people / People Analytics list is queried. There are 114 of these events in the produced log. Here is the breakdown by user:

| User | IDENTITY_LIST events | Span |
|---|---|---|
| Matt Laiminger | **100** | Oct 22, 2025 - Mar 16, 2026 (65 distinct calendar days) |
| Other users (combined) | 14 | Same window |

That is the source of the public claim that you checked the facial-recognition list many times. The number "100 events on 65 distinct calendar days, attributed to your account" is something I can pull directly from the file by filtering on `user_name = "Matt Laiminger"` and `message_code = "IDENTITY_LIST"`.

This matters because the Town Administrator's April 14 memorandum to the Board characterized these entries as "two isolated audit log entries... that appear to coincide with system installation and testing in October 2025." That description does not match what the file shows on your account. 100 events spread across five months, ending ten days before the CORA was filed, is not isolated October testing.

So the question I want to put to you directly: what do you understand the `IDENTITY_LIST` event to correspond to in your actual workflow?

Possibilities I have considered, and would like your read on:

1. **It is a passive UI artifact.** Opening a particular page in Verkada Command auto-loads the People Analytics list, and the event fires whether or not you intend to query face identities. If that is what is happening, can you tell me which page or workflow you were on when these fired?
2. **It is a feature you did not know was being recorded.** You were clicking through screens during normal operation and `IDENTITY_LIST` was being logged behind the scenes without you realizing the People Analytics database was being queried.
3. **It is something else I have not considered.** I would like to know what.

Three other items on your account that connect to face-related features. I am laying these out so you have the full picture:

- **The "Blurred Faces" tag on the Oct 23, 2025 archive.** You created two archives of TOP-HALL-CAM01 titled "Ballot Box Observation Footage" the morning after installation. The second archive's metadata includes `"tags":["Blurred Faces"]`. Verkada documents Selective Face Blur as automatic face detection followed by a blur filter (https://help.verkada.com/en/articles/9321844-selective-face-blur-for-archives). Did you intentionally apply that filter at export, or did it appear by default?

- **Audit log viewing on March 25 and 26, 2026.** Of the 16 total audit log view events in the entire 6-month log, 11 are on your account, all on those two days. The first one fired within a couple of hours of the CORA C 26-09 request being formally received by the Clerk. I am not assuming any particular intent here, but the timing is striking enough that I would like to understand it from your perspective.

- **The CSV export and Verkada Support access on March 26.** Around 12:33 PM MDT on March 26, your account triggered an `AUDIT_LOG_EXPORT_CSV` event and then a `SUPPORT_ACCESS` event granting Verkada Support one-day access to the Town's account with `video_access: False`. Was that support call about the audit log itself? About the CORA? Something unrelated?

**What I am asking for.**

If you can spare 20-30 minutes, I would rather sit down in person and walk through the spreadsheet together than do this by email. I can come to the station any morning this week or next, or wherever else is convenient. If a meeting is not in the cards, written answers to the questions above would also help.

I am attaching both audit log files so you are working from the same data I am. Specifically:

- For the 100 IDENTITY_LIST events: open `Verkada_Audit Log_REDACTED.xlsx`, filter `user_name = "Matt Laiminger"` and `message_code = "IDENTITY_LIST"`, sort by `created_at`. The 65 distinct calendar days are visible at a glance.
- For the Blurred Faces tag: filter on `message_code = "ARCHIVE_START"`, find the Oct 23 entries on your account, look at the `details` JSON column.
- For the audit log views: filter on `message_code` containing `AUDIT_LOG`. There are 16 rows total.

I want to thank you again for approaching me directly. That is the kind of conversation that has been missing from this whole thing, and I would like to keep it going.

Best,
Pete McCarthy
119½ Dorris Avenue
Paonia, CO 81428
(415) 623-9773
petefromsf@gmail.com

---

## Notes for Pete

**The IDENTITY_LIST count is the centerpiece.** This is the specific number that contradicts the Wynn memo's "two isolated entries" characterization. The wiki page documenting this is `wiki/analysis/wynn-memo-vs-audit-log.md`, with the supporting source page at `wiki/sources/wynn-verkada-memo-2026-04-14.md`.

**Attachments to send:**
1. `raw/documents/cora-responses/Verkada_Audit Log_REDACTED.xlsx`
2. `raw/documents/cora-responses/VERKADA- Audit Logs_REDACTED.xlsx`

He is an Org Admin, so he already has access to live data in Verkada Command. The attachments are a courtesy to make sure both of you are looking at exactly the same rows.

**What you might learn from his response.**

- If he says the IDENTITY_LIST events are a passive UI artifact (auto-loaded when he visits a People page), that is testable. The exact page he names should still be a People Analytics surface in Verkada Command. It does not change the underlying fact - that the People Analytics list was queried 100 times - but it would clarify that it was navigation, not intentional face-matching.
- If he says he never opens any People page in Command, then the 100 events on his account require a different explanation.
- If he stops responding once he sees the numbers, that itself is signal.

**On the audit-log-viewing and CSV-export questions.** You can let him answer or not. They are inflammatory questions to him personally. If you want to keep this conversation friendly and focused on the facial-recognition piece, you could trim the second-to-last and third-to-last bullets and save them for a separate conversation later.

**Public site link (optional).** If you want to share the public analysis instead of attaching files, the relevant pages are:
- https://paoniatruth.site/articles/wynn-memo-vs-audit-log
- https://paoniatruth.site/articles/facial-recognition-proof
