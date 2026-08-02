import { Request, Response, NextFunction } from "express-serve-static-core";
import express from "express";
import { createProject, deleteProject, getProject, getProjects } from "../services/projectService";
import { authenticate } from "../middleware/authenticate";
import { validateCreateProject, validateId } from "../validation/validation";
import { requireRole } from "../middleware/authorize";

export const projectRouter = express.Router();
projectRouter.use(authenticate);
projectRouter.use(requireRole(["user", "admin"]));

projectRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getProjects(req);
        if (result.status == 200) {
            return res.status(200).json({ projects: result.rows });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error", message: "Internal servor error." });
    }
});

projectRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: "Invalid request", message: "Enter a valid project id." });
        }
        const result = await getProject(req);
        if (result.status == 200) {
            return res.status(200).json({ project: result.rows[0] });
        } else if (result.status == 403) {
            return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
        } else if (result.status == 404) {
            return res.status(404).json({ error: "Project not found", message: "A project with this id does not exist." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error", message: "Internal servor error." });
    }
});

projectRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!validateCreateProject(req.body.name, req.body.description)) {
            return res.status(400).json({ error: "Invalid request", message: "Enter a valid project name and description." });
        }
        const result = await createProject(req);
        if (result.status == 201) {
            return res.status(201).json({ project: result.rows[0] });
        } else {
            return res.status(400).json({ error: "Project not created" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error", message: "Internal servor error." });
    }
});

projectRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: "Invalid request", message: "Enter a valid project id." });
        }
        const result = await deleteProject(req);
        if (result.status == 204) {
            return res.status(204).json({ message: "Project deleted" });
        } else if (result.status == 404) {
            return res.status(404).json({ error: "Project not found", message: "A project with this id does not exist." });
        } else if (result.status == 403) {
            return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server error", message: "Internal servor error" });
    }
});