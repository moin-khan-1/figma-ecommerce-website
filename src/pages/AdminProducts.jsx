import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
    name: "",
    price: "",
    category: "T-Shirts",
    image: "",
    section: "new-arrivals",
};

function AdminProducts({ headers }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    const loadProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/products`, {
                headers,
            });
            const data = await response.json();
            if (response.ok) setProducts(data);
        } catch (error) {
            setMessage("Could not load products.");
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const openAdd = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowForm(true);
        setMessage("");
    };

    const openEdit = (product) => {
        setEditingId(product.id);
        setForm({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            section: product.section,
        });
        setShowForm(true);
        setMessage("");
    };

    const saveProduct = async (e) => {
        e.preventDefault();

        const url = editingId
            ? `${API_URL}/api/admin/products/${editingId}`
            : `${API_URL}/api/admin/products`;

        try {
            const response = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers,
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Something went wrong.");
                return;
            }

            setMessage(editingId ? "Product updated." : "Product added.");
            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
            loadProducts();
        } catch (error) {
            setMessage("Server connection failed.");
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
                method: "DELETE",
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Delete failed.");
                return;
            }

            setMessage("Product deleted.");
            loadProducts();
        } catch (error) {
            setMessage("Server connection failed.");
        }
    };

    return (
        <section className="admin-page-section">
            <div className="admin-page-heading">
                <div>
                    <p className="admin-eyebrow">CATALOG</p>
                    <h1>Products</h1>
                    <p>Manage the products displayed in your store.</p>
                </div>
                <button className="admin-black-btn" onClick={openAdd}>
                    + Add Product
                </button>
            </div>

            {message && <div className="admin-message">{message}</div>}

            {showForm && (
                <div className="admin-form-panel">
                    <div className="admin-panel-header">
                        <div>
                            <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
                            <p>Enter the product information below.</p>
                        </div>
                        <button
                            className="admin-close-btn"
                            onClick={() => setShowForm(false)}
                        >
                            ×
                        </button>
                    </div>

                    <form className="admin-form-grid" onSubmit={saveProduct}>
                        <label>
                            Product Name
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="T-SHIRT WITH TAPE DETAILS"
                                required
                            />
                        </label>

                        <label>
                            Price
                            <input
                                name="price"
                                type="number"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="120"
                                required
                            />
                        </label>

                        <label>
                            Category
                            <select name="category" value={form.category} onChange={handleChange}>
                                <option>T-Shirts</option>
                                <option>Shirts</option>
                                <option>Jeans</option>
                                <option>Shorts</option>
                                <option>Jackets</option>
                            </select>
                        </label>

                        <label>
                            Section
                            <select name="section" value={form.section} onChange={handleChange}>
                                <option value="new-arrivals">New Arrivals</option>
                                <option value="top-selling">Top Selling</option>
                            </select>
                        </label>

                        <label className="admin-full">
                            Image Path
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="/products/tshirt-1.jpg"
                                required
                            />
                        </label>

                        <div className="admin-form-actions admin-full">
                            <button type="submit" className="admin-black-btn">
                                {editingId ? "Update Product" : "Save Product"}
                            </button>
                            <button
                                type="button"
                                className="admin-outline-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-panel">
                <div className="admin-panel-header">
                    <div>
                        <h2>All Products</h2>
                        <p>{products.length} products in your catalog.</p>
                    </div>
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Section</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="admin-product-cell">
                                            <img
                                                src={`${API_URL}${product.image}`}
                                                alt={product.name}
                                            />
                                            <strong>{product.name}</strong>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.section === "new-arrivals" ? "New Arrivals" : "Top Selling"}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <div className="admin-action-row">
                                            <button
                                                className="admin-small-btn"
                                                onClick={() => openEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="admin-small-btn danger"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!products.length && (
                        <div className="admin-empty">No products found.</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminProducts;
