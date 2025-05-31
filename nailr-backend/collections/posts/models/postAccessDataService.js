const Post = require("./mongodb/Post");
const User = require("../../users/models/mongodb/User");
const Business = require("../../businesses/models/mongodb/Business");
const { createError } = require("../../../utils/handleErrors");

const createPost = async (postData) => {
	const post = new Post(postData);
	await post.save();

	if (post.postType === "request" && post.userId) {
		await User.findByIdAndUpdate(
			post.userId,
			{ $push: { posts: post._id } },
			{ new: true }
		);
	}

	if (post.postType === "showcase" && post.businessId) {
		const business = await Business.findById(post.businessId);
		if (business?.owner) {
			await User.findByIdAndUpdate(
				business.owner,
				{ $push: { posts: post._id } },
				{ new: true }
			);
		}
	}

	return post;
};

const getPostById = async (id) => {
	try {
		return await Post.findById(id);
	} catch (error) {
		createError("Get Post By ID", error);
	}
};

const getAllPosts = async (filter = {}) => {
	try {
		return await Post.find(filter).sort({ createdAt: -1 });
	} catch (error) {
		createError("Get All Posts", error);
	}
};

const getPostsByUser = async (userId) => {
	try {
		return await Post.find({ userId: userId });
	} catch (error) {
		createError("Get Posts By User", error);
	}
};

const getPostsByCrafter = async (businessId) => {
	try {
		return await Post.find({ businessId: businessId });
	} catch (error) {
		createError("Get Posts By Crafter", error);
	}
};

const updatePostById = async (id, data) => {
	try {
		return await Post.findByIdAndUpdate(id, data, { new: true });
	} catch (error) {
		createError("Update Post", error);
	}
};

const deletePostById = async (id) => {
	try {
		return await Post.findByIdAndDelete(id);
	} catch (error) {
		createError("Delete Post", error);
	}
};

const searchPosts = async (query) => {
	try {
		const regex = new RegExp(query, "i");
		return await Post.find({
			$or: [
				{ title: regex },
				{ description: regex },
				{ tags: regex },
				{ location: regex },
			],
		});
	} catch (error) {
		createError("Search Posts", error);
	}
};

module.exports = {
	createPost,
	getPostById,
	getAllPosts,
	getPostsByUser,
	updatePostById,
	deletePostById,
	searchPosts,
	getPostsByCrafter,
};
