import Link from "next/link";
import { getStoryPages } from "@/lib/wiki";
import PageVoting from "@/components/PageVoting";

export const metadata = { title: "Stories - Paonia Truth Nuggets" };

export default function StoriesPage() {
  const stories = getStoryPages();

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Stories from the Public Record
      </h1>

      {stories.map((p) => {
        const href =
          p.directory === "analysis"
            ? `/articles/${p.slug}`
            : p.route;

        return (
          <div
            key={p.slug}
            style={{
              marginBottom: "1rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <PageVoting pageSlug={p.slug} />
              <div>
                <Link href={href} style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {p.title}
                </Link>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginLeft: "0.5rem",
                  }}
                >
                  ({p.directory})
                </span>
                <div style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.15rem" }}>
                  {p.description}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.15rem" }}>
                  updated {p.updated || p.created}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
