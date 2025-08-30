import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updatePostContent = mutation({
  args: {
    postId: v.id("posts"),
    facts: v.optional(v.string()),
    story: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.postId, {
      facts: args.facts,
      story: args.story,
    });
    return { success: true };
  },
});