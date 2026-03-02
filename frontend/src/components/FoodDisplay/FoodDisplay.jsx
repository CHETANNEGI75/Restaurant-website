import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = () => {

  const { food_list, category } = useContext(StoreContext)

  // 🔥 FIXED FILTER (case insensitive)
  const filteredFood = food_list.filter(
    (item) =>
      category === "All" ||
      item.category?.toLowerCase() === category.toLowerCase()
  )

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near u</h2>

      <div className="food-display-list">

        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No food found 🍽️</p>
        )}

      </div>
    </div>
  )
}

export default FoodDisplay