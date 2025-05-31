const { createError } = require("../../../utils/handleErrors");
const Review = require("./mongodb/Review");
const Business = require("../../businesses/models/mongodb/Business");

const createReview = async (data) => {
	try {
		const newReview = new Review(data);
		await newReview.save();

		const business = await Business.findById(data.business);
		if (!business) throw new Error("Business not found");

		business.reviews.push(newReview._id);

		await business.populate("reviews");

		const total = business.reviews.reduce((sum, r) => sum + r.rating, 0);
		const rawAverage = total / business.reviews.length;

		business.averageRating = Math.round(rawAverage * 2) / 2;

		await business.save();

		return newReview;
	} catch (error) {
		createError("Create Review", error);
		throw error;
	}
};

const getReviewsByBusinessId = async (businessId) => {
	try {
		return await Review.find({ business: businessId }).sort({ createdAt: -1 });
	} catch (error) {
		createError("Get Reviews By Business", error);
	}
};

const deleteReviewById = async (id) => {
	try {
		return await Review.findByIdAndDelete(id);
	} catch (error) {
		createError("Delete Review", error);
	}
};

const getAllReviews = async () => {
	try {
		return await Review.find({});
	} catch (error) {
		createError("Get All Reviews", error);
	}
};

module.exports = {
	createReview,
	getReviewsByBusinessId,
	deleteReviewById,
	getAllReviews,
};
