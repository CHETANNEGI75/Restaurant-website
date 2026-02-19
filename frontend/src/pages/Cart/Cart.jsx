import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // 🔥 check if cart empty
  const isCartEmpty = Object.values(cartItems).every(qty => qty === 0);

  return (
    <div className="cart">

      {/* ✅ EMPTY STATE */}
      {isCartEmpty ? (
        <h2>Your cart is empty 🛒</h2>
      ) : (
        <>
          <div className="cart-items">

            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>

            <hr />

            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}> {/* 🔥 FIXED KEY */}
                    
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/" + item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price * cartItems[item._id]}</p>

                      <button
                        className="cross"
                        onClick={() => removeFromCart(item._id)}
                      >
                        ❌
                      </button>
                    </div>

                    <hr />

                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* ✅ TOTAL SECTION */}
          <div className="cart-bottom">
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

              <button onClick={() => navigate('/order')}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* PROMOCODE */}
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, enter it here</p>

                <div className="cart-promocode-input">
                  <input type="text" placeholder="Enter promo code" />
                  <button>Apply</button>
                </div>

              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default Cart;