import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { cloudinary } from "./config/cloudinary.js";
console.log("KEY (server.js) 👉", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// App Config
const app = express();
const port = 4000;
 
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads", express.static("uploads"));

//db connection
connectDB();
//api endpoint
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

//mongodb+srv://negichetan10:Chetannegi1122@cluster0.aco53jd.mongodb.net/?
