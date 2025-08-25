import { mutation } from "./_generated/server";
import { mockPosts } from "../src/lib/mockData";

export const removeMockStories = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all mock post titles for reference
    const mockTitles = mockPosts.map(post => post.title);
    
    // Get all posts from database
    const allPosts = await ctx.db.query("posts").collect();
    
    let deletedCount = 0;
    let keptCount = 0;
    const keptTitles: string[] = [];
    
    for (const post of allPosts) {
      // Check if this post title matches any mock post title
      if (mockTitles.includes(post.title)) {
        // Delete the post
        await ctx.db.delete(post._id);
        
        // Also delete all votes for this post
        const votes = await ctx.db
          .query("votes")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        for (const vote of votes) {
          await ctx.db.delete(vote._id);
        }
        
        // Also delete all comments for this post
        const comments = await ctx.db
          .query("comments")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        for (const comment of comments) {
          await ctx.db.delete(comment._id);
        }
        
        deletedCount++;
      } else {
        // Keep stories that aren't in the mock data (like the Brunner context story)
        keptCount++;
        keptTitles.push(post.title);
      }
    }
    
    return {
      message: `Removed ${deletedCount} mock stories, kept ${keptCount} real stories`,
      deletedCount,
      keptCount,
      keptTitles
    };
  },
});