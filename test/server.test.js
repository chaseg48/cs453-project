//
import { describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../apps/api/src/server.ts";

let testTaskId = Number();
let testTaskTitle = "Test Task";
let testTaskDescription = "Auto test suite task";
let testTaskStatus = "In Progress";

// Return the health of the server
describe("Project Test Suite", () => {
  test("GET /health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/health")
        .expect(200);

    expect(response.body).toEqual({ status: "ok", service: "cs553-api" });
  });

  // Bad path returns error response
  test("GET /bad returns error response", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/bad")
        .expect(404);

    expect(response.body).toEqual({ error: "Not found", message: "Path not found." });
  });

  // Successfully create a task
  test("POST /tasks creates a task", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/tasks")
        .send({title: testTaskTitle, description: testTaskDescription, status: testTaskStatus})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

    expect(response.body.task.title).toEqual("Test Task");
    expect(response.body.task.description).toEqual("Auto test suite task");
    expect(response.body.task.status).toEqual("In Progress");
    testTaskId = response.body.task.id;
    testTaskTitle = response.body.task.title;
    testTaskDescription = response.body.task.description;
    testTaskStatus = response.body.task.status;
  });

  // Create with error
  test("POST /tasks with error response", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/tasks")
        .send({title: "", description: "Auto test suite task", status: "In Progress"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(400);

    expect(response.body.error).toEqual("Invalid request");
    expect(response.body.message).toEqual("Enter a valid string for title, description, and status.");
  });

  // Successfull get all tasks
  test("GET /tasks returns rows", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/tasks")
        .expect(200);

    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  // Successfull get task
  test("GET /tasks/{id} gets a specific task", async () => {
    const app = createApp();
    console.log(testTaskId);
    const response = await request(app)
        .get("/tasks/" + String(testTaskId))
        .expect(200);

    expect(response.body.task.id).toEqual(testTaskId);
    expect(response.body.task.title).toEqual(testTaskTitle);
    expect(response.body.task.description).toEqual(testTaskDescription);
    expect(response.body.task.status).toEqual(testTaskStatus);
  });

  // Get task with 404 error
  test("GET /tasks/{id} returns error response", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/tasks/9999")
        .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("Task not found, enter a valid id.");
  });

  // Update title
  test("PATCH /tasks/{id} updates the title", async () => {
    const app = createApp();

    const response = await request(app)
        .patch("/tasks/" + String(testTaskId))
        .send({title: "Test Task UPDATED"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.task.id).toEqual(testTaskId);
    expect(response.body.task.title).toEqual("Test Task UPDATED");
    expect(response.body.task.description).toEqual(testTaskDescription);
    expect(response.body.task.status).toEqual(testTaskStatus);

    testTaskTitle = "Test Task UPDATED";
  });

  // Update description
  test("PATCH /tasks/{id} updates the description", async () => {
    const app = createApp();

    const response = await request(app)
        .patch("/tasks/" + String(testTaskId))
        .send({description: "Description UPDATED"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.task.id).toEqual(testTaskId);
    expect(response.body.task.title).toEqual(testTaskTitle);
    expect(response.body.task.description).toEqual("Description UPDATED");
    expect(response.body.task.status).toEqual(testTaskStatus);

    testTaskDescription = "Description UPDATED";
  });

  // Update status
  test("PATCH /tasks/{id} updates the status", async () => {
    const app = createApp();

    const response = await request(app)
        .patch("/tasks/" + String(testTaskId))
        .send({status: "Completed"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);

    expect(response.body.task.id).toEqual(testTaskId);
    expect(response.body.task.title).toEqual(testTaskTitle);
    expect(response.body.task.description).toEqual(testTaskDescription);
    expect(response.body.task.status).toEqual("Completed");

    testTaskStatus = "Completed";
  });

  // Update error
  test("PATCH /tasks/{id} returns error response", async () => {
    const app = createApp();

    const response = await request(app)
        .patch("/tasks/" + String(testTaskId))
        .send({})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(400);

    expect(response.body.error).toEqual("Invalid request");
    expect(response.body.message).toEqual("Enter a valid string for title, description, or status.");
  });

  // Successfull delete task
  test("Delete /tasks/{id} returns rows", async () => {
    const app = createApp();

    const response = await request(app)
        .delete("/tasks/" + String(testTaskId))
        .expect(204);
  });

  // Error delete task
  test("DELETE /tasks/{id} returns error response", async () => {
    const app = createApp();

    const response = await request(app)
        .delete("/tasks/9999")
        .expect(404);

    expect(response.body.error).toEqual("Not found");
    expect(response.body.message).toEqual("Task not found, enter a valid id.");
  });

});
