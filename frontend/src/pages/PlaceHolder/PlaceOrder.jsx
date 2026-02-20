import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, token, url } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  });

  // 🔥 form validation check
  const isFormValid = Object.values(data).every((val) => val.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login required");
      return;
    }

    if (!isFormValid) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cartItems,
        amount: getTotalCartAmount(),
        address: data
      };

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        alert("Order placed successfully ✅");
      } else {
        alert("Error placing order ❌");
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      alert("Something went wrong ❌");
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="first name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="last name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>

        <input
          type="email"
          placeholder="email address"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="street"
          value={data.street}
          onChange={(e) => setData({ ...data, street: e.target.value })}
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="city"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="state"
            value={data.state}
            onChange={(e) => setData({ ...data, state: e.target.value })}
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="zip code"
            value={data.zip}
            onChange={(e) => setData({ ...data, zip: e.target.value })}
          />
          <input
            type="text"
            placeholder="country"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
          />
        </div>

        <input
          type="text"
          placeholder="phone"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <div className="cart-total-details">
            <b>Total</b>
            <b>
              ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
            </b>
          </div>

          <button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Placing Order..." : "PROCEED TO PAYMENT"}
          </button>

        </div>
      </div>

    </form>
  );
};

export default PlaceOrder;