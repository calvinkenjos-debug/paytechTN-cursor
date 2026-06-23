# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Adding a New Event/Session

1. **Add to `data/pastSessions.ts`**:
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

2. **Images**: Place in `public/` and reference as `/filename` or external URL.

3. **Rebuild**: Run `npm run build` to trigger prerender and generate static HTML.

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

| File | Purpose |
|------|---------|
| `pages/Index.tsx` | Main landing page; orchestrates all section components |
| `convex/schema.ts` | Database tables and indexes |
| `lib/validation.ts` | Input validation schemas and sanitizers |
| `data/pastSessions.ts` | Static event data; source of truth for sessions |
| `prerender.mjs` | Runs after build to generate static HTML for SEO |
| `vite.config.ts` | Vite build config; defines port 3000, React plugin, path alias |

---

## Related Resources

- [Convex Docs](https://docs.convex.dev) — Database, mutations, queries
- [Vite Docs](https://vitejs.dev) — Build tool, SSR/prerendering
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Joi Validation](https://joi.dev) — Input validation
- [Framer Motion](https://www.framer.com/motion) — Animations
- [Claude.md for PayTechTN Community](./claude.md) — Community platform management guidelines