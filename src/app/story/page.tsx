import Link from "next/link";
import type { Metadata } from "next";
import { proofLink, threads, timeline } from "@/content/story";
import { ThreadImage, StoryTimeline } from "@/components/editorial";

export const metadata: Metadata = {
  title: "The Story of Paonia — Who Runs the Town, and Who Answers For It",
  description:
    "How power concentrated in Paonia's town government over two years — the administrator, the removals, the cameras, the records fights, and the citizen pushback. Fully sourced.",
};

/** Resolve a slug to a route for inline citations. */
function href(slug: string): string {
  return proofLink(slug)?.route ?? "/wiki";
}
function thread(id: string) {
  return threads.find((t) => t.id === id)!;
}

function SectionHead({
  num,
  topic,
  id,
  title,
  imageId,
}: {
  num: string;
  topic: string;
  id: string;
  title: string;
  imageId: string;
}) {
  const t = thread(imageId);
  return (
    <header id={id} style={{ scrollMarginTop: "1.5rem", marginTop: "3.5rem" }}>
      <div style={{ margin: "0 0 1.5rem" }}>
        <ThreadImage src={t.image} alt={t.imageAlt} label={topic} aspect="16 / 7" />
      </div>
      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
        <span style={{ color: "var(--muted)" }}>{num}</span>&nbsp;&nbsp;{topic}
      </p>
      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)", lineHeight: 1.12, letterSpacing: "-0.01em", margin: "0 0 1.1rem", textWrap: "balance" }}>
        {title}
      </h2>
    </header>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display"
      style={{ fontWeight: 500, fontStyle: "italic", fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", lineHeight: 1.3, color: "var(--civic)", borderLeft: "3px solid var(--accent)", paddingLeft: "1.25rem", margin: "2rem 0" }}
    >
      {children}
    </p>
  );
}

export default function StoryPage() {
  return (
    <article className="shell-narrow" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
      {/* ===== Masthead ===== */}
      <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>The Story So Far</p>
      <h1 className="font-display" style={{ fontWeight: 560, fontSize: "clamp(2.3rem, 6vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: "0 0 1.5rem", textWrap: "balance" }}>
        Who Runs Paonia — and Who Answers For It
      </h1>
      <p style={{ fontFamily: "var(--serif-display)", fontWeight: 400, fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 1rem" }}>
        Over roughly two years, one appointed official came to hold both the
        management and the money of a small Colorado town — and the people who
        questioned how it was being used did not last long. Here is the whole
        story, in order, with the record behind every line.
      </p>
      <hr className="rule" />

      {/* ===== Prologue ===== */}
      <p>
        Paonia is a small town on Colorado&apos;s Western Slope, the kind of place
        where the same few hundred people decide everything at meetings most
        residents never attend. That intimacy is why a single fact still hangs
        over its town hall:{" "}
        <Link href={href("citation-sheet")}>
          between 2007 and 2012 a Town employee embezzled roughly $480,000
        </Link>{" "}
        — a theft made possible by concentrating financial control in one set of
        hands. Paonia has seen what happens when one person holds too much of the
        machinery. That memory frames everything that follows.
      </p>

      {/* ===== 1. Administrator ===== */}
      <SectionHead num="01" topic="The Administrator" id="administrator" title="A Manager With a Past, and Two Jobs at Once" imageId="administrator" />
      <p>
        In July 2023, the Board appointed{" "}
        <Link href={href("stefen-wynn")}>Stefen Wynn</Link> as Town Administrator{" "}
        <em>and</em> Town Treasurer — the operations job and the money job, in one
        person. Six months earlier, the city of Neptune Beach, Florida had fired
        him unanimously, citing &ldquo;flagrant neglect of duty&rdquo; and
        &ldquo;willful misconduct.&rdquo;
      </p>
      <p>
        In Paonia the role only grew. Wynn prepared the Town&apos;s budget, and his
        salary was split across four separate funds — administration, water,
        sewer, and trash — a sign of how many distinct jobs one title had come to
        carry. To residents who remembered the embezzlement years, the design was
        the problem: the person spending the money was also the person reporting
        on it.
      </p>
      <Pull>The person spending the money was also the person reporting on it.</Pull>
      <p>
        By May 2026 the arrangement was unwinding. The Board paused Wynn&apos;s
        reappointment for thirty days; a May 19 finance memo, titled
        &ldquo;Town Administrator terms of nonrenewal,&rdquo; projected his
        compensation running through mid-July at a remaining cost of roughly
        $88,000. On May 22 the Board met in special session to weigh an interim
        appointment and{" "}
        <Link href={href("admin-search")}>how to run the search for a successor</Link>.
      </p>

      {/* ===== 2. Retaliation ===== */}
      <SectionHead num="02" topic="The Pattern" id="retaliation" title="What Happened to the People Who Asked" imageId="retaliation" />
      <p>
        The clearest way to understand the last two years is to follow four people
        who, in four different roles, raised concerns — and what happened to each.
      </p>
      <p>
        <Link href={href("bill-brunner")}>Bill Brunner</Link> was elected a
        trustee in April 2024 with 67.7% of the vote and began doing what
        oversight requires: asking questions. In August 2024, after Wynn submitted
        a resignation made contingent on Brunner&apos;s removal, the Board removed
        Brunner on a 4&ndash;1 vote. He is suing over it.
      </p>
      <p>
        Pete McCarthy, a planning commissioner, filed a formal written complaint
        to all trustees in November 2024 and received{" "}
        <Link href={href("board-oversight")}>no replies</Link>; he resigned weeks
        later, again to silence. Cory Heiniger, the Public Works Director,
        resigned with accusations against Wynn that the Board did not investigate.
        And <Link href={href("kaja-bowman")}>Kaja Bowman</Link>, the Deputy
        Treasurer, asked the Mayor in September 2025 how the complaint process
        worked; the Mayor relayed her name to Wynn, and Bowman was terminated 23
        days later.
      </p>
      <Pull>Four people. Four roles. One pattern.</Pull>
      <p>
        Each case has its own explanation, offered by the Town. Read together, as
        the{" "}
        <Link href={href("retaliation-pattern")}>record lays them side by side</Link>,
        they describe a consistent outcome: raise a concern about the
        administrator, and your time in town government ends.
      </p>

      {/* ===== 3. Surveillance ===== */}
      <SectionHead num="03" topic="Surveillance" id="surveillance" title="Cameras Nobody Voted For" imageId="surveillance" />
      <p>
        In August 2025 the Board approved a 23-camera{" "}
        <Link href={href("surveillance")}>Verkada cloud-surveillance system</Link>{" "}
        — unanimously, with zero public comment, and no written policy governing
        how it would be used. The quote, signed by Wynn, was $50,288. The cameras
        went up that October.
      </p>
      <p>
        Then the logs arrived. Audit data the Town produced under a records
        request shows the two-person clerk&apos;s office generated{" "}
        <Link href={href("verkada-usage-patterns")}>
          53% of all camera activity
        </Link>
        , including 1,670 live-stream views of the Community Room — the room where
        public meetings are held — clustered on weekends and outside office hours.
      </p>
      <p>
        Asked about privacy, the Board&apos;s response called the system &ldquo;not
        nefarious face recognition.&rdquo; But Verkada&apos;s own product
        documentation lists facial recognition and photo-based person search as
        standard features. There is still no policy on who may watch, what is
        kept, or for how long.
      </p>

      {/* ===== 4. Records ===== */}
      <SectionHead num="04" topic="Public Records" id="records" title="The Door That Won't Open" imageId="records" />
      <p>
        None of this would be knowable if the records flowed freely. They do not.
        In the Brunner litigation, a Delta County district judge found the Town
        had &ldquo;failed to exercise reasonable diligence or reasonable
        inquiry&rdquo; and ordered it to pay Brunner&apos;s legal costs — a
        judicial finding of bad faith under Colorado&apos;s open-records law.
      </p>
      <p>
        The pattern continued. In 2024 the Clerk denied a request for the
        Town&apos;s Microsoft 365 audit logs as &ldquo;not in the Town&apos;s
        custody&rdquo;; the Colorado Freedom of Information Coalition later
        confirmed the denial was improper. The records were never produced and
        have since aged out of their retention window. By 2026, three separate
        records responses showed{" "}
        <Link href={href("pattern-of-cora-obstruction")}>a repeating method</Link>
        : redact the column that matters, withhold records as nonexistent, hand
        over a mislabeled file, and cap the export at the system&apos;s row limit.
      </p>

      {/* ===== 5. Initiatives & Flyer ===== */}
      <SectionHead num="05" topic="Initiatives & the Flyer" id="initiatives" title="Four Rejections and a Five-Day Response" imageId="initiatives" />
      <p>
        When residents tried to legislate directly, the door closed there too.
        Across two subjects — short-term rentals and surveillance — the Clerk
        rejected{" "}
        <Link href={href("initiative-process")}>
          four citizen ballot initiatives
        </Link>
        , each recycling the objection that the measure was
        &ldquo;administrative, not legislative.&rdquo; The fourth rejection
        carried a copy-paste error that named the wrong initiative.
      </p>
      <p>
        The contrast in tempo is the tell. A citizen&apos;s March 2026 flyer —{" "}
        <Link href={href("ten-things-flyer")}>
          &ldquo;10 Things Paonia Should Know About Its Town Administrator&rdquo;
        </Link>
        , captioned &ldquo;All facts from public records&rdquo; — drew a special
        meeting within five days, where the Mayor&apos;s report called it
        &ldquo;libelous&rdquo; and floated taxpayer-funded newspaper ads in
        response. The Board voted to publish its rebuttal. Yet a careful{" "}
        <Link href={href("what-the-board-did-not-dispute")}>
          side-by-side review
        </Link>{" "}
        found the Board disputed none of the flyer&apos;s underlying, cited facts.
      </p>
      <p>
        A petition asking a Delta County court to review the initiative rejections
        has been drafted. The legal question it raises is simple: when a clerk can
        keep redefining what counts as &ldquo;legislative,&rdquo; what is left of
        the citizen&apos;s right to petition?
      </p>

      {/* ===== Epilogue ===== */}
      <SectionHead num="06" topic="What Comes Next" id="next" title="A Different Kind of Search" imageId="administrator" />
      <p>
        The nonrenewal is not the end of the story so much as its hinge. The Town
        now has to hire its most powerful unelected official again — and how it
        runs that search is itself a choice. A{" "}
        <Link href={href("admin-search")}>citizen proposal</Link> argues for the
        opposite of how Paonia got here: hire local, run the search in public, put
        residents on the committee, and consider splitting the administrator and
        treasurer roles so that no one person holds both the management and the
        money again.
      </p>

      <hr className="rule" />

      {/* ===== The record ===== */}
      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.6rem", margin: "0 0 1rem" }}>
        The record behind this
      </h2>
      <p>
        Every factual claim above is drawn from public records, public meetings,
        and published documents, and links to the sourced page in the wiki. The
        timeline below is the short version; the{" "}
        <Link href="/timeline">complete timeline</Link> and the{" "}
        <Link href="/wiki">full record</Link> hold the rest.
      </p>

      <div style={{ marginTop: "2rem", background: "var(--paper-card)", border: "1px solid var(--rule)", padding: "1.75rem 1.75rem 1.25rem" }}>
        <p className="section-label">The Record, In Order</p>
        <StoryTimeline entries={timeline} />
      </div>
    </article>
  );
}
