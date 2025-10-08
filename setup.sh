#!/bin/bash

# Todo List App - Setup Script
# This script sets up the application automatically

set -e  # Exit on error

echo "================================"
echo "Todo List App - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Run Prisma migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init
echo "✅ Database migrations completed"
echo ""

# Seed the database
echo "🌱 Seeding database with test data..."
npm run seed
echo "✅ Database seeded successfully"
echo ""

# Generate Prisma Client
echo "⚙️  Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Test Accounts:"
echo "  Username: alice, bob, or charlie"
echo "  Password: password123"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "The app will be available at:"
echo "  http://localhost:5173"
echo ""
echo "For more information, see:"
echo "  - README.md - Complete documentation"
echo "  - QUICKSTART.md - Quick start guide"
echo "  - DOCUMENTATION_INDEX.md - All docs"
echo ""
echo "Happy coding! 🚀"
