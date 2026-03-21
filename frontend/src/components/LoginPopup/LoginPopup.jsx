import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {
const context = useContext(StoreContext);
console.log("URL 👉", context.url);
  const[currstate,setCurrstate] = useState("login");
const [data,setData] = useState({
  name:"",
  email:"",
  password:""
})
console.log("CONTEXT 👉", useContext(StoreContext));

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData((data) => ({
    ...data,
    [name]: value,
  }));
}
console.log("Form Submit Triggered 🚀");
const onLogin = async(event) => {
  event.preventDefault();
  let newUrl = url;
  if(currstate==="login"){
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }
  const response = await axios.post(newUrl,data);
  if(response.data.success){
    setToken(response.data.token);
    // local storage mai save kiya 
    localStorage.setItem("token",response.data.token);
    // false kar diya taki popup close ho jaye
    setShowLogin(false);
  }

  else{
alert(response.data.message);
  }
}
  return (
    <div className='login-popup'>
      <form  onSubmit = {onLogin} className="login-popup-container">
        <div className="login-popup-tittle"> 
          <h2>
            {currstate}
          </h2>
        <img onClick = {() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currstate==="login" ? <></> : <input  name ='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
          <input  name ='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
          <input  name ='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
        </div>
        <button type="submit"> {currstate==="sign up"?"create account":"login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox"required />
          <p>By clicking you agree to our terms and conditions</p>
        </div>
        {currstate==="login" ? 
      <p>Create an account? <span onClick={()=>setCurrstate("sign up")}>Click here  </span></p> : <p>Already have an account? <span onClick={()=>setCurrstate("login")}>login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
