import { notFound } from "next/navigation";
import { getPagesByDirectory } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import BacklinksSection from "@/components/BacklinksSection";
import Breadcrumb from "@/components/Breadcrumb";
import PageVoting from "@/components/PageVoting";
import CommentSection from "@/components/CommentSection";

export async function generateStaticParams() {
  return getPagesByDirectory("analysis").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPagesByDirectory("analysis").find((p) => p.slug === slug);
  return { title: page ? `${page.title} - Paonia Truth Nuggets` : "Article - Paonia Truth Nuggets" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPagesByDirectory("analysis").find((p) => p.slug === slug);

  if (!page) notFound();

  return (
    <div className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "articles" },
          { label: page.title },
        ]}
      />

      <p className="eyebrow" style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
        Analysis
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 0.9rem",
          textWrap: "balance",
        }}
      >
        {page.title}
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.9rem",
          color: "var(--muted)",
          margin: "0 0 1.5rem",
        }}
      >
        <PageVoting pageSlug={slug} />
        <span>Updated {page.updated || page.created}</span>
      </div>

      <hr className="rule" style={{ margin: "0 0 2rem" }} />

      <WikiContent content={page.content} stripFirstH1 />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={slug} />
    </div>
  );
}
