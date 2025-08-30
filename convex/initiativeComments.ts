import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get comments for an initiative
export const list = query({
  args: { initiativeId: v.string() },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("initiativeComments")
      .withIndex("by_initiative", (q) => q.eq("initiativeId", args.initiativeId))
      .order("desc") // Show newest comments first
      .collect();
    
    return comments;
  },
});

// Create a new comment
export const create = mutation({
  args: {
    initiativeId: v.string(),
    userId: v.string(),
    username: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate content
    if (!args.content.trim()) {
      throw new Error("Comment cannot be empty");
    }
    
    const comment = await ctx.db.insert("initiativeComments", {
      ...args,
      content: args.content.trim(),
      createdAt: Date.now(),
    });
    
    return comment;
  },
});

// Delete a comment
export const deleteComment = mutation({
  args: {
    commentId: v.id("initiativeComments"),
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
    
    // Delete the comment
    await ctx.db.delete(args.commentId);
    
    return { success: true };
  },
});