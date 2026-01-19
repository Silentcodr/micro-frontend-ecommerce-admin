import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, BarChart2, Settings, LogOut, Layers } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <Layers size={28} className={styles.logoIcon} color="#3b82f6" />
                <span className={styles.logoText}>EPRODX</span>
            </div>

            <nav className={styles.nav}>
                <div className={styles.sectionLabel}>MENU</div>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                            <ShoppingBag size={20} />
                            <span>Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                            <ShoppingCart size={20} />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/analytics" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                            <BarChart2 size={20} />
                            <span>Analytics</span>
                        </NavLink>
                    </li>
                </ul>

                <div className={styles.sectionLabel}>SYSTEM</div>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={styles.footer}>
                <button className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
