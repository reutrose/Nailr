const express = require("express");
const router = express.Router();
const auth = require("../../../auth/authService");
const {
	getUserConversations,
} = require("../models/conversationAccessDataService");
const Conversation = require("../models/mongodb/Conversation");

router.get("/", auth, async (req, res) => {
	try {
		const conversations = await getUserConversations(req.user._id);
		res.status(200).json(conversations);
	} catch (error) {
		console.error("GET /conversations error:", error);
		res.status(500).json({ message: "Failed to get conversations" });
	}
});

router.post("/initiate", auth, async (req, res) => {
	try {
		const { participantId } = req.body;
		const currentUserId = req.user._id.toString();
		const targetUserId = participantId.toString();

		if (currentUserId === targetUserId) {
			return res
				.status(400)
				.json({ message: "Cannot start a conversation with yourself." });
		}

		const sortedIds = [currentUserId, targetUserId].sort();

		let conversation = await Conversation.findOne({
			participants: { $all: sortedIds },
			"participants.2": { $exists: false },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: sortedIds,
			});
		}

		conversation = await conversation.populate(
			"participants",
			"firstName lastName avatar"
		);

		res.status(200).json(conversation);
	} catch (err) {
		console.error("Initiate conversation failed", err);
		res.status(500).json({ message: "Failed to initiate conversation" });
	}
});

module.exports = router;
