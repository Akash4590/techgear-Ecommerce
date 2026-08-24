import type { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/user.js";
import { sendResetCodeEmail } from "../utils/sendEmail.js";

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
      // Security: don't reveal if email exists
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset code has been sent",
      });
    }

  
    const resetCode = crypto.randomInt(100000, 999999).toString();

    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();

   
    await sendResetCodeEmail(user.email, resetCode);

    res.status(200).json({
      success: true,
      message: "A reset code has been sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process request",
      error: (error as Error).message,
    });
  }
};