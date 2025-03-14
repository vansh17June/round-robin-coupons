const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { adminAuth } = require("../middleware/auth");

router.get("/coupons", async (req, res) => {
    const coupons = await Coupon.find();
    res.json(coupons);
});
// Admin Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

   
    if (password !== admin.password) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JS access
    secure: true, // Required for HTTPS (set `false` for localhost)
    sameSite: "None", // Required for cross-origin cookies
     maxAge:3600000
  });
    res.json({ message: "Login successful" });
});
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

router.post("/add",adminAuth,async (req, res) => {
    const { code } = req.body;
    const newCoupon = new Coupon({ code });
    await newCoupon.save();
    res.json({ message: "Coupon added successfully!" });
});
router.delete("/delete/:coupon",adminAuth,async(req,res)=>{
    const coupon=req.params.coupon;
    await Coupon.findOneAndDelete({code:coupon});
    res.json({ message: "Coupon deleted successfully!" });

})

module.exports = router;
