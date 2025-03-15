import React from "react";
import styles from "./itemsbill.module.css";

interface ItemBillProps {
    nameItem: string;
    priceItem: number;
    count: number;
}

const ItemBill: React.FC<ItemBillProps> = ({ nameItem, priceItem, count }) => {
    return (
        <div className={styles.itembill}>
            <div className={styles.nametotal}>
                <div className={styles.total}>{count}</div>
                <div className={styles.name}>{nameItem}</div>
            </div>
            <div>
                {priceItem
                    .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                    .replace(",00", "")}
            </div>
        </div>
    );
};

export default ItemBill;