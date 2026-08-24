
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// CORS
app.use(cors());

// JSON body parser
app.use(express.json());

// Test route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "TechGear API is running",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Product routes
app.use("/api/products", productRoutes);

export default app;
