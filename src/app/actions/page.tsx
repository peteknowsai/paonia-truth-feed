import Link from "next/link";
import { getActionPages } from "@/lib/wiki";

export const metadata = { title: "Actions - Paonia Truth Nuggets" };

export default function ActionsPage() {
  const actions = getActionPages();

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        What You Can Do
      </h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1rem" }}>
        Open questions about Paonia governance. Each includes suggested CORA
        (Colorado Open Records Act) requests you can submit yourself.
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>
        <a href="/cora-request-form.pdf" target="_blank" style={{ fontWeight: "bold" }}>
          Download the official CORA request form (PDF)
        </a>
        {" -- fill in your info, copy the request language, email to "}
        <strong>town@townofpaonia.com</strong>.
      </p>

      {actions.map((p) => (
        <div
          key={p.slug}
          style={{
            marginBottom: "1rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <Link href={`/actions/${p.slug}`} style={{ fontWeight: "bold", fontSize: "1rem" }}>
            {p.title}
          </Link>
          <span className="badge badge-open" style={{ marginLeft: "0.5rem" }}>
            open
          </span>
          <div style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.15rem" }}>
            {p.description}
          </div>
        </div>
      ))}
    </div>
  );
}
