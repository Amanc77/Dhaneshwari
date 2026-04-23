const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================= CORS SETUP ================= */

// Simple and reliable CORS (no crash, no blocking)
app.use(
  cors({
    origin: true, // allow all origins (safe for now)
    credentials: true,
  }),
);

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

app.get("/", (req, res) => {
  res.send("API is running...");
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
  console.log(`Server running on port ${PORT}`);
});
