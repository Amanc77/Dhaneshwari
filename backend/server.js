const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

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
    // Allow requests without Origin header (curl, server-to-server, health checks).
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Do not throw 500 for unknown origins; simply deny CORS.
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Existing routes
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

// Static uploads
app.use("/uploads", express.static("uploads"));

// Sitemap
app.use("/sitemap.xml", require("./routes/sitemap"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
