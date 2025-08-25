import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Vote on an initiative (support or oppose)
export const vote = mutation({
  args: {
    initiativeId: v.string(),
    userId: v.string(),
    vote: v.union(v.literal("support"), v.literal("oppose")),
  },
  handler: async (ctx, args) => {
    // Check if user already voted on this initiative
    const existingVote = await ctx.db
      .query("initiativeVotes")
      .withIndex("by_user_and_initiative", (q) =>
        q.eq("userId", args.userId).eq("initiativeId", args.initiativeId)
      )
      .first();

    if (existingVote) {
      // If clicking the same vote, remove it (toggle off)
      if (existingVote.vote === args.vote) {
        await ctx.db.delete(existingVote._id);
        return { action: "removed", vote: null };
      } else {
        // Otherwise, update to the new vote
        await ctx.db.patch(existingVote._id, {
          vote: args.vote,
          createdAt: Date.now(),
        });
        return { action: "updated", vote: args.vote };
      }
    } else {
      // Create new vote
      await ctx.db.insert("initiativeVotes", {
        initiativeId: args.initiativeId,
        userId: args.userId,
        vote: args.vote,
        createdAt: Date.now(),
      });
      return { action: "created", vote: args.vote };
    }
  },
});

// Get vote counts for an initiative
export const getCounts = query({
  args: { initiativeId: v.string() },
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("initiativeVotes")
      .withIndex("by_initiative", (q) => q.eq("initiativeId", args.initiativeId))
      .collect();

    const support = votes.filter((v) => v.vote === "support").length;
    const oppose = votes.filter((v) => v.vote === "oppose").length;

    return { support, oppose, total: votes.length };
  },
});

// Get all vote counts for all initiatives
export const getAllCounts = query({
  args: {},
  handler: async (ctx) => {
    const allVotes = await ctx.db.query("initiativeVotes").collect();
    
    const counts: Record<string, { support: number; oppose: number; total: number }> = {};
    
    for (const vote of allVotes) {
      if (!counts[vote.initiativeId]) {
        counts[vote.initiativeId] = { support: 0, oppose: 0, total: 0 };
      }
      
      counts[vote.initiativeId].total++;
      if (vote.vote === "support") {
        counts[vote.initiativeId].support++;
      } else {
        counts[vote.initiativeId].oppose++;
      }
    }
    
    return counts;
  },
});

// Get user's votes for all initiatives
export const getUserVotes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("initiativeVotes")
      .withIndex("by_user_and_initiative", (q) => q.eq("userId", args.userId))
      .collect();

    const userVotes: Record<string, "support" | "oppose"> = {};
    for (const vote of votes) {
      userVotes[vote.initiativeId] = vote.vote;
    }

    return userVotes;
  },
});