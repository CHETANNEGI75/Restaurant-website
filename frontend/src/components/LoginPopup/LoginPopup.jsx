import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import './LoginPopup.css'
const LoginPopup = ({setShowLogin}) => {

  const[currstate,setCurrstate] = useState("login");
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-tittle"> 
          <h2>
            {currstate}
          </h2>
        <img onClick = {() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currstate==="login" ? <></> : <input type="text" placeholder='Enter your name' required />}
          <input type="email" placeholder='Enter your email' required />
          <input type="password" placeholder='Enter your password' required />
        </div>
        <button> {currstate==="sign up"?"create account":"login"}</button>
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
