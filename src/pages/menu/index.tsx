import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import data from "./data.json";
import Layout from "@/components/layout/Layout";
import CategoryList from "./CategoryList";
import ItemList from "./ItemList";
import Bill from "./Bill";

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
        <Layout>
            <div className={styles.menu__container}>
                <div className={styles.menu}>
                    <input
                        className={styles.searchbar}
                        type="text"
                        placeholder="🔍 Search.."
                    />
                    <CategoryList
                        categories={Object.keys(data)}
                        onSelectCategory={setSelectedCategory}
                    />
                    <hr className={styles.line} />
                    <ItemList
                        items={items}
                        onIncrement={incrementCount}
                        onDecrement={decrementCount}
                    />
                </div>
                <Bill
                    billItems={billItems}
                    total={calculateTotal()}
                    tax={calculateTax(calculateTotal())}
                    customerName={name}
                    onEditCustomerName={handleEditClick}
                />
            </div>
        </Layout>
    );
};

export default Menu;