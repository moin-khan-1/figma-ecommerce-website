import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminMessages from "./AdminMessages";
import "../styles/admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Admin() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("dashboard");
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const adminAuth = JSON.parse(
        localStorage.getItem("adminAuth") || "null"
    );

    const user = adminAuth?.admin || null;

    useEffect(() => {
        if (!adminAuth?.token) {
            navigate("/admin/login");
            return;
        }

        loadDashboard();
    }, []);

    const adminHeaders = () => ({
        "Content-Type": "application/json",
        "x-admin-token": adminAuth?.token || "",
    });

    const loadDashboard = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/dashboard`, {
                headers: adminHeaders(),
            });
            const data = await response.json();
            if (response.ok) {
                setDashboard(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/admin/login");
    };

    const renderPage = () => {
        if (activePage === "products") {
            return <AdminProducts headers={adminHeaders()} />;
        }

        if (activePage === "orders") {
            return <AdminOrders headers={adminHeaders()} />;
        }

        if (activePage === "users") {
            return <AdminUsers headers={adminHeaders()} />;
        }

        if (activePage === "messages") {
            return <AdminMessages headers={adminHeaders()} />;
        }

        return (
            <section className="admin-dashboard">
                <div className="admin-page-heading">
                    <div>
                        <p className="admin-eyebrow">SHOP.CO ADMIN</p>
                        <h1>Dashboard</h1>
                        <p>Manage your store from one place.</p>
                    </div>
                    <button className="admin-black-btn" onClick={loadDashboard}>
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="admin-loading">Loading dashboard...</div>
                ) : (
                    <>
                        <div className="admin-stats-grid">
                            <div className="admin-stat-card">
                                <span>Total Products</span>
                                <strong>{dashboard?.totalProducts || 0}</strong>
                            </div>
                            <div className="admin-stat-card">
                                <span>Total Orders</span>
                                <strong>{dashboard?.totalOrders || 0}</strong>
                            </div>
                            <div className="admin-stat-card">
                                <span>Customers</span>
                                <strong>{dashboard?.totalUsers || 0}</strong>
                            </div>
                            <div className="admin-stat-card">
                                <span>Messages</span>
                                <strong>{dashboard?.totalMessages || 0}</strong>
                            </div>
                        </div>

                        <div className="admin-two-column">
                            <div className="admin-panel">
                                <div className="admin-panel-header">
                                    <div>
                                        <h2>Recent Orders</h2>
                                        <p>Latest orders placed by customers.</p>
                                    </div>
                                    <button
                                        className="admin-outline-btn"
                                        onClick={() => setActivePage("orders")}
                                    >
                                        View All
                                    </button>
                                </div>

                                {dashboard?.recentOrders?.length ? (
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Order</th>
                                                    <th>Customer</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dashboard.recentOrders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>#{String(order.id).slice(-6)}</td>
                                                        <td>{order.customer?.name || "Customer"}</td>
                                                        <td>${order.total}</td>
                                                        <td>
                                                            <span className={`admin-status status-${String(order.status).toLowerCase()}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="admin-empty">No orders yet.</div>
                                )}
                            </div>

                            <div className="admin-panel">
                                <div className="admin-panel-header">
                                    <div>
                                        <h2>Store Overview</h2>
                                        <p>Quick access to your main sections.</p>
                                    </div>
                                </div>

                                <div className="admin-quick-grid">
                                    <button onClick={() => setActivePage("products")}>
                                        <strong>Products</strong>
                                        <span>Add, edit and remove products</span>
                                    </button>
                                    <button onClick={() => setActivePage("orders")}>
                                        <strong>Orders</strong>
                                        <span>View and update order status</span>
                                    </button>
                                    <button onClick={() => setActivePage("users")}>
                                        <strong>Customers</strong>
                                        <span>View registered customers</span>
                                    </button>
                                    <button onClick={() => setActivePage("messages")}>
                                        <strong>Messages</strong>
                                        <span>Read customer messages</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>
        );
    };

    return (
        <main className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">SHOP.CO</div>

                <div className="admin-user-box">
                    <span>ADMIN</span>
                    <strong>{user?.name || "Store Admin"}</strong>
                    <small>{user?.email}</small>
                </div>

                <nav className="admin-nav">
                    <button
                        className={activePage === "dashboard" ? "active" : ""}
                        onClick={() => setActivePage("dashboard")}
                    >
                        <span>▦</span> Dashboard
                    </button>
                    <button
                        className={activePage === "products" ? "active" : ""}
                        onClick={() => setActivePage("products")}
                    >
                        <span>□</span> Products
                    </button>
                    <button
                        className={activePage === "orders" ? "active" : ""}
                        onClick={() => setActivePage("orders")}
                    >
                        <span>▤</span> Orders
                    </button>
                    <button
                        className={activePage === "users" ? "active" : ""}
                        onClick={() => setActivePage("users")}
                    >
                        <span>♙</span> Customers
                    </button>
                    <button
                        className={activePage === "messages" ? "active" : ""}
                        onClick={() => setActivePage("messages")}
                    >
                        <span>✉</span> Messages
                    </button>
                </nav>

                <button className="admin-logout" onClick={logout}>
                    Logout
                </button>
            </aside>

            <section className="admin-main">
                <header className="admin-topbar">
                    <div>
                        <span>STORE MANAGEMENT</span>
                    </div>
                    <a href="/" className="admin-store-link">
                        View Store →
                    </a>
                </header>

                {renderPage()}
            </section>
        </main>
    );
}

export default Admin;
