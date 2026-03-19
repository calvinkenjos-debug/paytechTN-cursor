import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const NOTIFY_EMAILS = [
  "joseph@paytechtn.com",
  "pavithra@paytechtn.com",
  "joseph.calvin@finzly.com",
  "pavithra.l@finzly.com",
];

// Mutation to create a new sign-up (used by action and for backwards compatibility)
export const create = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    whatsappNumber: v.string(),
    linkedinUrl: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("signups")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return existing._id as string;
    }

    // Insert new sign-up
    const signupId = await ctx.db.insert("signups", {
      fullName: args.fullName,
      email: args.email,
      whatsappNumber: args.whatsappNumber,
      linkedinUrl: args.linkedinUrl,
      role: args.role,
      createdAt: Date.now(),
    });

    return signupId;
  },
});

// Action: create signup + send email to both team addresses
export const createAndNotify = action({
  args: {
    fullName: v.string(),
    email: v.string(),
    whatsappNumber: v.string(),
    linkedinUrl: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const signupId: string = await ctx.runMutation(api.signups.create, args);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return signupId;

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
        subject: `[PayTechTN] New community signup: ${args.fullName}`,
        html: `
          <h2>New signup</h2>
          <p><strong>Name:</strong> ${args.fullName}</p>
          <p><strong>Email:</strong> ${args.email}</p>
          <p><strong>WhatsApp:</strong> ${args.whatsappNumber}</p>
          <p><strong>LinkedIn:</strong> <a href="${args.linkedinUrl}">${args.linkedinUrl}</a></p>
          <p><strong>Role:</strong> ${args.role}</p>
        `,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend signup email failed:", res.status, err);
    }
    return signupId;
  },
});

// Query to get all sign-ups (for admin purposes)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("signups")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// Query to get total count of sign-ups
export const count = query({
  args: {},
  handler: async (ctx) => {
    const signups = await ctx.db.query("signups").collect();
    return signups.length;
  },
});
