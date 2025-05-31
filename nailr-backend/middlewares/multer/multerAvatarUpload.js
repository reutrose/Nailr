const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(
	__dirname,
	"..",
	"..",
	"public",
	"uploads",
	"avatars"
);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, req.user._id + "-" + uniqueSuffix + ext);
	},
});

const avatarUpload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const allowed = ["image/jpeg", "image/png", "image/jpg"];
		if (allowed.includes(file.mimetype)) cb(null, true);
		else cb(new Error("Only JPG and PNG images are allowed"));
	},
});

module.exports = avatarUpload;
