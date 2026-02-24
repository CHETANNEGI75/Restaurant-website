import React, { useContext, useState } from 'react'
import './Navbar.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {  
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navbar">
      <Link to='/'>
        <img src={assets.logo} alt="Food Delivery Logo" />
      </Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("Mobile App")} className={menu === "Mobile App" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />

            <ul className='profile-dropdown'>

              {/* 🔥 MY ORDERS NAVIGATION */}
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>My Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>logout</p>
              </li>

            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar