import { type Request, type Response, type NextFunction } from 'express-serve-static-core';
import { env } from '../config/env';
import jwt from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = function(req: Request, res: Response, next: NextFunction) {
    const authorization = req.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
        error: "Unauthorized",
        message: "Send a Bearer token in the Authorization header."
        });
    }

    const token = authorization.slice("Bearer ".length);
    try {
        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
        req.session = {userId: Number(decoded.id), email: decoded.email, role: decoded.role};
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({
        error: "Unauthorized",
        message: "The access token is missing, invalid, or expired."
    });
  }
} 