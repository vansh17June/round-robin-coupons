const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    claimed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Coupon", CouponSchema);