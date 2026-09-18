import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Cart() {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <main className="cart-page">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    <img
                                        src={`${API_URL}${item.image}`}
                                        alt={item.name}
                                    />
                                </div>

                                <div>
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>

                                    <div className="quantity">
                                        <button onClick={() => decreaseQuantity(item.id)}>
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button onClick={() => increaseQuantity(item.id)}>
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Total: ${total}</h2>
                        <Link to="/checkout" className="add-cart-button">
                            Checkout
                        </Link>
                    </div>
                </>
            )}
        </main>
    );
}

export default Cart;