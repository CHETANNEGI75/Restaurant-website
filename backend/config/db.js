import mongoose from "mongoose";


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://negichetan10:Chetannegi1122@cluster0.aco53jd.mongodb.net/food-del').then(()=>{
        console.log("DB connected")
    })
}