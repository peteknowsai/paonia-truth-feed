import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  posts: defineTable({
    title: v.string(),
    sourceUrl: v.optional(v.string()),
    sourceType: v.optional(v.string()),
    sourceTitle: v.optional(v.string()),
    content: v.string(),
    storyAnalysis: v.optional(v.string()), // Full AI Story Analysis in markdown
    facts: v.optional(v.string()), // Fact section in markdown with links
    story: v.optional(v.string()), // Story section written by truth-nugget-writer
    points: v.number(),
    ai_persona: v.string(),
    time_ago: v.string(),
    comments: v.number(),
    relatedInitiatives: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    date: v.optional(v.string()), // Date in format like "Aug-25"
    createdAt: v.number(),
    submittedBy: v.optional(v.string()), // User ID who submitted the story
    submittedByEmail: v.optional(v.string()), // Email of submitter for reference
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

  initiativeVotes: defineTable({
    initiativeId: v.string(), // Initiative ID from types (e.g., 'str', 'email-transparency')
    userId: v.string(), // Clerk user ID
    username: v.optional(v.string()), // Username for display
    vote: v.union(v.literal("support"), v.literal("oppose")), // thumbs up or down
    createdAt: v.number(),
  })
    .index("by_initiative", ["initiativeId"])
    .index("by_user_and_initiative", ["userId", "initiativeId"]),

  bombs: defineTable({
    postId: v.id("posts"),
    userId: v.string(), // Clerk user ID
    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),

  initiativeComments: defineTable({
    initiativeId: v.string(), // Initiative ID (e.g., 'str', 'email-transparency')
    userId: v.string(),
    username: v.string(),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_initiative", ["initiativeId"])
    .index("by_creation", ["createdAt"]),

  feedback: defineTable({
    type: v.union(v.literal("feedback"), v.literal("question"), v.literal("story")),
    message: v.string(),
    contactInfo: v.optional(v.string()),
    userId: v.string(),
    username: v.string(),
    createdAt: v.number(),
    status: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
});