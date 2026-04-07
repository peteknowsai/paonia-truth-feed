import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const vote = mutation({
  args: {
    pageSlug: v.string(),
    userId: v.string(),
    vote: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pageVotes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", args.userId).eq("pageSlug", args.pageSlug)
      )
      .first();

    if (existing) {
      if (existing.vote === args.vote) {
        await ctx.db.delete(existing._id);
        return { action: "removed" as const, vote: null };
      } else {
        await ctx.db.patch(existing._id, { vote: args.vote });
        return { action: "updated" as const, vote: args.vote };
      }
    } else {
      await ctx.db.insert("pageVotes", {
        pageSlug: args.pageSlug,
        userId: args.userId,
        vote: args.vote,
      });
      return { action: "created" as const, vote: args.vote };
    }
  },
});

export const getCounts = query({
  args: { pageSlug: v.string() },
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("pageVotes")
      .withIndex("by_page", (q) => q.eq("pageSlug", args.pageSlug))
      .collect();

    const up = votes.filter((v) => v.vote === "up").length;
    const down = votes.filter((v) => v.vote === "down").length;
    return { up, down, score: up - down };
  },
});

export const getAllScores = query({
  args: {},
  handler: async (ctx) => {
    const votes = await ctx.db.query("pageVotes").collect();
    const scores: Record<string, number> = {};
    for (const v of votes) {
      scores[v.pageSlug] = (scores[v.pageSlug] ?? 0) + (v.vote === "up" ? 1 : -1);
    }
    return scores;
  },
});

export const getUserVote = query({
  args: { pageSlug: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    const vote = await ctx.db
      .query("pageVotes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", args.userId).eq("pageSlug", args.pageSlug)
      )
      .first();
    return vote?.vote ?? null;
  },
});
