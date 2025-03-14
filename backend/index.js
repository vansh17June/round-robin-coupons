// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const couponRoutes = require("./routes/couponRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://round-robin-coupons.vercel.app", // Allow only your frontend domain
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", adminRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
