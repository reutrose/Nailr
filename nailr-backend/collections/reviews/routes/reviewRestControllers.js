const express = require("express");
const auth = require("../../../auth/authService");
const { handleError } = require("../../../utils/handleErrors");
const {
	createReview,
	getReviewsByBusinessId,
	deleteReviewById,
	getAllReviews,
} = require("../models/reviewAccessDataService");
const {
	createNotification,
} = require("../../notifications/models/notificationAccessDataService");

const Business = require("../../businesses/models/mongodb/Business");
const User = require("../../users/models/mongodb/User");

const router = express.Router();

router.post("/business/:businessId", auth, async (req, res) => {
	try {
		const businessId = req.params.businessId;

		const data = {
			business: businessId,
			user: { name: req.user.fullName, id: req.user._id },
			comment: req.body.comment,
			rating: req.body.rating,
		};
		const review = await createReview(data);

		const business = await Business.findById(businessId);
		const reviewer = await User.findById(req.user._id);

		if (business?.owner?.toString() !== reviewer._id.toString()) {
			await createNotification({
				recipientId: business.owner,
				type: "review",
				data: {
					reviewId: review._id,
					rating: review.rating,
					reviewer: {
						firstName: reviewer.firstName,
						lastName: reviewer.lastName,
						avatar: reviewer.avatar,
					},
				},
			});
		}

		res.send(review);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/business/:businessId", async (req, res) => {
	try {
		const reviews = await getReviewsByBusinessId(req.params.businessId);
		res.send(reviews);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const review = await deleteReviewById(req.params.id);
		res.send(review);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const reviews = await getAllReviews();
		res.send(reviews);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

module.exports = router;
