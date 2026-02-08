import userModel from "../models/userModel.js";

// 🔹 ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

// 🔹 REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

// 🔹 GET CART DATA
const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    res.json({ success: true, cartData: user.cartData || {} });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

export { addToCart, removeFromCart, getCartItems };