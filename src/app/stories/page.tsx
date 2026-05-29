"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { getStoryPages } from "@/lib/wiki";
import PageVoting from "@/components/PageVoting";

const stories = getStoryPages();
const PER_PAGE = 25;

export default function StoriesPage() {
  const scores = useQuery(api.pageVotes.getAllScores) ?? {};
  const [page, setPage] = useState(1);

  const sorted = [...stories].sort((a, b) => {
    const scoreA = scores[a.slug] ?? 0;
    const scoreB = scores[b.slug] ?? 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    const dateA = a.updated || a.created || "";
    const dateB = b.updated || b.created || "";
    return dateB.localeCompare(dateA);
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const visible = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Sorted by the room</p>
      <h1
        className="font-display"
        style={{
          fontWeight: 560,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          margin: "0 0 0.75rem",
          textWrap: "balance",
        }}
      >
        Stories from the Public Record
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: "44ch", margin: "0 0 2rem" }}>
        Every entry is drawn from public records and public meetings. Vote to push
        what matters to the top.
      </p>

      {visible.map((p) => {
        const href =
          p.directory === "analysis"
            ? `/articles/${p.slug}`
            : p.route;

        return (
          <article
            key={p.slug}
            style={{
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <PageVoting pageSlug={p.slug} />
              <div style={{ minWidth: 0 }}>
                <p
                  className="topic-tag"
                  style={{ margin: "0 0 0.3rem" }}
                >
                  {p.directory}
                </p>
                <Link
                  href={href}
                  className="font-display"
                  style={{
                    display: "block",
                    fontWeight: 560,
                    fontSize: "1.4rem",
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                  }}
                >
                  {p.title}
                </Link>
                {p.description && (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--ink-soft)",
                      margin: "0.4rem 0 0",
                    }}
                  >
                    {p.description}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    margin: "0.5rem 0 0",
                  }}
                >
                  Updated {p.updated || p.created}
                </p>
              </div>
            </div>
          </article>
        );
      })}

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: "0.35rem 1rem",
              border: "1px solid var(--rule)",
              background: page === 1 ? "var(--paper-deep)" : "var(--paper-card)",
              color: page === 1 ? "var(--muted)" : "var(--ink)",
              cursor: page === 1 ? "default" : "pointer",
              fontFamily: "var(--serif-display)",
              fontSize: "12.5px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Prev
          </button>
          <span
            className="font-display"
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: "0.35rem 1rem",
              border: "1px solid var(--rule)",
              background:
                page === totalPages ? "var(--paper-deep)" : "var(--paper-card)",
              color: page === totalPages ? "var(--muted)" : "var(--ink)",
              cursor: page === totalPages ? "default" : "pointer",
              fontFamily: "var(--serif-display)",
              fontSize: "12.5px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
