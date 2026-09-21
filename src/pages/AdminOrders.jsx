import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminOrders({ headers }) {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");

    const loadOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/orders`, {
                headers,
            });
            const data = await response.json();
            if (response.ok) setOrders(data);
        } catch (error) {
            setMessage("Could not load orders.");
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/orders/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ status }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Could not update order.");
                return;
            }

            setMessage("Order status updated.");
            loadOrders();
        } catch (error) {
            setMessage("Server connection failed.");
        }
    };

    return (
        <section className="admin-page-section">
            <div className="admin-page-heading">
                <div>
                    <p className="admin-eyebrow">SALES</p>
                    <h1>Orders</h1>
                    <p>View customer orders and update their status.</p>
                </div>
                <button className="admin-outline-btn" onClick={loadOrders}>
                    Refresh
                </button>
            </div>

            {message && <div className="admin-message">{message}</div>}

            <div className="admin-panel">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{String(order.id).slice(-6)}</td>
                                    <td>
                                        <strong>{order.customer?.name || "Customer"}</strong>
                                        <small className="admin-table-subtext">
                                            {order.customer?.email || ""}
                                        </small>
                                    </td>
                                    <td>{order.items?.reduce((sum, item) => sum + Number(item.quantity || 1), 0) || 0}</td>
                                    <td>${order.total}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <select
                                            className={`admin-status-select status-${String(order.status).toLowerCase()}`}
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!orders.length && (
                        <div className="admin-empty">No orders found.</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminOrders;
