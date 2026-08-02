
# Nicholas Garner

# CS553 Client-Server Architecture Project

This repository contains the semester project in  
**CS553 – Client/Server Architectures**.

# Project Overview
## Database Overview
The semester project is a **Task / Project Management System**. Users can create tasks and projects and relate them to
one another. User accounts, tasks, and projects are stored in a `Postgres` database, and as such, information persists
between instances of the server. More information about how to set up the database is provided later in this document.

### A `user` contains:

```json
{
    "name": "Username",
    "email": "user@email.com",
    "password_hash": "examplehash",
    "role": "user",
    "created_at": "2026-07-31 20:06:36.627073+00"
}
```

Users can take on roles such as `user` or `admin`. Admin users have a wider set of actions available to them than
standard users. More information on this is provided later in this document.

### A `project` contains:

```json
{
    "id": 1,
    "name": "Example Project",
    "description": "Example project description",
    "owner_id": 1,
    "created_at": "2026-07-31 20:06:36.627073+00",
    "updated_at": "2026-07-31 20:06:36.627073+00"
}
```

The project owner id will autopopulate with the user id of the user making the request. The API does not currently
support modifying the owner id of projects.

### A `task` contains:

```json
{
    "id": 1,
    "title": "Example task",
    "description": "Example task description",
    "status": "Todo",
    "project_id": 1,
    "assigned_to": 1,
    "created_at": "2026-07-31 20:06:36.627073+00",
    "updated_at": "2026-07-31 20:06:36.627073+00"
}
```
---

The owner assigned to id will autopopulate with the user id of the user making the request. Task creation requires
a valid project id.

## Authentication and Authorization Overview

Users must create user accounts to interact with most aspects of the API. API routes for users, tasks, and
projects all require that the user be signed in. Bcrypt is used for password hashing and comparison. Raw password are
not stored in the database. Instead, the password hashed are stored. A successfull login results in the generation of a
Json Web Token. After logging in, successive API calls are expected to contain the generated token, which is decoded
with the `JWT_SECRET`. To run the server, `JWT_SECRET` must be defined within the environment that the server is running
in, else the server throws an error. More information on defining this environment variable is provided below.

---

# API Features

The API implements the following routes:

| Route | Description | Minimum Required Role |
| ----- | ----------- | ------------- |
| `GET /health` | Server health check | None |
| `GET /db-health` | Database health check | None |
| `POST /auth/register` | Create a new user | None |
| `POST /auth/login` | Log in as user | None |
| `GET /users` | Return list of all users | admin |
| `GET /users/:id` | Return one user | admin |
| `GET /projects` | Return list of projects | user |
| `GET /projects/:id` | Return one project | user |
| `POST /projects` | Create a new project | user |
| `DELETE /projects/:id` | Delete a project | user |
| `GET /tasks` | Return list of tasks | user |
| `GET /tasks/:id` | Return one task | user |
| `POST /tasks` | Create new task | user |
| `PATCH /tasks/:id` | Update one task | user |
| `DELETE /tasks/:id` | Delete one task | user |

It is important to note that deleting a project will also cause all related tasks to be deleted.

---

# Authorization Rules

The API implements authorization rules for carrying out requests based on the user that is making the request. Some
routes are restricted based on the data present in the request or the route itself. Authorization rules are implemented
as follows:

| Route | Rule |
| ----- | ----------- |
| `GET /users` | User must be admin
| `GET /users/:id` | User must be admin
| `GET /projects` | Only projects owned by the user are returned. All projects returned for admins.
| `GET /projects/:id` | Return one project if it is owned by the user. Admins may return any project.
| `DELETE /projects/:id` | Delete a project if owned by user. Admins may delete any project.
| `GET /tasks` | Only tasks owned by the user are returned. All tasks are returned for admins.
| `GET /tasks/:id` | Return one task if assigned to user. Admins may return any task.
| `POST /tasks` | Users may only create tasks in projects that they own. Admins can create tasks in any project.
| `PATCH /tasks/:id` | Update one task if assigned to user. Admins may update any tasks.
| `DELETE /tasks/:id` | Delete one task if assigned to user. Admins may delete any task.

---

# Example Curl Commands
## Create a new user
```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"name": "User", "email": "user@uah.edu", "password": "mypw", "role": "user"}' \
 http://localhost:3000/auth/register
```

## To create an admin account, use the argument `admin` in the `role` property

## Log in
```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"email": "user@uah.edu", "password": "mypw"}' \
 http://localhost:3000/auth/login
```

## Create a project
```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -H "authorization: Bearer your_token_here" \
 -d '{"name": "My Project", "description": "My project description"}' \
 http://localhost:3000/projects
```

## Create a task
```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -H "authorization: Bearer your_token_here" \
 -d '{"title": "My Task", "description": "My task description", "status": "In Progress", "project": 2}' \
 http://localhost:3000/tasks
```

---

# Example Routes And Return Values

## `GET /health`

Returns a health check on the server.

```json
{
    "status": "ok",
    "service": "cs553-api"
}
```

## `GET /db-health`

Returns a health check on the database.

```json
{
    "status": "ok",
    "database": "connected",
    "currentTime": "2026-07-14T02:19:33.487Z"
}
```

## `POST /auth/register`

Registers a new user.

```json
{
    "user": {
        "name": "Your Name",
        "id": 1
    }
}
```

## `POST /auth/login`

Log in as user.

```json
{
    "message": "Logged in as: User 1",
    "accessToken": "your_token",
    "tokenType": "Bearer",
    "expiresIn": "1h",
    "user": {
        "name": "User 1",
        "role": "user"
    }
}
```

## `GET /tasks`

Returns tasks assigned to the user.

```json
{
    "tasks":
    [
        {
            "id": 1,
            "title": "Task 1",
            "description": "Task 1 description",
            "status": "Todo",
            "project_id": 1,
            "assigned_to": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        },
        {
            "id": 2,
            "title": "Task 2",
            "description": "Task 2 description",
            "status": "Todo",
            "project_id": 1,
            "assigned_to": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        }
    ]
}
```
An empty array will be returned if there are no tasks assigned to the user or the database is empty.

Returns an `Error 401` if the user is not signed in.

### `GET /tasks/{id}`

Returns a task by id if it exists and is assigned to the user making the request.

```json
    {
    "task":
        {
            "id": 1,
            "title": "Task 1",
            "description": "Task 1 description",
            "status": "Todo",
            "project_id": 1,
            "assigned_to": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        }
    }
```

Returns an `Error 401` if the user is not signed in.
Returns an `Error 403` if the task is assigned to another user.
Returns an `Error 404` response if the task does not exist.

### `POST /tasks`

Creates a task and returns the created task if successfull.

```json
    {
    "task": {
            "id": 1,
            "title": "Task 1",
            "description": "Task 1 description",
            "status": "Todo",
            "project_id": 1,
            "assigned_to": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
    }
  }
```

### `GET /projects`

Returns projects owned by the user.

```json
{
    "projects":
    [
        {
            "id": 1,
            "name": "Project 1",
            "description": "Project 1 description",
            "owner_id": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        },
        {
            "id": 2,
            "name": "Project 2",
            "description": "Project 2 description",
            "owner_id": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        },
    ]
}
```
An empty array will be returned if there are no projects owned by the user or the database is empty.

Returns an `Error 401` if the user is not signed in.

### `GET /projects/{id}`

Returns a project by id if it is owned by the user making the request.

```json
    {
    "project":
        {
            "id": 1,
            "name": "Project 1",
            "description": "Project 1 description",
            "owner_id": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        }
    }
```

Returns an `Error 401` if the user is not signed in.
Returns an `Error 403` if the project is owned another user.
Returns an `Error 404` response if the project does not exist.

### `POST /projects`

Creates a project and returns the created project if successfull.

```json
    {
    "project":         
        {
            "id": 1,
            "name": "Project 1",
            "description": "Project 1 description",
            "owner_id": 1,
            "created_at": "2026-07-31 20:06:36.627073+00",
            "updated_at": "2026-07-31 20:06:36.627073+00"
        },
  }
```

Returns an `Error 400` response if the request body is invalid.
Returns an `Error 401` if the user is not signed in.

---

# Repository Structure

```bash
cs453-project-template
│
├── apps
│ ├── api
│ │ Server-side application
│ │
│ └── client
│ Simple browser client
│
├── database
│ Database schema, migrations, and seed data
│
├── docs
│ Architecture documentation
│
├── scripts
│ Utility scripts for development
│
├── docker-compose.yml
│ Starts PostgreSQL database
│
└── README.md
```

---

# Environment Setup And Running

## 1. Clone the repository

```bash
git clone https://github.com/chaseg48/cs453-project.git
cd cs453-project
```

## 2. Start the database

This project uses Docker to run PostgreSQL locally.

```bash
docker-compose up -d
```

This will start a PostgreSQL database container.

---

## 3. Run the schema

```bash
psql postgresql://postgres:postgres@localhost:5432/cs453 -f database/schema.sql
```

---

## 4. Install server dependencies

```bash
cd apps/api
npm install
```

---

## 5. Build the server
```bash
cd apps/api
npm run build
```

---

## 6. Install client dependencies

```bash
cd ../client
npm install
```

---

## 7. Build the client
```bash
npm run build
```

---

## 8. Define environment variables

Copy the .env.example file and remove the .example extension. Set the variable values in the file. Alternatively,
you can specify the environment variables manually in a bash terminal.

```bash
export JWT_SECRET="yoursecrethere"
export PORT="3000"
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cs453"
```

---

## 9. Run the server
```bash
cd apps/api
npm run start
```

---

## 10. Run the client from another bash terminal
```bash
cd apps/client
npm run start
```


The API server should start locally and the client program should execute to test the server.

---

# Automatic Tests

This repository contains an automatic test suite with 47 tests. Execute the following command in a bash terminal to the
run tests. Ensure that you have defined all environment variables in `Step 8`.

In the top level folder, install test dependencies

```bash
npm install
```

From the top level folder, run the tests
```bash
npm run test
```

## Warning: Running the auto test suite will reset all of the database tables.

---

# Reflection Questions

Reflection questions are answered in the answers.md file.

---

# Graduate Extension

The graduate extension is located in the lessons-learned.md file.