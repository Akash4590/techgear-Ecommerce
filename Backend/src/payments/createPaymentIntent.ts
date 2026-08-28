import type { Response } from "express";
import { stripe } from "../config/stripe.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid amount is required",
      });
    }

    // Stripe amount cents mein leta hai (jaise $35.50 = 3550)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        userId: req.userId || "unknown",
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: (error as Error).message,
    });
  }
};