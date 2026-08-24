import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Admin";

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      // Agar account pehle se exist karta hai, sirf role confirm kar dein (safe re-run)
      existingAdmin.role = "admin";
      existingAdmin.isDeleted = false;
      await existingAdmin.save();
      console.log(`Existing user "${adminEmail}" promoted to admin.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      console.log(`Admin account created successfully: ${adminEmail}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", (error as Error).message);
    process.exit(1);
  }
};

seedAdmin();