import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { env } from "../config/env";
import { pool } from "../db/pool";
import { validateUpdateTask,
		 validateCreateTask, 
		 validateId } from "../validation/validation"
import { getTasks,
	     getTask,
	     createTask,
		 updateTask,
		 deleteTask} from "../services/taskService"
import { authenticate } from "../middleware/authenticate";
import { getProject } from "../services/projectService";

export const taskRouter = Router();

taskRouter.get("/", authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await getTasks(req);
		if (result.status == 200) {
			return res.status(200).json({ tasks: result.rows });
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		return res.status(500).json({ error: "Server error" });
	}
});

taskRouter.get("/:id", authenticate, async (req: Request, res: Response, next: NextFunction) => {
	if (!validateId(req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}
	
	try {
		const result = await getTask(req);
		if (result.status == 200) {
			return res.status(200).json({ task: result.rows });
		} else if (result.status == 403) {
			return res.status(403).json({error: "Not authorized", message: "You are not authorized to perform this action."});
		} else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "A task with this id does not exist." });
		}
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		return res.status(500).json({ error: "Server error" });
	}
});

taskRouter.post("/", authenticate, async (req: Request, res: Response, next: NextFunction) => {
	if (!validateCreateTask(req.body.title, req.body.description, req.body.status, req.body.project)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid string for title, description, status and project id." });
	}

	let projectReq = req;
	projectReq.params.id = String(req.body.project);
	let project = await getProject(projectReq);
	if (project.status == 403) {
		return res.status(403).json({error: "Not authorized", message: "You are not authorized to perform this action."});
	} else if (project.status == 404) {
		return res.status(404).json({ error: "Not found", message: "A project with this id does not exist."});
	}
	
	try {
		const result =  await createTask(req);
		if (result.status == 201) {
			return res.status(201).json({ task: result.rows });
		}
		else {
			return res.status(400).json("Task not created");
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Servor error" });
	}
});

taskRouter.patch("/:id", authenticate, async (req: Request, res: Response, next: NextFunction) => {
	if (!validateUpdateTask(req.body.title, req.body.description, req.body.status, req.body.project)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid string for title, description, or status." });
	}

	if (!validateId(req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}

	if (req.body.project) {
		let projectReq = req;
		projectReq.params.id = String(req.body.project);
		let project = await getProject(projectReq);
		if (project.status == 403) {
			return res.status(403).json({error: "Not authorized", message: "You are not authorized to perform this action."});
		} else if (project.status == 404) {
			return res.status(404).json({ error: "Project not found", message: "A project with this id does not exist."});
		}
	}

	try {
		const result = await updateTask(req);
		if (result.status == 200) {
			return res.status(200).json({ task: result.rows[0] });
		} else if (result.status == 403) {
			return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
		} else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "A task with this id does not exist." });
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Server error" });
	}
});

taskRouter.delete("/:id", authenticate, async (req: Request, res: Response, next: NextFunction) => {
	if (!validateId(req.params.id)) {
		return res.status(400).json({ error: "Invalid request", message: "Enter a valid integer id." });
	}
	
	try {
		const result = await deleteTask(req);
		if (result.status == 204) {
			return res.status(204).json({ message: "Task deleted" });
		} else if (result.status == 403) {
			return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
		} else if (result.status == 404) {
			return res.status(404).json({error: "Not found", message: "A task with this id does not exist." });
		}
	}
	catch(error) {
		return res.status(500).json({ error: "Servor error" });
	}
});