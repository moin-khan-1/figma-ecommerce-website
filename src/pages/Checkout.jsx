import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
    });

    const [message, setMessage] = useState("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
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

        try {
            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customer: form,
                        items: cart,
                        total,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }
            clearCart();

            setMessage("Order placed successfully!");

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            setMessage("Server connection failed");
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

                    <button type="submit">
                        Place Order
                    </button>

                    {message && <p>{message}</p>}
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div
                            className="summary-item"
                            key={`${item.id}-${item.size || ""}`}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <span>
                                ${item.price * item.quantity}
                            </span>
                        </div>
                    ))}

                    <hr />

                    <h2>Total: ${total}</h2>
                </div>
            </div>
        </main>
    );
}

export default Checkout;