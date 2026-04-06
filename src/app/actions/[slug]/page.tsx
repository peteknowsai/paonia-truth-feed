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
    <div>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "actions", href: "/actions" },
          { label: page.title },
        ]}
      />

      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
        {page.title}
      </h1>

      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
        Updated {page.updated || page.created}
      </div>

      <CoraInterest questionSlug={slug} />

      <div style={{
        border: "1px solid #999",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        fontSize: "1rem",
      }}>
        <strong>How to submit:</strong>{" "}
        <Link href={`/actions/${slug}/form`} style={{ fontWeight: "bold" }}>
          View the pre-filled CORA form
        </Link>
        {" -- print it, add your name, and email to "}
        <strong>town@townofpaonia.com</strong>. Or download the{" "}
        <a href="/cora-request-form.pdf" target="_blank">
          blank official form (PDF)
        </a>
        {" and copy the request language below. The first hour of research is free. They have 3 business days to respond."}
      </div>

      <WikiContent content={page.content} />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={`action-${slug}`} />
    </div>
  );
}
