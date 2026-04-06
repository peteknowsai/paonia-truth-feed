import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const trackInterest = mutation({
  args: {
    questionSlug: v.string(),
    userId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("coraTracking")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const match = existing.find((e) => e.questionSlug === args.questionSlug);
    if (match) {
      // Toggle off
      await ctx.db.delete(match._id);
      return { action: "removed" as const };
    }

    await ctx.db.insert("coraTracking", {
      questionSlug: args.questionSlug,
      userId: args.userId,
      username: args.username,
      status: "interested",
      createdAt: Date.now(),
    });
    return { action: "created" as const };
  },
});

export const updateStatus = mutation({
  args: {
    trackingId: v.id("coraTracking"),
    userId: v.string(),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db.get(args.trackingId);
    if (!record) throw new Error("Tracking record not found");
    if (record.userId !== args.userId) {
      throw new Error("You can only update your own tracking");
    }
    await ctx.db.patch(args.trackingId, {
      status: args.status,
      notes: args.notes,
    });
    return { success: true };
  },
});

export const getByQuestion = query({
  args: { questionSlug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("coraTracking")
      .withIndex("by_question", (q) =>
        q.eq("questionSlug", args.questionSlug)
      )
      .collect();
  },
});

export const getUserTracking = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    return await ctx.db
      .query("coraTracking")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
