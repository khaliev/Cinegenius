import React from "react";
import logo1 from "../img/logo1.png";
import logo2 from "../img/logo2.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src={logo1} alt="Header" className="logo1" />
      </a>
      <img src={logo2} alt="Header" className="logo2" />
    </header>
  );
}

export default Header;
