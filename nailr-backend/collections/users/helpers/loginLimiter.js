const rateLimit = require("express-rate-limit");
const { handleError } = require("../../../utils/handleErrors");

const loginLimiter = rateLimit({
	windowMs: 86400000,
	limit: 3,
	message: "Too many login attempts. Try again after 24 hours.",
	keyGenerator: (req, res) => req.body.email,
	handler: (req, res, next, options) => {
		handleError(res, options.statusCode, options.message);
	},
	skipSuccessfulRequests: true,
});

module.exports = loginLimiter;
