import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

// Helper function to parse date strings like "Aug-25" to sortable values
function parseDateString(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  
  const monthMap: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };
  
  const [month, year] = dateStr.split('-');
  const monthNum = monthMap[month] || 1;
  const yearNum = parseInt('20' + year, 10);
  
  return yearNum * 100 + monthNum; // Creates sortable value like 202508 for Aug-25
}

// Get all posts sorted by date (newest first)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_creation")
      .order("desc")
      .collect();
    
    // Get vote counts and bomb counts for each post
    const postsWithVotes = await Promise.all(
      posts.map(async (post) => {
        const votes = await ctx.db
          .query("votes")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        const bombs = await ctx.db
          .query("bombs")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        const upvotes = votes.filter(v => v.vote === "up").length;
        const downvotes = votes.filter(v => v.vote === "down").length;
        const totalVotes = post.points + upvotes - downvotes;
        
        return {
          ...post,
          points: totalVotes,
          bombCount: bombs.length,
        };
      })
    );
    
    // Sort by date (newest first)
    postsWithVotes.sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return dateB - dateA; // Newest first
    });
    
    return postsWithVotes;
  },
});

// Get posts filtered by initiative, sorted by date (newest first)
export const listByInitiative = query({
  args: { initiative: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_creation")
      .order("desc")
      .collect();
    
    const filteredPosts = posts.filter(post => 
      post.relatedInitiatives?.includes(args.initiative)
    );
    
    // Get vote counts and bomb counts for each post
    const postsWithVotes = await Promise.all(
      filteredPosts.map(async (post) => {
        const votes = await ctx.db
          .query("votes")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        const bombs = await ctx.db
          .query("bombs")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();
        
        const upvotes = votes.filter(v => v.vote === "up").length;
        const downvotes = votes.filter(v => v.vote === "down").length;
        const totalVotes = post.points + upvotes - downvotes;
        
        return {
          ...post,
          points: totalVotes,
          bombCount: bombs.length,
        };
      })
    );
    
    // Sort by date (newest first)
    postsWithVotes.sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return dateB - dateA; // Newest first
    });
    
    return postsWithVotes;
  },
});

// Get a single post by ID
export const get = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;
    
    // Get vote count
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_post", (q) => q.eq("postId", post._id))
      .collect();
    
    const upvotes = votes.filter(v => v.vote === "up").length;
    const downvotes = votes.filter(v => v.vote === "down").length;
    const totalVotes = post.points + upvotes - downvotes;
    
    return {
      ...post,
      points: totalVotes,
    };
  },
});

// Create a new post
export const create = mutation({
  args: {
    title: v.string(),
    sourceUrl: v.optional(v.string()),
    sourceType: v.optional(v.string()),
    sourceTitle: v.optional(v.string()),
    content: v.string(),
    ai_persona: v.string(),
    relatedInitiatives: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.insert("posts", {
      ...args,
      points: 0,
      comments: 0,
      time_ago: "just now",
      createdAt: Date.now(),
    });
    return post;
  },
});