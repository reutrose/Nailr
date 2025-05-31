const { createError } = require("../../../utils/handleErrors");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/mongodb/User");

const registerUser = async (data) => {
	try {
		const existing = await User.findOne({ email: data.email });
		if (existing) throw new Error("Email already in use");

		data.password = await bcrypt.generatePassword(data.password);
		const newUser = await User.create(data);
		return newUser;
	} catch (error) {
		createError("Register User", error);
	}
};

const loginUser = async ({ email, password }) => {
	try {
		const user = await User.findOne({ email });
		if (!user) throw new Error("User not found");
		const isMatch = await bcrypt.comparePassword(password, user.password);
		if (!isMatch) throw new Error("Invalid credentials");
		return user;
	} catch (error) {
		createError("Login User", error);
	}
};

const verifyEmail = async (token) => {
	try {
		const { email } = jwt.verify(token, process.env.JWT_SECRET);
		return await User.findOneAndUpdate(
			{ email },
			{ isVerified: true },
			{ new: true }
		);
	} catch (error) {
		createError("Verify Email", error);
	}
};

const resetPasswordRequest = async (email) => {
	try {
		const user = await User.findOne({ email });
		if (!user) throw new Error("User not found");
		return true;
	} catch (error) {
		createError("Reset Password Request", error);
	}
};

const resetPassword = async (token, newPassword) => {
	try {
		const { email } = jwt.verify(token, process.env.JWT_SECRET);
		const hashed = await bcrypt.generatePassword(newPassword);
		return await User.findOneAndUpdate(
			{ email },
			{ password: hashed },
			{ new: true }
		);
	} catch (error) {
		createError("Reset Password", error);
	}
};

const changePassword = async (userId, currentPassword, newPassword) => {
	try {
		const user = await User.findById(userId);
		const isMatch = await bcrypt.comparePassword(
			currentPassword,
			user.password
		);
		if (!isMatch) throw new Error("Wrong current password");
		user.password = await bcrypt.generatePassword(newPassword);
		return await user.save();
	} catch (error) {
		createError("Change Password", error);
	}
};

const getUserById = async (id) => {
	try {
		return await User.findById(id, "-password");
	} catch (error) {
		createError("Get User By ID", error);
	}
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email: email.toLowerCase().trim() });
	} catch (error) {
		createError("Get User By Email", error);
	}
};

const getAllUsers = async (filter = {}) => {
	try {
		return await User.find(filter);
	} catch (error) {
		createError("Get All Users", error);
	}
};

const deleteUserById = async (id) => {
	try {
		return await User.findByIdAndDelete(id);
	} catch (error) {
		createError("Delete User", error);
	}
};

const changeUserType = async (userId, businessData) => {
	try {
		return await User.findByIdAndUpdate(
			userId,
			{
				...businessData,
				isCrafter: !businessData.isCrafter,
			},
			{ new: true }
		);
	} catch (error) {
		createError("Change User Type", error);
	}
};

const getAllCrafters = async (filter = {}) => {
	try {
		return await User.find({ isCrafter: true, ...filter });
	} catch (error) {
		createError("Get All Crafters", error);
	}
};

const getCraftersByProfession = async (profession) => {
	try {
		return await User.find({ isCrafter: true, profession: profession });
	} catch (error) {
		createError("Get Crafters By Profession", error);
	}
};

const getCraftersByLocation = async (location) => {
	try {
		return await User.find({ isCrafter: true, location });
	} catch (error) {
		createError("Get Crafters By Location", error);
	}
};

const editMyProfile = async (userId, data) => {
	try {
		return await User.findByIdAndUpdate(userId, data, { new: true });
	} catch (error) {
		createError("Edit My Profile", error);
	}
};

const uploadAvatar = async (userId, avatarPath) => {
	try {
		return await User.findByIdAndUpdate(
			userId,
			{ avatar: avatarPath },
			{ new: true, runValidators: true }
		);
	} catch (error) {
		console.error("Error patching an avatar: ", error.message);
		throw error;
	}
};

const searchUsersByNameOrBusiness = async (query) => {
	try {
		return await User.find({
			$or: [
				{ fullName: { $regex: query, $options: "i" } },
				{ businessName: { $regex: query, $options: "i" } },
			],
		});
	} catch (error) {
		createError("Search Users", error);
	}
};

const updateUserProfile = async (id, updateData) => {
	return await User.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
	searchUsersByNameOrBusiness,
	uploadAvatar,
	updateUserProfile,
	editMyProfile,
	getCraftersByLocation,
	getCraftersByProfession,
	getAllCrafters,
	changeUserType,
	deleteUserById,
	getAllUsers,
	getUserByEmail,
	getUserById,
	changePassword,
	resetPassword,
	resetPasswordRequest,
	verifyEmail,
	loginUser,
	registerUser,
};
