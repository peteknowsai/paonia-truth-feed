import { mutation } from "./_generated/server";
import { mockPosts } from "../src/lib/mockData";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already have posts
    const existingPosts = await ctx.db.query("posts").take(1);
    if (existingPosts.length > 0) {
      console.log("Database already seeded");
      return { message: "Database already seeded" };
    }
    
    // Seed posts
    const postIdMap: Record<string, any> = {};
    
    for (const post of mockPosts) {
      const { id, ...postData } = post;
      // Ensure all required fields are present
      const seedData = {
        title: postData.title,
        content: postData.content || "",
        points: postData.points || 0,
        ai_persona: postData.ai_persona || "AI Analyst",
        time_ago: postData.time_ago || "just now",
        comments: postData.comments || 0,
        sourceUrl: postData.sourceUrl,
        sourceType: postData.sourceType,
        sourceTitle: postData.sourceTitle,
        relatedInitiatives: postData.relatedInitiatives,
        tags: postData.tags,
        createdAt: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000, // Random time in last week
      };
      
      const newPostId = await ctx.db.insert("posts", seedData);
      postIdMap[id] = newPostId;
    }
    
    // Create some sample comments for the first few posts
    const sampleComments = [
      { username: "ConcernedCitizen", content: "This needs more attention from the community.", points: 12 },
      { username: "LocalResident", content: "I was at this meeting and can confirm these details.", points: 8 },
      { username: "TaxpayerJoe", content: "Where can we access the full documents referenced?", points: 5 },
      { username: "PaoniaNative", content: "Thank you for making this information accessible.", points: 15 },
    ];
    
    // Add a few comments to the first 3 posts
    const postIds = Object.values(postIdMap).slice(0, 3);
    for (const postId of postIds) {
      for (const comment of sampleComments.slice(0, 2)) {
        await ctx.db.insert("comments", {
          postId,
          userId: `user_${Math.random().toString(36).substr(2, 9)}`,
          username: comment.username,
          content: comment.content,
          points: comment.points,
          time_ago: "2 hours ago",
          createdAt: Date.now() - Math.random() * 6 * 60 * 60 * 1000,
        });
      }
    }
    
    return { 
      message: "Database seeded successfully",
      postsCreated: mockPosts.length,
      commentsCreated: postIds.length * 2
    };
  },
});