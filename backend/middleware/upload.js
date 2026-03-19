  import multer from "multer";
  import { CloudinaryStorage } from "multer-storage-cloudinary";
  import { cloudinary } from "../config/cloudinary.js";

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "food_items",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
  console.log("☁️ CLOUDINARY UPLOAD MIDDLEWARE HIT");
  const upload = multer({ storage });

  export default upload;
