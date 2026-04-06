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
    <div>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "articles" },
          { label: page.title },
        ]}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <PageVoting pageSlug={slug} />
        <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{page.title}</h1>
      </div>

      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>
        Updated {page.updated || page.created}
      </div>

      <WikiContent content={page.content} />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={slug} />
    </div>
  );
}
