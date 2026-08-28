import type { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../config/stripe.js";

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not defined");
    return res.status(500).send("Webhook secret not configured");
  }

  let event: Stripe.Event;

  try {
    // req.body yahan RAW buffer hona chahiye (JSON parsed nahi) — signature verify karne ke liye
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", (err as Error).message);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Event type ke hisab se handle karo
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment succeeded: ${paymentIntent.id}, amount: ${paymentIntent.amount / 100}`);
      // Yahan tum chaho to safety-check kar sakte ho: agar order abhi tak DB mein nahi bana,
      // to log kar do ya alert bhejo (advanced case — filhal sirf logging kaafi hai)
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentIntent.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};