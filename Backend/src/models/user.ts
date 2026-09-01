import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  emailNotifications: boolean;
  avatar?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailNotifications: { type: Boolean, default: true },
    avatar: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;