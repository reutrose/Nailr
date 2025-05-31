const { createError } = require("../../../utils/handleErrors");
const Notification = require("../models/mongodb/Notification");

const createNotification = async (data) => {
	try {
		return await Notification.create(data);
	} catch (error) {
		createError("Create Notification", error);
	}
};

const getAllNotificationsForUser = async (userId) => {
	try {
		return await Notification.find({ recipientId: userId }).sort({
			createdAt: -1,
		});
	} catch (error) {
		createError("Get Notifications", error);
	}
};

const markNotificationAsRead = async (id) => {
	try {
		return await Notification.findByIdAndUpdate(
			id,
			{ isRead: true },
			{ new: true }
		);
	} catch (error) {
		createError("Mark Notification As Read", error);
	}
};

const markAllNotificationsAsRead = async (userId) => {
	try {
		return await Notification.updateMany(
			{ recipientId: userId, isRead: false },
			{ $set: { isRead: true } }
		);
	} catch (error) {
		createError("Mark All Notifications As Read", error);
	}
};

const deleteNotificationById = async (id) => {
	try {
		return await Notification.findByIdAndDelete(id);
	} catch (error) {
		createError("Delete Notification", error);
	}
};

module.exports = {
	createNotification,
	getAllNotificationsForUser,
	markNotificationAsRead,
	markAllNotificationsAsRead,
	deleteNotificationById,
};
