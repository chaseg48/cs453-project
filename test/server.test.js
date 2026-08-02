//
import { beforeAll, afterAll, describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../apps/api/src/server.ts";
import { pool } from "../apps/api/src/db/pool.ts";

var user_1_token;
var user_2_token;
var admin_token;
var user_1_task;
var user_2_task;
var user_1_project;
var user_2_project;
var user_1_id;
var user_2_id;

afterAll(async () => {
  pool.query(`DELETE FROM users WHERE name IN ('User 1', 'User 2', 'admin');`);
  pool.query(`DELETE FROM tasks WHERE title IN ('User 1 Task');`);
  pool.query(`DELETE FROM projects WHERE name IN ('User 1 Project');`);

  // pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  // pool.query('ALTER SEQUENCE projects_id_seq RESTART WITH 1');
  // pool.query('ALTER SEQUENCE tasks_id_seq RESTART WITH 1');
});

beforeAll(async () => {
  // pool.query(`DELETE FROM users WHERE name IN ('User 1', 'User 2', 'admin');`);
  // pool.query(`DELETE FROM tasks WHERE title IN ('User 1 Task');`);
  // pool.query(`DELETE FROM projects WHERE name IN ('User 1 Project');`);
  // pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
});

// Return the health of the server
describe("Unprotected Routes", () => {

  test("GET /health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/health")
        .expect(200);

    expect(response.body).toEqual({ status: "ok", service: "cs553-api" });
  });

    // Return database status
    test("GET /db-health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/db-health")
        .expect(200);

    expect(response.body.status).toEqual("ok");
    expect(response.body.database).toEqual("connected");
  });

  // Bad path returns error response
  test("GET /bad returns error response", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/bad")
        .expect(404);

    expect(response.body).toEqual({ error: "Not found", message: "Path not found." });
  });
});

describe("Authentication Tests", () => {

  test("POST /auth/register registers a user", async () => {
    const app = createApp();
    const response = await request(app)
        .post("/auth/register")
        .send({ name: "User 1", email: "user1@uah.edu", password: "user1pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

    expect(response.body.user.name).toEqual("User 1");
    user_1_id = response.body.user.id;
  });

  test("POST /auth/register returns 400 for no email", async () => {
    const app = createApp();
    const response = await request(app)
        .post("/auth/register")
        .send({ name: "User 1", password: "user1pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(400);

    expect(response.body.error).toEqual("Invalid request");
    expect(response.body.message).toEqual("Enter a valid name, email and password");
  });

  test("POST /auth/register returns 401 for duplicate email", async () => {
    const app = createApp();
    const response = await request(app)
        .post("/auth/register")
        .send({ name: "User 1", email: "user1@uah.edu", password: "user1pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(401);

    expect(response.body.error).toEqual("Duplicate email");
    expect(response.body.message).toEqual("A user with this email already exists");
  });

    test("POST /auth/login returns a token for correct password", async () => {
    const app = createApp();
    const response = await request(app)
        .post("/auth/login")
        .send({ email: "user1@uah.edu", password: "user1pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.message).toEqual("Logged in as: User 1");
    expect(typeof(response.body.accessToken)).toEqual("string");
    expect(response.body.user.role).toEqual("user");
    user_1_token = response.body.accessToken;
  });

    test("POST /auth/login returns 401 for incorrect password", async () => {
    const app = createApp();
    const response = await request(app)
        .post("/auth/login")
        .send({ email: "user1@uah.edu", password: "wrong" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(401);

    expect(response.body.error).toEqual("Not authorized");
    expect(response.body.message).toEqual("Invalid password");
  });

    test("POST /auth/register registers an admin account when admin is specified", async () => {
    const app = createApp();
    let response = await request(app)
        .post("/auth/register")
        .send({ name: "admin", email: "admin@uah.edu", password: "adminpw", role: "admin" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

    response = await request(app)
        .post("/auth/login")
        .send({ email: "admin@uah.edu", password: "adminpw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.message).toEqual("Logged in as: admin");
    expect(typeof(response.body.accessToken)).toEqual("string");
    expect(response.body.user.role).toEqual("admin");
    admin_token = response.body.accessToken;
  });
});


describe("Protected Route Tests Tests", () => {
  test("GET /users returns a 401 error for missing token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Non-null token is required");
  });

  test("GET /users/:id returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/users/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("GET /tasks returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/tasks/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("GET /tasks/:id returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/tasks/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);
   
    expect(response.body.error).toEqual("Authentication required");
  });

  test("POST /tasks returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/tasks")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .send({ title: "New Task", description: "New task description", status: "Todo", project_id: 1 })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("PATCH /tasks/id returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .patch("/tasks/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .send({ title: "New Task", description: "New task description", status: "Todo", project_id: 1 })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("DELETE /tasks/:id returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .delete("/tasks/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("GET /projects returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/projects")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("GET /projects/:id returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/projects/1")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });

  test("POST /projects returns a 401 error for invalid token", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/projects")
      .set("authorization", "Bearer xxxxx.yyyyy.zzzzz")
      .send({ name: "Project 1", description: "Project 1 description"})
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(401);

    expect(response.body.error).toEqual("Authentication required");
  });
});

describe("CRUD Tests", () => {
beforeAll(async () => {
  pool.query(`DELETE FROM tasks`);
  pool.query(`DELETE FROM projects`);

  pool.query('ALTER SEQUENCE projects_id_seq RESTART WITH 1');
  pool.query('ALTER SEQUENCE tasks_id_seq RESTART WITH 1');
});

  test("GET /tasks returns empty array", async () => {
    const app = createApp();

    const response = await request(app)
      .get("/tasks")
      .set("authorization", String("Bearer " + user_1_token))
      .expect(200);

    expect(Array.isArray(response.body.tasks)).toBe(true);
    expect(response.body.tasks.length).toEqual(0);
  });

  test("GET /projects returns empty array", async () => {
    const app = createApp();

    const response = await request(app)
      .get("/projects")
      .set("authorization", String("Bearer " + user_1_token))
      .expect(200);

    expect(Array.isArray(response.body.projects)).toBe(true);
    expect(response.body.projects.length).toEqual(0);
  });

  test("POST /projects creates a project", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/projects")
        .set("authorization", String("Bearer " + user_1_token))
        .send({name: "User 1 Project", description: "User 1 Owned Project" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

    expect(response.body.project.name).toEqual("User 1 Project");
    expect(response.body.project.description).toEqual("User 1 Owned Project");
    expect(response.body.project.owner_id).toEqual(user_1_id);

    user_1_project = response.body.project.id;
  });

  test("POST /tasks creates a task", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/tasks")
        .set("authorization", String("Bearer " + user_1_token))
        .send({title: "User 1 Task", description: "User 1 Owned Task", status: "To Do", project: Number(user_1_project)})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

    expect(response.body.task.title).toEqual("User 1 Task");
    expect(response.body.task.description).toEqual("User 1 Owned Task");
    expect(response.body.task.status).toEqual("To Do");
    expect(response.body.task.assigned_to).toEqual(user_1_id);
    expect(response.body.task.project_id).toEqual(user_1_project);
    user_1_task = response.body.task.id;
  });

  test("PATCH /tasks updates a task", async () => {
    const app = createApp();

    const response = await request(app)
        .patch(String("/tasks/" + String(user_1_task)))
        .set("authorization", String("Bearer " + user_1_token))
        .send({title: "User 1 Task Updated", description: "User 1 Owned Task Updated", status: "In Progress"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.task.title).toEqual("User 1 Task Updated");
    expect(response.body.task.description).toEqual("User 1 Owned Task Updated");
    expect(response.body.task.status).toEqual("In Progress");
    expect(response.body.task.assigned_to).toEqual(user_1_id);
    expect(response.body.task.project_id).toEqual(user_1_project);
  });

  test("GET /tasks/:id gets a task", async () => {
    const app = createApp();

    const response = await request(app)
        .get(String("/tasks/" + String(user_1_task)))
        .set("authorization", String("Bearer " + user_1_token))
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.task.title).toEqual("User 1 Task Updated");
    expect(response.body.task.description).toEqual("User 1 Owned Task Updated");
    expect(response.body.task.status).toEqual("In Progress");
    expect(response.body.task.assigned_to).toEqual(user_1_id);
    expect(response.body.task.project_id).toEqual(user_1_project);
  });

  test("GET /projects/:id gets a project", async () => {
    const app = createApp();

    const response = await request(app)
        .get(String("/projects/" + String(user_1_project)))
        .set("authorization", String("Bearer " + user_1_token))
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.project.id).toEqual(user_1_project);
    expect(response.body.project.name).toEqual("User 1 Project");
    expect(response.body.project.description).toEqual("User 1 Owned Project");
    expect(response.body.project.owner_id).toEqual(user_1_id);
  });

  test("DELETE /tasks/:id deletes a task", async () => {
    const app = createApp();

    const response = await request(app)
      .delete(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + user_1_token))
      .expect(204);
  });

  test("GET /tasks/:id returns 404 after deleting the task", async () => {
    const app = createApp();

    const response = await request(app)
        .get(String("/tasks/" + String(user_1_task)))
        .set("authorization", String("Bearer " + user_1_token))
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(404);
  });

});

describe("CRUD 400 and 404 Error Tests", () => {

  test("GET /tasks/:id returns a 404 error for invalid task", async () => {
    const app = createApp();
    const response = await request(app)
      .get(String("/tasks/" + 999))
      .set("authorization", String("Bearer " + user_1_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("A task with this id does not exist.");
  });
  
  test("POST /tasks returns a 400 error for missing title", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/tasks")
      .set("authorization", String("Bearer " + user_1_token))
      .send({ description: "New task description", status: "Todo", project: user_1_project })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(response.body.error).toEqual("Invalid request");
    expect(response.body.message).toEqual("Enter a valid string for title, description, status and project id.");
  });

  test("POST /tasks returns a 404 for invalid project", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/tasks")
      .set("authorization", String("Bearer " + user_1_token))
      .send({ title: "New Task", description: "New task description", status: "Todo", project: 999 })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("A project with this id does not exist.");
  });

  test("PATCH /tasks/:id returns a 404 for invalid task", async () => {
    const app = createApp();
    const response = await request(app)
      .patch("/tasks/999")
      .set("authorization", String("Bearer " + user_1_token))
      .send({ title: "New Task Updated", description: "New task updated description", status: "Todo", project: user_1_project })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("A task with this id does not exist.");
  });

  test("DELETE /tasks/:id returns a 404 for invalid task", async () => {
    const app = createApp();
    const response = await request(app)
      .delete("/tasks/999")
      .set("authorization", String("Bearer " + user_1_token))
      .send({ title: "New Task Updated", description: "New task updated description", status: "Todo", project: user_1_project })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("A task with this id does not exist.");
  });


});

describe("Authorization tests", () => {

  beforeAll(async () => {
    const app = createApp();
    let response = await request(app)
        .post("/auth/register")
        .send({ name: "User 2", email: "user2@uah.edu", password: "user2pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

    response = await request(app)
        .post("/auth/login")
        .send({ email: "user2@uah.edu", password: "user2pw" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    user_2_token = response.body.accessToken;

    response = await request(app)
        .post("/tasks")
        .set("authorization", String("Bearer " + user_1_token))
        .send({title: "User 1 Task", description: "User 1 Owned Task", status: "To Do", project: Number(user_1_project)})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201)

    user_1_task = response.body.task.id;
  });

  test("GET /tasks/:id returns a 403 when User 2 tries to get User 1's Task", async () => {
    const app = createApp();
    const response = await request(app)
      .get(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + user_2_token))
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("GET /projects/:id returns a 403 when User 2 tries to get User 1's Project", async () => {
    const app = createApp();
    const response = await request(app)
      .get(String("/projects/" + user_1_project))
      .set("authorization", String("Bearer " + user_2_token))
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("GET /tasks returns a 200 when Admin tries to get User 1's Task", async () => {
    const app = createApp();
    const response = await request(app)
      .get(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + admin_token))
      .expect(200);

    expect(response.body.task.title).toEqual("User 1 Task");
    expect(response.body.task.description).toEqual("User 1 Owned Task");
    expect(response.body.task.status).toEqual("To Do");
    expect(response.body.task.project_id).toEqual(user_1_project);
  });
  
  test("POST /tasks returns a 403 when User 2 tries to create a task in User 1's project", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/tasks")
      .set("authorization", String("Bearer " + user_2_token))
      .send({ title: "User 2's Task", description: "User 2's owned task", status: "To Do", project: user_1_project })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("PATCH /tasks/:id returns a 403 when User 2 tries to modify User 1's task", async () => {
    const app = createApp();
    const response = await request(app)
      .patch(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + user_2_token))
      .send({ title: "User 2's Task", description: "User 2's owned task", status: "To Do", project: user_1_project })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("DELETE /tasks/:id returns a 403 when User 2 tries to delete User 1's task", async () => {
    const app = createApp();
    const response = await request(app)
      .delete(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + user_2_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("GET /users returns a 403 for non admin", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/users")
      .set("authorization", String("Bearer " + user_2_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("GET /users/:id returns a 403 for non admin", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/users/1")
      .set("authorization", String("Bearer " + user_2_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(403);

    expect(response.body.error).toEqual("Forbidden");
    expect(response.body.message).toEqual("You are not authorized to perform this action.");
  });

  test("GET /users returns a 200 for admin", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/users")
      .set("authorization", String("Bearer " + admin_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(Array.isArray(response.body.users)).toBe(true);
  });

  test("GET /users/:id returns a 200 for admin", async () => {
    const app = createApp();
    const response = await request(app)
      .get(String("/users/" + user_1_id))
      .set("authorization", String("Bearer " + admin_token))
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.user.name).toEqual("User 1");
  });

  test("DELETE /tasks/:id deletes User 1's task when logged in as admin", async () => {
    const app = createApp();

    const response = await request(app)
      .delete(String("/tasks/" + user_1_task))
      .set("authorization", String("Bearer " + admin_token))
      .expect(204);
  });

  test("DELETE /projects/:id deletes User 1's project when logged in as admin", async () => {
    const app = createApp();

    const response = await request(app)
      .delete(String("/projects/" + user_1_project))
      .set("authorization", String("Bearer " + admin_token))
      .expect(204);
  });
});

describe("Invalid route test", () => {

  test("GET /auth/bad returns a 404 error", async () => {
    const app = createApp();

    const response = await request(app)
      .get("/auth/bad")
      .set("authorization", String("Bearer " + admin_token))
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("Path not found.");
  });

  test("GET /bad returns a 404 error", async () => {
    const app = createApp();

    const response = await request(app)
      .get("/bad")
      .set("authorization", String("Bearer " + admin_token))
      .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("Path not found.");
  });
});