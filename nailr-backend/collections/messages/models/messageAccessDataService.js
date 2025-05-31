const Message = require("./mongodb/Message");
const Conversation = require("../../conversations/models/mongodb/Conversation");

const sendNewMessage = async (data, imagePath = null) => {
	const newMessage = new Message({
		conversationId: data.conversationId,
		senderId: data.senderId,
		text: data.text || "",
		image: imagePath || null,
	});

	await newMessage.save();

	await Conversation.findByIdAndUpdate(data.conversationId, {
		lastMessage: data.text || "📷 Image",
		lastMessageAt: new Date(),
	});

	return newMessage;
};

const getAllMessagesForConversation = async (conversationId) => {
	const messages = await Message.find({ conversationId }).sort("createdAt");
	return messages;
};

module.exports = {
	sendNewMessage,
	getAllMessagesForConversation,
};
