import { getPageBySlug } from "@/lib/wiki";

/* ============================================================
   Editorial curation layer.
   This file is the ONLY place the narrative is authored. It
   references wiki slugs; the wiki itself is never modified.
   Every factual claim here is sourced to a linked wiki page.
   ============================================================ */

/** Flipped to true once the editorial illustrations exist under
 *  /public/img/story/. Until then, components render styled
 *  fallback blocks instead of broken <img> tags. */
export const imagesReady = true;

export interface ProofLink {
  slug: string;
  title: string;
  route: string;
}

/** Resolve a wiki slug to a live { title, route } from the build-time
 *  cache. Analysis pages use the richer /articles/[slug] template.
 *  Returns null if the slug isn't in the wiki (link is then omitted). */
export function proofLink(slug: string, fallbackTitle?: string): ProofLink | null {
  const page = getPageBySlug(slug);
  if (!page) {
    return fallbackTitle ? { slug, title: fallbackTitle, route: `/wiki` } : null;
  }
  const route =
    page.directory === "analysis" ? `/articles/${page.slug}` : page.route;
  return { slug: page.slug, title: page.title, route };
}

export interface Thread {
  id: string;
  topic: string;
  title: string;
  dek: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  pageSlugs: string[];
}

export interface TimelineEntry {
  date: string; // YYYY-MM-DD or YYYY or YYYY-MM
  label: string;
  slug?: string;
}

export interface CastMember {
  name: string;
  role: string;
  relevance: string;
  slug: string;
}

export interface Channel {
  label: string;
  href: string;
}

/* ---------------- HERO ---------------- */
export const hero = {
  eyebrow: "The Story So Far",
  headline: "Who Runs Paonia — and Who Answers For It",
  dek:
    "Over roughly two years, the Town of Paonia's appointed administrator consolidated financial and administrative power. Four people who raised concerns — an elected trustee, a planning commissioner, the public works director, and the deputy treasurer — were removed, resigned, or fired. In the same stretch the Town stood up a $50,288 cloud-surveillance system with no public comment, rejected four citizen ballot initiatives, and met records requests with whole-column redactions and mislabeled files — from a Town a judge had already found to have acted in CORA bad faith.",
  image: "/img/story/hero.png",
  imageAlt:
    "Illustration of the Paonia town hall under a wide Colorado sky, in a warm newsprint style.",
};

/* ---------------- THREADS ---------------- */
export const threads: Thread[] = [
  {
    id: "administrator",
    topic: "The Administrator",
    title: "One Person Held the Money and the Management",
    dek:
      "One official was both Administrator and Treasurer — hired after a unanimous Florida firing. His contract is now not being renewed.",
    summary:
      "Stefen Wynn was appointed Town Administrator and Town Treasurer in July 2023, six months after Neptune Beach, Florida unanimously fired him for “flagrant neglect of duty” and “willful misconduct.” He prepared the budget and drew a salary split across four funds. In early May 2026 the Board paused his reappointment for 30 days; a May 19 finance memo titled “Town Administrator terms of nonrenewal” projects his pay running through mid-July 2026. A May 22 special meeting took up an interim appointment and the search for a permanent replacement.",
    image: "/img/story/administrator.png",
    imageAlt: "An empty town administrator's desk and chair under a town seal.",
    pageSlugs: ["stefen-wynn", "admin-search", "who-controls-the-money"],
  },
  {
    id: "retaliation",
    topic: "Retaliation",
    title: "What Happens to People Who Ask Questions",
    dek:
      "Four people in four different roles raised concerns. Each was removed, resigned, or terminated.",
    summary:
      "Bill Brunner, elected trustee in April 2024 with 67.7% of the vote, began exercising oversight and was removed 4–1 in August 2024 after Wynn submitted a resignation contingent on Brunner's removal. Planning commissioner Pete McCarthy filed a formal complaint in November 2024 and got zero replies, then resigned. Public Works Director Cory Heiniger resigned with accusations the Board did not investigate. Deputy Treasurer Kaja Bowman asked the Mayor about the complaint process in September 2025; the Mayor disclosed her name to Wynn, and Bowman was terminated 23 days later.",
    image: "/img/story/retaliation.png",
    imageAlt: "Four chairs around a table, one tipped over and removed.",
    pageSlugs: ["retaliation-pattern", "board-oversight", "bill-brunner", "kaja-bowman"],
  },
  {
    id: "surveillance",
    topic: "Surveillance",
    title: "Cameras Nobody Voted For",
    dek:
      "A $50,288 Verkada cloud-camera system, approved with zero public comment and no written policy — with facial-recognition capability the Board denied.",
    summary:
      "The Board approved a 23-camera Verkada system unanimously in August 2025 with no public comment and no surveillance policy. Audit logs the Town later produced show the two-person clerk's office generated 53% of all camera activity, including 1,670 live-stream views of the Community Room where public meetings are held — concentrated on weekends and after hours. The Board's response called the cameras “not nefarious face recognition,” but Verkada's own product documentation lists facial recognition and photo-based person search as standard features. No written policy governs use, access, or retention.",
    image: "/img/story/surveillance.png",
    imageAlt: "A surveillance camera mounted above a public meeting room.",
    pageSlugs: ["surveillance", "verkada-usage-patterns", "verkada-10-things"],
  },
  {
    id: "records",
    topic: "Public Records",
    title: "The Door That Won't Open",
    dek:
      "A documented pattern of records obstruction — against a Town a judge had already found to have acted in CORA bad faith.",
    summary:
      "A Delta County district judge found in the Brunner case that the Town “failed to exercise reasonable diligence or reasonable inquiry” and ordered it to pay his legal costs. In 2024 the Clerk denied a request for Microsoft 365 audit logs as “not in the Town's custody”; the Colorado Freedom of Information Coalition later confirmed the denial was improper, but the records were never produced and have aged out of retention. Three 2026 records responses show a repeating method: redact the substantive column, withhold records as nonexistent, deliver a mislabeled file, and cap exports at the system's row limit.",
    image: "/img/story/records.png",
    imageAlt: "A stack of public documents with heavy black redaction bars.",
    pageSlugs: ["public-records-access", "pattern-of-cora-obstruction", "samira-vetter"],
  },
  {
    id: "initiatives",
    topic: "Initiatives & the Flyer",
    title: "Four Initiatives Stalled. One Flyer Got a Special Meeting.",
    dek:
      "Four citizen initiatives rejected on shifting legal theories — while a single flyer drew a special meeting within five days.",
    summary:
      "Across two subjects, the Clerk rejected four citizen ballot initiatives, each recycling the objection that the measure was “administrative, not legislative” — the last rejection carrying a copy-paste error that named the wrong initiative. Meanwhile a citizen's March 2026 flyer, “10 Things Paonia Should Know About Its Town Administrator” (“All facts from public records”), drew a special meeting within five days, where the Mayor's report called it “libelous” and proposed taxpayer-funded newspaper ads. A side-by-side analysis found the Board disputed none of the flyer's underlying cited sources — every disagreement was over interpretation or characterization, not the documented record. A petition for judicial review of the rejections has been drafted.",
    image: "/img/story/initiatives.png",
    imageAlt: "A citizen flyer stapled to a public bulletin board.",
    pageSlugs: ["initiative-process", "what-the-board-did-not-dispute", "ten-things-flyer", "2026-03-30-special-meeting"],
  },
];

/* ---------------- HOMEPAGE DECK ----------------
   The single-screen click-through. A featured lead (the Administrator,
   the root cause) + six named "attacks" + a recall capstone that hands
   off to the campaign site. People tiles use monogram initials, never a
   face. Every claim is sourced to the linked wiki pages. */

export interface DeckTile {
  id: string;
  kind: "featured" | "person" | "issue" | "recall";
  topic: string;
  title: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  monogram?: string;
  pageSlugs: string[];
  storyHref: string;
  external?: boolean;
  cta?: string;
}

export const deckTiles: DeckTile[] = [
  {
    id: "smith",
    kind: "featured",
    topic: "The Mayor",
    title: "The Case Against Mayor Smith",
    summary:
      "The recall now circulating is aimed at one official: Mayor Paige Smith — not for a single bad decision, but for a pattern the Town's own records document. She took a Deputy Treasurer's name to the Administrator the day the employee asked about the complaint process; that employee was fired 23 days later. She brought the charges and prosecuted the removal of the trustee voters elected with 67.7%. She wrote the official Town letter — which the Board voted to publish — branding a resident's sourced facts “libelous,” the same letter that told residents the cameras were “motion activated,” which the Town's own records prove false. The Board has not corrected any of it, because the Board is part of it. The voters can.",
    image: "/img/story/smith.png",
    imageAlt: "An empty mayor's chair and gavel at a town council dais.",
    pageSlugs: ["the-case-against-mayor-smith", "mayor-smith", "retaliation-pattern"],
    storyHref: "/articles/the-case-against-mayor-smith",
  },
  {
    id: "brunner",
    kind: "issue",
    topic: "The Trustee",
    title: "They Removed the Trustee You Elected",
    summary:
      "Voters elected Bill Brunner to the Board in April 2024 with 67.7% of the vote. He started doing what oversight requires — asking questions, filing records requests, pushing for answers. Months later, Administrator Stefen Wynn submitted a resignation he would withdraw only if Brunner were removed, and Mayor Paige Smith brought the charges and personally prosecuted the removal. On a 4–1 vote, the Board undid the choice voters had just made. Brunner is suing over it.",
    image: "/img/story/brunner.png",
    imageAlt: "An empty chair pulled back from a council table, a tipped-over nameplate.",
    pageSlugs: ["bill-brunner", "the-brunner-standard", "retaliation-pattern"],
    storyHref: "/story#retaliation",
  },
  {
    id: "bowman",
    kind: "issue",
    topic: "The Deputy Treasurer",
    title: "She Asked One Question. 23 Days Later, Fired.",
    summary:
      "In September 2025, Deputy Treasurer Kaja Bowman went to Mayor Paige Smith on behalf of several employees and asked whether there was a process for raising a concern about the Town Administrator and HR. She had not filed a complaint — she was asking how. The same day, the Mayor took the question to the Administrator and named her. Twenty-three days later, Bowman was terminated “without cause,” and the Town has never explained the basis. The Public Works Director, Cory Heiniger, had already resigned quietly, with accusations the Board did not investigate.",
    image: "/img/story/bowman.png",
    imageAlt: "A cleared-out desk with a box of belongings and an empty office chair.",
    pageSlugs: ["kaja-bowman", "retaliation-pattern", "cory-heiniger"],
    storyHref: "/story#retaliation",
  },
  {
    id: "mccarthy",
    kind: "issue",
    topic: "The Complaint",
    title: "They Called the Public Record “Libel”",
    summary:
      "Planning commissioner Pete McCarthy filed a formal written complaint laying out this pattern in November 2024. It drew zero replies; he resigned. In March 2026 he handed out a flyer citing the Town's own budgets, court records, and published news coverage. Mayor Paige Smith wrote the Town's official response — which branded it “erroneous and libelous” without disputing a single source it cited — brought it to the Board, and voted to publish it. She also proposed spending public money on newspaper ads to answer the flyer; the Board ultimately backed away from them. The flyer drew a special meeting in five days. The complaint drew silence.",
    image: "/img/story/mccarthy.png",
    imageAlt: "A formal complaint letter left unopened on an official's empty desk.",
    pageSlugs: ["board-oversight", "what-the-board-did-not-dispute", "ten-things-flyer", "2026-03-30-special-meeting"],
    storyHref: "/story#retaliation",
  },
  {
    id: "initiatives",
    kind: "issue",
    topic: "Ballot Initiatives",
    title: "Four Ballot Measures, Four Rejections",
    summary:
      "Across two subjects, the Clerk rejected four citizen ballot initiatives, each recycling the objection that the measure was “administrative, not legislative” — the last rejection carrying a copy-paste error that named the wrong initiative. A petition asking a Delta County court to review the rejections has been drafted. The question it raises is simple: when a clerk can keep redefining what counts as “legislative,” what is left of the citizen's right to petition?",
    image: "/img/story/initiatives.png",
    imageAlt: "A citizen flyer stapled to a public bulletin board.",
    pageSlugs: ["initiative-process", "what-the-board-did-not-dispute"],
    storyHref: "/story#initiatives",
  },
  {
    id: "records",
    kind: "issue",
    topic: "Public Records",
    title: "The Records They Won't Hand Over",
    summary:
      "A Delta County district judge found in the Brunner case that the Town “failed to exercise reasonable diligence or reasonable inquiry” and ordered it to pay his legal costs — a judicial finding of CORA bad faith. In 2024 the Clerk denied a request for Microsoft 365 audit logs as “not in the Town's custody”; the Colorado Freedom of Information Coalition later confirmed the denial was improper, but the records were never produced and have aged out of retention. Three 2026 records responses show a repeating method: redact the column that matters, withhold records as nonexistent, deliver a mislabeled file, and cap exports at the system's row limit.",
    image: "/img/story/records.png",
    imageAlt: "A stack of public documents with heavy black redaction bars.",
    pageSlugs: ["public-records-access", "pattern-of-cora-obstruction", "samira-vetter"],
    storyHref: "/story#records",
  },
  {
    id: "cameras",
    kind: "issue",
    topic: "Surveillance",
    title: "The Town Put False Claims About the Cameras in Writing",
    summary:
      "On March 30, 2026, all seven trustees signed an official “Letter to Town of Paonia Citizens,” still on the Town website, calling the Verkada cameras “motion activated” and “not face recognition, or private property surveillance apparatus.” Both are false — and the proof is in the Town's own records: Verkada's documentation says the cameras record continuously, “unaffected by motion”; the signed $50,288 contract specifies 30-day continuous retention on every camera; the audit log shows 21,245 live-stream views in six months. The Administrator who coordinated the letter had signed that contract, held the highest permission in the system, and queried the audit log four days before it published. Shown the proof, the Town has refused to correct it.",
    image: "/img/story/surveillance.png",
    imageAlt: "A surveillance camera mounted above a public meeting room.",
    pageSlugs: ["cameras-always-on-not-motion", "facial-recognition-proof", "final-published-letter", "wynn-knowledge-of-cameras"],
    storyHref: "/story#surveillance",
  },
];

/** The capstone: the deck builds the case, this hands off to the recall
 *  campaign on the separate Transparent Towns site (townofpaonia.co). */
export const recall: DeckTile = {
  id: "recall",
  kind: "recall",
  topic: "What You Can Do",
  title: "The Board Can't Fix This. The Voters Can.",
  summary:
    "You cannot vote out an appointed administrator — but you can recall the elected Mayor who used the power of her office against the residents who questioned him. Paige Smith exposed an employee's name for asking a question, prosecuted the removal of the trustee voters elected, and branded residents' sourced criticism “libelous.” A recall is the most direct tool residents have when the people in office stop answering to them — and it belongs to the voters, not the Board.",
  pageSlugs: [],
  storyHref: "https://townofpaonia.co/recall",
  external: true,
  cta: "Read the case for recall →",
};

/* ---------------- TIMELINE ---------------- */
/* Anchored at Wynn's July 2023 appointment (~22 months to May 2026),
   with the 2007-2012 embezzlement kept as framing context. */
export const timeline: TimelineEntry[] = [
  { date: "2007", label: "~$480K embezzled by one Town employee under concentrated authority", slug: "citation-sheet" },
  { date: "2023-01-17", label: "Neptune Beach, FL fires Wynn unanimously for “neglect of duty”", slug: "neptune-beach-case" },
  { date: "2023-07-11", label: "Paonia appoints Wynn as both Town Administrator and Treasurer", slug: "stefen-wynn" },
  { date: "2024-04", label: "Bill Brunner elected trustee with 67.7% of the vote", slug: "bill-brunner" },
  { date: "2024-08-15", label: "Board removes Brunner 4–1 after Wynn's conditional resignation", slug: "retaliation-pattern" },
  { date: "2024-09-30", label: "Clerk denies Microsoft 365 audit-log request as “not in custody”", slug: "public-records-access" },
  { date: "2024-11-18", label: "McCarthy files a formal complaint to all trustees; zero replies", slug: "board-oversight" },
  { date: "2024-12-02", label: "McCarthy resigns from the Planning Commission", slug: "board-oversight" },
  { date: "2025-08-12", label: "Board approves the Verkada camera system; zero public comment", slug: "surveillance" },
  { date: "2025-10-09", label: "Deputy Treasurer Bowman terminated, 23 days after her inquiry", slug: "kaja-bowman" },
  { date: "2025-10-22", label: "Verkada cameras installed across Town facilities", slug: "surveillance" },
  { date: "2026-03-25", label: "Citizen distributes the “10 Things” flyer", slug: "ten-things-flyer" },
  { date: "2026-03-30", label: "Special meeting; Mayor's report calls the flyer “libelous”", slug: "what-the-board-did-not-dispute" },
  { date: "2026-04-27", label: "Fourth citizen initiative rejected on a new legal theory", slug: "initiative-process" },
  { date: "2026-05-22", label: "Special meeting on Wynn's nonrenewal and the replacement search", slug: "admin-search" },
];

/* ---------------- CAST ---------------- */
export const cast: CastMember[] = [
  { name: "Stefen Wynn", role: "Town Administrator & Treasurer", relevance: "Held both roles; fired in Florida; contract not being renewed", slug: "stefen-wynn" },
  { name: "Samira Vetter", role: "Town Clerk · Custodian of Records", relevance: "Rejected four initiatives; central to the records-obstruction pattern", slug: "samira-vetter" },
  { name: "Paige Smith", role: "Mayor", relevance: "Prosecuted the Brunner removal; disclosed Bowman's name; called the flyer “libelous”", slug: "mayor-smith" },
  { name: "Bill Brunner", role: "Trustee (removed)", relevance: "Elected with 67.7%, removed 4–1 after Wynn's resignation ultimatum", slug: "bill-brunner" },
  { name: "Kaja Bowman", role: "Deputy Treasurer (former)", relevance: "Terminated 23 days after asking about the complaint process", slug: "kaja-bowman" },
  { name: "Cory Heiniger", role: "Public Works Director (former)", relevance: "Resigned with accusations against Wynn; the Board did not investigate", slug: "cory-heiniger" },
  { name: "Lucy Hunter", role: "Trustee", relevance: "Only trustee to reply to the complaint; posted a counter-flyer", slug: "lucy-hunter" },
  { name: "Ruben Santiago", role: "Assistant Town Clerk", relevance: "Largest camera user; 1,670 views of the public meeting room", slug: "ruben-santiago" },
];

/* ---------------- CHANNEL NAV ---------------- */
export const channels: Channel[] = [
  { label: "The Story", href: "/story" },
  { label: "The Administrator", href: "/wiki/issues/admin-search" },
  { label: "Retaliation", href: "/wiki/issues/retaliation-pattern" },
  { label: "Surveillance", href: "/wiki/issues/surveillance" },
  { label: "Public Records", href: "/wiki/issues/public-records-access" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Timeline", href: "/timeline" },
];
