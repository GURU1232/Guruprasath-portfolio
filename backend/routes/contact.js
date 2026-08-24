import fs from "fs";
import path from "path";
import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

// Persistent file database path
const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

// Ensure data directory and messages.json file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

function getStoredMessages() {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveMessage(entry) {
  const messages = getStoredMessages();
  messages.push(entry);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // --- Validation ---
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "That email address doesn't look valid." });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long (max 5000 characters)." });
  }

  const entry = {
    id: Date.now().toString(),
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };

  // 1. SAVE MESSAGE TO DATABASE (data/messages.json)
  saveMessage(entry);
  console.log(`💾 Saved message from ${name} (${email}) to database.`);

  // 2. SEND EMAIL NOTIFICATION (Nodemailer - 100% Free)
  try {
    if (
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_PASS !== "your_app_password_here"
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Message via Portfolio - ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6; margin-top: 0;">New Message via Portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message Description:</strong></p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; color: #1e293b; white-space: pre-wrap;">${message}</div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 0.8rem; color: #94a3b8;">Received at: ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
      console.log(`✉️ Email notification sent to ${process.env.CONTACT_RECEIVER || process.env.SMTP_USER}`);
    }
  } catch (err) {
    console.error("❌ Email send error:", err.message);
  }

  return res.status(200).json({
    success: true,
    message: "Thanks — your message has been saved and sent!",
  });
});

// Endpoint to view stored messages
router.get("/log", (req, res) => {
  res.json(getStoredMessages());
});

export default router;
