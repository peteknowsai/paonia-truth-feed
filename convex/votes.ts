import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's votes
export const getUserVotes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("votes")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    
    // Convert to a map of postId -> vote
    const voteMap: Record<string, "up" | "down"> = {};
    votes.forEach(vote => {
      voteMap[vote.postId] = vote.vote;
    });
    
    return voteMap;
  },
});

// Cast or update a vote
export const vote = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
    vote: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    // Check if user already voted on this post
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_post", (q) => 
        q.eq("userId", args.userId).eq("postId", args.postId)
      )
      .first();
    
    if (existingVote) {
      // If clicking the same vote, remove it (toggle off)
      if (existingVote.vote === args.vote) {
        await ctx.db.delete(existingVote._id);
        return null;
      }
      // Otherwise update to the new vote
      await ctx.db.patch(existingVote._id, { vote: args.vote });
      return args.vote;
    } else {
      // Create new vote
      await ctx.db.insert("votes", {
        postId: args.postId,
        userId: args.userId,
        vote: args.vote,
      });
      return args.vote;
    }
  },
});

// Remove a vote
export const removeVote = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_post", (q) => 
        q.eq("userId", args.userId).eq("postId", args.postId)
      )
      .first();
    
    if (existingVote) {
      await ctx.db.delete(existingVote._id);
    }
  },
});