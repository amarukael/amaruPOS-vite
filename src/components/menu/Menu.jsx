import React, { useState, useEffect } from "react";
import "./menu.css";
import { FaCoffee } from "react-icons/fa";
import Items from "./Item";
import ItemBill from "./ItemBill";
import data from "../../assets/data.json";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const menuItems = [];
      for (const item in data[selectedCategory]) {
        menuItems.push({
          name: item,
          price: data[selectedCategory][item],
          count: 0,
          order: 0,
        });
      }
      setItems(menuItems);
    }
  }, [selectedCategory]);

  const incrementCount = (index) => {
    const newItems = [...items];
    newItems[index].count++;
    if (newItems[index].count === 1) {
      newItems[index].order = order;
      setOrder(order + 1);
    }
    setItems(newItems);
    const newBillItems = [...billItems];
    const existingItemIndex = newBillItems.findIndex(item => item.name === newItems[index].name);
    if (existingItemIndex > -1) {
      newBillItems[existingItemIndex].count++;
    } else {
      newBillItems.push(newItems[index]);
    }
    setBillItems(newBillItems);
  };

  const decrementCount = (index) => {
    const newItems = [...items];
    if (newItems[index].count > 0) {
      newItems[index].count--;
    }
    setItems(newItems);
    const newBillItems = [...billItems];
    const existingItemIndex = newBillItems.findIndex(item => item.name === newItems[index].name);
    if (existingItemIndex > -1) {
      newBillItems[existingItemIndex].count--;
      if (newBillItems[existingItemIndex].count === 0) {
        newBillItems.splice(existingItemIndex, 1);
      }
    }
    setBillItems(newBillItems);
  };

  return (
    <>
      <div className="menu">
        <input
          className="searchbar"
          type="text"
          placeholder="🔍 Search.."
        ></input>
        <div className="menu__category">
          {Object.keys(data).map((category, index) => (
            <div
              className="category__item"
              key={index}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="item__content">
                <span className="category__icon">
                  <FaCoffee />
                </span>
                <div>
                  <h3>{category}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="line" />
        <div className="menu__items">
          {items.map((item, index) => (
            <Items
              key={index}
              nameItem={item.name}
              priceItem={item.price}
              count={item.count}
              incrementCount={() => incrementCount(index)}
              decrementCount={() => decrementCount(index)}
            />
          ))}
        </div>
      </div>
      <div className="bill__menu">
        <br />
        <br />
        <div className="wrap__bill">
          <div className="order">
            {billItems
              .sort((a, b) => a.order - b.order)
              .map((item, index) => (
                <ItemBill
                  key={index}
                  nameItem={item.name}
                  priceItem={item.price}
                  count={item.count}
                />
              ))}
          </div>
          <div className="payment"></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
