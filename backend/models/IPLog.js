const mongoose = require("mongoose");
const IPSchema = new mongoose.Schema({
    ip: String,
    lastClaim: Date
});
module.exports = mongoose.model("IPLog", IPSchema);