import React from "react";
import styles from "./menu.module.css";
import { FaCoffee } from "react-icons/fa";

interface CategoryListProps {
    categories: string[];
    onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory }) => {
    return (
        <div className={styles.menu__category}>
            {categories.map((category, index) => (
                <div
                    className={styles.category__item}
                    key={index}
                    onClick={() => onSelectCategory(category)}
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
    );
};

export default CategoryList;