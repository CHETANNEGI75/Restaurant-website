import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validater from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne ({ email });
        if(!user){
            res.json({
                success:false,
                message:"User not found"
            })
            
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const token = createToken(user._id);
        res.json({
            success:true,
            message:"User logged in successfully",
            token:token
        })
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error logging in user"})  
    }


}
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
const { name, email, password } = req.body;
try {
    //checking is user already exist or not
    const exist=await userModel.findOne({email});
    if(exist){
        return res.json({
            success:false,
            message:"User already exist"
        })
    }

    // validating email format and strong pSSWORD
    if (!validater.isEmail(email)) {
return res.json({
    success:false,
    message:"Please enter a valid email"
})
    }
   if (password.length < 8){
    return res.json({
        success:false,
        message:"Password must be at least 8 characters long"
    }) 
   }

// HASHING PASSWORD
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const Newuser = new userModel({
    name:name,
    email:email,
    password:hashedPassword
})

const user = await Newuser.save();
const token = createToken(user._id);

const updateUser = await userModel.findByIdAndUpdate(user._id, { token: token }, { new: true });

res.json({
    success:true,
    message:"User registered successfully",
    token:token
})
}
catch (error) {
    console.log(error);
    res.json({success:false,message:"Error registering user"})
}
console.log(req.body);


}
export { loginUser, registerUser };