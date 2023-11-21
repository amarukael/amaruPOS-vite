import "./menu.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import React from 'react';

const Items = ({ nameItem, priceItem, count, incrementCount, decrementCount }) => {
  return (
    <div className="items__item">
      <div className="item__content">
        <div>
          <h3>{nameItem}</h3>
          <span>{priceItem}</span>
        </div>
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
  );
};

export default Items;
