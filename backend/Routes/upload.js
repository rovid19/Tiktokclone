import express from "express";
import { uploadImage, uploadVideo } from "../Controllers/upload.js";
import { fileURLToPath } from "url";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UPLOAD TO S3
async function uploadToS3(path, orignalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: proccess.env.S3_SECRET_ACCESS_KEY,
    },
  });
  console.log({ path, orignalFilename, mimetype });
}
//SLIKE
const photosMiddleware = multer({ dest: path.join(__dirname, "../uploads") });
//VIDEO
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// UPLOAD SLIKE
router.post("/upload-image", photosMiddleware.array("photo", 100), uploadImage);

//UPLOAD VIDEA
router.post("/upload-video", upload.single("video"), uploadVideo);

export default router;
