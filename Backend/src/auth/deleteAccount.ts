import type { Response } from "express";
import User from "../models/user.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: (error as Error).message,
    });
  }
};