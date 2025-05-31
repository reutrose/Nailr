const express = require("express");
const router = express.Router();
const auth = require("../../../auth/authService");
const multer = require("../../../middlewares/multer/multerMessageUpload");
const {
	sendNewMessage,
	getAllMessagesForConversation,
} = require("../models/messageAccessDataService");

const {
	createNotification,
} = require("../../notifications/models/notificationAccessDataService");
const Conversation = require("../../conversations/models/mongodb/Conversation");
const User = require("../../users/models/mongodb/User");

router.post("/", auth, multer.single("image"), async (req, res) => {
	try {
		const data = {
			conversationId: req.body.conversationId,
			senderId: req.user._id,
			text: req.body.text,
		};

		const imagePath = req.file
			? `/uploads/messages/${req.file.filename}`
			: null;

		const message = await sendNewMessage(data, imagePath);

		if (req.app.get("io")) {
			req.app.get("io").to(data.conversationId).emit("newMessage", message);
		}

		const conversation = await Conversation.findById(
			data.conversationId
		).populate("participants", "firstName lastName avatar");
		const sender = await User.findById(data.senderId);

		const recipient = conversation.participants.find(
			(p) => p._id.toString() !== data.senderId.toString()
		);

		if (recipient) {
			await createNotification({
				recipientId: recipient._id,
				type: "message",
				data: {
					conversationId: conversation._id,
					sender: {
						firstName: sender.firstName,
						lastName: sender.lastName,
						avatar: sender.avatar,
					},
					preview: data.text || "📷 Image",
				},
			});
		}

		res.status(201).json(message);
	} catch (err) {
		console.error("Send Message Error:", err);
		res.status(500).json({ message: "Failed to send message" });
	}
});

router.get("/:conversationId", auth, async (req, res) => {
	try {
		const messages = await getAllMessagesForConversation(
			req.params.conversationId
		);
		res.status(200).json(messages);
	} catch (err) {
		console.error("Get Messages Error:", err);
		res.status(500).json({ message: "Failed to get messages" });
	}
});

module.exports = router;
