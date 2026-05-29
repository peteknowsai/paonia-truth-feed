import Link from "next/link";
import { getCategories, getPagesByDirectory } from "@/lib/wiki";

export const metadata = { title: "Wiki - Paonia Truth Nuggets" };

export default function WikiIndex() {
  const categories = getCategories();

  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "0.9rem" }}>The Public Record</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.015em",
          margin: "0 0 0.85rem",
        }}
      >
        Public Record Wiki
      </h1>
      <p style={{ fontSize: "1.12rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 2.75rem", maxWidth: "44ch" }}>
        Every claim sourced. Every document linked. Browse the full record.
      </p>

      {categories.map((cat) => {
        const pages = getPagesByDirectory(cat.dir);
        return (
          <section key={cat.dir} style={{ marginBottom: "2.75rem" }}>
            <h2 className="section-label">
              {cat.label} <span style={{ color: "var(--rule)" }}>·</span> {cat.count}
            </h2>
            <ul className="ed-list">
              {pages.map((p) => (
                <li key={p.slug} style={{ marginBottom: "0.55rem" }}>
                  <Link href={p.route} style={{ fontSize: "1.05rem" }}>
                    {p.title}
                  </Link>
                  {p.tags.includes("initiative") && (
                    <span className="badge badge-active" style={{ marginLeft: "0.55rem" }}>
                      initiative
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
