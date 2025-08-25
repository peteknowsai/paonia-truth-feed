import { mutation } from "./_generated/server";

export const clearAllStories = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all posts from database
    const allPosts = await ctx.db.query("posts").collect();
    
    let deletedPosts = 0;
    let deletedVotes = 0;
    let deletedComments = 0;
    
    for (const post of allPosts) {
      // Delete all votes for this post
      const votes = await ctx.db
        .query("votes")
        .withIndex("by_post", (q) => q.eq("postId", post._id))
        .collect();
      
      for (const vote of votes) {
        await ctx.db.delete(vote._id);
        deletedVotes++;
      }
      
      // Delete all comments for this post
      const comments = await ctx.db
        .query("comments")
        .withIndex("by_post", (q) => q.eq("postId", post._id))
        .collect();
      
      for (const comment of comments) {
        await ctx.db.delete(comment._id);
        deletedComments++;
      }
      
      // Delete the post itself
      await ctx.db.delete(post._id);
      deletedPosts++;
    }
    
    return {
      message: `Database cleared successfully`,
      deletedPosts,
      deletedVotes,
      deletedComments
    };
  },
});