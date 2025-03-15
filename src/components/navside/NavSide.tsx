import React from "react";
import styles from "./navside.module.css";

const NavSide: React.FC = () => {
  return (
    <nav className={styles.navside}>
      <div className={styles.nav}>
        <h2>AmaruPOS</h2>
        <ul>
          <li>Reservation</li>
          <li>Table Services</li>
          <li className={styles.active}>Menu</li>
          <li>Delivery</li>
          <li>Accounting</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavSide;