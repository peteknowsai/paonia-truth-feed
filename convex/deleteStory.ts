import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteStory = mutation({
  args: { 
    postId: v.id("posts") 
  },
  handler: async (ctx, args) => {
    // Delete all votes for this post
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    
    for (const vote of votes) {
      await ctx.db.delete(vote._id);
    }
    
    // Delete all comments for this post
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
    
    // Delete the post itself
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.delete(args.postId);
      return {
        success: true,
        message: `Deleted story: ${post.title}`
      };
    } else {
      return {
        success: false,
        message: "Story not found"
      };
    }
  },
});