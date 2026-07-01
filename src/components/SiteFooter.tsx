import Link from "next/link";
import { getAllPages } from "@/lib/wiki";

export default function SiteFooter() {
  const pages = getAllPages();
  return (
    <footer className="site-foot">
      <div className="shell site-foot-inner">
        <p className="foot-notice">
          <span className="dot" aria-hidden>●</span>&nbsp; This is an independent civic-transparency
          project published by residents — <strong>not the official Town of Paonia
          website</strong>. The Town's official site is{" "}
          <a href="https://townofpaonia.colorado.gov">townofpaonia.colorado.gov</a>.
        </p>
        <p style={{ margin: "0 0 1rem", maxWidth: "62ch" }}>
          Every claim on this site is sourced from public records, public meetings,
          and published documents. {pages.length} pages in the public record.
        </p>
        <p style={{ margin: 0, fontSize: "0.9rem", display: "flex", flexWrap: "wrap", gap: "0 1.2rem" }}>
          <Link href="/story">The Story</Link>
          <Link href="/timeline">Timeline</Link>
          <Link href="/initiatives">Initiatives</Link>
          <Link href="/actions">Take Action</Link>
          <a href="/encyclopedia/">The Full Record</a>
          <Link href="/about">About</Link>
        </p>
      </div>
    </footer>
  );
}
