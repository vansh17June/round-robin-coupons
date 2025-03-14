const CookieParser = require("cookie-parser");
const IPLog = require("../models/IPLog");

const COOLDOWN_TIME = 60 * 60 * 1000;


const ipCooldownMiddleware = async (req, res, next) => {
    const userIP = req.ip;
    const existingRecord = await IPLog.findOne({ ip: userIP });
    
    if (existingRecord) {
        const timeElapsed = Date.now() - new Date(existingRecord.lastClaim).getTime();
        if (timeElapsed < COOLDOWN_TIME) {
            return res.status(429).json({ message: "Cooldown period active." });
        }
    }
    
    await IPLog.findOneAndUpdate({ ip: userIP }, { lastClaim: new Date() }, { upsert: true });
    next();
};

const cookieCooldownMiddleware = (req, res, next) => {
    if (req.cookies.userToken) {
        return res.status(429).json({ message: "You have already claimed in this session." });
    }
    res.cookie("userToken", "true", { maxAge: COOLDOWN_TIME, httpOnly: true });
    next();
};

module.exports = { ipCooldownMiddleware, cookieCooldownMiddleware };