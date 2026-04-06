import Link from "next/link";
import { getCategories, getPagesByDirectory, getDirectoryRoute } from "@/lib/wiki";

export const metadata = { title: "Wiki - Paonia Truth Nuggets" };

export default function WikiIndex() {
  const categories = getCategories();

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        Public Record Wiki
      </h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1.5rem" }}>
        Every claim sourced. Every document linked. Browse the full record.
      </p>

      {categories.map((cat) => {
        const pages = getPagesByDirectory(cat.dir);
        return (
          <div key={cat.dir} style={{ marginBottom: "1.5rem" }}>
            <div className="section-header">
              {cat.label} ({cat.count})
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {pages.map((p) => (
                <li key={p.slug} style={{ marginBottom: "0.35rem" }}>
                  <Link href={p.route} style={{ fontSize: "1rem" }}>
                    {p.title}
                  </Link>
                  {p.tags.includes("initiative") && (
                    <span className="badge badge-active" style={{ marginLeft: "0.5rem", fontSize: "0.75rem" }}>
                      initiative
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
