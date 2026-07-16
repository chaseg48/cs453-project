import express, { response } from "express";
import { env } from "./config/env";
import { pool } from "./db/pool";
import { validateTitle,
	     validateDesc,
		 validateStatus, 
		 validateUpdate,
		 validateCreate, 
		 validateId } from "./validation"
import { getTasks,
	     getTask,
	     createTask,
		 updateTask,
		 deleteTask} from "./db/databaseLogic"

export const router = express.Router()

router.get("/", async (_req, res) => {
	try {
		const result = await getTasks(_req);
		if (result.status == 200) {
			return res.status(200).json({ tasks: result.rows });
		}
		else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "No tasks found." });
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		return res.status(500).json({ error: "Server error" });
	}
});

router.get("/:id", async (_req, res) => {
	if (!validateId(_req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}
	
	try {
		const result = await getTask(_req);
		if (result.status == 200) {
			return res.status(200).json({ task: result.rows });
		}
		else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "Task not found, enter a valid id." });
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		return res.status(500).json({ error: "Server error" });
	}
});

router.post("/", async (_req, res, next) => {
	if (!validateCreate(_req.body.title, _req.body.description, _req.body.status)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid string for title, description, and status." });
	}
	
	try {
		const result =  await createTask(_req);
		if (result.status == 201) {
			return res.status(201).json({ task: result.rows });
		}
		else if (result.status == 400) {
			return res.status(400).json("Task not created");
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Servor error 1" });
	}
});

router.patch("/:id", async (_req, res, next) => {
	if (!validateUpdate(_req.body.title, _req.body.description, _req.body.status)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid string for title, description, or status." });
	}

	if (!validateId(_req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}

	try {
		const result = await updateTask(_req);
		if (result.status == 200) {
			return res.status(200).json({ task: result.rows[0] });
		}
		else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "Task not found, enter a valid id." });
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Server error" });
	}
});

router.delete("/:id", async (_req, res, next) => {
	if (!validateId(_req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}
	
	try {
		const result = await deleteTask(_req);
		if (result.status == 204) {
			return res.status(204).json({ message: "Task deleted" });
		}
		else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "Task not found, enter a valid id." });
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Servor error" });
	}
});