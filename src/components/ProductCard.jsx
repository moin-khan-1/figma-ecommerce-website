import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Backend abhi rating nahi bhejta, isliye product id se ek consistent
// dummy rating generate kar rahe hain (har product ki rating fix rahegi,
// baar baar refresh pe change nahi hogi)
function getDummyRating(id) {
    const ratings = [4.5, 4.0, 5.0, 3.5, 4.5, 4.0, 5.0, 3.5];
    const counts = [120, 89, 204, 56, 143, 98, 176, 64];
    const index = (id - 1) % ratings.length;
    return { rating: ratings[index], count: counts[index] };
}

function Stars({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
        <span className="stars">
            {Array.from({ length: 5 }).map((_, i) => {
                if (i < fullStars) return <span key={i}>★</span>;
                if (i === fullStars && hasHalf) return <span key={i}>★</span>;
                return (
                    <span key={i} className="star-empty">
                        ★
                    </span>
                );
            })}
        </span>
    );
}

function ProductCard({ product }) {
    const { rating, count } = getDummyRating(product.id);

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-image">
                <img
                    src={`${API_URL}${product.image}`}
                    alt={product.name}
                />
            </div>

            <h3>{product.name}</h3>

            <div className="product-rating">
                <Stars rating={rating} />
                <span className="rating-value">{rating}/5</span>
            </div>

            <p>${product.price}</p>
        </Link>
    );
}

export default ProductCard;