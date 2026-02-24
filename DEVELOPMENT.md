# PayTechTN Development Workflow

## Overview

This project uses a **branch-based workflow** to ensure changes are reviewed before going live on paytechtn.com.

---

## ⚠️ Important Rules

- ✅ **DO**: Create a feature branch for any changes
- ✅ **DO**: Test locally before pushing
- ✅ **DO**: Review preview URL before merging to main
- ❌ **DON'T**: Push directly to `main` for major changes
- ✅ **OK**: Small fixes (typos, content updates) can go directly to `main`

---

## 🚀 Development Workflow

### Step 1: Create Feature Branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create a new feature branch (use descriptive names)
git checkout -b feature/add-blog-section
# or
git checkout -b fix/hero-video-loading
# or
git checkout -b update/event-dates
```

**Branch naming convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `update/` - Content or minor updates

---

### Step 2: Make Changes & Test Locally

```bash
# Start dev server
npm run dev

# Your site will be at: http://localhost:3001/
# Test your changes thoroughly
```

**What to test:**
- ✅ All links work
- ✅ Forms submit correctly
- ✅ Mobile view looks good
- ✅ No console errors
- ✅ All sections render properly

---

### Step 3: Commit Your Changes

```bash
# Add files
git add .

# Commit with a clear message
git commit -m "Add blog section with recent posts"
```

---

### Step 4: Push Feature Branch

```bash
# Push your feature branch (NOT main!)
git push origin feature/add-blog-section
```

---

### Step 5: Review Preview URL

**Vercel automatically creates a preview deployment:**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project: `paytechtn-cursor`
3. Look for the deployment with your branch name
4. You'll see a **Preview URL** like: `paytechtn-cursor-git-feature-add-blog-abc123.vercel.app`

**This preview URL:**
- ✅ Has your changes
- ✅ Is NOT live on paytechtn.com
- ✅ Can be shared with team for review
- ✅ Uses the same Convex database

**Share this URL with your team to review!**

---

### Step 6: Merge to Main (Go Live)

Once you and your team are happy with the preview:

```bash
# Switch back to main
git checkout main

# Pull latest changes (in case team made other updates)
git pull origin main

# Merge your feature branch
git merge feature/add-blog-section

# Push to main (THIS GOES LIVE!)
git push origin main
```

**Within 2 minutes, your changes will be live at paytechtn.com**

---

### Step 7: Clean Up

Delete the feature branch:

```bash
# Delete local branch
git branch -d feature/add-blog-section

# Delete remote branch
git push origin --delete feature/add-blog-section
```

---

## 🎯 Quick Reference

### Starting New Feature
```bash
git checkout main
git pull
git checkout -b feature/your-feature-name
# ... make changes ...
npm run dev  # test locally
git add .
git commit -m "Your message"
git push origin feature/your-feature-name
# Review preview URL in Vercel
```

### Going Live
```bash
git checkout main
git pull
git merge feature/your-feature-name
git push origin main  # 🚀 LIVE!
```

---

## 🆘 Common Scenarios

### Scenario 1: Urgent Typo Fix
**Small content fixes can go directly to main:**

```bash
git checkout main
git pull
# Fix the typo
git add .
git commit -m "Fix typo in hero section"
git push origin main
```

---

### Scenario 2: Multiple People Working

**Person A** is working on blog, **Person B** is fixing events:

```bash
# Person A
git checkout -b feature/add-blog

# Person B
git checkout -b fix/event-dates

# Each person works independently
# Each person pushes their branch
# Each person reviews their own preview URL
# Team decides which to merge first
```

---

### Scenario 3: Need to Undo Changes

**Before merging to main:**
```bash
# Just delete the branch
git branch -D feature/bad-idea
git push origin --delete feature/bad-idea
```

**After pushing to main (already live):**
```bash
# Revert the last commit
git revert HEAD
git push origin main
```

---

## 📊 Workflow Diagram

```
┌──────────────┐
│  main branch │  ← Always clean, always deployable
│ (paytechtn)  │  ← Goes to paytechtn.com
└──────┬───────┘
       │
       ├──→ feature/add-blog ──→ Preview URL ──→ Review ──→ Merge back
       │
       ├──→ fix/hero-video ──→ Preview URL ──→ Review ──→ Merge back
       │
       └──→ update/events ──→ Preview URL ──→ Review ──→ Merge back
```

---

## 🔒 Protection Settings (Recommended)

To prevent accidental pushes to main, set up branch protection on GitHub:

1. Go to: `https://github.com/calvinkenjos-debug/paytechTN-cursor/settings/branches`
2. Click **"Add branch protection rule"**
3. Branch name pattern: `main`
4. Enable:
   - ☑️ Require pull request before merging
   - ☑️ Require status checks to pass (if using CI)

**This forces you to use pull requests** instead of direct pushes to main.

---

## 💡 Tips

1. **Name branches clearly**: `feature/blog-posts` not `test` or `new-stuff`
2. **Commit often**: Small commits are easier to review
3. **Test everything**: If it works in preview, it'll work in production
4. **Share preview URLs**: Get team feedback before going live
5. **Keep main clean**: Never commit broken code to main

---

## 🎓 Learning Resources

- [Git Branching Basics](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [Vercel Preview Deployments](https://vercel.com/docs/deployments/preview-deployments)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Questions?** Contact the team lead or check the main README.
