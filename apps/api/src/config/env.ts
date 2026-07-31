import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

if (!process.env.JWT_SECRET) {
	console.log("Change the JWT_SECRET environment variable!");
}

export const env = {
	port: Number(process.env.PORT || 3000),
	databaseUrl:
		process.env.DATABASE_URL ||
		"postgresql://postgres:postgres@localhost:5432/cs453",
	jwtSecret: process.env.JWT_SECRET || "development_change_me"
};
