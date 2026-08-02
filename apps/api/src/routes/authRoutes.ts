import express, { Request, Response } from "express";
import { validateLoginCredentials, validateRegistrationCredentials } from "../validation/validation";
import { registerUser,
         login } from "../services/authService";
import jwt from "jsonwebtoken";
const jwtExpiresIn = "1h";

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    
    try {
        if (!validateRegistrationCredentials(req.body.name, req.body.email, req.body.password, req.body.role)) {
            return res.status(400).json({error: "Invalid request", message: "Enter a valid name, email and password"});
        }
        const result = await registerUser(req.body.name, req.body.email, req.body.password, req.body.role);

        if (result.status == 201) {
            return res.status(201).json({user: {name: result.rows[0].name, id: result.rows[0].id}});
        } else if (result.status == 401) {
            return res.status(401).json({error: "Duplicate email", message: "A user with this email already exists"});
        }

    } catch(error) {
		console.error("Failed to register user:", error);
		return res.status(500).json({ error: "Server error" });
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    
    try {
        if (!validateLoginCredentials(req.body.email, req.body.password)) {
            return res.status(400).json({error: "Invalid request", message: "Enter a valid name, email and password"});
        }
        const result = await login(req.body.name, req.body.email, req.body.password);
        if (result.status == 401) {
            return res.status(401).json({error: "Not authorized", message: "Invalid password"});
        } else if (result.status == 404) {
            return res.status(404).json({error: "User not found", message: "A user with the provided email address does not exist"});
        }
    
        return res.status(200).json({
        message: String("Logged in as: " + result.rows[0].name),
        accessToken: result.token,
        tokenType: "Bearer",
        expiresIn: jwtExpiresIn,
        user: { name: req.body.name, role: result.rows[0].role }
        });
        

    } catch(error) {
		console.error("Failed to log in:", error);
		return res.status(500).json({ error: "Server error" });
    }
});