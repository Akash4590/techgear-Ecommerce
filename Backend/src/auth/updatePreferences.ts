import type { Response } from "express";
import User from "../models/user.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const updatePreferences = async (req: AuthRequest, res: Response) => {
  try {
    const { emailNotifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { emailNotifications },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Preferences updated",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      error: (error as Error).message,
    });
  }
};