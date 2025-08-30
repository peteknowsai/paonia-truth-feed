import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const submit = mutation({
  args: {
    type: v.union(v.literal("feedback"), v.literal("question"), v.literal("story")),
    message: v.string(),
    contactInfo: v.optional(v.string()),
    userId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    // Store in database
    const feedbackId = await ctx.db.insert("feedback", {
      type: args.type,
      message: args.message,
      contactInfo: args.contactInfo,
      userId: args.userId,
      username: args.username,
      createdAt: Date.now(),
      status: "new",
    });
    
    // Trigger email notification
    await ctx.scheduler.runAfter(0, api.resend.sendFeedbackEmail, {
      type: args.type,
      message: args.message,
      contactInfo: args.contactInfo,
      username: args.username,
    });
    
    return feedbackId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("feedback")
      .order("desc")
      .take(100);
  },
});