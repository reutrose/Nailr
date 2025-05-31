const express = require("express");
const auth = require("../../../auth/authService");
const { handleError } = require("../../../utils/handleErrors");
const loginLimiter = require("../helpers/loginLimiter");
const normalizeUser = require("../helpers/normalizeUser");
const avatarUpload = require("../../../middlewares/multer/multerAvatarUpload");
const User = require("../models/mongodb/User");
const fs = require("fs");
const path = require("path");

const {
	searchUsersByNameOrBusiness,
	toggleCrafterStatus,
	uploadAvatar,
	updateUserProfile,
	getCraftersByLocation,
	getCraftersByProfession,
	getAllCrafters,
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
	changeUserType,
} = require("../models/userAccessDataService");

const {
	getAllUserBusinesses,
} = require("../../businesses/models/businessAccessDataService");

const {
	registerValidation,
	loginValidation,
} = require("../validation/userValidationService");
const { generateAuthToken } = require("../../../auth/providers/jwt");

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const validationError = registerValidation(req.body);
		if (validationError) return handleError(res, 400, validationError);

		const normalized = await normalizeUser(req.body);
		const user = await registerUser(normalized);
		res.status(201).send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.post("/login", loginLimiter, async (req, res) => {
	try {
		const validationError = loginValidation(req.body);
		if (validationError) return handleError(res, 400, validationError);

		const user = await loginUser(req.body);
		const token = generateAuthToken(user);
		res.send(token);
	} catch (error) {
		handleError(res, 401, error.message);
	}
});

router.get("/verify/:token", async (req, res) => {
	try {
		const user = await verifyEmail(req.params.token);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/check-email", async (req, res) => {
	try {
		const { email } = req.query;
		if (!email) return handleError(res, 400, "Email is required");

		const user = await getUserByEmail(email);
		res.send({ exists: !!user });
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.post("/reset-password", async (req, res) => {
	try {
		const result = await resetPasswordRequest(req.body.email);
		res.send({ success: result });
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.post("/reset/:token", async (req, res) => {
	try {
		const user = await resetPassword(req.params.token, req.body.newPassword);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.patch("/:id/password", auth, async (req, res) => {
	try {
		const user = await changePassword(
			req.params.id,
			req.body.currentPassword,
			req.body.newPassword
		);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await getUserById(req.params.id);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const users = await getAllUsers(req.query);
		res.send(users);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/search/:query", auth, async (req, res) => {
	try {
		const users = await searchUsersByNameOrBusiness(req.params.query);
		res.send(users);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/crafters/profession/:profession", async (req, res) => {
	try {
		const users = await getCraftersByProfession(req.params.profession);
		res.send(users);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/crafters/location/:location", async (req, res) => {
	try {
		const users = await getCraftersByLocation(req.params.location);
		res.send(users);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/crafters", async (req, res) => {
	try {
		const users = await getAllCrafters(req.query);
		res.send(users);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.patch("/:id/change-user-type", auth, async (req, res) => {
	try {
		const user = await changeUserType(req.params.id, req.body);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.put(
	"/:id/edit",
	auth,
	avatarUpload.single("avatar"),
	async (req, res) => {
		try {
			const updateData = req.body;

			const user = await User.findById(req.params.id);

			if (req.file) {
				if (
					user.avatar &&
					user.avatar.startsWith("/uploads/avatars") &&
					fs.existsSync(path.join(__dirname, "../../../public", user.avatar))
				) {
					fs.unlinkSync(path.join(__dirname, "../../../public", user.avatar));
				}

				updateData.avatar = `/uploads/avatars/${req.file.filename}`;
			}

			const updatedUser = await updateUserProfile(req.params.id, updateData);
			res.send(updatedUser);
		} catch (error) {
			console.error("🔴 PROFILE UPDATE ERROR:", error.message);
			console.error(error.stack);
			res
				.status(500)
				.json({ error: error.message || "Failed to update user profile" });
		}
	}
);

router.patch(
	"/:id/avatar",
	auth,
	avatarUpload.single("image"),
	async (req, res, next) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "No image uploaded" });
			}

			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			if (
				user.avatar &&
				user.avatar.startsWith("/uploads/avatars") &&
				fs.existsSync(
					path.join(__dirname, "../../../public/avatars", user.avatar)
				)
			) {
				fs.unlinkSync(
					path.join(__dirname, "../../../public/avatars", user.avatar)
				);
			}

			const relativePath = `/uploads/avatars/${req.file.filename}`;

			const updatedProfile = await uploadAvatar(req.params.id, relativePath);

			res.status(200).json(updatedProfile);
		} catch (err) {
			res.status(500).json({ message: err.message || "Internal Server Error" });
		}
	}
);

router.patch("/:id/add-business", auth, async (req, res, next) => {
	try {
		const { id } = req.params;
		const newBusiness = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $push: { businesses: newBusiness } },
			{ new: true }
		);

		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });

		res.json(updatedUser);
	} catch (err) {
		next(err);
	}
});

router.patch("/:id/crafter", auth, async (req, res) => {
	try {
		const updatedUser = await toggleCrafterStatus(
			req.params.id,
			req.body.isCrafter
		);
		res.send(updatedUser);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const user = await deleteUserById(req.params.id);
		res.send(user);
	} catch (error) {
		handleError(res, 400, error.message);
	}
});

router.get("/:userId/businesses", async (req, res) => {
	try {
		const userId = req.params.userId;

		if (!userId) {
			return res.status(400).json({ message: "userId is required" });
		}

		const businesses = await getAllUserBusinesses(userId);
		res.json(businesses);
	} catch (err) {
		console.error("REST Controller Error - Get User Businesses:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
