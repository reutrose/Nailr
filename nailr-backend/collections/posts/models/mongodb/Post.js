const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			validate: {
				validator: function (value) {
					if (this.postType === "showcase") {
						return !!value;
					}
					return true;
				},
				message: "businessId is required for showcase posts",
			},
		},

		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			validate: {
				validator: function (value) {
					if (this.postType === "request") {
						return !!value;
					}
					return true;
				},
				message: "userId is required for request posts",
			},
		},

		title: { type: String, required: true },
		description: { type: String, required: true },
		images: [String],
		tags: [String],
		location: String,

		postType: {
			type: String,
			enum: ["showcase", "request"],
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
