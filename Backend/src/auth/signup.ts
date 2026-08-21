import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

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
    const existingUser = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (existingUser) {
      if (!existingUser.isDeleted) {
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
      await existingUser.save();

      return res.status(200).json({
        success: true,
        message: "Account reactivated successfully",
        data: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: (error as Error).message,
    });
  }
};