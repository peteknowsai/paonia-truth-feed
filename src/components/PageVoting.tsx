"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function PageVoting({ pageSlug }: { pageSlug: string }) {
  const { user } = useUser();
  const counts = useQuery(api.pageVotes.getCounts, { pageSlug });
  const userVote = useQuery(
    api.pageVotes.getUserVote,
    user ? { pageSlug, userId: user.id } : "skip"
  );
  const voteMutation = useMutation(api.pageVotes.vote);

  const handleVote = async (direction: "up" | "down") => {
    if (!user) return;
    await voteMutation({ pageSlug, userId: user.id, vote: direction });
  };

  const score = counts?.score ?? 0;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
      <button
        className={`vote-btn ${userVote === "up" ? "active-up" : ""}`}
        onClick={() => handleVote("up")}
        disabled={!user}
        title={user ? "Upvote" : "Sign in to vote"}
      >
        &#9650;
      </button>
      <span style={{ minWidth: "1.5rem", textAlign: "center", fontSize: "1rem" }}>
        {score}
      </span>
      <button
        className={`vote-btn ${userVote === "down" ? "active-down" : ""}`}
        onClick={() => handleVote("down")}
        disabled={!user}
        title={user ? "Downvote" : "Sign in to vote"}
      >
        &#9660;
      </button>
    </span>
  );
}
