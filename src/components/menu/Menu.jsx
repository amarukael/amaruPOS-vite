import React, { useState, useEffect, useRef } from "react";
import "./menu.css";
import { FaCoffee } from "react-icons/fa";
import Items from "./Item";
import ItemBill from "./ItemBill";
import data from "../../assets/data.json";
import GeneratePDF from "./GeneratePDF";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const menuItems = [];
      for (const item in data[selectedCategory]) {
        const existingItem = billItems.find(
          (billItem) => billItem.name === item
        );
        menuItems.push({
          name: item,
          price: Number(data[selectedCategory][item].replace(/[^0-9]+/g, "")),
          count: existingItem ? existingItem.count : 0,
          order: existingItem ? existingItem.order : 0,
          timestamp: existingItem ? existingItem.timestamp : 0, // add timestamp
        });
      }
      setItems(menuItems);
    }
  }, [selectedCategory, billItems]);

  const incrementCount = (index) => {
    const newItems = [...items];
    newItems[index].count++;
    if (newItems[index].count === 1) {
      newItems[index].order = order;
      setOrder(order + 1);
    }
    newItems[index].timestamp = Date.now(); // update timestamp
    setItems(newItems);
    const newBillItems = [...billItems];
    const existingItemIndex = newBillItems.findIndex(
      (item) => item.name === newItems[index].name
    );
    if (existingItemIndex > -1) {
      newBillItems[existingItemIndex].count++;
      newBillItems[existingItemIndex].timestamp = Date.now(); // update timestamp
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
    newItems[index].timestamp = Date.now(); // update timestamp
    setItems(newItems);
    const newBillItems = [...billItems];
    const existingItemIndex = newBillItems.findIndex(
      (item) => item.name === newItems[index].name
    );
    if (existingItemIndex > -1) {
      newBillItems[existingItemIndex].count--;
      newBillItems[existingItemIndex].timestamp = Date.now(); // update timestamp
      if (newBillItems[existingItemIndex].count === 0) {
        newBillItems.splice(existingItemIndex, 1);
      }
    }
    setBillItems(newBillItems);
  };

  const calculateTotal = () => {
    return billItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  const calculateTax = (total) => {
    return total * 0.1;
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
          <div className="order">
            {billItems
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item, index) => (
                <ItemBill
                  key={index}
                  nameItem={item.name}
                  priceItem={item.price}
                  count={item.count}
                />
              ))}
          </div>
          <div className="totalbill">
            <div className="calculate">
              <div className="subtotal">
                <p>Subtotal:</p>
                <p>
                  {calculateTotal().toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).replace(",00", "")}
                </p>
              </div>
              <div className="subtotal">
                <p>Tax (10%):</p>
                <p>
                  {calculateTax(calculateTotal()).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).replace(",00", "")}
                </p>
              </div>
              <div className="dashed-line"></div>
              <div className="subtotal">
                <h3>Total:</h3>
                <h3>
                  {(
                    calculateTotal() + calculateTax(calculateTotal())
                  ).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).replace(",00", "")}
                </h3>
              </div>
            </div>
            <div>
              <GeneratePDF
                billItems={billItems}
                calculateTotal={calculateTotal}
                calculateTax={calculateTax}
              />
            </div>
          </div>
        </div>
    </>
  );
};

export default Menu;
