import React, { useState } from 'react';
import { Bell, Search, Settings, Info } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.css';

const TopBar: React.FC = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New Order #ORD-7785 received', time: '2 min ago', read: false, path: '/orders' },
        { id: 2, text: 'Server CPU usage high (85%)', time: '1 hour ago', read: false, path: '/analytics' },
        { id: 3, text: 'Product "Gaming Desk" stock low', time: '3 hours ago', read: true, path: '/products' },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleEditProfile = () => {
        navigate('/settings');
        setIsDropdownOpen(false);
    };

    const handleViewDetails = () => {
        setIsDetailsModalOpen(true);
        setIsDropdownOpen(false);
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleNotificationClick = (path: string) => {
        navigate(path);
        setIsNotificationsOpen(false);
    };

    return (
        <header className={styles.topbar}>
            <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                    onChange={(e) => window.dispatchEvent(new CustomEvent('app-search', { detail: e.target.value }))}
                />
            </div>

            <div className={styles.actions}>
                <div className={styles.notificationWrapper}>
                    <button className={styles.iconBtn} onClick={toggleNotifications}>
                        <Bell size={20} />
                        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                    </button>

                    {isNotificationsOpen && (
                        <div className={styles.notificationDropdown}>
                            <div className={styles.notificationHeader}>
                                <span>Notifications</span>
                                <span className={styles.clearAll} onClick={() => setNotifications([])}>Mark all read</span>
                            </div>
                            {notifications.length > 0 ? (
                                <div className={styles.notificationList}>
                                    {notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                                            onClick={() => handleNotificationClick(notification.path)}
                                        >
                                            <p className={styles.notificationText}>{notification.text}</p>
                                            <span className={styles.notificationTime}>{notification.time}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyNotifications}>
                                    <p>No new notifications</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.profile} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <div className={styles.avatar}>{user.avatar}</div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userRole}>{user.role}</span>
                    </div>

                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <button className={styles.dropdownItem} onClick={(e) => { e.stopPropagation(); handleEditProfile(); }}>
                                <Settings size={16} />
                                <span>Edit Profile</span>
                            </button>
                            <button className={styles.dropdownItem} onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
                                <Info size={16} />
                                <span>Admin Details</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isDetailsModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsDetailsModalOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Admin Details</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Email:</strong> admin@eprodx.com</p>
                        <p><strong>Last Login:</strong> Just now</p>
                        <button className={styles.closeBtn} onClick={() => setIsDetailsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default TopBar;
