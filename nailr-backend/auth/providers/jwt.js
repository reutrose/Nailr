const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateAuthToken = (user) => {
	const payload = {
		_id: user._id,
		fullName: user.firstName + " " + user.lastName,
	};
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "4h" });
	return token;
};

const verifyAuthToken = (tokenFromClient) => {
	try {
		const payload = jwt.verify(tokenFromClient, JWT_SECRET);
		return payload;
	} catch (error) {
		return null;
	}
};

module.exports = {
	generateAuthToken,
	verifyAuthToken,
};
