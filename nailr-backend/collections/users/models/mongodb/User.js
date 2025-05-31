const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		bio: String,
		avatar: String,
		location: String,
		dateOfBirth: String,
		gender: String,
		businesses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Business",
			},
		],
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
