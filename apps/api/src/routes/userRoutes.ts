import express, { response } from "express";
import { getUser, getUsers } from "../services/userService";
import { validateId } from "../validation/validation";
import { authenticate } from "../middleware/authenticate";

export const userRouter = express.Router();

userRouter.get("/", authenticate, async (req, res) => {
    try {
        const result = await getUsers(req);
        if (result.status == 200) {
            return res.status(200).json({ users: result.rows });
        } else if (result.status == 403) {
            return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
        } else {
            return res.status(500).json({ error: "Internal database error" });
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.get("/:id", authenticate, async (req, res) => {
    if (!validateId(req.params.id)) {
        return res.status(400).json({ error: "Invalid request", message: "Enter a valid user id." });
    }

    try {
        const result = await getUser(req);
        if (result.status == 200) {
            return res.status(200).json({ user: result.rows[0] });
        } else if (result.status == 404) {
            return res.status(404).json({ error: "User not found", message: "A user with this id does not exist." });
        } else if (result.status == 403) {
            return res.status(403).json({ error: "Not authorized", message: "You are not authorized to perform this action." });
        } else {
            return res.status(500).json({ error: "Internal database error" });
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return res.status(500).json({ error: "Server error" });
    }
});