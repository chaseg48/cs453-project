import express from "express";
import { env } from "./config/env";
import { pool } from "./db/pool";
import { taskRouter } from "./routes/taskRoutes"
import { authRouter } from "./routes/authRoutes"
import { userRouter } from "./routes/userRoutes";
import { projectRouter } from "./routes/projectRoutes";

export function createApp() {
	if (env.jwtSecret == "development_change_me") {
		throw new Error("The jwt secret has not been set through your environment. Update the JWT_SECRET environment variable!");
	}
	
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
			res.status(200).json({
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

	app.use("/auth", authRouter);
	app.use("/users", userRouter);
	app.use("/projects", projectRouter);
	app.use("/tasks", taskRouter);

	app.use((_req, res) => {
		res.status(404).json({ error: "Not found", message: "Path not found." });
	});

	return app;
}

const app = createApp();
app.listen(env.port, () => {
	console.log(`Server running at http://localhost:${env.port}`);
});
