const jwt = require("jsonwebtoken");
const config = require("config");

const Business = require("../models/mongodb/Business");
const User = require("../../users/models/mongodb/User");

const JWT_SECRET = process.env.JWT_SECRET;

const createBusiness = async (token, businessData) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const userId = decoded._id;

		const { businessName, profession, description, location, logo } =
			businessData;

		const newBusiness = new Business({
			owner: userId,
			businessName,
			profession,
			description,
			location,
			logo,
		});

		await newBusiness.save();

		await User.findByIdAndUpdate(userId, {
			$push: { businesses: newBusiness._id },
		});

		return newBusiness;
	} catch (err) {
		console.error("Access Service Error - Create Business:", err);
		throw err;
	}
};

const getAllUserBusinesses = async (userId) => {
	try {
		const businesses = await Business.find({ owner: userId });
		return businesses;
	} catch (err) {
		console.error("Error getting user businesses:", err);
		throw err;
	}
};

const getAllBusinesses = async () => {
	try {
		const businesses = await Business.find({});
		return businesses;
	} catch (err) {
		console.error("Error getting businesses:", err);
		throw err;
	}
};

const getBusinessById = async (businessId) => {
	try {
		const business = await Business.findById(businessId);
		return business;
	} catch (error) {
		console.error("Error getting business by ID:", err);
		throw err;
	}
};

const deleteBusiness = async (token, businessId) => {
	try {
		const deleted = await Business.findByIdAndDelete(businessId);
		return deleted;
	} catch (error) {
		console.error("Error deleting business: ", error);
		throw error;
	}
};

const uploadLogo = async (businessId, filePath) => {
	try {
		return await Business.findByIdAndUpdate(
			businessId,
			{ logo: filePath },
			{ new: true }
		);
	} catch (error) {
		console.error("Error patching a logo: ", error);
		throw error;
	}
};

const updateBusiness = async (token, businessId, updatedFields) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const userId = decoded._id;

		const business = await Business.findById(businessId);
		if (!business) throw new Error("Business not found");

		if (!business.owner.equals(userId)) throw new Error("Unauthorized");

		Object.assign(business, updatedFields);
		await business.save();

		return business;
	} catch (err) {
		console.error("Access Service Error - Update Business:", err);
		throw err;
	}
};

module.exports = {
	createBusiness,
	getAllUserBusinesses,
	deleteBusiness,
	getBusinessById,
	uploadLogo,
	getAllBusinesses,
	updateBusiness,
};
