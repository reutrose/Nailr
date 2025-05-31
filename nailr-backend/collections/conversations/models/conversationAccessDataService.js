const Conversation = require("../models/mongodb/Conversation");

const getUserConversations = async (userId) => {
	try {
		return await Conversation.find({
			participants: userId,
		})
			.populate("participants", "firstName lastName avatar")
			.sort({ updatedAt: -1 });
	} catch (error) {
		console.error("Error fetching user conversations:", error);
		throw error;
	}
};

module.exports = {
	getUserConversations,
};
