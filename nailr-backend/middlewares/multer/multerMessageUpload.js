const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(
	__dirname,
	"..",
	"..",
	"public",
	"uploads",
	"messages"
);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadPath),
	filename: (req, file, cb) => {
		const uniqueName = `${req.user._id}-${Date.now()}${path.extname(
			file.originalname
		)}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, cb) => {
	const allowed = ["image/jpeg", "image/png", "image/jpg"];
	allowed.includes(file.mimetype)
		? cb(null, true)
		: cb(new Error("Only image files allowed"));
};

module.exports = multer({ storage, fileFilter });
