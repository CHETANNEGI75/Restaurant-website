import foodModel from "../models/foodmodel.js";

const addFood = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: req.file.path, // ☁️ Cloudinary URL
    });
    console.log("REQ.FILE 👉", req.file);

    await food.save();

    res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addFood }; // 👈 YE LINE ZAROORI THI
