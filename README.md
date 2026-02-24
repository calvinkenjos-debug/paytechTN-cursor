# PayTechTN - Payments & Banking Community Website

The community for engineers, architects, and innovators shaping fintech in India.

🌐 **Live Site:** [paytechtn.com](https://paytechtn.com)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Git

### Run Locally

```bash
# Clone the repository
git clone https://github.com/calvinkenjos-debug/paytechTN-cursor.git
cd paytechTN-cursor

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3001
```

---

## 📋 Development Workflow

**⚠️ IMPORTANT:** Never push directly to `main` for major changes!

### Quick Way (Helper Script)

```bash
# Run the helper script
./dev.sh

# It will guide you through:
# 1. Creating feature branches
# 2. Pushing to preview
# 3. Going live
```

### Manual Way

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed workflow instructions.

**TL;DR:**
1. Create branch: `git checkout -b feature/your-feature`
2. Make changes & test locally
3. Push branch: `git push origin feature/your-feature`
4. Review preview URL in Vercel
5. Merge to main when ready

---

## 🏗️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Convex (real-time database)
- **Deployment:** Vercel
- **Domain:** paytechtn.com

---

## 📁 Project Structure

```
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── StatsSection.tsx
│   │   └── ...
│   └── ui/               # Reusable UI components
│       ├── card-stack.tsx
│       ├── PreviousSessionsModal.tsx
│       └── ...
├── convex/               # Backend functions & schema
│   ├── schema.ts
│   ├── signups.ts
│   └── resourceRequests.ts
├── data/                 # Static data
│   └── pastSessions.ts
├── pages/                # Page components
│   └── Index.tsx
├── public/               # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── ...
└── DEVELOPMENT.md        # Detailed workflow guide
```

---

## 🔧 Environment Variables

Create `.env.local` in the root:

```env
VITE_CONVEX_URL=https://gregarious-chameleon-406.convex.cloud
```

---

## 🚢 Deployment

### Automatic Deployment
- **Production:** Push to `main` → auto-deploys to paytechtn.com
- **Preview:** Push any branch → auto-creates preview URL

### Manual Deployment
```bash
# Vercel CLI
npx vercel
```

---

## 📊 Features

- ✅ Community sign-up forms (Convex backend)
- ✅ Past sessions showcase with CardStack UI
- ✅ Resource request system
- ✅ Code of conduct modal
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Event listings

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push and create preview
5. Get team review
6. Merge to main

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guidelines.

---

## 📧 Contact

- **Email:** paytechtn@gmail.com
- **LinkedIn:** [PayTechTN](https://www.linkedin.com/company/paytechtn/)
- **Website:** [paytechtn.com](https://paytechtn.com)

---

## 📝 License

Organized by Finzly. Built for the fintech community.

---

**Need help?** Check [DEVELOPMENT.md](./DEVELOPMENT.md) or contact the team.
