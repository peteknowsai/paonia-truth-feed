I filed three Colorado Open Records Act requests. The Town fulfilled all three. Here is what they gave me.

---

**Request 1 — The Verkada cameras ($167.90 and five weeks later).**

I asked for the access logs for every camera the Town installed in 2025: who viewed what, when, and why. I got 57,460 rows of audit data with the "why" field empty and every user ID, IP address, device ID, and serial number redacted as a "security arrangement." The Town Administrator and the Police Chief and a vendor contractor all have Organization Admin on that system. Most of the activity is the Town Clerk and a small handful of people watching Town Hall.

They charged me for 5 hours of staff time on an export that was one click of a button.

---

**Request 2 — The emails that set up the special meeting about me.**

On March 30 the Board held a special meeting specifically about my flyer. They produced a group letter calling my reporting "libelous." They walked it back overnight.

I filed a CORA for every email, text, and Teams message between the Mayor, the Town Administrator, the Town Attorney, and any Trustee during the six days leading up to that meeting. I asked for every draft of the letter. I asked for every piece of legal advice about the word "libelous."

They waited the full 15 working days. Here is the entire production:

1. My own email to the Board.
2. The Mayor forwarding my email to the Town Administrator, 8 minutes later.
3. Lucy Hunter telling the Mayor on March 26 that the flyer was hers and that she asked Stefen Wynn to review it for accuracy.
4. Lucy Hunter's individual-capacity reply to me on March 30.

That is it. Four emails. Two of them are my own.

No emails scheduling the special meeting. Colorado law requires 24-hour written notice for a special meeting. Someone scheduled it. Someone posted the notice. Someone wrote the agenda. Zero emails.

No drafts of the letter. Seven elected officials signed a joint statement calling a citizen's reporting defamatory. Nobody circulated a draft by email. Nobody traded edits. Nobody sent a "thoughts?" message.

No replies from any trustee besides Lucy. Not Rick. Not Walter. Not Mike. Not Karen. Not Hector. Not the Mayor. For six days, about a special meeting that was about me, about a letter that called my reporting libelous, they produced no internal communication between them at all.

All legal advice from the Town Attorney — withheld. Attorney-client privilege. No privilege log. No description of what was withheld. Just "that is not a public record" and a statutory citation.

Either those records exist and were withheld, or the Board coordinated a special meeting and a joint public letter about a named citizen without writing a single thing down, or they are using personal phones and private channels to avoid records law.

Pick one. All three are disqualifying.

---

**Request 3 — The Microsoft 365 audit log.**

The M365 unified audit log is the system-generated record of every email sent and received by every Town account. It can corroborate or contradict what the Town claims in a communications CORA. It is the one thing the Clerk cannot selectively produce.

I asked for a complete export, all available retained dates. I got six Excel files. Here is what is wrong with them:

**1. The file labeled "March 2026" is a duplicate of the April 2026 file.** I verified this by matching record IDs. The two files contain the same 50,000 rows, spanning April 1 through April 9. The actual March 2026 audit log data was not delivered.

March 2026 is the month the special meeting happened. The month the "libelous" letter was drafted, circulated, revised, and published. The month whose data would independently show whether the four emails in Request 2 are the whole story.

That is the month that was replaced with a duplicate of a different month.

**2. Every monthly file is capped at exactly 50,000 rows.** That is not a coincidence. It is the Microsoft Purview web-portal export cap. A PowerShell or API export has no such cap. A full month of a Town tenant with 70+ accounts generates more than 50,000 events. The Town Clerk alone generated 25,812 events in November 2025. The 50,000-row files are the first 50,000 events the UI will give you and then it stops.

They called that "complete."

**3. The AuditData column is 100% redacted on every row of every file.** In the Microsoft audit log, the AuditData column is the only column that contains what actually happened. Subject lines. Recipients. The specific emails read. The IP address. The client app. Without it, you get "Stefen Wynn accessed mail at 9:47 PM." You do not get "Stefen Wynn opened an email from the Mayor with the subject 'draft of letter about Pete' at 9:47 PM." They redacted the second kind of information. On every single one of the roughly 300,000 rows they produced.

The statutory basis is the "security arrangements" exception. It is meant for specific details whose disclosure would compromise security — not for column-wide blanket redaction of the substance of every audit event.

**4. The April file stops at April 9.** They pulled the data the day the request came in and never refreshed it. The response was dated April 22. The actual export was 13 days stale before they sent it.

**5. The earliest record is November 1, 2025.** The Town's audit retention is 180 days. The response was dated April 22. One hundred eighty days before April 22 is October 25. Five days of late-October 2025 data that should still be in the system was not produced.

**6. The Town is on Microsoft's 180-day retention tier.** That is the shortest retention Microsoft sells. When I asked for the same records in September 2024, the Clerk denied the request citing a statute that CFOIC confirmed in writing was not a valid basis for denial. Those records have now aged out. They are gone forever. That is a choice the Town made.

---

**Put it together.**

The communications CORA was implausibly thin, so I would need the M365 audit log to verify it independently. The month of the audit log that would test it is the one month they replaced with a duplicate. The other months they produced are capped at the UI limit and have the substantive column redacted on every row. The Town's own audit retention is the Microsoft minimum, so anything older than six months is gone.

None of these outcomes is an accident by itself. Together they are a system. The purpose of CORA is to let a citizen verify what their government did. Each of these tactics removes a specific pillar of verifiability. They stack.

This is not a clerk making mistakes. This is a town that has been sued for CORA bad faith before — Judge Steven Schultz ruled against them in the Brunner case and ordered them to pay legal costs — and they have not changed their practices since.

I am filing complaints with the Colorado Freedom of Information Coalition on both responses. I am demanding a privilege log on every attorney-client withholding. I am refiling a targeted M365 request for the exact events they should have produced for the March 25–30 window, with AuditData included. If that is denied or redacted the same way, the next step is the 14-day pre-suit notice under C.R.S. 24-72-204(5) and then district court.

I want to be clear about what this means. A town that stonewalls records requests is a town that has things to hide. A board that coordinates a special meeting about a citizen and produces zero emails about it is a board that knows their communications would not survive daylight. A clerk who delivers a duplicate of April and calls it March is a clerk whose office is not acting in good faith.

You are paying for this. The cameras cost $50,288. The staff time charged to me on the Verkada CORA was $167.90 for an export that was one click. The extensions they take on 30-minute reports run out the clock on every request. The redactions are applied at column scale so no one reviewer in the Clerk's office had to think about any single event.

This is what obstruction looks like when it is not loud. It is quiet. It is a duplicate file. It is a column of `[REDACTED]`. It is four emails where there should be forty. It is attorney-client privilege with no privilege log. It is the minimum retention tier.

Every one of these things is a receipt. I am keeping all of them. So should you.

Full documentation with links to the actual files is at:
https://paoniatruth.site/articles/pattern-of-cora-obstruction

Pete McCarthy
