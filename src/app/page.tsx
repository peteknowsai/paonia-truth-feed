import Link from "next/link";
import {
  getInitiativePages,
  getActionPages,
  getStoryPages,
  getPage,
} from "@/lib/wiki";
import { hero, threads, timeline, cast } from "@/content/story";
import {
  ThreadImage,
  ThreadCard,
  StoryTimeline,
  CastGrid,
} from "@/components/editorial";
import GemVote from "@/components/GemVote";
import InitiativeVoting from "@/components/InitiativeVoting";

function countDiscrepancies(content: string): number {
  return (content.match(/\n## /g) || []).length;
}

const sectionStyle: React.CSSProperties = {
  paddingTop: "3.25rem",
  paddingBottom: "0.5rem",
  borderTop: "1px solid var(--rule)",
  marginTop: "3.25rem",
};

export default function HomePage() {
  const initiatives = getInitiativePages();
  const actions = getActionPages();
  const stories = getStoryPages().slice(0, 8);
  const discrepanciesPage = getPage("analysis", "discrepancies-register");
  const discrepancyCount = discrepanciesPage
    ? countDiscrepancies(discrepanciesPage.content)
    : 0;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
        <div
          className="shell hero-grid"
          style={{
            paddingTop: "3rem",
            paddingBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>{hero.eyebrow}</p>
            <h1
              className="font-display"
              style={{
                fontWeight: 560,
                fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                margin: "0 0 1.25rem",
                textWrap: "balance",
              }}
            >
              {hero.headline}
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 1.75rem" }}>
              {hero.dek}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1rem", alignItems: "center" }}>
              <Link
                href="/story"
                className="font-display"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  padding: "0.7rem 1.35rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Read the full story →
              </Link>
              <Link href="#timeline" className="font-display" style={{ fontWeight: 600 }}>
                Jump to the timeline
              </Link>
            </div>
          </div>
          <div>
            <ThreadImage src={hero.image} alt={hero.imageAlt} label="Paonia, Colorado" aspect="4 / 3" />
          </div>
        </div>
      </section>

      {/* discrepancies hook */}
      {discrepancyCount > 0 && (
        <div style={{ background: "var(--civic-deep)", color: "#ece7da" }}>
          <div className="shell" style={{ paddingTop: "0.85rem", paddingBottom: "0.85rem", fontSize: "0.98rem" }}>
            <Link href="/articles/discrepancies-register" style={{ color: "#fff", fontWeight: 600 }}>
              {discrepancyCount} times the public record contradicts what officials said
            </Link>
            <span style={{ color: "#a9b6bf" }}> — side-by-side, every entry sourced →</span>
          </div>
        </div>
      )}

      <div className="shell">
        {/* ===================== THREADS ===================== */}
        <section style={{ ...sectionStyle, marginTop: "3rem" }}>
          <p className="section-label">The Story So Far · Five Threads</p>
          <div className="thread-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
            <ThreadCard thread={threads[0]} featured />
            {threads.slice(1).map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        </section>

        {/* ===================== TIMELINE ===================== */}
        <section id="timeline" style={sectionStyle}>
          <p className="section-label">The Record, In Order</p>
          <div className="timeline-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: "2.5rem" }}>
            <div>
              <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.9rem", lineHeight: 1.12, margin: "0 0 0.75rem" }}>
                How we got here
              </h2>
              <p style={{ color: "var(--ink-soft)", margin: "0 0 1.25rem" }}>
                The pivotal moments, from the 2023 hire to the 2026 nonrenewal.
                Each entry links to the sourced record.
              </p>
              <Link href="/timeline" className="font-display" style={{ fontWeight: 600 }}>
                See the complete timeline →
              </Link>
            </div>
            <StoryTimeline entries={timeline} />
          </div>
        </section>

        {/* ===================== CAST ===================== */}
        <section style={sectionStyle}>
          <p className="section-label">The Cast</p>
          <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.9rem", lineHeight: 1.12, margin: "0 0 1.5rem" }}>
            Who&apos;s who
          </h2>
          <CastGrid members={cast} />
        </section>

        {/* ===================== LATEST + ACTION ===================== */}
        <section style={sectionStyle}>
          <div className="latest-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: "2.5rem" }}>
            {/* Latest from the record */}
            <div>
              <p className="section-label">Latest From the Record</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {stories.map((p) => {
                  const href = p.directory === "analysis" ? `/articles/${p.slug}` : p.route;
                  return (
                    <li
                      key={p.slug}
                      style={{ display: "flex", gap: "0.85rem", alignItems: "baseline", padding: "0.7rem 0", borderBottom: "1px solid var(--rule-soft)" }}
                    >
                      <span className="font-display" style={{ color: "var(--muted)", fontSize: "0.78rem", flexShrink: 0, width: "4.2rem", letterSpacing: "0.03em" }}>
                        {(p.created || "").slice(0, 7)}
                      </span>
                      <Link href={href} style={{ flex: 1, fontWeight: 500 }}>{p.title}</Link>
                      <GemVote pageSlug={p.slug} />
                    </li>
                  );
                })}
              </ul>
              <p style={{ marginTop: "1rem" }}>
                <Link href="/stories" className="font-display" style={{ fontWeight: 600 }}>All stories →</Link>
              </p>
            </div>

            {/* Take action / CORA */}
            <aside>
              <p className="section-label">Take Action</p>
              <div style={{ background: "var(--paper-deep)", borderLeft: "3px solid var(--accent)", padding: "1.25rem 1.4rem" }}>
                <p style={{ margin: "0 0 0.9rem", fontSize: "0.98rem", lineHeight: 1.55 }}>
                  Colorado&apos;s Open Records Act gives you the right to request public
                  documents. We&apos;ve drafted the requests — you just send them.
                </p>
                <ul className="ed-list" style={{ marginBottom: "0.9rem" }}>
                  {actions.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/actions/${p.slug}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  <a href="/cora-request-form.pdf" target="_blank" rel="noreferrer" className="font-display" style={{ fontWeight: 600 }}>
                    Download the CORA form (PDF) →
                  </a>
                </p>
              </div>

              {initiatives.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <p className="section-label">Active Initiatives</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {initiatives.map((p) => (
                      <li key={p.slug} style={{ marginBottom: "0.9rem" }}>
                        <Link href={`/initiatives/${p.slug}`} style={{ fontWeight: 500 }}>{p.title}</Link>
                        <InitiativeVoting initiativeId={p.slug} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
