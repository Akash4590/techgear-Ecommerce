import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/user.js";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: UserRole;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, access denied",
      });
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      role: UserRole;
    };

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};