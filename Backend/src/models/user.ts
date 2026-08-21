import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  emailNotifications: boolean; 
  isDeleted: boolean;        
  deletedAt?: Date;  
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailNotifications: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },   
    deletedAt: { type: Date }, 
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;