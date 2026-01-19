import React, { useState } from 'react';
import styles from './ProductList.module.css';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'Active' | 'Draft';
}

const initialProducts: Product[] = [
    { id: 1, name: 'Minimalist Chair', category: 'Furniture', price: 249.00, stock: 45, status: 'Active' },
    { id: 2, name: 'Modern Lamp', category: 'Lighting', price: 89.00, stock: 120, status: 'Active' },
    { id: 3, name: 'Abstract Canvas', category: 'Decor', price: 150.00, stock: 12, status: 'Draft' },
    { id: 4, name: 'Ceramic Vase', category: 'Decor', price: 45.00, stock: 88, status: 'Active' },
];

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({ name: '', category: '', price: 0, stock: 0, status: 'Active' });

    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        const handleSearch = (e: CustomEvent) => setSearchTerm(e.detail.toLowerCase());
        window.addEventListener('app-search', handleSearch as EventListener);
        return () => window.removeEventListener('app-search', handleSearch as EventListener);
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData(product);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingId(null);
        setFormData({ name: '', category: '', price: 0, stock: 0, status: 'Active' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
        } else {
            const newProduct = { ...formData, id: Date.now() } as Product;
            setProducts([...products, newProduct]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Product Management</h2>
                <button className={styles.addButton} onClick={handleCreate}>+ Add Product</button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className={styles.productName}>{product.name}</div>
                                </td>
                                <td>{product.category}</td>
                                <td>
                                    <span className={product.status === 'Active' ? styles.statusActive : styles.statusDraft}>
                                        {product.status}
                                    </span>
                                </td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.actionBtn} onClick={() => handleEdit(product)}>Edit</button>
                                        <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Status</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.submitBtn}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
