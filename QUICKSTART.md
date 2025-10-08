# Quick Start Guide

Get the Todo List App running in under 5 minutes!

## 🚀 Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Create database
npx prisma migrate dev --name init

# 3. Add test data
npm run seed

# 4. Start the app
npm run dev
```

## 🔑 Test Login

Open `http://localhost:5173` and login with:

```
Username: john
Password: password123
```

## ✨ What to Try

1. **Dashboard** - View your projects and tasks
2. **Create Project** - Click "Create Project" button
3. **Add Members** - Go to project → Members tab → Add Member
4. **Create Tasks** - Click "Add Task" in Kanban board
5. **Move Tasks** - Use buttons to change task status
6. **Create Labels** - Go to Labels → Create Label
7. **Assign Labels** - Edit a task and select labels

## 📖 Need More Help?

- `README.md` - Full project documentation
- `SETUP.md` - Detailed setup instructions
- `FEATURES.md` - Complete feature guide
- `PROJECT_SUMMARY.md` - Technical overview

## 🎯 Available Users

All passwords: `password123`

- **john** - Project owner (full control)
- **jane** - Developer (can work on tasks)
- **bob** - QA (can test tasks)

## 🔧 Useful Commands

```bash
# View database
npx prisma studio

# Reset database
npx prisma migrate reset

# Reseed data
npm run seed

# Build for production
npm run build

# Preview production
npm run preview
```

## 🎉 That's It!

You're ready to explore the full-featured todo list application!

Happy organizing! 📝✅
