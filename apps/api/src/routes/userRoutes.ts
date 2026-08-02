import express, { response } from "express";
import { getUser, getUsers } from "../services/userService";
import { validateId } from "../validation/validation";
import { authenticate } from "../middleware/authenticate";
import { requireRole } from "../middleware/authorize";

export const userRouter = express.Router();
userRouter.use(authenticate);
userRouter.use(requireRole(["admin"]));

userRouter.get("/", async (req, res) => {
    try {
        const result = await getUsers(req);
        if (result.status == 200) {
            return res.status(200).json({ users: result.rows });
        } else {
            return res.status(500).json({ error: "Internal database error" });
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.get("/:id", async (req, res) => { 
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: "Invalid request", message: "Enter a valid user id." });
        }
        const result = await getUser(req);
        if (result.status == 200) {
            return res.status(200).json({ user: result.rows[0] });
        } else if (result.status == 404) {
            return res.status(404).json({ error: "User not found", message: "A user with this id does not exist." });
        } else {
            return res.status(500).json({ error: "Internal database error" });
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return res.status(500).json({ error: "Server error" });
    }
});