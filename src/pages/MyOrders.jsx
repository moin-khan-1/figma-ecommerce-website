import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function MyOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getUser = () => {
        try {
            const savedUser =
                localStorage.getItem("user");

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch {
            return null;
        }
    };

    const loadOrders = async () => {
        const user = getUser();

        if (!user?.email) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/orders/my-orders?email=${encodeURIComponent(
                    user.email
                )}`
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message ||
                    "Could not load orders."
                );
                return;
            }

            setOrders(data);
        } catch (error) {
            console.error(
                "My orders error:",
                error
            );

            setMessage(
                "Server connection failed."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        const user = getUser();

        if (!user?.email) {
            navigate("/login");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/orders/${orderId}?email=${encodeURIComponent(
                    user.email
                )}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message ||
                    "Could not cancel order."
                );
                return;
            }

            setMessage(
                "Order cancelled successfully."
            );

            loadOrders();
        } catch (error) {
            console.error(
                "Cancel order error:",
                error
            );

            setMessage(
                "Server connection failed."
            );
        }
    };

    const getStatusClass = (status) => {
        return `order-status status-${String(
            status
        ).toLowerCase()}`;
    };

    if (loading) {
        return (
            <main className="my-orders-page">
                <h1>My Orders</h1>
                <p>Loading your orders...</p>
            </main>
        );
    }

    return (
        <main className="my-orders-page">
            <div className="my-orders-heading">
                <div>
                    <p className="admin-eyebrow">
                        ACCOUNT
                    </p>

                    <h1>My Orders</h1>

                    <p>
                        Track your orders and check
                        their current status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadOrders}
                >
                    Refresh
                </button>
            </div>

            {message && (
                <div className="my-orders-message">
                    {message}
                </div>
            )}

            {!orders.length ? (
                <div className="my-orders-empty">
                    <h2>No orders yet</h2>

                    <p>
                        You haven't placed any orders
                        yet.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/shop")
                        }
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="my-orders-list">
                    {orders.map((order) => (
                        <article
                            className="my-order-card"
                            key={order.id}
                        >
                            <div className="my-order-top">
                                <div>
                                    <h2>
                                        Order #
                                        {String(
                                            order.id
                                        ).slice(-6)}
                                    </h2>

                                    <p>
                                        Placed on{" "}
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <span
                                    className={getStatusClass(
                                        order.status
                                    )}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="my-order-items">
                                {order.items?.map(
                                    (item, index) => (
                                        <div
                                            className="my-order-item"
                                            key={`${item.id}-${index}`}
                                        >
                                            <span>
                                                {
                                                    item.name
                                                }{" "}
                                                ×{" "}
                                                {
                                                    item.quantity
                                                }
                                            </span>

                                            <strong>
                                                $
                                                {item.price *
                                                    item.quantity}
                                            </strong>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="my-order-bottom">
                                <strong>
                                    Total: $
                                    {order.total}
                                </strong>

                                {order.status ===
                                    "Pending" && (
                                        <button
                                            type="button"
                                            className="cancel-order-btn"
                                            onClick={() =>
                                                cancelOrder(
                                                    order.id
                                                )
                                            }
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default MyOrders;