import Link from "next/link";
import { getInitiativePages, getPagesByDirectory } from "@/lib/wiki";

export const metadata = { title: "Initiatives - Paonia Truth Nuggets" };

export default function InitiativesIndex() {
  const initiatives = getInitiativePages();
  const allIssues = getPagesByDirectory("issues");

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        Citizen Initiatives
      </h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1.5rem" }}>
        Active and proposed initiatives for Paonia governance reform.
      </p>

      {initiatives.length > 0 && (
        <>
          <div className="section-header">Initiative Issues</div>
          {initiatives.map((p) => (
            <div key={p.slug} style={{ marginBottom: "1rem" }}>
              <Link href={`/initiatives/${p.slug}`} style={{ fontWeight: "bold", fontSize: "1rem" }}>
                {p.title}
              </Link>
              <span className="badge badge-active" style={{ marginLeft: "0.5rem" }}>
                active
              </span>
              <div style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.15rem" }}>
                {p.description}
              </div>
            </div>
          ))}
        </>
      )}

      <div className="section-header" style={{ marginTop: "1.5rem" }}>All Issues</div>
      {allIssues.map((p) => (
        <div key={p.slug} style={{ marginBottom: "0.75rem" }}>
          <Link href={p.route} style={{ fontSize: "1rem" }}>
            {p.title}
          </Link>
          {p.tags.includes("initiative") && (
            <span className="badge badge-active" style={{ marginLeft: "0.5rem" }}>
              initiative
            </span>
          )}
          <div style={{ fontSize: "0.9rem", color: "#333" }}>{p.description}</div>
        </div>
      ))}
    </div>
  );
}
