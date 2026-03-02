import { useState } from "react";
import axios from "axios";
import "./AddCategory.css";

const AddCategory = ({ url }) => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/category`, formData);

      console.log(res.data);

      setName("");
      setImage(null);

      alert("Category added ✅");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-category">
      <form onSubmit={handleSubmit}>

        <h2>Add Category</h2>

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Category</button>

      </form>
    </div>
  );
};

export default AddCategory;