const multer = require("multer");
const path = require("path");

// 허용된 확장자 목록 (소문자)
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads/community"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  // MIME 타입과 확장자 모두 검증
  if (!allowedMimes.includes(file.mimetype) || !ALLOWED_EXTENSIONS.has(ext)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "images"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 20,
  },
});

module.exports = upload;
