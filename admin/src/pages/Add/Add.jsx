import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // 🔥 VALIDATION
    if (!data.name || !data.description || !data.price || !image) {
      toast.error("Please fill all fields and upload image ❌");
      return;
    }

    if (data.price <= 0) {
      toast.error("Price must be greater than 0 ❌");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: ""
        });
        setImage(null);

        toast.success("Product added successfully ✅");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding product ❌");
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({
      ...data,
      [name]: value
    }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* IMAGE */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* NAME */}
        <div className="add-product-name">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write description here"
            required
          ></textarea>
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹100"
              required
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="add-btn"
          disabled={!data.name || !data.description || !data.price || !image}
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default Add;