 import express from 'express';
 import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';


 // App Config
    const app = express();
    const port =4000;

    //middlewares
    app.use(express.json());
    app.use(cors());
    
    //db connection
    connectDB();




    //api endpoint
     app.use("/api/food",foodRouter)




     
    app.get("/",(req,res)=>{
        res.send("API working")
    })
     

    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })

    //mongodb+srv://negichetan10:Chetannegi1122@cluster0.aco53jd.mongodb.net/?