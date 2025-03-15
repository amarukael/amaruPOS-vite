import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import { FaCoffee, FaPencilAlt } from "react-icons/fa";
import data from "./data.json";
import Items from "@/components/items/Items";
import ItemBill from "@/components/itemsbill/ItemsBill";


interface MenuItem {
    name: string;
    price: number;
    count: number;
    order: number;
    timestamp: number;
}

const Menu: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [order, setOrder] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [billItems, setBillItems] = useState<MenuItem[]>([]);
    const [name, setName] = useState("Nama Pelanggan");

    type CategoryData = {
        [key: string]: string;
    };

    useEffect(() => {
        if (selectedCategory) {
            const menuItems: MenuItem[] = [];
            const categoryData = data[selectedCategory as keyof typeof data] as CategoryData;
            for (const item in categoryData) {
                const existingItem = billItems.find((billItem) => billItem.name === item);
                menuItems.push({
                    name: item,
                    price: Number(categoryData[item].replace(/[^0-9]+/g, "")),
                    count: existingItem ? existingItem.count : 0,
                    order: existingItem ? existingItem.order : 0,
                    timestamp: existingItem ? existingItem.timestamp : 0,
                });
            }
            setItems(menuItems);
        }
    }, [selectedCategory, billItems]);

    const incrementCount = (index: number) => {
        const newItems = [...items];
        newItems[index].count++;
        if (newItems[index].count === 1) {
            newItems[index].order = order;
            setOrder(order + 1);
        }
        newItems[index].timestamp = Date.now();
        setItems(newItems);
        const newBillItems = [...billItems];
        const existingItemIndex = newBillItems.findIndex(
            (item) => item.name === newItems[index].name
        );
        if (existingItemIndex > -1) {
            newBillItems[existingItemIndex].count++;
            newBillItems[existingItemIndex].timestamp = Date.now();
        } else {
            newBillItems.push(newItems[index]);
        }
        setBillItems(newBillItems);
    };

    const decrementCount = (index: number) => {
        const newItems = [...items];
        if (newItems[index].count > 0) {
            newItems[index].count--;
        }
        newItems[index].timestamp = Date.now();
        setItems(newItems);
        const newBillItems = [...billItems];
        const existingItemIndex = newBillItems.findIndex(
            (item) => item.name === newItems[index].name
        );
        if (existingItemIndex > -1) {
            newBillItems[existingItemIndex].count--;
            newBillItems[existingItemIndex].timestamp = Date.now();
            if (newBillItems[existingItemIndex].count === 0) {
                newBillItems.splice(existingItemIndex, 1);
            }
        }
        setBillItems(newBillItems);
    };

    const calculateTotal = () => {
        return billItems.reduce((total, item) => total + item.price * item.count, 0);
    };

    const calculateTax = (total: number) => {
        return total * 0.1;
    };

    const handleEditClick = () => {
        const newName = window.prompt("Edit Nama Pelanggan", name);
        if (newName !== null && newName.trim() !== "") {
            setName(newName);
        } else if (newName !== null) {
            alert("Anda harus memasukkan nama!");
        }
    };
    return (
        <>
            <div className={styles.menu}>
                <input
                    className={styles.searchbar}
                    type="text"
                    placeholder="🔍 Search.."
                />
                <div className={styles.menu__category}>
                    {Object.keys(data).map((category, index) => (
                        <div
                            className={styles.category__item}
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <div className={styles.item__content}>
                                <span className={styles.category__icon}>
                                    <FaCoffee />
                                </span>
                                <div>
                                    <h3>{category}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className={styles.line} />
                <div className={styles.menu__items}>
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
            <div className={styles.bill__menu}>
                <div>
                    <h3>Nama Pelanggan :</h3>
                    <div className={styles.customer__name}>
                        <span>{name}</span>
                        <button onClick={handleEditClick}>
                            <FaPencilAlt />
                        </button>
                    </div>
                </div>
                <div className={styles.order}>
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
                <div className={styles.totalbill}>
                    <div className={styles.calculate}>
                        <div className={styles.subtotal}>
                            <p>Subtotal:</p>
                            <p>
                                {calculateTotal()
                                    .toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })
                                    .replace(",00", "")}
                            </p>
                        </div>
                        <div className={styles.subtotal}>
                            <p>Tax (10%):</p>
                            <p>
                                {calculateTax(calculateTotal())
                                    .toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })
                                    .replace(",00", "")}
                            </p>
                        </div>
                        <div className={styles.dashed_line}></div>
                        <div className={styles.subtotal}>
                            <h3>Total:</h3>
                            <h3>
                                {(calculateTotal() + calculateTax(calculateTotal()))
                                    .toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })
                                    .replace(",00", "")}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <button>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;