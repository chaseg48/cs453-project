import express from "express";
import { env } from "./config/env";
import { pool } from "./db/pool";
import { router } from "./router"
import { getTasks } from "./db/databaseLogic"

export function createApp() {
	const app = express();

	app.use(express.json());

	app.get("/health", (_req, res) => {
		res.status(200).json({
			status: "ok",
			service: "cs553-api",
		});
	});

	app.get("/db-health", async (_req, res) => {
		try {
			const result = await pool.query("SELECT NOW() AS current_time");
			res.json({
				status: "ok",
				database: "connected",
				currentTime: result.rows[0].current_time,
			});
		} catch (error) {
			console.error("Database health check failed:", error);
			res.status(500).json({
				status: "error",
				database: "disconnected",
			});
		}
	});

	app.use("/tasks", router);

	app.use((_req, res) => {
		res.status(404).json({ error: "Not found", message: "Path not found." });
	});

	return app;
}

const app = createApp();
app.listen(env.port, () => {
	console.log(`Server running at http://localhost:${env.port}`);
});
