import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./authMiddleware.js";

// Hamesha authMiddleware ke BAAD use karna hai, taake req.userRole set ho chuka ho
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
};