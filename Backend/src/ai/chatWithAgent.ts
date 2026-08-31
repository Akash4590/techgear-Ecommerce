
import type { Response } from "express";
import { genAI } from "../config/gemini.js";
import { SYSTEM_PROMPT } from "./systemPrompt.js";
import {
  searchProducts,
  getOrderStatus,
  getRecentOrders,
} from "./tools.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const chatWithAgent = async (req: AuthRequest, res: Response) => {
  try {
    const { message, history } = req.body as {
      message: string;
      history?: ChatMessage[];
    };

    // Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // ---------------------------------------------------------
    // STEP 1: Collect real data from database
    // ---------------------------------------------------------

    let contextData = "";

    const lowerMsg = message.toLowerCase();

    // ---------------------------------------------------------
    // ORDER RELATED REQUEST
    // ---------------------------------------------------------

    if (
      (lowerMsg.includes("order") ||
        lowerMsg.includes("track") ||
        lowerMsg.includes("delivery")) &&
      req.userId
    ) {
      // Detect order ID
      // Examples:
      // #ABC12345
      // ABC12345
      const orderIdMatch = message.match(/#?([A-Z0-9]{6,10})/i);

      if (orderIdMatch) {
        const orderInfo = await getOrderStatus(
          orderIdMatch[1],
          req.userId
        );

        if (orderInfo.found) {
          contextData += `

[REAL ORDER DATA]
${JSON.stringify(orderInfo)}
`;
        } else {
          contextData += `

[REAL ORDER DATA]
No order found matching that ID for this customer.
`;
        }
      } else {
        const recentOrders = await getRecentOrders(req.userId);

        contextData += `

[CUSTOMER'S RECENT ORDERS]
${JSON.stringify(recentOrders)}
`;
      }
    }

    // ---------------------------------------------------------
    // PRODUCT RELATED REQUEST
    // ---------------------------------------------------------

    if (
      lowerMsg.includes("price") ||
      lowerMsg.includes("product") ||
      lowerMsg.includes("iphone") ||
      lowerMsg.includes("laptop") ||
      lowerMsg.includes("stock") ||
      lowerMsg.includes("available")
    ) {
      const products = await searchProducts(message);

      if (products.length > 0) {
        contextData += `

[RELEVANT PRODUCTS FROM DATABASE]
${JSON.stringify(products)}
`;
      }
    }

    // ---------------------------------------------------------
    // STEP 2: Prepare conversation history
    // ---------------------------------------------------------

    const contents = [
      ...(history || []).map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      {
        role: "user" as const,
        parts: [
          {
            text: contextData
              ? `${message}

${contextData}`
              : message,
          },
        ],
      },
    ];

    // ---------------------------------------------------------
    // STEP 3: Generate Gemini response
    // ---------------------------------------------------------
const response = await genAI.models.generateContent({
  model: "gemini-3.6-flash",
  contents,
  config: {
    systemInstruction: SYSTEM_PROMPT,
  },
});

    const responseText = response.text;

    // ---------------------------------------------------------
    // STEP 4: Return response
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,
      reply: responseText,
    });
  } catch (error) {
    console.error("AI Assistant Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get response from AI assistant",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
};

