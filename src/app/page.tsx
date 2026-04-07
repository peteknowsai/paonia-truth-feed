import Link from "next/link";
import {
  getInitiativePages,
  getPage,
  getPagesByDirectory,
  getStoryPages,
  getActionPages,
  getCategories,
} from "@/lib/wiki";
import GemVote from "@/components/GemVote";
import InitiativeVoting from "@/components/InitiativeVoting";

function countDiscrepancies(content: string): number {
  return (content.match(/\n## /g) || []).length;
}

export default function HomePage() {
  const initiatives = getInitiativePages();
  const stories = getStoryPages();
  const actions = getActionPages();
  const people = getPagesByDirectory("people");
  const issues = getPagesByDirectory("issues");
  const analysis = getPagesByDirectory("analysis");
  const events = getPagesByDirectory("events").sort((a, b) =>
    (b.updated || b.created).localeCompare(a.updated || a.created)
  );
  const categories = getCategories();
  const discrepanciesPage = getPage("analysis", "discrepancies-register");
  const discrepancyCount = discrepanciesPage
    ? countDiscrepancies(discrepanciesPage.content)
    : 0;

  return (
    <div style={{ maxWidth: "640px" }}>
      {/* Quick links */}
      {discrepancyCount > 0 && (
        <div style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>
          <Link href="/articles/discrepancies-register" style={{ fontWeight: "bold" }}>
            {discrepancyCount} times the record contradicts the officials
          </Link>
          {" -- side-by-side, fully sourced"}
        </div>
      )}

      {/* Stories */}
      <section>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[...stories]
            .sort((a, b) => {
              const dateA = a.created || "";
              const dateB = b.created || "";
              return dateB.localeCompare(dateA);
            })
            .slice(0, 15)
            .map((p) => {
              const href =
                p.directory === "analysis" ? `/articles/${p.slug}` : p.route;
              const dateLabel = p.created || "";
              const parts = dateLabel.split("-");
              const shortDate =
                parts.length >= 2
                  ? `${new Date(dateLabel).toLocaleString("en", { month: "short" })}-${parts[0].slice(2)}`
                  : dateLabel;

              return (
                <li
                  key={p.slug}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    marginBottom: "0.35rem",
                    fontSize: "1rem",
                  }}
                >
                  <span style={{ color: "#666", flexShrink: 0 }}>
                    [{shortDate}]
                  </span>
                  <Link href={href} style={{ flex: 1, fontWeight: "bold" }}>
                    {p.title}
                  </Link>
                  <GemVote pageSlug={p.slug} />
                </li>
              );
            })}
        </ul>
        {stories.length > 15 && (
          <p style={{ marginTop: "0.75rem" }}>
            <Link href="/stories" style={{ fontWeight: "bold" }}>
              All stories ({stories.length}) &rarr;
            </Link>
          </p>
        )}
      </section>

      {/* Initiatives */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">ACTIVE INITIATIVES</div>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1rem" }}>
          Community-driven proposals for Paonia governance reform
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {initiatives.map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.75rem" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: "bold" }}>{p.title}</span>{" "}
                <Link href={`/initiatives/${p.slug}`} style={{ color: "#666" }}>
                  [learn more]
                </Link>
                <InitiativeVoting initiativeId={p.slug} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CORA Call to Action */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">GET ANSWERS</div>
        <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
          Colorado's Open Records Act (CORA) gives you the right to request
          public documents from your town government. We've drafted the requests.
          You just need to send them.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {actions.map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.5rem" }}>
              <Link href={`/actions/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
          Each question includes pre-written CORA requests citing the exact
          statute (C.R.S. 24-72-201).{" "}
          <a href="/cora-request-form.pdf" target="_blank" style={{ fontWeight: "bold" }}>
            Download the official form (PDF)
          </a>
          , fill in your name, copy the request language, and email to{" "}
          <strong>town@townofpaonia.com</strong>. The first hour of research is
          free. They have 3 business days to respond.
        </p>
      </section>

      {/* People */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">PEOPLE</div>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "0.75rem" }}>
          Elected officials and town staff. Voting records, public statements, and documented actions.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {people.map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.35rem" }}>
              <Link href={p.route}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Issues */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">ISSUES</div>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "0.75rem" }}>
          Ongoing governance concerns with sourced timelines.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {issues.map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.35rem" }}>
              <Link href={p.route}>{p.title}</Link>
              {p.tags.includes("initiative") && (
                <span style={{ color: "#666" }}> [initiative]</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Analysis */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">ANALYSIS</div>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "0.75rem" }}>
          Cross-cutting patterns, discrepancies, and the full timeline.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {analysis.map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.35rem" }}>
              <Link href={`/articles/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Discrepancies highlight */}
      {discrepancyCount > 0 && (
        <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
          <div className="section-header">
            DISCREPANCIES REGISTER
          </div>
          <p style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
            {discrepancyCount} documented cases where public statements by town
            officials contradict the public record. Every entry shows both sides
            and cites the source documents.
          </p>
          <Link href="/articles/discrepancies-register">
            Read the full register &rarr;
          </Link>
        </section>
      )}

      {/* Recent Events */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">RECENT EVENTS</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {events.slice(0, 15).map((p) => (
            <li key={p.slug} style={{ marginBottom: "0.35rem" }}>
              <span style={{ color: "#666" }}>{p.created}</span>{" "}
              <Link href={p.route}>{p.title}</Link>
            </li>
          ))}
        </ul>
        {events.length > 15 && (
          <p style={{ marginTop: "0.75rem" }}>
            <Link href="/wiki" style={{ fontWeight: "bold" }}>
              All events ({events.length}) &rarr;
            </Link>
          </p>
        )}
      </section>

      {/* Full Wiki */}
      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ccc" }}>
        <div className="section-header">THE FULL RECORD</div>
        <p style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
          Every claim on this site is sourced from public documents, meetings,
          and court records.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {categories.map((cat) => (
            <li key={cat.dir} style={{ marginBottom: "0.35rem" }}>
              <Link href={cat.route}>
                {cat.label} ({cat.count})
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "0.75rem" }}>
          <Link href="/timeline">Full timeline</Link>
          {" | "}
          <Link href="/wiki">Browse all pages</Link>
          {" | "}
          <Link href="/about">About this site</Link>
        </p>
      </section>
    </div>
  );
}
