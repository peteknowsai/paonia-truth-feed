import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addBomb = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already bombed this post
    const existing = await ctx.db
      .query("bombs")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", args.userId).eq("postId", args.postId)
      )
      .first();

    if (!existing) {
      // Add a new bomb
      await ctx.db.insert("bombs", {
        postId: args.postId,
        userId: args.userId,
        createdAt: Date.now(),
      });
      return { added: true };
    }
    return { added: false };
  },
});

export const removeBomb = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bombs")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", args.userId).eq("postId", args.postId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { removed: true };
    }
    return { removed: false };
  },
});

export const getBombCount = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const bombs = await ctx.db
      .query("bombs")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    return bombs.length;
  },
});

export const getUserBombs = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    
    const bombs = await ctx.db
      .query("bombs")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    
    return bombs.map(b => b.postId);
  },
});