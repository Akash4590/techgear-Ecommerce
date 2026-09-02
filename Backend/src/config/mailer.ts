import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const BRAND_COLOR = "#4F46E5";
const TEXT_DARK = "#0B0B14";
const TEXT_MUTED = "#6B7280";
const BORDER_COLOR = "#E5E7EB";
const BG_LIGHT = "#F3F4F6";

const renderEmailShell = (opts: {
  previewText: string;
  bannerLabel: string;
  bannerColor: string;
  bodyHtml: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TechGear</title>
</head>
<body style="margin:0; padding:0; background-color:${BG_LIGHT}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <!-- Preview text (hidden, shows in inbox preview) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    ${opts.previewText}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG_LIGHT}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:${TEXT_DARK}; padding: 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:${BRAND_COLOR}; width:32px; height:32px; border-radius:8px; text-align:center; vertical-align:middle;">
                          <span style="color:#ffffff; font-size:14px; font-weight:700; line-height:32px;">TG</span>
                        </td>
                        <td style="padding-left:10px;">
                          <span style="color:#ffffff; font-size:16px; font-weight:700;">TechGear</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Status banner -->
          <tr>
            <td style="background-color:${opts.bannerColor}1A; padding: 10px 32px; border-bottom: 1px solid ${BORDER_COLOR};">
              <span style="color:${opts.bannerColor}; font-size:12px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;">
                ${opts.bannerLabel}
              </span>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding: 32px;">
              ${opts.bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${BG_LIGHT}; padding: 24px 32px; border-top: 1px solid ${BORDER_COLOR};">
              <p style="margin:0 0 8px 0; color:${TEXT_DARK}; font-size:13px; font-weight:600;">
                TechGear
              </p>
              <p style="margin:0 0 12px 0; color:${TEXT_MUTED}; font-size:12px; line-height:1.6;">
                Your one-stop shop for the latest tech products.<br/>
                Quality, reliability, and innovation at the best prices.
              </p>
              <p style="margin:0; color:#9CA3AF; font-size:11px; line-height:1.6;">
                © ${new Date().getFullYear()} TechGear. All rights reserved.<br/>
                This is an automated message, please do not reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const renderButton = (url: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
    <tr>
      <td style="background-color:${BRAND_COLOR}; border-radius:8px;">
        <a href="${url}"
           style="display:inline-block; padding: 13px 28px; color:#ffffff; font-size:14px;
                  font-weight:600; text-decoration:none;">
          ${label}
        </a>
      </td>
    </tr>
  </table>
`;

const renderItemsTable = (items: EmailOrderItem[]) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid ${BORDER_COLOR}; border-radius: 10px; overflow:hidden;">
    ${items
      .map(
        (item, index) => `
      <tr style="${index !== items.length - 1 ? `border-bottom: 1px solid ${BORDER_COLOR};` : ""}">
        <td style="padding: 14px; width: 56px; background-color:#FAFAFA;">
          <img src="${item.image}" alt="${item.name}" width="44" height="44"
               style="border-radius:8px; object-fit:contain; display:block; background-color:#ffffff; border: 1px solid ${BORDER_COLOR};" />
        </td>
        <td style="padding: 14px 12px; font-size: 13px; color:${TEXT_DARK}; font-weight:600;">
          ${item.name}
          <div style="color:${TEXT_MUTED}; font-size:12px; font-weight:400; margin-top:2px;">
            Qty: ${item.quantity}
          </div>
        </td>
        <td style="padding: 14px; font-size: 13px; color:${TEXT_DARK}; font-weight:700; text-align:right; white-space:nowrap;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
      )
      .join("")}
  </table>
`;

export const sendOTPEmail = async (to: string, otp: string) => {
  const html = renderEmailShell({
    previewText: `Your TechGear verification code is ${otp}`,
    bannerLabel: "Email Verification",
    bannerColor: BRAND_COLOR,
    bodyHtml: `
      <h1 style="margin:0 0 12px 0; color:${TEXT_DARK}; font-size:20px; font-weight:700;">
        Verify your email address
      </h1>
      <p style="margin:0 0 20px 0; color:${TEXT_MUTED}; font-size:14px; line-height:1.6;">
        Thanks for signing up with TechGear! Use the verification code below to
        complete your registration. This code will expire in 10 minutes.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;">
        <tr>
          <td align="center" style="background-color:${BG_LIGHT}; border: 1px solid ${BORDER_COLOR}; border-radius: 10px; padding: 20px;">
            <span style="color:${TEXT_DARK}; font-size:32px; font-weight:700; letter-spacing: 8px;">
              ${otp}
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; line-height:1.6;">
        If you didn't create an account with TechGear, you can safely ignore this
        email.
      </p>
    `,
  });

  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your TechGear account",
    html,
  });
};

export const sendResetPasswordEmail = async (to: string, resetUrl: string) => {
  const html = renderEmailShell({
    previewText: "Reset your TechGear account password",
    bannerLabel: "Account Security",
    bannerColor: BRAND_COLOR,
    bodyHtml: `
      <h1 style="margin:0 0 12px 0; color:${TEXT_DARK}; font-size:20px; font-weight:700;">
        Reset your password
      </h1>
      <p style="margin:0; color:${TEXT_MUTED}; font-size:14px; line-height:1.6;">
        We received a request to reset the password for your TechGear account.
        Click the button below to choose a new password. For your security, this
        link will expire in 15 minutes.
      </p>
      ${renderButton(resetUrl, "Reset Password")}
      <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; line-height:1.6;">
        If you didn't request a password reset, you can safely ignore this email —
        your password will remain unchanged.
      </p>
    `,
  });

  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your TechGear password",
    html,
  });
};
export const sendOrderConfirmationEmail = async (
  to: string,
  customerName: string,
  orderId: string,
  totalAmount: number,
  items: EmailOrderItem[]
) => {
  const shortId = orderId.slice(-8).toUpperCase();

  const html = renderEmailShell({
    previewText: `Your order #${shortId} has been received`,
    bannerLabel: "Order Confirmed",
    bannerColor: "#16A34A",
    bodyHtml: `
      <h1 style="margin:0 0 12px 0; color:${TEXT_DARK}; font-size:20px; font-weight:700;">
        Thanks for your order, ${customerName}!
      </h1>
      <p style="margin:0 0 4px 0; color:${TEXT_MUTED}; font-size:14px; line-height:1.6;">
        We've received your order and it's now being prepared. Here's a summary:
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0 4px 0;">
        <tr>
          <td style="color:${TEXT_MUTED}; font-size:13px;">Order Number</td>
          <td style="color:${TEXT_DARK}; font-size:13px; font-weight:700; text-align:right;">#${shortId}</td>
        </tr>
        <tr>
          <td style="color:${TEXT_MUTED}; font-size:13px; padding-top:6px;">Estimated Delivery</td>
          <td style="color:${TEXT_DARK}; font-size:13px; font-weight:700; text-align:right; padding-top:6px;">5–7 working days</td>
        </tr>
      </table>

      ${renderItemsTable(items)}

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 2px solid ${TEXT_DARK}; padding-top: 12px; margin-top: 4px;">
        <tr>
          <td style="color:${TEXT_DARK}; font-size:15px; font-weight:700;">Total</td>
          <td style="color:${TEXT_DARK}; font-size:15px; font-weight:700; text-align:right;">$${totalAmount.toFixed(2)}</td>
        </tr>
      </table>

      ${renderButton(`${process.env.FRONTEND_URL}/account`, "View Order")}

      <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; line-height:1.6;">
        We'll send you another email as soon as your order ships. Thank you for
        shopping with TechGear!
      </p>
    `,
  });

  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order Confirmed — #${shortId}`,
    html,
  });
};

export const sendOrderShippedEmail = async (
  to: string,
  customerName: string,
  orderId: string
) => {
  const shortId = orderId.slice(-8).toUpperCase();

  const html = renderEmailShell({
    previewText: `Your order #${shortId} is on its way`,
    bannerLabel: "Order Shipped",
    bannerColor: "#2563EB",
    bodyHtml: `
      <h1 style="margin:0 0 12px 0; color:${TEXT_DARK}; font-size:20px; font-weight:700;">
        Your order is on its way, ${customerName}!
      </h1>
      <p style="margin:0; color:${TEXT_MUTED}; font-size:14px; line-height:1.6;">
        Great news — order <strong style="color:${TEXT_DARK};">#${shortId}</strong> has
        left our warehouse and is now on its way to you.
      </p>
      ${renderButton(`${process.env.FRONTEND_URL}/account`, "Track Your Order")}
      <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; line-height:1.6;">
        We'll let you know as soon as it's delivered. Thank you for shopping with
        TechGear!
      </p>
    `,
  });

  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your order has shipped — #${shortId}`,
    html,
  });
};

export const sendOrderDeliveredEmail = async (
  to: string,
  customerName: string,
  orderId: string,
  items: EmailOrderItem[]
) => {
  const shortId = orderId.slice(-8).toUpperCase();

  const reviewUrl =
    items.length === 1
      ? `${process.env.FRONTEND_URL}/product/${items[0].productId}`
      : `${process.env.FRONTEND_URL}/account`;

  const html = renderEmailShell({
    previewText: `Your order #${shortId} has been delivered`,
    bannerLabel: "Order Delivered",
    bannerColor: "#16A34A",
    bodyHtml: `
      <h1 style="margin:0 0 12px 0; color:${TEXT_DARK}; font-size:20px; font-weight:700;">
        Your order has arrived, ${customerName}!
      </h1>
      <p style="margin:0; color:${TEXT_MUTED}; font-size:14px; line-height:1.6;">
        Order <strong style="color:${TEXT_DARK};">#${shortId}</strong> has been
        delivered. We hope you love it! Your feedback helps other shoppers make
        better decisions — would you take a moment to leave a review?
      </p>
      ${renderButton(reviewUrl, "Leave a Review")}
      <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; line-height:1.6;">
        Thank you for shopping with TechGear — we hope to see you again soon!
      </p>
    `,
  });

  await transporter.sendMail({
    from: `"TechGear" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Delivered — how was your order? #${shortId}`,
    html,
  });
};