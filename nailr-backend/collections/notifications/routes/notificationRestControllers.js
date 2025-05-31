const express = require("express");
const auth = require("../../../auth/authService");
const { handleError } = require("../../../utils/handleErrors");

const {
	createNotification,
	getAllNotificationsForUser,
	markNotificationAsRead,
	markAllNotificationsAsRead,
	deleteNotificationById,
} = require("../models/notificationAccessDataService");

const router = express.Router();

router.post("/", auth, async (req, res) => {
	try {
		const notification = await createNotification({
			recipientId: req.body.recipientId,
			type: req.body.type,
			data: req.body.data,
		});
		res.send(notification);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const notifications = await getAllNotificationsForUser(req.user._id);
		res.send(notifications);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.patch("/:id/read", auth, async (req, res) => {
	try {
		const notification = await markNotificationAsRead(req.params.id);
		res.send(notification);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.patch("/mark-all-read", auth, async (req, res) => {
	try {
		await markAllNotificationsAsRead(req.user._id);
		res.send({ message: "All notifications marked as read." });
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const result = await deleteNotificationById(req.params.id);
		res.send(result);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

module.exports = router;
