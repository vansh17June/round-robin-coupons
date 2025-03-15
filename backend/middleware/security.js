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

const cookieCooldownMiddleware =async (req, res, next) => {
    if (req.cookies.userToken) {
        return res.status(429).json({ message: "You have already claimed in this session." });
    };
  cont userToken="true";
    res.cookie("userToken", userToken , {
    httpOnly: true, // Prevents client-side JS access
    secure: true, // Required for HTTPS (set `false` for localhost)
    sameSite: "None", // Required for cross-origin cookies
     maxAge:3600000
  });
    next();
};

module.exports = { ipCooldownMiddleware, cookieCooldownMiddleware };
