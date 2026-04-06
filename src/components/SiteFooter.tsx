import { getAllPages } from "@/lib/wiki";

export default function SiteFooter() {
  const pages = getAllPages();
  return (
    <footer style={{ borderTop: "1px solid #ccc", padding: "0.75rem 1rem", marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        All information sourced from public records, public meetings, and published documents. {pages.length} pages in the public record.
      </div>
    </footer>
  );
}
