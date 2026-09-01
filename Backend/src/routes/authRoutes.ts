import { Router } from "express";
import type { Response } from "express";
import { signup } from "../auth/signup.js";
import { login } from "../auth/login.js";
import { forgotPassword } from "../auth/forgotPassword.js";
import { resetPassword } from "../auth/resetPassword.js";
import { changePassword } from "../auth/changePassword.js";
import { deleteAccount } from "../auth/deleteAccount.js";
import { updatePreferences } from "../auth/updatePreferences.js";
import { updateAvatar } from "../auth/updateAvatar.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadAvatar } from "../middleware/upload.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { verifyOTP } from "../auth/verifyOtp.js"; 
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Naye protected routes — sab authMiddleware ke peeche
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.put("/preferences", authMiddleware, updatePreferences);
router.put("/avatar", authMiddleware, uploadAvatar, updateAvatar);
router.post("/verify-otp", verifyOTP); 
router.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;