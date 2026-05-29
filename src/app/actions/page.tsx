import Link from "next/link";
import { getActionPages } from "@/lib/wiki";

export const metadata = { title: "Actions - Paonia Truth Nuggets" };

export default function ActionsPage() {
  const actions = getActionPages();

  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>What You Can Do</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 1rem",
          textWrap: "balance",
        }}
      >
        Open Questions, Open Records
      </h1>
      <p style={{ fontSize: "1.1rem", color: "var(--ink-soft)", maxWidth: "62ch", margin: "0 0 0.85rem" }}>
        Open questions about Paonia governance. Each includes suggested CORA
        (Colorado Open Records Act) requests you can submit yourself.
      </p>
      <p style={{ color: "var(--ink-soft)", maxWidth: "62ch", margin: "0 0 2.25rem" }}>
        <a href="/cora-request-form.pdf" target="_blank" style={{ fontWeight: 600 }}>
          Download the official CORA request form (PDF)
        </a>
        {" -- fill in your info, copy the request language, email to "}
        <strong>town@townofpaonia.com</strong>.
      </p>

      <p className="section-label">The Questions</p>

      {actions.map((p) => (
        <div
          key={p.slug}
          style={{
            marginBottom: "1.4rem",
            paddingBottom: "1.4rem",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href={`/actions/${p.slug}`}
              className="font-display"
              style={{ fontWeight: 560, fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
            >
              {p.title}
            </Link>
            <span className="badge badge-open">open</span>
          </div>
          <div style={{ fontSize: "1.02rem", color: "var(--ink-soft)", marginTop: "0.4rem", maxWidth: "70ch" }}>
            {p.description}
          </div>
        </div>
      ))}
    </div>
  );
}
