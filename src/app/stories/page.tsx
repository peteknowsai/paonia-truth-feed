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
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Stories from the Public Record
      </h1>

      {visible.map((p) => {
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

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: "0.25rem 0.75rem",
              border: "1px solid #ccc",
              background: page === 1 ? "#f5f5f5" : "#fff",
              cursor: page === 1 ? "default" : "pointer",
              fontFamily: "inherit",
            }}
          >
            Prev
          </button>
          <span style={{ fontSize: "0.9rem" }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: "0.25rem 0.75rem",
              border: "1px solid #ccc",
              background: page === totalPages ? "#f5f5f5" : "#fff",
              cursor: page === totalPages ? "default" : "pointer",
              fontFamily: "inherit",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
