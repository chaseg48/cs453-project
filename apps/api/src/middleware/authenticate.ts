import { type Request, type Response, type NextFunction } from 'express-serve-static-core';
import { env } from '../config/env';
import jwt from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = function(req: Request, res: Response, next: NextFunction) {
    const authorization = req?.get("authorization");
    if (!authorization) {
        return res.status(401).json({ error: "Non-null token is required" });
    }
    const token = authorization.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
        req.session = {userId: Number(decoded.id), email: decoded.email, role: decoded.role};
        next();
    } catch(error) {
        return res.status(401).json({
        error: "Authentication required",
    });
  }
} 