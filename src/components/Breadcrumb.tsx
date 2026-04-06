import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div style={{ fontSize: "0.9rem", marginBottom: "0.75rem", color: "#666" }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && " / "}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span style={{ color: "black" }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
