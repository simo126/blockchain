import React from "react";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <nav aria-label="Main Navigation">
      <div className="navbar-brand">
        <img src={logo} alt="MotionCoin Logo" className="logo" />
        <p>MotionCoin</p>
      </div>
      <div className="navbar-buttons">
        <button type="button" className="settings-button">
          Settings
        </button>
        <button type="button" className="create-transaction-button">
          Create Transaction
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
