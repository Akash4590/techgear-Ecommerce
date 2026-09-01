import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateOTP } from "../utils/generateOtp.js";
import { sendOTPEmail } from "../config/mailer.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (existingUser) {
      if (!existingUser.isDeleted && existingUser.isVerified) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.isDeleted = false;
      existingUser.deletedAt = undefined;
      existingUser.emailNotifications = true;
      existingUser.isVerified = false;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();

      await sendOTPEmail(normalizedEmail, otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email. Please verify to activate your account.",
        data: { email: existingUser.email },
      });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpiry,
    });

    await sendOTPEmail(normalizedEmail, otp);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete signup.",
      data: { email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: (error as Error).message,
    });
  }
};