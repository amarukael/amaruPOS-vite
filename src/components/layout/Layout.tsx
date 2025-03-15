import React from 'react';
import NavSide from '../navside/NavSide';
import style from './layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={style.layout__container}>
            <NavSide />
            <main>{children}</main>
        </div>
    );
};

export default Layout;