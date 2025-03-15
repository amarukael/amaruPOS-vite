import React from "react";
import styles from "./menu.module.css";
import ItemBill from "@/components/itemsbill/ItemsBill";
import { FaPencilAlt } from "react-icons/fa";

interface MenuItem {
    name: string;
    price: number;
    count: number;
    timestamp: number;
}

interface BillProps {
    billItems: MenuItem[];
    total: number;
    tax: number;
    customerName: string;
    onEditCustomerName: () => void;
}

const Bill: React.FC<BillProps> = ({ billItems, total, tax, customerName, onEditCustomerName }) => {
    return (
        <div className={styles.bill__menu}>
            <div>
                <h3>Nama Pelanggan :</h3>
                <div className={styles.customer__name}>
                    <span>{customerName}</span>
                    <button onClick={onEditCustomerName}>
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
                            {total.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).replace(",00", "")}
                        </p>
                    </div>
                    <div className={styles.subtotal}>
                        <p>Tax (10%):</p>
                        <p>
                            {tax.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).replace(",00", "")}
                        </p>
                    </div>
                    <div className={styles.dashed_line}></div>
                    <div className={styles.subtotal}>
                        <h3>Total:</h3>
                        <h3>
                            {(total + tax).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).replace(",00", "")}
                        </h3>
                    </div>
                </div>
                <div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Bill;