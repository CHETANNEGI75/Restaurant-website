import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>

      {/* LOGO */}
      <img className="logo" src={assets.logo} alt="" />

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link to="/add">Add Product</Link>
        <Link to="/add-category">Add Category</Link>
      </div>

      {/* PROFILE */}
      <img className='profile' src={assets.profile_image} alt="" />

    </div>
  )
}

export default Navbar