import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found 😕</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p><strong>Amount:</strong> ₹{order.amount}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "Out for Delivery"
                      ? "orange"
                      : "red"
                }}
              >
                {order.status}
              </span>
            </p>

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;