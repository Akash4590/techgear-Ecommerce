import type { Response } from "express";
import User from "../models/user.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const avatar = (req.file as Express.Multer.File & { path?: string } | undefined)?.path;

    if (!avatar) {
      return res.status(400).json({ success: false, message: "Please select an image" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update avatar",
      error: (error as Error).message,
    });
  }
};