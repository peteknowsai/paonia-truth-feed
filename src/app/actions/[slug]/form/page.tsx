import { notFound } from "next/navigation";
import { getActionPages } from "@/lib/wiki";

export async function generateStaticParams() {
  return getActionPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getActionPages().find((p) => p.slug === slug);
  return { title: page ? `CORA Form: ${page.title}` : "CORA Form" };
}

function extractCoraRequests(content: string): { label: string; text: string }[] {
  const requests: { label: string; text: string }[] = [];
  const lines = content.split("\n");
  let currentLabel = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("**Request")) {
      currentLabel = line.replace(/\*\*/g, "").replace(/:$/, "").trim();
    } else if (line.startsWith("> Under C.R.S.") && currentLabel) {
      const text = line
        .replace(/^>\s*/, "")
        .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
        .replace(/\[\[([^\]]+)\]\]/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      requests.push({ label: currentLabel, text });
      currentLabel = "";
    }
  }
  return requests;
}

export default async function CoraFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getActionPages().find((p) => p.slug === slug);
  if (!page) notFound();

  const requests = extractCoraRequests(page.content);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem", fontFamily: "'Courier Prime', monospace" }}>
      <style>{`
        @media print {
          nav, header, footer, .no-print { display: none !important; }
          body { padding: 0; margin: 0; }
        }
      `}</style>

      <div className="no-print" style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
        <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Print this page or copy the request text below into the{" "}
          <a href="/cora-request-form.pdf" target="_blank">official CORA form (PDF)</a>.
          Fill in your name, date, phone, and email. Email to{" "}
          <strong>town@townofpaonia.com</strong>.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Use your browser's print function (Ctrl+P / Cmd+P) to print or save as PDF.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Colorado Open Records Act Request Form
        </div>
        <div style={{ fontSize: "0.85rem", color: "#666" }}>
          Town of Paonia -- C.R.S. 24-72-201 to 24-72-309
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem", lineHeight: "2" }}>
        <div>Name: ________________________________ Date: ________________</div>
        <div>Phone: ________________________________</div>
        <div>Email: ________________________________ Format: PDF</div>
        <div>Mailing Address: ________________________________</div>
      </div>

      <div style={{ fontWeight: "bold", marginBottom: "0.5rem", borderBottom: "1px solid black", paddingBottom: "0.25rem" }}>
        Document Name or Detailed Description
      </div>

      <div style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "#333" }}>
        Re: {page.title}
      </div>

      {requests.map((r, i) => (
        <div key={i} style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
            {r.label}
          </div>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
            {r.text}
          </div>
        </div>
      ))}

      {requests.length === 0 && (
        <div style={{ color: "#666", fontStyle: "italic" }}>
          No specific CORA requests drafted for this question yet. See the{" "}
          <a href={`/actions/${slug}`}>action page</a> for details.
        </div>
      )}

      <div style={{ marginTop: "2rem", fontSize: "0.85rem", color: "#666", borderTop: "1px solid #ccc", paddingTop: "0.75rem" }}>
        <div>Number of copies: 1 (PDF)</div>
        <div style={{ marginTop: "0.5rem" }}>
          Note: The first hour of research and retrieval is free. You will be
          contacted before any paid time is incurred.
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          Generated from paoniatruth.site/actions/{slug}
        </div>
      </div>
    </div>
  );
}
