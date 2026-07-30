import express, { response } from "express";
import { getUsers } from "../services/userService";

export const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {
    try {
        const result = await getUsers();
        if (result.status == 200) {
            return res.status(200).json({ users: result.rows });
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.get("/:id", async (_req, res) => {

});