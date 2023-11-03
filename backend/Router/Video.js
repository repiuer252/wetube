const express = require("express");
const router = express.Router();
const videoController = require("../Controller/videoController");
const likeVideoController = require("../Controller/likeVideoController");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Asset",
    resource_type: "auto",
  },
});

const multerUpload = multer({ storage });

router.get("", videoController.index);
router.get("/explore", videoController.explore);
router.get("/uploaded", videoController.getUploadedVideo);
router.get("/:id", videoController.getById);
router.post(
  "/upload",
  multerUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  videoController.upload
);
router.post("/search", videoController.search);
router.put("/like/:id", likeVideoController.like);
router.put("/dislike/:id", likeVideoController.dislike);
router.delete("/:id", videoController.remove);

module.exports = router;
