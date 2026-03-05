import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./List.css";
import { toast } from 'react-toastify';

const List = ({ url }) => {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW STATES
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
  });

  const fetchList = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${url}/api/food/list`);
      console.log("FOOD LIST API 👉", response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to fetch data ❌");
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

  // 🔥 UPDATE FUNCTION
  const updateFood = async (id) => {
    try {
      await axios.post(`${url}/api/food/update`, {
        id,
        ...editData,
      });

      setEditId(null);
      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='list add flex-col'>

      {loading && <p>Loading items...</p>}

      <p>All food list</p>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="list-table">

        {!loading && filteredList.length === 0 && (
          <p>No food items found 😕</p>
        )}

        <div className="list-table-format title">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b>action</b>
        </div>

        {!loading && filteredList.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />

            {editId === item._id ? (
              <>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />

                <p>{item.category}</p>

                <input
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                />

                <button onClick={() => updateFood(item._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>

                <button
                  onClick={() => {
                    setEditId(item._id);
                    setEditData({
                      name: item.name,
                      price: item.price,
                    });
                  }}
                >
                  Edit
                </button>

                <button onClick={() => removeFood(item._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default List;