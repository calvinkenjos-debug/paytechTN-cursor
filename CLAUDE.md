# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Reference

**What is this?** A landing page website for the PayTechTN community platform built with React + Vite + Convex.

**Core Stack**: React 19 • Vite 6 • Convex • Tailwind CSS • TypeScript

**Key Pattern**: Single landing page (`pages/Index.tsx`) composed from reusable section components in `components/landing/`.

**Database**: Convex (serverless BaaS) with two tables: `signups` (community registrations) and `resourceRequests` (event resource requests).

**Deployment**: Vercel + static prerendering for SEO (runs after build).

**Quick Commands**:
- `npm run dev` — Start dev server on port 3000
- `npm run build` — Build + prerender to static HTML
- Add events → Edit `data/pastSessions.ts`
- Update backend → Edit `convex/` + run `npx convex dev`

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Database Schema](#database-schema--convex)
4. [Validation & Security](#validation--security)
5. [Common Tasks](#common-tasks)
6. [Styling System](#styling-system)
7. [Deployment](#deployment)
8. [Performance Notes](#performance-notes)
9. [Debugging Tips](#debugging-tips)
10. [Key Files](#key-files-to-know)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production with static prerendering
npm run build

# Preview production build locally
npm run preview
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `VITE_CONVEX_URL`: Convex deployment URL
- `RESEND_API_KEY`: Email service API key
- `RESEND_FROM_EMAIL`: Sender email address
- `INDEXNOW_KEY`: For Bing/Yandex search indexing

---

## Architecture Overview

### Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6 (dev server on port 3000)
- **Backend/Database**: Convex (serverless BaaS)
- **Styling**: Tailwind CSS + clsx
- **Animations**: Framer Motion
- **Validation**: Joi (client-side) + Convex type system (server-side)
- **Deployment**: Vercel (configured in vercel.json)

### Project Structure

```
├── pages/                      # React page components
│   └── Index.tsx              # Main landing page (entry point)
├── components/
│   ├── landing/               # Page section components (Hero, Journey, etc.)
│   ├── ui/                    # Reusable UI components (modals, buttons, cards)
│   └── [Root]                 # Legacy components (being refactored into /landing)
├── convex/                    # Backend functions and schema
│   ├── schema.ts              # Database schema (signups, resourceRequests)
│   ├── signups.ts             # Signup mutations and queries
│   └── resourceRequests.ts    # Resource request functions
├── lib/
│   ├── validation.ts          # Input validation schemas (Joi) + sanitizers
│   └── utils.ts               # Helper functions
├── data/                      # Static data
│   └── pastSessions.ts        # Event/session data
├── prerender.mjs              # Static HTML generation for SEO
├── vite.config.ts             # Build configuration
└── tsconfig.json              # TypeScript configuration
```

### Key Architecture Decisions

1. **Single Landing Page**: All content lives in `pages/Index.tsx` composed from section components in `components/landing/`. No multi-page routing (yet).

2. **Static Prerendering**: `prerender.mjs` runs after `vite build` to render React to static HTML. This ensures Googlebot sees content without waiting for JS execution. Mocks browser globals (window, document, navigator) to run React in Node.

3. **Convex as Backend**: All user data (signups, resource requests) stored in Convex. Mutations validate input with Joi schemas before writing to database. Zero-knowledge about direct REST APIs.

4. **TypeScript @ Root**: Path alias `@/*` points to repository root, not a separate `src/` folder. This allows direct imports like `@/components/landing/HeroSection`.

5. **Data Files as SSG Source**: Events and sessions defined in `data/pastSessions.ts` (array of objects). No CMS — rebuild to update.

---

## Database Schema (Convex)

### `signups` Table
Stores community member signups.

```typescript
{
  fullName: string,
  email: string,
  whatsappNumber: string,  // E.164 format: +919999999999
  linkedinUrl: string,
  role: string,
  createdAt: number         // Timestamp
}
```

**Indexes**: `by_email`, `by_createdAt`

### `resourceRequests` Table
Stores requests for event/session resources (recordings, slides).

```typescript
{
  email: string,
  sessionId: string,        // Slug from pastSessions (e.g., "ai-in-payments")
  sessionTitle: string,     // Display name for reference
  createdAt: number
}
```

**Indexes**: `by_email`, `by_sessionId`, `by_createdAt`

---

## Validation & Security

### Input Validation (`lib/validation.ts`)

All user inputs validated via Joi schemas before Convex mutations:

- **Email**: RFC 5321 compliant, max 254 chars
- **Phone**: E.164 format (international), +1-15 digits
- **Name**: 2-100 chars, letters/spaces/hyphens/apostrophes only
- **Role**: 2-150 chars, alphanumeric + common punctuation
- **URL**: Valid http/https, max 2048 chars
- **Session ID**: Lowercase alphanumeric + hyphens only

### Sanitization

- `sanitizeForHTML()`: Escapes HTML special characters (XSS prevention)
- `sanitizeText()`: Removes control characters before storing

### Rate Limiting

Client-side rate limiting in `checkRateLimit()` prevents form submission spam using localStorage. Server-side Convex rate limits also apply.

---

## Common Tasks

### Events: upcoming vs past are two different mechanisms

There are **two separate event surfaces** — don't confuse them:

**Upcoming event** = a dedicated section component, `components/landing/UpcomingEventSection.tsx`, wired into `pages/Index.tsx` right after the hero (anchor `#upcoming-event`). It carries the full event details (date/time/format), a "what you'll hear" list, and the **Luma registration embed**. Registration is an embedded Luma iframe controlled by the `LUMA_EVENT_ID` constant at the top of that file:
- Set `LUMA_EVENT_ID` to the Luma event's API id (`evt-xxxxxxxx`, from Luma → Event → Settings → Embed) to render the live registration form.
- While it's empty, the section renders a "registration opening soon" fallback with a Luma link — safe to ship before the Luma page exists.
- The `components/ui/AnnouncementBanner.tsx` pill also advertises the current upcoming event and scrolls to `#upcoming-event`; update its text when the event changes.

When an upcoming event finishes, move it into `data/pastSessions.ts` (below) and update/replace `UpcomingEventSection.tsx` for the next one.

**Past sessions** = data-driven cards in `data/pastSessions.ts` (shown via the card stack / PreviousSessionsModal):
```typescript
{
  id: "session-slug",        // Must be unique, kebab-case
  title: "Session Title",
  description: "...",
  date: "DD Mon YYYY",
  format: "In-Person • Location" or "Webinar",
  imageSrc: "/path/or/https://...",
  href: "#"
}
```
Images: place in `public/` and reference as `/filename` or use an external URL. Then run `npm run build` to trigger prerender.

### Creating a New Component

- **Section component** (e.g., EventsSection): Place in `components/landing/`. Export default React.FC, accept props for callbacks (e.g., `onOpenModal`).
- **UI component** (reusable): Place in `components/ui/`. Keep stateless where possible.
- **Use TypeScript**: All components must be `.tsx` with type annotations.
- **Styling**: Tailwind classes + `clsx()` for conditional styling. No CSS modules.

### Handling Form Submissions

1. Validate on client with `lib/validation.ts` schemas
2. Call Convex mutation from `convex/signups.ts` or `convex/resourceRequests.ts`
3. Convex performs server-side validation + database insert
4. Return success/error to component
5. Show user feedback (toast, modal, redirect)

Example flow in `components/ui/SignUpModal.tsx`:
```typescript
const { error, value } = signupSchema.validate(formData);
if (error) { /* show error */ }
mutation.mutate(value);  // Fires Convex mutation
```

### Updating Convex Functions

- Edit files in `convex/` (queries, mutations)
- Use Convex CLI: `npx convex dev` or `npx convex deploy`
- Functions auto-generate TypeScript stubs in `convex/_generated/`
- Import and use in React: `const signup = useMutation(api.signups.submitSignup);`

---

## Styling System

- **Framework**: Tailwind CSS v3
- **Config**: `tailwind.config.js` (if it exists; otherwise uses Vite defaults)
- **Custom Classes**: Look in `components/ui/` for `.module.css` or inline class definitions
- **Color Scheme**: Check page for CSS variables (e.g., `--background`, `--primary`, `--accent`) in `<style>` tags or a global CSS file

---

## Deployment

- **Platform**: Vercel
- **Config**: `vercel.json` in root
- **Convex Deployment**: `VITE_CONVEX_URL` points to live backend
- **Build**: `npm run build` runs Vite build + prerender (generates dist/)
- **Environment**: `.env.local` not committed; set in Vercel project settings

---

## Performance Notes

- **Prerendering**: Runs after build; adds ~2-5 sec to build time. Allows Googlebot to see full HTML without JS.
- **Framer Motion**: Used for animations. Avoid heavy animations on low-end devices.
- **Image Optimization**: Use external CDNs (Unsplash, etc.) or optimize before uploading to `/public/`.
- **Bundle Size**: Monitor with `npm run build` console output. Aim to keep JS bundles under 200KB gzipped.

---

## Debugging Tips

1. **Dev Server Issues**: Clear `node_modules/.vite` cache if hot-reload fails.
2. **Convex Connection**: Check `VITE_CONVEX_URL` in `.env.local`. Verify network tab for failed requests to `*.convex.cloud`.
3. **Prerender Crashes**: Check `prerender.mjs` for Node.js-specific issues. Watch for missing global polyfills (window, document, navigator).
4. **TypeScript Errors**: Restart IDE; sometimes `convex/_generated/` types don't auto-update.
5. **Build Failures**: Run `npm install` again to ensure all dependencies are present.

---

## Key Files to Know

| File | Purpose | When to Edit |
|------|---------|--------------|
| `pages/Index.tsx` | Main landing page; orchestrates all section components | Layout changes, new sections |
| `components/landing/*` | Page section components (Hero, Journey, Stats, etc.) | Section content updates |
| `components/ui/*` | Reusable UI components (modals, buttons, cards) | Shared component logic |
| `convex/schema.ts` | Database tables and indexes | Add/modify user data fields |
| `convex/signups.ts` | Signup mutations and queries | User registration logic |
| `convex/resourceRequests.ts` | Resource request functions | Event resource requests |
| `lib/validation.ts` | Input validation schemas and sanitizers | Form field validation rules |
| `data/pastSessions.ts` | Static event/session data | Add/update events |
| `prerender.mjs` | Runs after build to generate static HTML for SEO | Prerendering issues |
| `vite.config.ts` | Vite build config; defines port 3000, React plugin, path alias | Build configuration |
| `tsconfig.json` | TypeScript compiler options | Type checking rules |
| `.env.example` | Environment variable template | Reference for required vars |

---

## File Navigation by Use Case

**"I need to update event content"**
- Edit `data/pastSessions.ts` (add/remove events)
- Update component text in `components/landing/EventsSection.tsx`
- Run `npm run build` to prerender

**"I need to modify the signup form"**
- Update form UI in `components/ui/SignUpModal.tsx`
- Update validation schema in `lib/validation.ts`
- Update Convex mutation in `convex/signups.ts` if DB fields change
- Update `convex/schema.ts` if adding new fields

**"I need to add a new page section"**
- Create new `.tsx` file in `components/landing/`
- Import and add to `pages/Index.tsx`
- Style with Tailwind classes

**"I need to fix a styling issue"**
- Check `components/ui/*` for component-specific styles
- Check `vite.config.ts` for global CSS
- Use Tailwind classes; avoid inline `<style>` tags

**"I need to deploy changes"**
- Ensure `.env.local` has correct `VITE_CONVEX_URL`
- Run `npm run build` locally to verify prerendering
- Push to git; Vercel auto-deploys on main branch

---

## Common Gotchas

1. **Prerendering fails silently**: Check browser console for React errors. The prerender script catches errors but may not show them.
2. **Convex functions not updating**: Run `npx convex dev` or `npx convex deploy` to sync backend. Auto-generated stubs in `_generated/` won't update without this.
3. **Form validation errors not showing**: Check both client-side (Joi in `lib/validation.ts`) and server-side (Convex validators).
4. **Images not loading**: Use relative paths `/filename` for files in `public/` or full HTTPS URLs. Avoid relative imports.
5. **Environment variables not working**: Must restart dev server after updating `.env.local`. Vite reads env vars at build time.
6. **Duplicate components — edit the right one**: The root `components/` folder holds legacy versions (`Hero.tsx`, `Events.tsx`, `Journey.tsx`, etc.) that are **not rendered**. The live page (`pages/Index.tsx`) imports only from `components/landing/`. Always edit the `landing/` version; the root duplicates are dead code pending cleanup.
7. **`Index.tsx` composition**: Live section order is Hero → UpcomingEvent → Stats → Journey → Finzly → FinalCTA. `ClientsSection` is intentionally commented out (awaiting logo permissions). The old `EventsSection.tsx` (built for a past cross-border event) is no longer wired in.

---

## Related Resources

- [Convex Docs](https://docs.convex.dev) — Database, mutations, queries, deployment
- [Vite Docs](https://vitejs.dev) — Build tool, SSR/prerendering, dev server
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Joi Validation](https://joi.dev) — Input validation schemas
- [Framer Motion](https://www.framer.com/motion) — React animation library
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Type system reference