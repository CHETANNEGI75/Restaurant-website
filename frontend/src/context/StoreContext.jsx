import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

// 🌍 Create Context
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  // 🌐 Backend URL
  const url = "http://localhost:4000"

  // 🔐 Auth
  const [token, setToken] = useState("")

  // 🍔 Food
  const [food_List, setFoodList] = useState([])

  // 🍕 Categories
  const [categories, setCategories] = useState([])
// 🍽️ Filter
  const [category, setCategory] = useState("All")
  // 🛒 Cart
  const [cartItems, setCartItems] = useState({})


  // =========================
  // 🛒 CART FUNCTIONS
  // =========================

  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }))

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        )
      } catch (error) {
        console.error("Error adding to cart:", error)
      }
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }))

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        )
      } catch (error) {
        console.error("Error removing from cart:", error)
      }
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_List.find(i => i._id === item)
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price
        }
      }
    }

    return totalAmount
  }

  // =========================
  // 🍔 FETCH FOOD
  // =========================

  const fetchFoodList = async (categoryId = "All") => {
    try {
      const res = await axios.get(url + "/api/food/list", {
        params: { category: categoryId }
      })

      console.log("FOOD API 👉", res.data)

      setFoodList(res.data.data || res.data.foods || [])
    } catch (error) {
      console.error("Error fetching food list:", error)
    }
  }

  // =========================
  // 🍕 FETCH CATEGORIES
  // =========================

const fetchCategories = async () => {
  try {
    const res = await axios.get(url + "/api/category")

    console.log("CATEGORY API 👉", res.data)

    setCategories(res.data.categories || res.data.data || [])

  } catch (error) {
    console.error("Error fetching categories:", error)
  }
}

  // =========================
  // 🛒 LOAD CART (IF LOGGED IN)
  // =========================

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      )

      setCartItems(res.data.cartData || {})
    } catch (error) {
      console.error("Error loading cart:", error)
    }
  }

  // =========================
  // 🚀 INITIAL LOAD
  // =========================

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList()
      await fetchCategories()

      const savedToken = localStorage.getItem("token")

      if (savedToken) {
        setToken(savedToken)
        await loadCartData(savedToken)
      }
    }

    loadData()
  }, [])

  // =========================
  // 🌍 GLOBAL STATE
  // =========================

 const ContextValue = {
  food_list: food_List,
  categories,
  category,        // ✅ MUST
  setCategory,     // ✅ MUST
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  url,
  token,
  setToken,
  fetchFoodList
}

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider