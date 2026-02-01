import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);  
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last-name" />
        </div>
        <input type="email" placeholder="email address" />
        <input type="text" placeholder="street" />
        <div className="multi-fields">
          <input type="text" placeholder="city" />
          <input type="text" placeholder="state" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="zip code" />
          <input type="text" placeholder="country " />
        </div>
        <input type="text" placeholder="phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Card Total</h2>
            <div className="cart-total-details">
            <p>SubTotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount()===0?0:2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>{ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
          <button>
            PROCEED TO PAYMENT  
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
