# MVC Architecture Documentation

This document explains the Model-View-Controller (MVC) architecture implementation in the Todo List App, following the Backend-for-Frontend (BFF) pattern.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                         VIEWS                           │
│              (Svelte Pages & Components)                │
│         /routes/app/*, /routes/login, etc.              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests (fetch)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    API ENDPOINTS                        │
│                    (/routes/api/*)                      │
│           (Request Handling & Responses)                │
└────────────────────┬────────────────────────────────────┘
                     │ Function Calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    CONTROLLERS                          │
│            (/lib/server/controllers/*)                  │
│        (Business Logic & Authorization)                 │
└────────────────────┬────────────────────────────────────┘
                     │ Data Operations
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      MODELS                             │
│              (/lib/server/models/*)                     │
│           (Data Access & Prisma Client)                 │
└────────────────────┬────────────────────────────────────┘
                     │ SQL Queries
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE (SQLite)                     │
│                   (prisma/dev.db)                       │
└─────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Models Layer (`/lib/server/models`)

**Purpose**: Pure data access layer - handles all database operations

**Responsibilities**:
- Database queries using Prisma Client
- CRUD operations for each entity
- Data retrieval with relations
- Repository pattern implementation

**Rules**:
- ✅ Only database operations
- ✅ Return raw data from database
- ❌ NO business logic
- ❌ NO validation
- ❌ NO authorization checks

**Example**: `userModel.js`
```javascript
import { prisma } from './prisma.js';

export async function findById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      createdAt: true
    }
  });
}
```

**Available Models**:
- `prisma.js` - Prisma client instance
- `userModel.js` - User data operations
- `projectModel.js` - Project data operations
- `projectMemberModel.js` - Project membership operations
- `taskModel.js` - Task data operations
- `labelModel.js` - Label data operations
- `taskLabelModel.js` - Task-label relationship operations

### 2. Controllers Layer (`/lib/server/controllers`)

**Purpose**: Business logic layer - orchestrates data operations and enforces rules

**Responsibilities**:
- Input validation
- Business logic implementation
- Authorization checks
- Data transformation
- Calling model functions
- Error handling

**Rules**:
- ✅ Validate all inputs
- ✅ Check user permissions
- ✅ Implement business rules
- ✅ Transform data as needed
- ✅ Handle errors gracefully
- ❌ NO direct database access (use models)
- ❌ NO HTTP request handling (that's for API endpoints)

**Example**: `taskController.js`
```javascript
import * as TaskModel from '../models/taskModel.js';

export async function createTask(userId, data) {
  // Validation
  if (!data.title || data.title.trim().length < 3) {
    throw new Error('Task title must be at least 3 characters long');
  }
  
  // Authorization check
  await checkProjectAccess(data.projectId, userId);
  
  // Business logic
  const taskData = {
    projectId: data.projectId,
    title: data.title.trim(),
    status: data.status || 'Todo',
    priority: data.priority || 'Medium'
  };
  
  // Data operation via model
  return await TaskModel.create(taskData);
}
```

**Available Controllers**:
- `authController.js` - Authentication & registration
- `projectController.js` - Project management & team operations
- `taskController.js` - Task CRUD & status management
- `labelController.js` - Label management

### 3. API Endpoints (`/routes/api`)

**Purpose**: HTTP interface - handles requests and responses

**Responsibilities**:
- Parse HTTP requests
- Extract request data (JSON, query params)
- Call appropriate controller functions
- Format responses
- Set HTTP status codes
- Handle HTTP-specific concerns (cookies, headers)

**Rules**:
- ✅ Handle HTTP request/response
- ✅ Call controller functions
- ✅ Return JSON responses
- ✅ Set appropriate status codes
- ❌ NO business logic (use controllers)
- ❌ NO database access (use controllers/models)

**Example**: `/routes/api/tasks/+server.js`
```javascript
import * as TaskController from '$lib/server/controllers/taskController.js';

export async function POST({ request, locals }) {
  try {
    const data = await request.json();
    const task = await TaskController.createTask(locals.user.id, data);
    
    return new Response(JSON.stringify(task), {
      status: 201,
      headers: { 'content-type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }
}
```

**API Endpoint Structure**:
```
/routes/api/
├── auth/
│   ├── register/+server.js
│   ├── login/+server.js
│   ├── logout/+server.js
│   └── me/+server.js
├── projects/
│   ├── +server.js (GET, POST)
│   └── [id]/
│       ├── +server.js (GET, PUT, DELETE)
│       ├── members/+server.js (POST)
│       └── stats/+server.js (GET)
├── tasks/
│   ├── +server.js (GET, POST)
│   ├── [id]/+server.js (GET, PUT, DELETE)
│   └── kanban/+server.js (GET)
├── labels/
│   ├── +server.js (GET, POST)
│   └── [id]/+server.js (GET, PUT, DELETE)
├── members/
│   └── [id]/+server.js (PUT, DELETE)
└── users/
    └── +server.js (GET)
```

### 4. Views Layer (`/routes`)

**Purpose**: User interface - presents data and handles user interactions

**Responsibilities**:
- Display data to users
- Handle user input
- Make API calls via fetch
- Update UI based on responses
- Client-side state management
- Navigation

**Rules**:
- ✅ Use Flowbite-Svelte components
- ✅ Call API endpoints via fetch
- ✅ Handle loading and error states
- ✅ Manage client-side state with stores
- ❌ NO direct database access
- ❌ NO direct controller calls
- ❌ NO business logic (keep it simple)

**Example**: `/routes/app/tasks/+page.svelte`
```svelte
<script>
  import { onMount } from 'svelte';
  
  let tasks = [];
  
  onMount(async () => {
    const response = await fetch('/api/tasks');
    if (response.ok) {
      tasks = await response.json();
    }
  });
</script>

{#each tasks as task}
  <div>{task.title}</div>
{/each}
```

**View Structure**:
```
/routes/
├── +layout.svelte (global layout)
├── +page.svelte (home/redirect)
├── login/+page.svelte
├── register/+page.svelte
└── app/
    ├── +layout.svelte (app layout with sidebar)
    ├── dashboard/+page.svelte
    ├── projects/
    │   ├── +page.svelte (list)
    │   ├── new/+page.svelte (create)
    │   └── [id]/+page.svelte (detail with Kanban)
    ├── tasks/+page.svelte
    └── labels/+page.svelte
```

## Data Flow Examples

### Example 1: Creating a Task

```
1. USER clicks "Add Task" button in UI
   ↓
2. VIEW (Svelte) collects form data
   ↓
3. VIEW makes POST /api/tasks with JSON data
   ↓
4. API ENDPOINT parses request
   ↓
5. API calls TaskController.createTask(userId, data)
   ↓
6. CONTROLLER validates input (title length, required fields)
   ↓
7. CONTROLLER checks authorization (user has project access)
   ↓
8. CONTROLLER calls TaskModel.create(taskData)
   ↓
9. MODEL executes Prisma query
   ↓
10. DATABASE creates task record
    ↓
11. MODEL returns task object
    ↓
12. CONTROLLER returns task to API
    ↓
13. API ENDPOINT sends JSON response with 201 status
    ↓
14. VIEW receives response and updates UI
    ↓
15. USER sees new task in Kanban board
```

### Example 2: Loading Project Details

```
1. USER navigates to /app/projects/[id]
   ↓
2. VIEW component mounts
   ↓
3. VIEW makes GET /api/projects/[id]
   ↓
4. API ENDPOINT calls ProjectController.getProject(id, userId)
   ↓
5. CONTROLLER calls ProjectModel.findById(id)
   ↓
6. MODEL queries database with relations (owner, members, tasks)
   ↓
7. DATABASE returns project data
   ↓
8. MODEL returns project object
   ↓
9. CONTROLLER checks authorization (user is owner or member)
   ↓
10. CONTROLLER returns project to API
    ↓
11. API ENDPOINT sends JSON response
    ↓
12. VIEW receives data and renders:
    - Project header
    - Kanban board with tasks
    - Members list
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────┐
│ 1. User submits login form (username + password)        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 2. POST /api/auth/login                                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 3. AuthController.login(username, password)              │
│    - Finds user by username                              │
│    - Compares password with bcrypt                       │
│    - Returns user object (without password)              │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 4. API sets session cookie                               │
│    cookies.set('session', userId, {...})                 │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 5. View redirects to /app/dashboard                      │
└──────────────────────────────────────────────────────────┘

For subsequent requests:
┌──────────────────────────────────────────────────────────┐
│ 1. Request includes session cookie                       │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 2. hooks.server.js intercepts request                    │
│    - Reads session cookie                                │
│    - Calls AuthController.getUserById(sessionId)         │
│    - Sets event.locals.user                              │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ 3. API/Page handlers can access locals.user             │
└──────────────────────────────────────────────────────────┘
```

## Best Practices

### Models
- Keep functions focused on single database operations
- Use Prisma's `include` and `select` for efficient queries
- Return consistent data structures
- Add JSDoc comments for documentation

### Controllers
- Validate all inputs at the start
- Use descriptive error messages
- Keep functions focused on single features
- Check authorization before data operations
- Transform data as needed for the frontend

### API Endpoints
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Return consistent JSON structure
- Use meaningful HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation error)
  - 401: Unauthorized (not logged in)
  - 403: Forbidden (no permission)
  - 404: Not Found
  - 500: Server Error
- Handle errors gracefully

### Views
- Keep components focused and reusable
- Use loading states for async operations
- Display meaningful error messages
- Validate input on client side (but also on server!)
- Use Svelte stores for shared state

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a clear, single responsibility
2. **Testability**: Layers can be tested independently
3. **Maintainability**: Easy to find and fix bugs
4. **Scalability**: Easy to add new features
5. **Reusability**: Controllers and models can be reused
6. **Security**: Authorization in controllers, not in views
7. **Type Safety**: Clear contracts between layers
8. **Debugging**: Easy to trace issues through layers

## Common Patterns

### Creating Resources
```
POST /api/resource
→ Controller validates and creates
→ Returns 201 with created object
```

### Reading Resources
```
GET /api/resource/:id
→ Controller checks access
→ Returns 200 with object or 404
```

### Updating Resources
```
PUT /api/resource/:id
→ Controller validates and checks ownership
→ Returns 200 with updated object
```

### Deleting Resources
```
DELETE /api/resource/:id
→ Controller checks ownership
→ Returns 200 with deleted object
```

### Filtering/Searching
```
GET /api/resource?filter=value
→ Controller builds query
→ Returns 200 with array
```

## Error Handling Strategy

### Models
- Throw database errors as-is
- Let Prisma handle constraint violations

### Controllers
- Catch and transform database errors
- Throw meaningful business logic errors
- Use descriptive error messages

### API Endpoints
- Catch all errors
- Return appropriate status codes
- Format error responses consistently:
```javascript
{ error: "Descriptive error message" }
```

### Views
- Display error messages to users
- Provide fallback UI for errors
- Log errors to console for debugging

## Security Considerations

1. **Authentication**: Session-based with HTTP-only cookies
2. **Authorization**: Checked in controllers before operations
3. **Password Security**: Bcrypt hashing with salt rounds
4. **SQL Injection**: Prevented by Prisma ORM
5. **XSS**: Svelte auto-escapes HTML
6. **CSRF**: SameSite cookies + POST for mutations
7. **Secrets**: Never expose passwords or sessions in responses

## Conclusion

This MVC architecture provides a solid foundation for building scalable, maintainable web applications. Each layer has a clear responsibility, making the codebase easy to understand and extend.

Remember:
- **Models** handle data
- **Controllers** handle logic
- **APIs** handle HTTP
- **Views** handle UI

By following these patterns consistently, you ensure code quality and developer experience throughout the application lifecycle.
