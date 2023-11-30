import "./menu.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import React from "react";

const Items = ({
  nameItem,
  priceItem,
  count,
  incrementCount,
  decrementCount,
}) => {
  return (
    <div className="items__item">
      <div className="item__content">
        <h3>{nameItem}</h3>
        <div>
          <span>
            {priceItem.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }).replace(",00", "")}
          </span>
          <div className="counter">
            <i onClick={decrementCount}>
              <AiOutlineMinus />
            </i>
            <span>{count}</span>
            <i onClick={incrementCount}>
              <AiOutlinePlus />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
