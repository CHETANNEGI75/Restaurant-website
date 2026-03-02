import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = () => {

  const { categories, category, setCategory, fetchFoodList } = useContext(StoreContext)

  const handleClick = (itemName) => {
    const selectedCategory = category === itemName ? "All" : itemName

    setCategory(selectedCategory)
    fetchFoodList(selectedCategory) // 🔥 API CALL
  }

  return (
    <div className="explore-menu">

      <h1>Explore Our Menu</h1>

      <div className="explore-menu-list">

        {categories.length > 0 ? (
          categories.map((item) => {

            return (
              <div
                key={item._id}
                className="explore-menu-list-item"
                onClick={() => handleClick(item._id)}
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className={category === item.name ? "active" : ""}
                />

                {/* NAME */}
                <p>{item.name}</p>
              </div>
            )
          })
        ) : (
          <p>Loading categories...</p>
        )}

      </div>

    </div>
  )
}

export default ExploreMenu
