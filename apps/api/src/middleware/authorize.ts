import { Request, Response, NextFunction } from "express";
import { nextTick } from "node:process";

export const requireRole = function(roles: Array<string>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (roles.includes(req.session.role)) {
                next();
            } else {
                return res.status(403).json({ error: "Forbidden", message: "You are not authorized to perform this action." });
            }
        } catch(error) {
            return res.status(403).json({ error: "Forbidden", message: "You are not authorized to perform this action." });
        }
    }
}