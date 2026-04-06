import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { pageSlug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pageComments")
      .withIndex("by_page", (q) => q.eq("pageSlug", args.pageSlug))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    pageSlug: v.string(),
    userId: v.string(),
    username: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.content.trim()) {
      throw new Error("Comment cannot be empty");
    }
    return await ctx.db.insert("pageComments", {
      ...args,
      content: args.content.trim(),
      createdAt: Date.now(),
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("pageComments"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.userId !== args.userId) {
      throw new Error("You can only delete your own comments");
    }
    await ctx.db.delete(args.commentId);
    return { success: true };
  },
});
