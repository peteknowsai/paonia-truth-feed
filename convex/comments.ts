import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get comments for a post
export const getByPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("desc") // Show newest comments first
      .collect();
    
    return comments;
  },
});

// Create a new comment
export const create = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
    username: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate content
    if (!args.content.trim()) {
      throw new Error("Comment cannot be empty");
    }
    
    const comment = await ctx.db.insert("comments", {
      ...args,
      content: args.content.trim(),
      points: 0,
      time_ago: "just now",
      createdAt: Date.now(),
    });
    
    // Update comment count on the post
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, {
        comments: post.comments + 1,
      });
    }
    
    return comment;
  },
});

// Delete a comment
export const deleteComment = mutation({
  args: {
    commentId: v.id("comments"),
    userId: v.string(),
    isAdmin: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    
    if (!comment) {
      throw new Error("Comment not found");
    }
    
    // Check if user owns the comment or is admin
    if (comment.userId !== args.userId && !args.isAdmin) {
      throw new Error("You can only delete your own comments");
    }
    
    // Update comment count on post
    const post = await ctx.db.get(comment.postId);
    if (post) {
      await ctx.db.patch(comment.postId, {
        comments: Math.max(0, post.comments - 1),
      });
    }
    
    // Delete the comment
    await ctx.db.delete(args.commentId);
    
    return { success: true };
  },
});