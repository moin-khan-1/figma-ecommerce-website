import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductCard({ product }) {
    return (
        <Link
            to={`/product/${product.id}`}
            className="product-card"
        >
            <div className="product-image">
                <img
                    src={`${API_URL}${product.image}`}
                    alt={product.name}
                />
            </div>

            <h3>{product.name}</h3>

            <p>${product.price}</p>
        </Link>
    );
}

export default ProductCard;