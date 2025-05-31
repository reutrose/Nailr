const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		recipientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["message", "review"],
			required: true,
		},
		data: { type: Object, default: {} },
		isRead: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
