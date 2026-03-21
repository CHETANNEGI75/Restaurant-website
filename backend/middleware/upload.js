import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import pkg from "multer-storage-cloudinary";

const { CloudinaryStorage } = pkg;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-del",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;