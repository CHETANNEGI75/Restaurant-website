import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState(""); // 🔥 NEW

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
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 FILTER LOGIC
  const filteredOrders = orders.filter((order) =>
    order.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="myorders">
      <h2>My Orders</h2>

      {/* 🔥 SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search by status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="order-search"
      />

      {filteredOrders.length === 0 ? (
        <p>No orders found 😕</p>
      ) : (
        filteredOrders.map((order) => (
          <div key={order._id} className="order-card">

            <p><strong>Amount:</strong> ₹{order.amount}</p>

            {/* 🔥 STATUS */}
            <div className="order-progress">

              <span className={order.status !== "Pending" ? "active" : ""}>
                🧾 Order Placed
              </span>

              <span
                className={
                  order.status === "Out for Delivery" ||
                  order.status === "Delivered"
                    ? "active"
                    : ""
                }
              >
                🚚 Out for Delivery
              </span>

              <span className={order.status === "Delivered" ? "active" : ""}>
                ✅ Delivered
              </span>

            </div>

            {/* 🔥 CANCEL */}
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