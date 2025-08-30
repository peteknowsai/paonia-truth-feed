import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    title: v.string(),
    content: v.string(), // AI Summary
    storyAnalysis: v.optional(v.string()), // Full AI Story Analysis
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.postId, {
      title: args.title,
      content: args.content,
      storyAnalysis: args.storyAnalysis || "",
    });
    
    return {
      success: true,
      message: "Post updated successfully"
    };
  },
});

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    // Delete all comments for this post first
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
    
    // Delete all votes for this post
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    
    for (const vote of votes) {
      await ctx.db.delete(vote._id);
    }
    
    // Delete the post
    await ctx.db.delete(args.postId);
    
    return {
      success: true,
      message: "Post deleted successfully"
    };
  },
});