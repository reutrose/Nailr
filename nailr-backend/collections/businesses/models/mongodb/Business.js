const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		businessName: { type: String, required: true },
		profession: String,
		description: String,
		location: String,
		logo: String,
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		],
		averageRating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
