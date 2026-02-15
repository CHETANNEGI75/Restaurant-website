import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/all");
    setOrders(res.data.data);
  };

  const updateStatus = async (orderId, status) => {
    await axios.post(url + "/api/order/status", { orderId, status });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <p>₹{order.amount}</p>
          <p>{order.status}</p>

          <select onChange={(e)=>updateStatus(order._id, e.target.value)}>
            <option>Food Processing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;  