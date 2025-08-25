import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

// Get all posts sorted by votes (highest first)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_creation")
      .order("desc")
      .collect();
    
    // Get vote counts for each post
    const postsWithVotes = await Promise.all(
      posts.map(async (post) => {
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
      })
    );
    
    // Sort by points (highest first), then by creation date for ties
    postsWithVotes.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.createdAt - a.createdAt;
    });
    
    return postsWithVotes;
  },
});

// Get posts filtered by initiative, sorted by votes
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
    
    // Get vote counts for each post
    const postsWithVotes = await Promise.all(
      filteredPosts.map(async (post) => {
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
      })
    );
    
    // Sort by points (highest first), then by creation date for ties
    postsWithVotes.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.createdAt - a.createdAt;
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