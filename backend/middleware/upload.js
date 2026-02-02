import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import pkg from "multer-storage-cloudinary";
const dotenv = await import("dotenv");
dotenv.config();

const { CloudinaryStorage } = pkg;
// ✅ CONFIGURATION (THIS WAS MISSING)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-del",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;