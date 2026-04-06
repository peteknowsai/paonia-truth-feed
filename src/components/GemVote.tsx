"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function GemVote({ pageSlug }: { pageSlug: string }) {
  const { user } = useUser();
  const counts = useQuery(api.pageVotes.getCounts, { pageSlug });
  const userVote = useQuery(
    api.pageVotes.getUserVote,
    user ? { pageSlug, userId: user.id } : "skip"
  );
  const voteMutation = useMutation(api.pageVotes.vote);

  const handleVote = async () => {
    if (!user) return;
    await voteMutation({ pageSlug, userId: user.id, vote: "up" });
  };

  const isActive = userVote === "up";
  const count = counts?.up ?? 0;

  return (
    <button
      onClick={handleVote}
      disabled={!user}
      title={!user ? "Sign up to add gems" : isActive ? "Remove gem" : "Add a gem"}
      style={{
        background: "none",
        border: "none",
        cursor: user ? "pointer" : "default",
        fontFamily: "inherit",
        fontSize: "1rem",
        opacity: isActive ? 1 : 0.4,
        padding: 0,
        whiteSpace: "nowrap",
      }}
    >
      💎 {count}
    </button>
  );
}
