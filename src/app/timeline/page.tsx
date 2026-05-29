import { getPage } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Timeline - reformpaonia.co" };

export default function TimelinePage() {
  const page = getPage("analysis", "master-timeline");

  if (!page) {
    return (
      <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <p style={{ color: "var(--muted)" }}>Timeline not found.</p>
      </div>
    );
  }

  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "timeline" },
        ]}
      />
      <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>The Record, In Order</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 2rem",
          textWrap: "balance",
        }}
      >
        Master Timeline
      </h1>
      <WikiContent content={page.content} stripFirstH1 />
    </div>
  );
}
