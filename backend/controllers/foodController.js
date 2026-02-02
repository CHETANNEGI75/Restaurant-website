import foodModel from "../models/foodmodel.js";

const addFood = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;
    console.info("🚀 ~ addFood ~ category:", category)
    console.info("🚀 ~ addFood ~ name:", name)

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
      image: req.file.path,
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
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    await foodModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Food deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error deleting food"
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching food list"
    });
  }
};

export { addFood, listFood, removeFood };