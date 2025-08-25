import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addStory = mutation({
  args: {
    title: v.string(),
    content: v.string(), // AI Summary
    storyAnalysis: v.optional(v.string()), // Full AI Story Analysis
    ai_persona: v.string(),
    points: v.optional(v.number()),
    relatedInitiatives: v.optional(v.array(v.string())),
    submittedBy: v.optional(v.string()), // User ID
    submittedByEmail: v.optional(v.string()), // User email
  },
  handler: async (ctx, args) => {
    const newPost = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      storyAnalysis: args.storyAnalysis || "",
      ai_persona: args.ai_persona,
      points: args.points || 0,
      time_ago: "just now",
      comments: 0,
      relatedInitiatives: args.relatedInitiatives || [],
      createdAt: Date.now(),
      submittedBy: args.submittedBy,
      submittedByEmail: args.submittedByEmail,
    });
    
    return {
      success: true,
      postId: newPost,
      message: "Story added successfully"
    };
  },
});