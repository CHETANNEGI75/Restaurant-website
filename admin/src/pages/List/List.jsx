import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./List.css";
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("API ERROR 👉", error);
      toast.error("Failed to fetch food list ❌");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

      if (response.data.success) {
        toast.success("Deleted successfully 🗑️");

        // 🔥 instant UI update (no full reload feel)
        setList((prev) => prev.filter((item) => item._id !== foodId));
      } else {
        toast.error("Failed to delete ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("API Error ❌");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>

      <div className="list-table">
        
        {/* Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Items */}
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>

            <button
              onClick={() => removeFood(item._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default List;