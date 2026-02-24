#!/bin/bash

# PayTechTN Quick Development Script
# Makes it easy to follow the branch-based workflow

set -e  # Exit on error

echo "🚀 PayTechTN Development Helper"
echo "================================"
echo ""

# Function to show menu
show_menu() {
    echo "What would you like to do?"
    echo ""
    echo "1) Start new feature (create branch & start dev server)"
    echo "2) Push current changes to preview"
    echo "3) Go live (merge to main and deploy)"
    echo "4) Cancel and return to main"
    echo ""
    read -p "Enter choice [1-4]: " choice
    
    case $choice in
        1) start_feature ;;
        2) push_preview ;;
        3) go_live ;;
        4) cancel_feature ;;
        *) echo "Invalid choice"; exit 1 ;;
    esac
}

# Start new feature
start_feature() {
    echo ""
    echo "📝 Starting new feature..."
    
    # Make sure we're on main and up to date
    git checkout main
    git pull origin main
    
    # Ask for feature name
    echo ""
    read -p "Enter feature name (e.g., 'add-blog' or 'fix-hero'): " feature_name
    
    # Determine branch type
    echo ""
    echo "What type of change?"
    echo "1) New feature"
    echo "2) Bug fix"
    echo "3) Content update"
    read -p "Enter choice [1-3]: " change_type
    
    case $change_type in
        1) prefix="feature" ;;
        2) prefix="fix" ;;
        3) prefix="update" ;;
        *) prefix="feature" ;;
    esac
    
    branch_name="$prefix/$feature_name"
    
    # Create and switch to branch
    git checkout -b "$branch_name"
    
    echo ""
    echo "✅ Created branch: $branch_name"
    echo "📂 You are now on: $(git branch --show-current)"
    echo ""
    echo "🔧 Starting dev server..."
    echo "   Your site will be at: http://localhost:3001/"
    echo ""
    echo "Press Ctrl+C when done testing"
    echo ""
    
    # Start dev server
    npm run dev
}

# Push changes to preview
push_preview() {
    current_branch=$(git branch --show-current)
    
    if [ "$current_branch" = "main" ]; then
        echo "⚠️  You're on main branch!"
        echo "Please create a feature branch first (option 1)"
        exit 1
    fi
    
    echo ""
    echo "📤 Pushing $current_branch to GitHub..."
    echo ""
    
    # Add all changes
    git add .
    
    # Ask for commit message
    read -p "Enter commit message: " commit_msg
    
    # Commit
    git commit -m "$commit_msg"
    
    # Push
    git push origin "$current_branch"
    
    echo ""
    echo "✅ Pushed successfully!"
    echo ""
    echo "🔗 Preview URL will be available at:"
    echo "   https://vercel.com/calvinkenjos-debug/paytechtn-cursor"
    echo ""
    echo "   Look for deployment with branch: $current_branch"
    echo ""
}

# Go live (merge to main)
go_live() {
    current_branch=$(git branch --show-current)
    
    if [ "$current_branch" = "main" ]; then
        echo "⚠️  You're already on main"
        exit 1
    fi
    
    echo ""
    echo "🚨 GOING LIVE - This will deploy to paytechtn.com!"
    echo ""
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        echo "Cancelled"
        exit 0
    fi
    
    echo ""
    echo "🔄 Merging to main..."
    
    # Switch to main
    git checkout main
    
    # Pull latest
    git pull origin main
    
    # Merge feature branch
    git merge "$current_branch"
    
    # Push to main (goes live!)
    git push origin main
    
    echo ""
    echo "🎉 LIVE! Changes will be at paytechtn.com in ~2 minutes"
    echo ""
    
    # Ask to delete branch
    read -p "Delete feature branch $current_branch? (yes/no): " delete_branch
    
    if [ "$delete_branch" = "yes" ]; then
        git branch -d "$current_branch"
        git push origin --delete "$current_branch"
        echo "🗑️  Branch deleted"
    fi
    
    echo ""
    echo "✅ All done!"
}

# Cancel feature
cancel_feature() {
    current_branch=$(git branch --show-current)
    
    if [ "$current_branch" = "main" ]; then
        echo "Already on main"
        exit 0
    fi
    
    echo ""
    echo "⚠️  This will discard changes in $current_branch"
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        exit 0
    fi
    
    git checkout main
    git branch -D "$current_branch"
    
    echo "✅ Returned to main, branch deleted"
}

# Run menu
show_menu
