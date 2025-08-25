import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    sourceUrl: v.optional(v.string()),
    sourceType: v.optional(v.string()),
    sourceTitle: v.optional(v.string()),
    content: v.string(),
    points: v.number(),
    ai_persona: v.string(),
    time_ago: v.string(),
    comments: v.number(),
    relatedInitiatives: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index("by_creation", ["createdAt"]),

  votes: defineTable({
    postId: v.id("posts"),
    userId: v.string(), // We'll use a session ID for now
    vote: v.union(v.literal("up"), v.literal("down")),
  })
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),

  comments: defineTable({
    postId: v.id("posts"),
    userId: v.string(),
    username: v.string(),
    content: v.string(),
    points: v.number(),
    time_ago: v.string(),
    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_creation", ["createdAt"]),
});