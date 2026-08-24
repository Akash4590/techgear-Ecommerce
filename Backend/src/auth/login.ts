import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"] }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: (error as Error).message,
    });
  }
};