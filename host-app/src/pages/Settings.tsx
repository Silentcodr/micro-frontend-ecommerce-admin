import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import styles from './Settings.module.css';

const Settings: React.FC = () => {
    const { user, updateUser } = useUser();
    const [formData, setFormData] = useState({
        name: user.name,
        role: user.role,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            name: formData.name,
            role: formData.role,
            avatar: formData.name.charAt(0).toUpperCase(),
        });
        alert('Profile updated successfully!');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Account Settings</h2>
            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Display Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="role" className={styles.label}>Role</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={() => setFormData({ name: user.name, role: user.role })}>
                            Reset
                        </button>
                        <button type="submit" className={styles.saveBtn}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
