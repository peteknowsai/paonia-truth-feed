import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get comments for a post
export const getByPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("asc")
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
    const comment = await ctx.db.insert("comments", {
      ...args,
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