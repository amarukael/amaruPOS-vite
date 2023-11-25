import React from "react";

const ItemBill = ({ nameItem, priceItem, count }) => {
  return (
    <div className="itembill">
      <div className="nametotal">
        <div className="total">{count}</div>
        <div className="name">{nameItem}</div>
      </div>
      <div>{priceItem.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
    </div>
  );
};

export default ItemBill;
