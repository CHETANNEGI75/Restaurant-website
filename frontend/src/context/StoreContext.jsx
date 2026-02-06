import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// 🔹 Create global context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  // 🔹 Cart items ( {itemId: quantity} )
  const [cartItems, setCartItems] = useState({});

  // 🔹 Backend URL
  const url = "http://localhost:4000";

  // 🔹 Auth token
  const [token, setToken] = useState("");

  // 🔹 Food list from backend
  const [food_List, setFoodList] = useState([]);

  // 🔹 Add item to cart
  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems(prev => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
  try {
    await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
  };

  // 🔹 Remove item from cart
  const removeFromCart =async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0)
    }));
    if (token) {
  try {
    await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}
  };

  // 🔹 Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {

        // 🔥 Use correct state (food_List)
        let itemInfo = food_List.find((i) => i._id === item);

        // 🔥 Safety check (important)
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }

    return totalAmount;
  };

  // 🔹 Fetch food list from backend
  const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list"); // 🔥 FIX URL ALSO

    console.log("API RESPONSE 👉", response.data);

    // adjust based on backend
    setFoodList(response.data.data || response.data.foods || []);
    
  } catch (error) {
    console.error("Error fetching food list:", error);
  }
};
const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );

    setCartItems(response.data.cartData || {});
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

  // 🔹 Load data on refresh
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      // 🔹 Load token from localStorage
      const savedToken = localStorage.getItem("token");
     if (savedToken) {
  setToken(savedToken);
  await loadCartData(savedToken);
}
    }

    loadData();
  }, []);

  // 🔹 Global data provider
  const ContextValue = {
    food_list: food_List,   // 🔥 keep naming consistent for components
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;