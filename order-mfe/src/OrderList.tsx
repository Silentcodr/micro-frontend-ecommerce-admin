import React, { useState } from 'react';
import styles from './OrderList.module.css';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    status: 'Completed' | 'Pending' | 'Processing';
    items: OrderItem[];
    total: number;
    date: string;
    customer: string;
    email: string;
    address: string;
}

const orders: Order[] = [
    {
        id: '#ORD-7782',
        status: 'Completed',
        items: [{ name: 'Minimalist Chair', quantity: 2, price: 249.00 }],
        total: 498.00,
        date: 'Oct 24, 2023',
        customer: 'Sarah Jane',
        email: 'sarah@example.com',
        address: '123 Main St, New York, NY'
    },
    {
        id: '#ORD-7783',
        status: 'Pending',
        items: [{ name: 'Ceramic Vase', quantity: 1, price: 45.00 }],
        total: 45.00,
        date: 'Oct 24, 2023',
        customer: 'Mike Ross',
        email: 'mike@example.com',
        address: '456 Park Ave, Boston, MA'
    },
    {
        id: '#ORD-7784',
        status: 'Processing',
        items: [{ name: 'Modern Lamp', quantity: 1, price: 89.00 }],
        total: 89.00,
        date: 'Oct 23, 2023',
        customer: 'Rachel Green',
        email: 'rachel@example.com',
        address: '789 Broadway, Seattle, WA'
    }
];

const OrderList: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        const handleSearch = (e: CustomEvent) => setSearchTerm(e.detail.toLowerCase());
        window.addEventListener('app-search', handleSearch as EventListener);
        return () => window.removeEventListener('app-search', handleSearch as EventListener);
    }, []);

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm) ||
        o.customer.toLowerCase().includes(searchTerm)
    );

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Completed': return styles.completed;
            case 'Pending': return styles.pending;
            case 'Processing': return styles.processing;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recent Orders</h2>

            <div className={styles.grid}>
                {filteredOrders.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <span className={styles.orderId}>{order.id}</span>
                            <span className={`${styles.status} ${getStatusClass(order.status)}`}>{order.status}</span>
                        </div>
                        <div className={styles.orderBody}>
                            <div className={styles.orderItem}>
                                <span>{order.items[0].name} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span className={styles.totalAmount}>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className={styles.orderFooter}>
                            <span>{order.date}</span>
                            <button className={styles.viewBtn} onClick={() => setSelectedOrder(order)}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Order Details {selectedOrder.id}</h3>
                            <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>×</button>
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.section}>
                                <h4>Customer Info</h4>
                                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                                <p><strong>Email:</strong> {selectedOrder.email}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}</p>
                            </div>

                            <div className={styles.section}>
                                <h4>Items</h4>
                                <div className={styles.itemList}>
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className={styles.itemRow}>
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.totalSection}>
                                <span>Total Amount</span>
                                <span className={styles.bigTotal}>${selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
