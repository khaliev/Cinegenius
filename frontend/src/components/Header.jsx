import React from "react";
import logo from "../img/logo.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <header>
        <img src={logo} alt="Header" className="logo" />
      </header>
    </div>
  );
}

export default Header;
