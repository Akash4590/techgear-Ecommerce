import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";
import { transporter } from "../config/mailer.js";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Security: don't reveal if email exists or not
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been generated",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();

    // Note: In production, you would email this token to the user.
    // For now, we return it directly so you can test in Postman.
    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken, // Remove this in production once email sending is added
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process request",
      error: (error as Error).message,
    });
  }
};