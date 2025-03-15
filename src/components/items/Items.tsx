import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styles from "./items.module.css";

interface ItemsProps {
    nameItem: string;
    priceItem: number;
    count: number;
    incrementCount: () => void;
    decrementCount: () => void;
}

const Items: React.FC<ItemsProps> = ({
    nameItem,
    priceItem,
    count,
    incrementCount,
    decrementCount,
}) => {
    return (
        <div className={styles.items__item}>
            <div className={styles.item__content}>
                <h3>{nameItem}</h3>
                <div>
                    <span>
                        {priceItem.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).replace(",00", "")}
                    </span>
                    <div className={styles.counter}>
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