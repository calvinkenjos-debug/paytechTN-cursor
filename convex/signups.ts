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

// Action: create signup + send notification to team + welcome email to user
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

    const firstName = args.fullName.split(' ')[0];

    // 1. Send admin notification email
    const from = process.env.RESEND_FROM_EMAIL ?? "PayTechTN <onboarding@resend.dev>";
    const adminRes = await fetch("https://api.resend.com/emails", {
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
    if (!adminRes.ok) {
      const err = await adminRes.text();
      console.error("Resend admin notification failed:", adminRes.status, err);
    }

    // 2. Send welcome email to the new member
    const welcomeRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Pavithra @ PayTechTN <pavithra@paytechtn.com>",
        to: [args.email],
        subject: "Welcome to PayTechTN — Chennai's Payments Community 🎉",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #ff5533; font-size: 28px; margin-bottom: 20px;">Welcome to PayTechTN, ${firstName}! 👋</h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Thank you for joining Tamil Nadu's premier payments and banking professional community. You're now part of a network of 500+ fintech engineers, architects, product managers, and innovators shaping the future of payments in India.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              PayTechTN brings together practitioners with real, production experience — every speaker has shipped payments systems handling billions of transactions. Whether you're working on UPI, SWIFT GPI, cross-border payments, or fintech infrastructure, you'll find your tribe here.
            </p>

            <h2 style="color: #ff5533; font-size: 20px; margin-top: 32px; margin-bottom: 16px;">Join the WhatsApp Group</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Connect with fellow payments professionals, get event reminders, and participate in discussions:
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://chat.whatsapp.com/IvTrHOUmI3HHP3K9Eo3b7d" 
                 style="display: inline-block; background: #25D366; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Join WhatsApp Community →
              </a>
            </div>

            <h2 style="color: #ff5533; font-size: 20px; margin-top: 32px; margin-bottom: 16px;">Next Event: March 27, 2026</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">
              <strong>Instant Cross-Border Payments — Panel Discussion & Networking Mixer</strong>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 20px;">
              📅 Friday, March 27 · 5:00 PM IST<br/>
              📍 StartupTN Office, Nandanam, Chennai<br/>
              🎫 Free to attend
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Join Chennai's payments community for an evening of practical insights on SWIFT GPI, real-time settlement realities, FX liquidity challenges, and bank implementation strategies from practitioners building at scale.
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://luma.com/dalvho7w" 
                 style="display: inline-block; background: #ff5533; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Register for Event →
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />

            <p style="font-size: 14px; line-height: 1.6; color: #999; margin-top: 32px;">
              Looking forward to seeing you at our events,<br/>
              <strong style="color: #333;">Pavithra</strong><br/>
              PayTechTN
            </p>

            <p style="font-size: 12px; color: #999; margin-top: 24px;">
              <a href="https://paytechtn.com" style="color: #ff5533; text-decoration: none;">paytechtn.com</a> · 
              <a href="https://www.linkedin.com/company/paytechtn/" style="color: #ff5533; text-decoration: none;">LinkedIn</a> · 
              <a href="mailto:paytechtn@gmail.com" style="color: #ff5533; text-decoration: none;">paytechtn@gmail.com</a>
            </p>
          </div>
        `,
      }),
    });
    if (!welcomeRes.ok) {
      const err = await welcomeRes.text();
      console.error("Resend welcome email failed:", welcomeRes.status, err);
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
