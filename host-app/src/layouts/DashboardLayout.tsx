import React from 'react';
import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <TopBar />
                <main className={styles.contentArea}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
