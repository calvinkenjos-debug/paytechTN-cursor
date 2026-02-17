import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create a new sign-up
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
      throw new Error("This email is already registered!");
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
