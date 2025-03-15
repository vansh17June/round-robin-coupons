const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const { ipCooldownMiddleware, cookieCooldownMiddleware } = require("../middleware/security");
//ipCooldownMiddleware, cookieCooldownMiddleware
router.post("/claim",cookieCooldownMiddleware,ipCooldownMiddleware,async (req, res) => {
    const coupon = await Coupon.findOne({ claimed: false });
    if (!coupon) return res.status(400).json({ message: "No coupons available." });
    
    coupon.claimed = true;
    await coupon.save();
    res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
});


module.exports = router;
