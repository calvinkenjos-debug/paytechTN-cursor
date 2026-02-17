import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table to store community sign-ups
  signups: defineTable({
    fullName: v.string(),
    email: v.string(),
    whatsappNumber: v.string(),
    linkedinUrl: v.string(),
    role: v.string(),
    createdAt: v.number(), // timestamp
  })
    .index("by_email", ["email"]) // Index to quickly find by email
    .index("by_createdAt", ["createdAt"]), // Index to sort by date

  // Table to store resource access requests
  resourceRequests: defineTable({
    email: v.string(),
    sessionId: v.string(), // Which session/event they're requesting resources for
    sessionTitle: v.string(), // Title of the session for easy reference
    createdAt: v.number(), // timestamp
  })
    .index("by_email", ["email"])
    .index("by_sessionId", ["sessionId"])
    .index("by_createdAt", ["createdAt"]),
});
