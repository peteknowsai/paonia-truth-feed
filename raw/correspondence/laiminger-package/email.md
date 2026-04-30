# Email to Chief Laiminger — Facial Recognition Logs

**To:** mlaimingerppd@townofpaonia.com
**From:** petefromsf@gmail.com
**Subject:** Following up on Tuesday - the IDENTITY_LIST entries in the Verkada audit log

---

Chief Laiminger,

Thanks again for coming up to me after Tuesday's meeting. I have been wanting a conversation like that for a while, and I want to give you everything I have so you can investigate this from your side and we can sort out what is actually going on. I am not trying to score points here. If there is a benign explanation I have missed, I would much rather know it.

**The records I have been working from**

Two Verkada audit log Excel files the Town produced in response to my CORA C 26-09:

- `Verkada_Audit Log_REDACTED.xlsx` (32,338 rows, internal Verkada format)
- `VERKADA- Audit Logs_REDACTED.xlsx` (25,122 rows, cleaner export)

You should have access to the equivalent live data in Verkada Command as one of three Org Admins on the account, and I am attaching trimmed CSVs below so we are working from the exact same rows.

**The specific event I have been calling "facial recognition logs"**

The Verkada event code is `IDENTITY_LIST`. This is what Verkada Command writes to the audit log when the identified-people / People Analytics list is queried. Across the produced log, the breakdown by user is:

| User | IDENTITY_LIST events | Distinct calendar days |
|---|---|---|
| Matt Laiminger | 100 | 65 |
| Ruben Santiago | 8 | (October only) |
| Troy Martin | 3 | (October only) |
| Derek Heiniger | 3 | (October only) |
| **Total** | **114** | |

The 100 events on your account span **October 22, 2025 through March 16, 2026** — the first day the cameras were live through ten days before the CORA was filed. The other three users' IDENTITY_LIST events are clustered in October, which is consistent with installation activity. Yours are not — they continue all the way through March.

That is the source of the public claim that "the Police Chief checked the facial recognition list many times." It is not based on inference or interpretation — it is just the count of `IDENTITY_LIST` rows on your account in the file the Town produced. I have attached `identity-list-events.csv` (all 114 events, all users, sorted by time) and `laiminger-identity-list-distinct-dates.csv` (the 65 distinct dates with per-day counts) so you can see exactly what I am looking at.

**The question I want to put to you**

What does `IDENTITY_LIST` correspond to in your day-to-day workflow in Verkada Command? Three possibilities I have considered:

1. **It is a passive UI artifact.** Opening a particular page in Verkada Command auto-loads the People Analytics list, and the event fires whether or not you intend to query face identities. If that is what is happening, knowing which page or workflow triggers it would clear most of this up.
2. **It is being logged behind a feature you did not realize you were touching.** You were navigating Command for normal operational reasons and the People Analytics list was being queried as a side effect.
3. **It is something else I have not considered.** Genuinely open to hearing what.

If you can find out from Verkada Support what UI action triggers the `IDENTITY_LIST` event, that would be enormously helpful. You are an Org Admin on the account, so a support ticket from your end would carry more weight than one from me. If it would help, I am happy to draft the question for you to send.

**One related entry on your account I should mention**

On October 23, 2025, you created two archives of TOP-HALL-CAM01 titled "Ballot Box Observation Footage." The first archive's metadata field has empty tags. The second has `"tags":["Blurred Faces"]`. Verkada documents Selective Face Blur as automatic face detection followed by a blur filter (https://help.verkada.com/en/articles/9321844-selective-face-blur-for-archives). The presence of that tag is what I have cited as evidence that the system performed face detection on Town footage.

Two possible questions there, if you remember:

- Did you intentionally apply the "Blurred Faces" filter when you exported the second archive, or did it appear as a default option?
- At the time, did you understand that Verkada was performing face detection on the footage in order to produce the blur?

I have attached `laiminger-archives.csv` with all five `ARCHIVE_START` events on your account (the two ballot box archives, P25-0852, the January juvenile incident, and P26-0222 in March) so you have the complete picture.

**What I would like from you**

If a 30-minute conversation works better than email, I will come to wherever is convenient — the station, Town Hall, anywhere else. I would rather walk through the spreadsheet together than do this in writing. Mornings are better for me but I can flex.

If a meeting is not in the cards right now, written answers to whatever you can answer would still help. Even a partial answer ("I never opened the People Analytics page intentionally" or "I always did `X` and that may be what is firing") would let me update what I am saying publicly.

**Public analysis you should know about**

Two pages on paoniatruth.site walk through the full analysis I am working from. I am sharing them so you can see the public version of what I have been saying:

- https://paoniatruth.site/articles/wynn-memo-vs-audit-log — the rebuttal to Stefen's April 14 memorandum, with the full IDENTITY_LIST count breakdown
- https://paoniatruth.site/articles/facial-recognition-proof — the broader fact-check on the March 30 board letter

If you tell me the IDENTITY_LIST events have a benign explanation that I have not considered, I will update those pages and add your explanation alongside the data.

**Files I am attaching to this email**

1. `identity-list-events.csv` — all 114 IDENTITY_LIST events across all users (about 7 KB)
2. `laiminger-identity-list-distinct-dates.csv` — the 65 distinct calendar days with per-day counts
3. `laiminger-archives.csv` — all 5 of your ARCHIVE_START events, including the Oct 23 entries

If you want the raw CORA response files (the two full XLSXs and the cover letter PDF), say the word and I will attach those too. They are already in the Town's possession but I want to make it easy.

Thanks again for approaching me. This is the kind of conversation that has been missing from the whole thing, and I would like to keep it going.

Best,
Pete McCarthy
119½ Dorris Avenue
Paonia, CO 81428
(415) 623-9773
petefromsf@gmail.com
