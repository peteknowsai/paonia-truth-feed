"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CoraInterest({ questionSlug }: { questionSlug: string }) {
  const { user } = useUser();
  const tracking = useQuery(api.coraTracking.getByQuestion, { questionSlug });
  const userTracking = useQuery(
    api.coraTracking.getUserTracking,
    user ? { userId: user.id } : "skip"
  );
  const trackInterest = useMutation(api.coraTracking.trackInterest);

  const isInterested = userTracking?.some((t: any) => t.questionSlug === questionSlug) ?? false;
  const count = tracking?.length ?? 0;

  const handleClick = async () => {
    if (!user) return;
    await trackInterest({
      questionSlug,
      userId: user.id,
      username: user.firstName || user.username || "Anonymous",
    });
  };

  return (
    <div style={{ margin: "0.75rem 0" }}>
      <button
        className={`vote-btn ${isInterested ? "active-up" : ""}`}
        onClick={handleClick}
        disabled={!user}
        title={user ? "I want to know this too" : "Sign in to track"}
      >
        {isInterested ? "interested" : "I want to know this too"} ({count})
      </button>
      {!user && (
        <span style={{ fontSize: "0.85rem", color: "#666", marginLeft: "0.5rem" }}>
          Sign in to track
        </span>
      )}
    </div>
  );
}
