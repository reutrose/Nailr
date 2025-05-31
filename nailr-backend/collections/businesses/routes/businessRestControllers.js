const express = require("express");
const router = express.Router();
const auth = require("../../../auth/authService");
const {
	createBusiness,
	deleteBusiness,
	getBusinessById,
	uploadLogo,
	getAllBusinesses,
	updateBusiness,
} = require("../models/businessAccessDataService");

const logoUpload = require("../../../middlewares/multer/multerLogoUpload");

router.post("/", auth, logoUpload.single("logo"), async (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		const businessData = req.body;
		const file = req.file;

		if (!file) throw new Error("Logo file missing");

		businessData.logo = `uploads/logos/${file.filename}`;

		const newBusiness = await createBusiness(token, businessData);
		res.status(201).json(newBusiness);
	} catch (err) {
		console.error("REST Controller Error - Create Business:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/", async (req, res, next) => {
	try {
		const businesses = await getAllBusinesses();
		res.status(201).json(businesses);
	} catch (error) {
		console.error("REST Controller Error - Get Businesses:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		const businessId = req.params.id;
		const deletedBusiness = await deleteBusiness(token, businessId);
		res.status(204).json(deletedBusiness);
	} catch (err) {
		console.error("REST Controller Error - Delete Business:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const businessId = req.params.id;
		const business = await getBusinessById(businessId);
		res.status(200).json(business);
	} catch (error) {
		console.error("REST Controller Error - Get Business:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.patch(
	"/:id/logo",
	auth,
	logoUpload.single("image"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "No image uploaded" });
			}

			const relativePath = `/uploads/logos/${req.file.filename}`;

			const updatedBusiness = await uploadLogo(req.params.id, relativePath);

			res.status(200).json(updatedBusiness);
		} catch (err) {
			console.error("❌ Error uploading logo:", err);
			res.status(500).json({ message: "Internal Server Error" });
		}
	}
);

router.put("/:id", auth, logoUpload.single("logo"), async (req, res, next) => {
	try {
		const businessId = req.params.id;
		const token = req.header("x-auth-token");

		const updatedFields = req.body;
		if (req.file) {
			updatedFields.logo = `/uploads/logos/${req.file.filename}`;
		}

		const updatedBusiness = await updateBusiness(
			token,
			businessId,
			updatedFields
		);
		res.status(200).json(updatedBusiness);
	} catch (err) {
		console.error("REST Controller Error - Update Business:", err);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
