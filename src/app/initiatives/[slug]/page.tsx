import { notFound } from "next/navigation";
import { getPagesByDirectory } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import BacklinksSection from "@/components/BacklinksSection";
import Breadcrumb from "@/components/Breadcrumb";
import InitiativeVoting from "@/components/InitiativeVoting";
import CommentSection from "@/components/CommentSection";

export async function generateStaticParams() {
  const issues = getPagesByDirectory("issues").filter((p) =>
    p.tags.includes("initiative")
  );
  return issues.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issues = getPagesByDirectory("issues");
  const page = issues.find((p) => p.slug === slug);
  return { title: page ? `${page.title} - Paonia Truth Nuggets` : "Initiative - Paonia Truth Nuggets" };
}

export default async function InitiativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issues = getPagesByDirectory("issues");
  const page = issues.find((p) => p.slug === slug);

  if (!page) notFound();

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "initiatives", href: "/initiatives" },
          { label: page.title },
        ]}
      />

      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
        {page.title}
      </h1>

      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>
        Updated {page.updated || page.created}
      </div>

      <InitiativeVoting initiativeId={slug} />

      <WikiContent content={page.content} />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={slug} />
    </div>
  );
}
