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
    <div className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "initiatives", href: "/initiatives" },
          { label: page.title },
        ]}
      />

      <p className="eyebrow" style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
        Initiative
      </p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          margin: "0 0 0.5rem",
          textWrap: "balance",
        }}
      >
        {page.title}
      </h1>

      <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
        Updated {page.updated || page.created}
      </div>

      <InitiativeVoting initiativeId={slug} />

      <WikiContent content={page.content} stripFirstH1 />

      <BacklinksSection backlinks={page.backlinks} />

      <CommentSection pageSlug={slug} />
    </div>
  );
}
