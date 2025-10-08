# Todo List App - Collaborative Project Management

A full-featured collaborative project management and todo list application built with SvelteKit, following MVC architecture with a Backend-for-Frontend pattern.

## Features

### Authentication
- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication using HTTP-only cookies
- Protected routes with automatic redirects

### Project Management
- Create, edit, and delete projects
- Project ownership and team member management
- Role-based access control (Owner, Manager, Developer, QA)
- Project statistics and task summaries
- Add/remove team members
- Set project start and end dates

### Task Management
- Create, edit, and delete tasks within projects
- Kanban board view with three columns:
  - Todo
  - In Progress
  - Done
- Drag-and-drop status updates (click buttons to move tasks)
- Task properties:
  - Title and description
  - Status (Todo, In Progress, Done)
  - Priority (Low, Medium, High)
  - Assignee (team members)
  - Due date
  - Multiple labels
- Filter tasks by status, priority, assignee, and labels
- View all tasks assigned to you

### Label System
- Create, edit, and delete labels
- Color-coded label badges
- Predefined color palette with custom color picker
- Apply multiple labels to tasks
- Filter tasks by labels

### Dashboard
- Overview of all your projects
- Quick access to assigned tasks
- Project statistics
- Recent activity

## Tech Stack

- **Framework**: SvelteKit
- **Database**: SQLite with Prisma ORM
- **Styling**: TailwindCSS + Flowbite-Svelte
- **Language**: JavaScript (ES6+)
- **Architecture**: MVC Pattern with Backend-for-Frontend

## Project Structure

```
/workspace
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── dev.db                 # SQLite database file
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── models/        # Data access layer (Prisma)
│   │   │   │   ├── prisma.js
│   │   │   │   ├── userModel.js
│   │   │   │   ├── projectModel.js
│   │   │   │   ├── projectMemberModel.js
│   │   │   │   ├── taskModel.js
│   │   │   │   ├── labelModel.js
│   │   │   │   └── taskLabelModel.js
│   │   │   └── controllers/   # Business logic
│   │   │       ├── authController.js
│   │   │       ├── projectController.js
│   │   │       ├── taskController.js
│   │   │       └── labelController.js
│   │   ├── components/        # Reusable Svelte components
│   │   └── stores/            # Svelte stores for state management
│   │       ├── userStore.js
│   │       ├── projectStore.js
│   │       ├── taskStore.js
│   │       └── labelStore.js
│   ├── routes/
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── labels/
│   │   │   ├── members/
│   │   │   └── users/
│   │   ├── app/               # Protected application routes
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   └── labels/
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   ├── app.html               # HTML template
│   └── app.css                # Global styles
├── hooks.server.js            # SvelteKit hooks for authentication
├── svelte.config.js           # SvelteKit configuration
├── tailwind.config.js         # TailwindCSS configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## Installation & Setup

### Quick Setup (Recommended)

Run the automated setup script:
```bash
./setup.sh
```

This will install dependencies, run migrations, and seed the database automatically.

### Manual Setup

If you prefer to set up manually:

#### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

#### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

3. **Seed the database** (optional but recommended):
   ```bash
   npm run seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Navigate to `http://localhost:5173` in your browser

## Usage Guide

### Getting Started

1. **Register an Account**:
   - Go to the registration page
   - Choose a username (min 3 characters)
   - Set a password (min 6 characters)

2. **Create a Project**:
   - Navigate to "Projects" in the sidebar
   - Click "Create Project"
   - Fill in project details (name, description, dates)

3. **Add Team Members**:
   - Open your project
   - Go to the "Members" tab
   - Click "Add Member"
   - Select a user and assign a role

4. **Create Tasks**:
   - In the project view, go to "Kanban Board" tab
   - Click "Add Task"
   - Fill in task details
   - Assign to a team member
   - Set priority and due date

5. **Manage Labels**:
   - Navigate to "Labels" in the sidebar
   - Create color-coded labels
   - Apply labels to tasks for better organization

6. **Track Progress**:
   - Use the Kanban board to move tasks between columns
   - View your assigned tasks in "My Tasks"
   - Check the dashboard for an overview

## MVC Architecture

### Models Layer (`/lib/server/models`)
- Pure data access functions
- Prisma client integration
- Repository pattern implementation
- No business logic

### Controllers Layer (`/lib/server/controllers`)
- Business logic and validation
- Data transformation
- Authorization checks
- Orchestrates model operations

### Views Layer (`/routes`)
- SvelteKit pages and components
- User interface with Flowbite-Svelte
- Client-side state management
- API consumption via fetch

### API Endpoints (`/routes/api`)
- RESTful API design
- JSON request/response
- Authentication middleware
- Proper HTTP status codes

## Database Schema

### Core Models
- **User**: Authentication and user information
- **Project**: Project details and ownership
- **ProjectMember**: Many-to-many relationship with roles
- **Task**: Task details with status and priority
- **Label**: Color-coded labels for categorization
- **TaskLabel**: Many-to-many relationship between tasks and labels

### Relationships
- One user can own multiple projects
- One user can be a member of multiple projects
- One project has many tasks
- One task can have multiple labels
- Tasks are assigned to users

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Project Endpoints
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project
- `GET /api/projects/:id/stats` - Get project statistics

### Task Endpoints
- `GET /api/tasks` - Get user's assigned tasks
- `GET /api/tasks?projectId=:id` - Get project tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/kanban?projectId=:id` - Get tasks grouped by status

### Label Endpoints
- `GET /api/labels` - Get all labels
- `POST /api/labels` - Create a new label
- `GET /api/labels/:id` - Get label details
- `PUT /api/labels/:id` - Update label
- `DELETE /api/labels/:id` - Delete label

### User Endpoints
- `GET /api/users` - Get all users (for assignment)

### Member Endpoints
- `PUT /api/members/:id` - Update member role
- `DELETE /api/members/:id` - Remove member from project

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- HTTP-only cookies for session management
- Server-side authentication checks
- Protected routes with automatic redirects
- Authorization checks in controllers
- SQL injection prevention via Prisma

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Database Commands
```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Troubleshooting

### Database Issues
If you encounter database errors, try:
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Port Already in Use
If port 5173 is already in use, you can specify a different port:
```bash
npm run dev -- --port 3000
```

### Session Issues
If you have authentication problems, clear your browser cookies or use an incognito window.

## Future Enhancements

Potential features for future development:
- Real-time collaboration with WebSockets
- File attachments for tasks
- Task comments and activity log
- Email notifications
- Advanced filtering and search
- Task templates
- Time tracking
- Gantt chart view
- Mobile responsive design
- Export projects to PDF/CSV
- Dark mode
- Task dependencies

## License

This project is created for educational purposes.

## Author

Built with ❤️ using SvelteKit, Prisma, and TailwindCSS.
