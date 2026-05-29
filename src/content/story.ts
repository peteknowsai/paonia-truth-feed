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
    "Over roughly two years, the Town of Paonia's appointed administrator consolidated financial and administrative power. Four people who raised concerns — an elected trustee, a planning commissioner, the public works director, and the deputy treasurer — were removed, resigned, or fired. In the same stretch the Town stood up a $50,288 cloud-surveillance system with no public comment, rejected four citizen ballot initiatives, and answered records requests with redactions a judge had already called bad faith.",
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
    topic: "The Pattern",
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
    title: "Four Rejections and a Five-Day Response",
    dek:
      "Four citizen initiatives rejected on shifting legal theories — while a single flyer drew a special meeting within five days.",
    summary:
      "Across two subjects, the Clerk rejected four citizen ballot initiatives, each recycling the objection that the measure was “administrative, not legislative” — the last rejection carrying a copy-paste error that named the wrong initiative. Meanwhile a citizen's March 2026 flyer, “10 Things Paonia Should Know About Its Town Administrator” (“All facts from public records”), drew a special meeting within five days, where the Mayor's report called it “libelous” and proposed taxpayer-funded newspaper ads. A side-by-side analysis found the Board disputed none of the flyer's underlying cited facts. A petition for judicial review of the rejections has been drafted.",
    image: "/img/story/initiatives.png",
    imageAlt: "A citizen flyer stapled to a public bulletin board.",
    pageSlugs: ["initiative-process", "what-the-board-did-not-dispute", "ten-things-flyer", "2026-03-30-special-meeting"],
  },
];

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
