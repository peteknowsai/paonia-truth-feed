import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div style={{ fontSize: "0.9rem", marginBottom: "1rem", color: "var(--muted)" }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && (
            <span style={{ color: "var(--rule)", margin: "0 0.45rem" }}>/</span>
          )}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span style={{ color: "var(--ink-soft)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
