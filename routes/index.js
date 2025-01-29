const { Router: expressRouter } = require("express");
const router = expressRouter();
const multer = require("multer");
const path = require("path");
const { uploadItem } = require("../controllers/authController"); // Import the controller

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });
// Define the POST route for image upload
router.post("/add_course", upload.single("image"), uploadItem);
// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);
module.exports = router;
