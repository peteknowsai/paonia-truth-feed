import Link from "next/link";

interface Backlink {
  slug: string;
  title: string;
  route: string;
}

export default function BacklinksSection({ backlinks }: { backlinks: Backlink[] }) {
  if (backlinks.length === 0) return null;

  return (
    <div style={{ marginTop: "1.5rem", paddingTop: "0.75rem", borderTop: "1px solid #ccc" }}>
      <div style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#666" }}>
        REFERENCED BY
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {backlinks.map((bl) => (
          <li key={bl.slug} style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
            <Link href={bl.route}>{bl.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
