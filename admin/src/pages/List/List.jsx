  import React, { useState, useEffect } from 'react'
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
      }
    };
      const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    if (response.data.success) {
      toast.success("Deleted successfully 🗑️");
      fetchList();
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
        <p>All food list</p>
        <div className="list-table">
          <div className="list-table-format tittle "> 
            <b>image </b>
            <b>name</b>
            <b>category</b>
            <b>action</b>
            <b>price</b>
          </div>
          {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format"> 
            <img src= {`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)}>x</p> 
            </div>
          )
  })}
        </div>
      </div>
    );
  };

  export default List;