"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function InitiativeVoting({ initiativeId }: { initiativeId: string }) {
  const { user } = useUser();
  const counts = useQuery(api.initiativeVotes.getCounts, { initiativeId });
  const userVotes = useQuery(
    api.initiativeVotes.getUserVotes,
    user ? { userId: user.id } : "skip"
  );
  const voteMutation = useMutation(api.initiativeVotes.vote);

  const userVote = userVotes?.[initiativeId] ?? null;

  const handleVote = async (vote: "support" | "oppose") => {
    if (!user) return;
    await voteMutation({
      initiativeId,
      userId: user.id,
      username: user.firstName || user.username || "Anonymous",
      vote,
    });
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", margin: "0.75rem 0" }}>
      <button
        className={`vote-btn ${userVote === "support" ? "active-up" : ""}`}
        onClick={() => handleVote("support")}
        disabled={!user}
        title={user ? "Support" : "Sign in to vote"}
      >
        support {counts?.support ?? 0}
      </button>
      <button
        className={`vote-btn ${userVote === "oppose" ? "active-down" : ""}`}
        onClick={() => handleVote("oppose")}
        disabled={!user}
        title={user ? "Oppose" : "Sign in to vote"}
      >
        oppose {counts?.oppose ?? 0}
      </button>
    </div>
  );
}
