const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================= CORS SETUP ================= */

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://dhaneshwari-alpha.vercel.app",
];

const allowedOrigins = [
  ...defaultAllowedOrigins,
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "").split(","),
]
  .map((origin) => origin && origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow Vercel preview/production frontend domains.
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
};

app.use(cors(corsOptions));

/* ================= MIDDLEWARE ================= */

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/slider", require("./routes/slider"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/amenities", require("./routes/amenities"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/promotions", require("./routes/promotions"));
app.use("/api/attractions", require("./routes/attractions"));
app.use("/api/faqs", require("./routes/faqs"));
app.use("/api/gallery", require("./routes/gallery"));

/* ================= STATIC ================= */

app.use("/uploads", express.static("uploads"));

/* ================= SITEMAP ================= */

app.use("/sitemap.xml", require("./routes/sitemap"));

/* ================= HEALTH CHECK ================= */
// ✅ Important for Render (prevents "no open ports" issue)
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ================= 404 HANDLER ================= */
// ✅ FIX for "*" crash
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
