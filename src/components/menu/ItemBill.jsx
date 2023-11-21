import "./itembill.css";
import React, { useState } from "react";

const ItemBill = ({ nameItem, priceItem, count }) => {
  return (
    <div className="itembill">
      <div className="nametotal">
        <div className="total">{count}</div>
        <div className="name">{nameItem}</div>
      </div>
      <div>{priceItem}</div>
    </div>
  );
};

export default ItemBill;
