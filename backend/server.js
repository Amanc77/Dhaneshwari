const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================= CORS SETUP ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://dhaneshwari-alpha.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("CORS blocked for origin:", origin);
      return callback(new Error("CORS not allowed for: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// ✅ Fix for Express 5 / new path-to-regexp
app.options(/.*/, cors());

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running...",
    allowedOrigins,
  });
});

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= ERROR ================= */

app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);
  res.status(500).json({ message: err.message || "Server error" });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Allowed origins:`, allowedOrigins);
});
