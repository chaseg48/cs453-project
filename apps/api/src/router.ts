import express, { response } from "express";
import { env } from "./config/env";
import { pool } from "./db/pool";
import { validatePost,
	     validatePut } from "./validation"
import { getTasks,
	     getTask,
	     createTask,
		 updateTask,
		 deleteTask} from "./db/logic"

export const router = express.Router()

router.get("/", async (_req, res) => {
	try {
		console.log("Here");
		const result = await getTasks(_req);
		if (result.status == 200) {
			res.status(200).json(result.rows);
		}
		else if (result.status == 400) {
			res.status(404).json("No tasks found")
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({ error: "Server error" });
	}
});

router.get("/:id", async (_req, res) => {
	try {
		const result = await getTask(_req);
		if (result.status == 200) {
			res.status(200).json(result.rows);
		}
		else if (result.status == 404) {
			res.status(404).json("Task not found")
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({ error: "Server error" });
	}
});

router.post("/:id", validatePost, async (_req, res, next) => {
	try {
		const result =  await createTask(_req);
		if (result.status == 201) {
			res.header(201).json("Task created");
		}
		else if (result.status == 400) {
			res.header(400).json("Task not created");
		}
	}
	catch(error) {
		res.header(500).json({ error: "Servor error" });
	}
});

router.put("/:id", validatePut, async (_req, res, next) => {
	try {
		const result = await updateTask(_req);
		if (result.status == 201) {
			res.header(201).json("Task updated");
		}
		else if (result.status == 404) {
			res.header(404).json("Task not found");
		}
	}
	catch(error) {
		res.header(500).json({ error: "Server error" });
	}
});

router.delete("/:id", async (_req, res, next) => {
	try {
		const result = await deleteTask(_req);
		if (result.status == 204) {
			res.header(204).json("Task deleted");
		}
		else if (result.status == 404) {
			res.header(404).json("Task not found");
		}
	}
	catch(error) {
		res.header(500).json({ error: "Servor error" });
	}
});