import { notFound } from "next/navigation";
import Link from "next/link";
import { getActionPages } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import BacklinksSection from "@/components/BacklinksSection";
import Breadcrumb from "@/components/Breadcrumb";
import CoraInterest from "@/components/CoraInterest";
import CommentSection from "@/components/CommentSection";

export async function generateStaticParams() {
  return getActionPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getActionPages().find((p) => p.slug === slug);
  return { title: page ? `${page.title} - Paonia Truth Nuggets` : "Action - Paonia Truth Nuggets" };
}

export default async function ActionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getActionPages().find((p) => p.slug === slug);

  if (!page) notFound();

  return (
    <div className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "actions", href: "/actions" },
          { label: page.title },
        ]}
      />

      <p className="eyebrow" style={{ margin: "1.5rem 0 0.6rem" }}>Open Action</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          margin: "0 0 0.5rem",
          textWrap: "balance",
        }}
      >
        {page.title}
      </h1>

      <div style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
        Updated {page.updated || page.created}
      </div>

      <CoraInterest questionSlug={slug} />

      <div
        style={{
          background: "var(--paper-card)",
          border: "1px solid var(--rule)",
          borderLeft: "3px solid var(--accent)",
          padding: "1.1rem 1.25rem",
          margin: "1.5rem 0",
          fontSize: "1rem",
          lineHeight: 1.6,
        }}
      >
        <strong>How to submit:</strong>{" "}
        <Link href={`/actions/${slug}/form`} style={{ fontWeight: 600 }}>
          View the pre-filled CORA form
        </Link>
        {" -- print it, add your name, and email to "}
        <strong>town@townofpaonia.com</strong>. Or download the{" "}
        <a href="/cora-request-form.pdf" target="_blank">
          blank official form (PDF)
        </a>
        {" and copy the request language below. The first hour of research is free. They have 3 business days to respond."}
      </div>

      <WikiContent content={page.content} stripFirstH1 />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={`action-${slug}`} />
    </div>
  );
}
