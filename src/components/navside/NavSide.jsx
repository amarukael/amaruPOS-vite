import React from "react";
import "./navside.css";

function NavSide() {
  return (
    <nav className="navside">
      <div className="nav">
        <h2>AmaruPOS</h2>
        <ul>
          <li>Reservation</li>
          <li>Table Services</li>
          <li className="active">Menu</li>
          <li>Delivery</li>
          <li>Accounting</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavSide;
