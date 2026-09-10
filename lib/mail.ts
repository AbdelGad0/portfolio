import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || "";
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

export function isMailConfigured(): boolean {
  return Boolean(EMAIL_USER && EMAIL_APP_PASSWORD);
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  if (!isMailConfigured()) return false;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT || 465),
      secure: Number(process.env.EMAIL_PORT || 465) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD
      }
    });

    const text = [
      `New message from the portfolio contact form`,
      ``,
      `From: ${name}`,
      `Reply-to: ${email}`,
      `Subject: ${subject || "(no subject)"}`,
      ``,
      `Message:`,
      message,
      ``,
      `---`,
      `Sent via the portfolio contact form`
    ].join("\n");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject || `New message from ${name}`}`,
      text
    });

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}