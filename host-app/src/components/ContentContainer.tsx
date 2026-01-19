import React from 'react';
import type { ReactNode } from 'react';
import styles from './ContentContainer.module.css';

interface ContentContainerProps {
    children: ReactNode;
    title?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, title }) => {
    return (
        <div className={styles.container}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default ContentContainer;
