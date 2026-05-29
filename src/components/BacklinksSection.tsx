import Link from "next/link";

interface Backlink {
  slug: string;
  title: string;
  route: string;
}

export default function BacklinksSection({ backlinks }: { backlinks: Backlink[] }) {
  if (backlinks.length === 0) return null;

  return (
    <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rule)" }}>
      <h2 className="section-label">Referenced By</h2>
      <ul className="ed-list">
        {backlinks.map((bl) => (
          <li key={bl.slug}>
            <Link href={bl.route}>{bl.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
