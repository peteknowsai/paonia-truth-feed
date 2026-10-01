/* Content for /stefen-wynn — every finding cites numbered sources below.
   Videos are rendered by video/wynn (render.py + audio.py) and hosted at MEDIA. */

export const MEDIA = process.env.NEXT_PUBLIC_WYNN_MEDIA ?? "/media/wynn";

export type WynnVideo = { slug: string; title: string; blurb: string };

export const videos: WynnVideo[] = [
  {
    slug: "first-time-today",
    title: "First Time Today",
    blurb: "Neptune Beach fired him. A Florida judge has now ruled against his lawsuit over it.",
  },
  {
    slug: "quit-unless",
    title: "Quit Unless",
    blurb: "He offered to resign unless an elected trustee was removed. Two weeks later, the trustee was.",
  },
  {
    slug: "free-speech",
    title: "Free Speech Is Not a Crime",
    blurb: "Four times, in two towns, he took critics to the police. Four times, no crime.",
  },
  {
    slug: "ask-a-question",
    title: "Ask a Question",
    blurb: "An employee asked how to raise a concern about him. She was fired 23 days later.",
  },
];

export type Source = { title: string; href: string };

/** Numbered bibliography. Findings cite these by 1-based index. */
export const sources: Source[] = [
  {
    title: "Wynn v. City of Neptune Beach, No. 16-2023-CA-008801 (Fla. 4th Jud. Cir.), Order Granting Defendant's Amended Motion for Summary Judgment, Oct. 1, 2026",
    href: `${MEDIA}/docs/wynn-v-neptune-beach-order-2026-10-01.pdf`,
  },
  {
    title: "News4Jax, “Neptune Beach city manager fired citing ‘flagrant neglect of duty’ & ‘willful misconduct’,” Jan. 18, 2023",
    href: "https://www.news4jax.com/news/local/2023/01/18/neptune-beach-city-manager-fired-citing-flagrant-neglect-of-duty-willful-misconduct/",
  },
  {
    title: "City of Neptune Beach, Amended Motion for Summary Judgment and record evidence, May 25, 2026",
    href: "/wiki/sources/neptune-beach-msj-2026",
  },
  {
    title: "Delta County Independent, “Departing Paonia administrator’s harassment claims meet pushback from accused residents,” June 30, 2026",
    href: "https://www.deltacountyindependent.com/free_access/departing-paonia-administrators-harassment-claims-meet-pushback-from-accused-residents-a-contested-termination-plays-its/article_9e26939b-d7fa-40e6-a441-1e5558d5731d.html",
  },
  {
    title: "Paonia Police Department records P26-0191, P26-0289, P26-0323 (CCJRA production, June 4, 2026)",
    href: "/wiki/sources/ccjra-pd-records-2026-06-04",
  },
  {
    title: "Paonia Police Department emails, including Wynn’s Mar. 28, 2026 protection-order request (CCJRA production, June 18, 2026)",
    href: "/wiki/sources/ccjra-nokings-rally-2026-06-18",
  },
  {
    title: "What the Police Found: Unfounded (analysis of the produced police and CORA records)",
    href: "/wiki/analysis/what-the-police-found",
  },
  {
    title: "Brunner removal hearing and vote, Paonia Board of Trustees, Aug. 13–15, 2024",
    href: "/wiki/events/2024-08-15-brunner-removal",
  },
  {
    title: "Letter to the Paonia Board of Trustees, Mar. 30, 2026 (Wynn’s Aug. 1, 2024 conditional resignation and 2024 emails)",
    href: "/wiki/sources/board-letter-2026-03-30",
  },
  {
    title: "New Focus HR contract and sole-source exchange, Town of Paonia board packet, June 10, 2025",
    href: "/wiki/sources/newfocushr-hr-contract",
  },
  {
    title: "An HR Contract Without a Bid, and a Handbook No One Has Seen (disbursement registers and staff reports, June 2025–May 2026)",
    href: "/wiki/analysis/hr-contract-without-a-bid",
  },
  {
    title: "Town of Paonia Microsoft 365 audit logs (CORA C 26-12 cure production and C 26-35)",
    href: "/wiki/sources/cora-c26-12-cure-response",
  },
  {
    title: "She Asked One Question. 23 Days Later, Fired.",
    href: "/wiki/analysis/fired-for-asking",
  },
  {
    title: "Town finance memo “Town Administrator terms of nonrenewal,” May 19, 2026",
    href: "/wiki/sources/admin-search-special-meeting-2026-05-22",
  },
];

export type Finding = { id: string; heading: string; body: string[] };

/** Body paragraphs may contain [n] markers, rendered as links to source n. */
export const findings: Finding[] = [
  {
    id: "neptune-beach",
    heading: "His last city fired him, and a judge just threw out his lawsuit over it.",
    body: [
      "On January 17, 2023, the Neptune Beach, Florida city council voted unanimously to fire Wynn as city manager for “Flagrant Neglect of Duty” and “Willful Misconduct.” [1][2] He sued, claiming he was a whistleblower. On October 1, 2026, Judge Robert M. Dees granted the city summary judgment, finding that none of his claimed disclosures was protected and that he had not shown the city’s reason for firing him was a pretext. [1]",
      "The order’s undisputed facts: in June 2022 Wynn picked the color of a 29-foot water tank (“Green in color is good”) and received its site plan and dimensions. In December, after residents objected to “the big green monster,” he wrote the council, “The first time that I had seen the site plan for the Publix was today.” [1] The city attorney testified: “Mr. Wynn told us to our faces that he didn’t know anything about the tank, and when it was shown that he picked the color, that was proven to be a lie.” [1]",
      "When his new community development director gathered tank records for a public records request, Wynn “came into Ms. Whitmore’s office, closed the door” and told her to run anything she found by him “so that he could decide whether it was okay to send.” [1] The court found “Mr. Wynn’s problems with his finance department and with Councilor Key were of his own making.” [1]",
    ],
  },
  {
    id: "ultimatum",
    heading: "He made his job contingent on removing an elected official.",
    body: [
      "Paonia voters elected Bill Brunner trustee in April 2024 with 67.7% of the vote. On August 1, 2024, Wynn submitted a conditional resignation: he would withdraw it if Brunner was removed. [8][9] Two weeks later the Board removed Brunner 4–1 on charges of “harassment and abuse of position.” No specific incident was documented publicly, and a witness testified that the harassment ran the other way. [8]",
    ],
  },
  {
    id: "police",
    heading: "He takes his critics to the police. The police keep finding free speech.",
    body: [
      "In Neptune Beach, Wynn told the police chief a city councilor and her police-commander husband had “committed a felony.” The husband was not in the room, and it would not have been a felony anyway. The city attorney concluded Wynn “had wrongfully accused Councilor Key.” He signed an apology, then testified the letter he signed was not accurate. [1]",
      "In Paonia in 2026 he took residents’ political speech to the police three times. March 12: a Facebook post, logged as information only. April 21: two voicemails, one of which said “maybe you should fix the potholes on Third Street first. Have a great day.” The officer found it “free speech as governed by the 1st Amendment” and closed it unfounded. May 8: a formal criminal complaint over a post reading “86 WYNN,” asking for harassment, witness-intimidation, and retaliation charges. Closed unfounded: Wynn was “not a victim or a witness to a crime.” [5][7]",
      "Of roughly ten people who commented on that post, his complaint named one: his critic’s partner, whose comment read “We have a lovely town, so let’s have lovely people working to protect it.” [7] On March 28 he asked the police chief how to begin “seeking a protection order” against a critic “and his accomplices” over a flyer. [6] Two days earlier he had told the Board and the chief that his next-door neighbor was behind posters that his own later police statement attributed to someone else; the record shows no correction. [7]",
      "Four times, in two towns, he took critics to the police. Four times, no crime.",
    ],
  },
  {
    id: "harassment-claims",
    heading: "His harassment claims did not hold up.",
    body: [
      "Announcing his exit in May 2026, Wynn blamed “an escalating pattern of harassment.” The Delta County School District investigated his complaint involving a student and found no harassment. The police chief reported no active investigations involving the family he accused. The newspaper reported that all of his complaints against his leading critic “concern public comments and protests.” [4]",
    ],
  },
  {
    id: "fired-for-asking",
    heading: "He fired the employee who asked how to complain about him.",
    body: [
      "On September 16, 2025, Deputy Treasurer Kaja Bowman asked the mayor how staff could raise a concern about the town administrator. The mayor gave Wynn her name that day. She was fired “without cause” on October 9. [13][4] Wynn told the newspaper the HR consultant advised him “to either start documenting issues to terminate with cause or to skip the documentation process and terminate without cause,” and “We just terminated without cause so she could get unemployment.” [4]",
    ],
  },
  {
    id: "hr-firm",
    heading: "He brought in an out-of-state HR firm without a bid.",
    body: [
      "In June 2025 the Board approved a contract with New Focus HR of Noblesville, Indiana, with no competitive bid, at $175 an hour with no cap, under Indiana law. The vendor signed on May 23; the town’s sole-source questions went out five days later, and the vendor answered them itself. [10][11] The vendor’s May 23 email to Wynn: “Stefen, I hope that you are enjoying your time in Indy?… Thanks so much for reaching out.” [10] The town paid the full $7,500 for an employee handbook its staff reports called complete in October 2025; through May 2026 it had not come to the Board. [11]",
    ],
  },
  {
    id: "turnover",
    heading: "Staff kept leaving.",
    body: [
      "At least seven Town staff left in the year from June 2025: both public works directors resigned, the deputy treasurer and her only direct report were fired within about six weeks of each other, two public works employees were fired, and a police officer resigned. [12][4] The first public works director wrote that he was “being excluded from critical budgetary decisions… facing allegations of insubordination… lack of support at the administrative level.” [4]",
    ],
  },
  {
    id: "planning-commission",
    heading: "He went after a planning commissioner who asked questions.",
    body: [
      "In fall 2024 Wynn forwarded a planning commissioner’s private emails to every trustee and commissioner with hostile commentary on at least three occasions, called the commissioner’s work “a waste of Town resources,” and wrote, “I will not attend the December 2, 2024 meeting unless required to by the Board of Trustees.” [9]",
    ],
  },
  {
    id: "exit",
    heading: "He left before his contract was up.",
    body: [
      "After the Board moved toward nonrenewal in May 2026, Wynn stopped working in late June and used accrued leave through his July 12 end date. Trustee Calla Rose Ostrander said the arrangement “was not agreed to, and was not our understanding.” [4][14]",
    ],
  },
];
