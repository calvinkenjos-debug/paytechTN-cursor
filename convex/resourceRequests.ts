import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const NOTIFY_EMAILS = [
  "joseph@paytechtn.com",
  "pavithra@paytechtn.com",
  "joseph.calvin@finzly.com",
  "pavithra.l@finzly.com",
];

// Create a new resource request (used by action and for backwards compatibility)
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

// Action: create resource request + send email to both team addresses
export const createAndNotify = action({
  args: {
    email: v.string(),
    sessionId: v.string(),
    sessionTitle: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const requestId: string = await ctx.runMutation(api.resourceRequests.create, args);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return requestId;

    const from = process.env.RESEND_FROM_EMAIL ?? "PayTechTN <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: NOTIFY_EMAILS,
        subject: `[PayTechTN] Resource request: ${args.sessionTitle}`,
        html: `
          <h2>New resource request</h2>
          <p><strong>Session:</strong> ${args.sessionTitle}</p>
          <p><strong>Requested by:</strong> ${args.email}</p>
          <p><strong>Session ID:</strong> ${args.sessionId}</p>
        `,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend resource-request email failed:", res.status, err);
    }
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
