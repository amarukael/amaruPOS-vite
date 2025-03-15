import React from "react";
import styles from "./menu.module.css";
import Items from "@/components/items/Items";

interface MenuItem {
    name: string;
    price: number;
    count: number;
    order: number;
    timestamp: number;
}

interface ItemListProps {
    items: MenuItem[];
    onIncrement: (index: number) => void;
    onDecrement: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onIncrement, onDecrement }) => {
    return (
        <div className={styles.menu__items}>
            {items.map((item, index) => (
                <Items
                    key={index}
                    nameItem={item.name}
                    priceItem={item.price}
                    count={item.count}
                    incrementCount={() => onIncrement(index)}
                    decrementCount={() => onDecrement(index)}
                />
            ))}
        </div>
    );
};

export default ItemList;