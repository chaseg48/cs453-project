
# Nicholas Garner

# CS553 Client-Server Architecture Project

This repository contains the semester project in  
**CS453 / CS553 – Client/Server Architectures**.

Students will build and extend a distributed web application over the course
of the semester. The system will evolve through several architectural stages,
mirroring the historical evolution of modern web systems.

The goal of the project is to help students understand **how real client/server
systems are designed and built**, including:

- REST API design
- database integration
- authentication and authorization
- multi-service architectures
- real-time communication
- modern API technologies

---

# Project Overview

The semester project is a **Task / Project Management System**.

A task contains:

```json
{
    "id": 1,
    "title": "My Task",
    "description": "My task description",
    "status": "Todo"
}
```

# API Features

The API implements the following routes:

| Route | Description |
| ----- | ----------- |
| `GET /health` | Server health check |
| `GET /db-health` | Database health check |
| `GET /tasks` | Return all tasks in database |
| `POST /tasks` | Create new task |
| `GET /tasks/{id}` | Return one task by id |
| `PATCH /tasks/{id}` | Update one task by id |
| `DELETE /tasks/{id}` | Delete one task by id |

---

# Example Routes

### `GET /health`

Returns a health check on the server.

```json
{
    "status": "ok",
    "service": "cs553-api"
}
```

### `GET /db-health`

Returns a health check on the database.

```json
{
    "status": "ok",
    "database": "connected",
    "currentTime": "2026-07-14T02:19:33.487Z"
}
```

### `GET /tasks`

Returns all tasks in the database.

```json
[
    {
        "id": 1,
        "title": "Task 1",
        "description": "Task 1 description",
        "status": "Todo"
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Task 2 description",
        "status": "Todo"
    }
]
```

### `GET /tasks/{id}`

Returns a task by id if it exists.

```json
    {
        "id": 1,
        "title": "Task 1",
        "description": "Task 1 description",
        "status": "Todo"
    }
```

Returns an `Error 404` response if the task does not exist.

### `POST /tasks`

Creates a task and returns the created task if successfull.

```json
    {
        "id": 1,
        "title": "Task 1",
        "description": "Task 1 description",
        "status": "Todo"
    }
```

Returns an `Error 400` response if the request body is invalid.

### `PATCH /tasks/{id}`

Updates a task by id and returns the updated task if successfull.

```json
    {
        "id": 1,
        "title": "Task 1",
        "description": "Task 1 description",
        "status": "Todo"
    }
```

Returns an `Error 404` response if the task does not exist.

Returns an `Error 400` response if the request body is invalid.

### `DELETE /tasks/{id}`

Deletes a task by id.

Returns an `Error 404` response if the task does not exist.

---

# Architecture Overview

The system follows a typical web architecture.

```shell
Browser Client
|
v
REST API
|
v
PostgreSQL
```

# Repository Structure

```shell
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

# Development Setup

## 1. Clone the repository

```shell
git clone https://github.com/chaseg48/cs553-midterm.git
cd cs453-project-template
```

## 2. Start the database

This project uses Docker to run PostgreSQL locally.

```shell
docker-compose up -d
```

This will start a PostgreSQL database container.

---

## 3. Run the schema

```shell
psql postgresql://postgres:postgres@localhost:5432/cs453 -f database/schema.sql
```

---

## 4. Install dependencies

```shell
cd apps/api
npm install
```

---

## 5. Run the server
```shell
npm run dev
```


The API server should start locally.

---

# Automatic Tests

This repository contains an automatic test suite. Execute the following command in a bash terminal to the run tests.

```bash
npm run test
```
---

# Reflection Questions

### 1. What is the difference between an in-memory API and a database-backed API?

An in-memory API is volatile and only persists as long as the server is running. A database-backed API is persistent.

### 2. Why is it useful to separate routes, services, and database logic?

It is useful for making the code more modular. It is also useful in that individual components of the code can be modified
without having to update everything, so long as the interfaces remain the same.

### 3. What HTTP status codes did you use, and why?

Codes 200-299 represent successfull/normal results. I used 200 for `GET` and `PATCH`, 201 for `POST`, and 204 for `DELETE`.
Codes 400-499 represent client error. I used 400 for invalid requests and 404 for missing resources. Codes 500-599 represent
server errors. I used 500 for internal server errors.

### 4. What happens when a client requests a task ID that does not exist?

A 404 error response is returned to the client.

### 5. What was the hardest part of connecting the API to PostgreSQL?

The code to connect the postgreSQL database to the server was given. The difficult part of interfacing the API with
PostgreSQL for me was forming correct SQL commands.