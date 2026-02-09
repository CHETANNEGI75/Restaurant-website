import orderModel from "../models/ordermodel.js";

// 🔹 PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address
    });

    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// 🔹 USER ORDERS (HISTORY)
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });

    res.json({ success: true, data: orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// 🔹 ALL ORDERS (ADMIN USE 🔥)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.json({ success: true, data: orders });

  } catch (error) {
    res.json({ success: false });
  }
};

export { placeOrder, userOrders, allOrders };