import { transporter } from "../config/mailer.js";

export const sendResetCodeEmail = async (to: string, code: string) => {
  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset Code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color: #4F46E5;">TechGear Password Reset</h2>
        <p>You requested to reset your password. Use the code below:</p>
        <div style="background: #F8F9FC; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #0B0B14;">${code}</span>
        </div>
        <p style="color: #6B7280; font-size: 13px;">This code will expire in 15 minutes. If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};