import Link from "next/link";
import { getInitiativePages, getPagesByDirectory } from "@/lib/wiki";

export const metadata = { title: "Initiatives - Paonia Truth Nuggets" };

export default function InitiativesIndex() {
  const initiatives = getInitiativePages();
  const allIssues = getPagesByDirectory("issues");

  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "0.9rem" }}>Governance Reform</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.015em",
          margin: "0 0 0.75rem",
        }}
      >
        Citizen Initiatives
      </h1>
      <p style={{ fontSize: "1.12rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 2.75rem", maxWidth: "44rem" }}>
        Active and proposed initiatives for Paonia governance reform.
      </p>

      {initiatives.length > 0 && (
        <section style={{ marginBottom: "3.25rem" }}>
          <p className="section-label">Initiative Issues</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {initiatives.map((p) => (
              <li
                key={p.slug}
                style={{ padding: "1rem 0", borderBottom: "1px solid var(--rule-soft)" }}
              >
                <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.6rem" }}>
                  <Link
                    href={`/initiatives/${p.slug}`}
                    className="font-display"
                    style={{ fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.2 }}
                  >
                    {p.title}
                  </Link>
                  <span className="badge badge-active">active</span>
                </div>
                <p style={{ fontSize: "1rem", color: "var(--ink-soft)", margin: "0.35rem 0 0", lineHeight: 1.55 }}>
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <p className="section-label">All Issues</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {allIssues.map((p) => (
            <li
              key={p.slug}
              style={{ padding: "0.85rem 0", borderBottom: "1px solid var(--rule-soft)" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.6rem" }}>
                <Link
                  href={p.route}
                  className="font-display"
                  style={{ fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.2 }}
                >
                  {p.title}
                </Link>
                {p.tags.includes("initiative") && (
                  <span className="badge badge-active">initiative</span>
                )}
              </div>
              <p style={{ fontSize: "1rem", color: "var(--ink-soft)", margin: "0.3rem 0 0", lineHeight: 1.55 }}>
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
