import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new resource request
export const create = mutation({
  args: {
    email: v.string(),
    sessionId: v.string(),
    sessionTitle: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if this email has already requested this specific resource
    const existing = await ctx.db
      .query("resourceRequests")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .first();

    if (existing) {
      // Allow re-requests but update timestamp
      await ctx.db.patch(existing._id, {
        createdAt: Date.now(),
      });
      return existing._id;
    }

    // Create new resource request
    const requestId = await ctx.db.insert("resourceRequests", {
      email: args.email,
      sessionId: args.sessionId,
      sessionTitle: args.sessionTitle,
      createdAt: Date.now(),
    });

    return requestId;
  },
});

// Get all resource requests (for admin)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("resourceRequests")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// Get resource requests by session
export const listBySession = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resourceRequests")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();
  },
});

// Get count of total resource requests
export const count = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("resourceRequests").collect();
    return requests.length;
  },
});
