import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const savedUser = (() => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    })();

    const [form, setForm] = useState({
        name: savedUser?.name || "",
        email: savedUser?.email || "",
        address: "",
        city: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            setMessage("Your cart is empty");
            return;
        }

        const currentUser = (() => {
            try {
                const user = localStorage.getItem("user");
                return user ? JSON.parse(user) : null;
            } catch {
                return null;
            }
        })();

        if (!currentUser) {
            setMessage("Please login before placing an order.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                `${API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customer: {
                            ...form,
                            name: currentUser.name,
                            email: currentUser.email,
                        },
                        items: cart,
                        total,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message ||
                    "Could not place order."
                );
                return;
            }

            clearCart();

            setMessage(
                "Order placed successfully!"
            );

            setTimeout(() => {
                navigate("/orders");
            }, 1000);
        } catch (error) {
            console.error(
                "Checkout error:",
                error
            );

            setMessage(
                "Server connection failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-content">
                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >
                    <h2>Delivery Information</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        readOnly
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Placing Order..."
                            : "Place Order"}
                    </button>

                    {message && (
                        <p>{message}</p>
                    )}
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div
                            className="summary-item"
                            key={`${item.id}-${item.size || ""}`}
                        >
                            <span>
                                {item.name} ×{" "}
                                {item.quantity}
                            </span>

                            <span>
                                $
                                {item.price *
                                    item.quantity}
                            </span>
                        </div>
                    ))}

                    <hr />

                    <h2>
                        Total: ${total}
                    </h2>
                </div>
            </div>
        </main>
    );
}

export default Checkout;