const rateLimit = require("express-rate-limit");

const dailyLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000,
	max: 5000,
	message: "Too many requests from this IP. Please try again tomorrow.",
	standardHeaders: true,
	legacyHeaders: false,
});

module.exports = dailyLimiter;
