import { notFound } from "next/navigation";
import { getAllPages, getPage, getDirectoryLabel } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import BacklinksSection from "@/components/BacklinksSection";
import Breadcrumb from "@/components/Breadcrumb";
import CommentSection from "@/components/CommentSection";

const ROUTE_TO_DIR: Record<string, string> = {
  people: "people",
  events: "events",
  issues: "issues",
  sources: "sources",
  analysis: "analysis",
  questions: "open-questions",
};

export async function generateStaticParams() {
  const pages = getAllPages();
  return pages.map((p) => {
    const categorySegment =
      p.directory === "open-questions" ? "questions" : p.directory;
    return { category: categorySegment, slug: p.slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const dir = ROUTE_TO_DIR[category];
  const page = dir ? getPage(dir, slug) : undefined;
  return {
    title: page
      ? `${page.title} - Paonia Truth Nuggets`
      : "Wiki - Paonia Truth Nuggets",
  };
}

export default async function WikiPageView({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const dir = ROUTE_TO_DIR[category];
  if (!dir) notFound();

  const page = getPage(dir, slug);
  if (!page) notFound();

  return (
    <div
      className="shell-narrow"
      style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}
    >
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "wiki", href: "/wiki" },
          {
            label: getDirectoryLabel(page.directory),
            href: `/wiki/${category}`,
          },
          { label: page.title },
        ]}
      />

      <p
        className="eyebrow"
        style={{ marginTop: "1.25rem", marginBottom: "0.45rem" }}
      >
        {page.type}
      </p>

      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--muted)",
          marginBottom: "1.5rem",
        }}
      >
        Created {page.created} &middot; Updated {page.updated || page.created}
        {page.tags.length > 0 && (
          <span style={{ display: "block", marginTop: "0.6rem" }}>
            {page.tags.map((tag) => (
              <span key={tag} className="topic-tag">
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>

      <WikiContent content={page.content} stripFirstH1 />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={`wiki-${page.slug}`} />
    </div>
  );
}
