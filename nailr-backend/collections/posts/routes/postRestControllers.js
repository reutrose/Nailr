const express = require("express");
const auth = require("../../../auth/authService");
const multer = require("multer");
const { handleError } = require("../../../utils/handleErrors");
const {
	createPost,
	getPostById,
	getAllPosts,
	getPostsByUser,
	updatePostById,
	deletePostById,
	searchPosts,
	getPostsByCrafter,
} = require("../models/postAccessDataService");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", auth, upload.array("images"), async (req, res) => {
	try {
		const { title, description, tags, location, postType, businessId } =
			req.body;

		if (!title || !description || !postType) {
			return handleError(
				res,
				400,
				"Missing required fields: title, description, or postType"
			);
		}

		let parsedTags = [];
		if (Array.isArray(tags)) {
			parsedTags = tags;
		} else if (typeof tags === "string") {
			parsedTags = tags.split(",").map((tag) => tag.trim());
		}

		const images = req.files?.map(
			(file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
		);

		const postData = {
			title,
			description,
			location,
			postType,
			tags: parsedTags,
			images,
		};

		if (postType === "request") {
			postData.userId = req.user._id;
		} else if (postType === "showcase") {
			if (!businessId) {
				return handleError(
					res,
					400,
					"businessId is required for showcase posts"
				);
			}
			postData.businessId = businessId;
		}

		const post = await createPost(postData);
		res.status(201).json(post);
	} catch (error) {
		console.error("❌ Error creating post:", error);
		handleError(res, 400, error.message);
	}
});

router.get("/", async (req, res) => {
	try {
		const posts = await getAllPosts(req.query);
		res.send(posts);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const post = await getPostById(req.params.id);
		res.send(post);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/user/:userId", async (req, res) => {
	try {
		const posts = await getPostsByUser(req.params.userId);
		res.send(posts);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/business/:businessId", async (req, res) => {
	try {
		const posts = await getPostsByCrafter(req.params.businessId);
		res.send(posts);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.put("/:id", auth, async (req, res) => {
	try {
		const post = await updatePostById(req.params.id, req.body);
		res.send(post);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await deletePostById(req.params.id);
		res.send(post);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/search/:query", async (req, res) => {
	try {
		const posts = await searchPosts(req.params.query);
		res.send(posts);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

module.exports = router;
