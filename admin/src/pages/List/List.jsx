import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./List.css";
import { toast } from 'react-toastify';

const List = ({ url }) => {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState(""); // ✅ yaha

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

        if (response.data.success) {
          setList((prev) => prev.filter((item) => item._id !== foodId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ✅ YAHI SAHI JAGAH
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className='list add flex-col'>
      <p>All food list</p>

      {/* ✅ search input */}
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
          />

      <div className="list-table">
        <div className="list-table-format title">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b>action</b>
        </div>

        {filteredList.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button onClick={() => removeFood(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;