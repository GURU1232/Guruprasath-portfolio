import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoute from "./routes/contact.js";
import portfolioRoute from "./routes/portfolio.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);

// Prevent contact-form spam/abuse: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages sent. Please try again later." },
});

app.get("/", (req, res) => {
  res.json({ message: "Guruprasath Portfolio API is running live!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/portfolio", portfolioRoute);
app.use("/api/contact", contactLimiter, contactRoute);

const server = app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});

// --- PERMANENT FIX FOR EADDRINUSE (PORT IN USE) ---
// Gracefully release port 5000 when nodemon restarts or server stops
const gracefulShutdown = () => {
  server.close(() => {
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 500);
};

process.once("SIGUSR2", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
