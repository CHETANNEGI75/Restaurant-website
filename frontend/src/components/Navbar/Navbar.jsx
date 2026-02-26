import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const { token } = useContext(StoreContext);
  const location = useLocation();

  return (
    <div className="navbar">

     {/* LOGO */}
<Link to="/">
  <img src={assets.logo} alt="logo" className="logo" />
</Link>

      {/* MENU */}
      <ul className="navbar-menu">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>
            Cart
          </Link>
        </li>

        <li>
          <Link to="/myorders" className={location.pathname === "/myorders" ? "active" : ""}>
            Orders
          </Link>
        </li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* SEARCH ICON */}
        <div className="navbar-search-icon">
          🔍
          <div className="dot"></div>
        </div>

        {/* LOGIN / PROFILE */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt=""
            />

            <ul className="profile-dropdown">
              <li>
                <Link to="/myorders">📦 Orders</Link>
              </li>
              <hr />
              <li>
                <p style={{ cursor: "pointer" }}>🚪 Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;