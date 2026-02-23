import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/userorders", {
        headers: { token }
      });

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  // 🔥 CANCEL FUNCTION
  const cancelOrder = async (orderId) => {
    const confirm = window.confirm("Cancel this order?");

    if (!confirm) return;

    try {
      const response = await axios.post(
        url + "/api/order/cancel",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchOrders(); // refresh list
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myorders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found 😕</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">

            <p><strong>Amount:</strong> ₹{order.amount}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`order-status ${
                  order.status === "Delivered"
                    ? "delivered"
                    : order.status === "Out for Delivery"
                    ? "delivery"
                    : "pending"
                }`}
              >
                {order.status}
              </span>
            </p>

            {/* 🔥 CANCEL BUTTON */}
            {order.status !== "Delivered" && (
              <button onClick={() => cancelOrder(order._id)}>
                Cancel Order
              </button>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;