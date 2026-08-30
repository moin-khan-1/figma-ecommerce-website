import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.log(error));
    }, [id]);

    if (!product) {
        return <h2>Loading product...</h2>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        addToCart({
            ...product,
            size: selectedSize,
        });

        navigate("/cart");
    };

    return (
        <main className="product-details">
            <div className="product-details-image">
                <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                />
            </div>

            <div className="product-details-info">
                <h1>{product.name}</h1>

                <p className="product-price">
                    ${product.price}
                </p>

                <p>
                    This product is made with high-quality materials
                    and designed for everyday comfort and style.
                </p>

                <div className="product-option">
                    <h3>Choose Size</h3>

                    <div className="sizes">
                        {["Small", "Medium", "Large", "X-Large"].map(
                            (size) => (
                                <button
                                    type="button"
                                    key={size}
                                    className={
                                        selectedSize === size
                                            ? "selected-size"
                                            : ""
                                    }
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    className="add-cart-button"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </main>
    );
}

export default ProductDetails;