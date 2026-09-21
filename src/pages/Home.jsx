import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PRODUCTS = [
    {
        id: 1,
        name: "T-SHIRT WITH TAPE DETAILS",
        price: 120,
        image: "/products/tshirt-1.jpg",
        section: "new-arrivals",
    },
    {
        id: 2,
        name: "SKINNY FIT JEANS",
        price: 180,
        image: "/products/jeans-1.jpg",
        section: "new-arrivals",
    },
    {
        id: 3,
        name: "CHECKERED SHIRT",
        price: 150,
        image: "/products/shirt-1.jpg",
        section: "new-arrivals",
    },
    {
        id: 4,
        name: "SLEEVE STRIPED T-SHIRT",
        price: 160,
        image: "/products/tshirt-2.jpg",
        section: "new-arrivals",
    },
    {
        id: 5,
        name: "VERTICAL STRIPED SHIRT",
        price: 212,
        image: "/products/shirt-2.jpg",
        section: "top-selling",
    },
    {
        id: 6,
        name: "COURAGE GRAPHIC T-SHIRT",
        price: 145,
        image: "/products/tshirt-3.jpg",
        section: "top-selling",
    },
    {
        id: 7,
        name: "LOOSE FIT BERMUDA SHORTS",
        price: 80,
        image: "/products/shorts-1.jpg",
        section: "top-selling",
    },
    {
        id: 8,
        name: "FADED SKINNY JEANS",
        price: 210,
        image: "/products/jeans-2.jpg",
        section: "top-selling",
    },
];

const DRESS_STYLES = [
    { key: "casual", label: "Casual", image: "/products/casual.jpg" },
    { key: "formal", label: "Formal", image: "/products/formal.jpg" },
    { key: "party", label: "Party", image: "/products/party.jpg" },
    { key: "gym", label: "Gym", image: "/products/gym.jpg" },
];

function Home() {
    const [products, setProducts] = useState(PRODUCTS);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((data) => {
                if (Array.isArray(data) && data.length) {
                    setProducts(data);
                }
            })
            .catch(() => setProducts(PRODUCTS));
    }, []);

    const newArrivals = products
        .filter((p) => p.section === "new-arrivals")
        .slice(0, 4);

    const topSelling = products
        .filter((p) => p.section === "top-selling")
        .slice(0, 4);

    return (
        <main className="home-page">

            {/* HERO */}
            <section className="home-hero">
                <div className="home-hero-content">
                    <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

                    <p>
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense
                        of style.
                    </p>

                    <Link to="/shop" className="home-shop-btn">
                        Shop Now
                    </Link>

                    <div className="home-stats">
                        <div className="home-stat">
                            <strong>200+</strong>
                            <span>International Brands</span>
                        </div>

                        <div className="home-stat">
                            <strong>2,000+</strong>
                            <span>High-Quality Products</span>
                        </div>

                        <div className="home-stat">
                            <strong>30,000+</strong>
                            <span>Happy Customers</span>
                        </div>
                    </div>
                </div>

                <div className="home-hero-image">
                    <img src="/hero image.jpg" alt="Fashion collection" />
                </div>
            </section>

            {/* BRANDS */}
            <section className="home-brands">
                <span className="brand-versace">VERSACE</span>
                <span className="brand-zara">ZARA</span>
                <span className="brand-gucci">GUCCI</span>
                <span className="brand-prada">PRADA</span>
                <span className="brand-calvin">Calvin Klein</span>
            </section>

            {/* NEW ARRIVALS */}
            <ProductSection title="NEW ARRIVALS" products={newArrivals} />

            {/* TOP SELLING */}
            <section className="home-products-section home-top-selling">
                <h2>TOP SELLING</h2>

                <div className="home-products-grid">
                    {topSelling.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <Link to="/shop" className="home-view-all">
                    View All
                </Link>
            </section>

            {/* DRESS STYLE */}
            <section className="home-dress-style">
                <h2>BROWSE BY DRESS STYLE</h2>

                <div className="home-style-grid">
                    <div className="home-style-row">
                        {DRESS_STYLES.slice(0, 2).map((style) => (
                            <div
                                key={style.key}
                                className={`home-style-card home-style-${style.key}`}
                            >
                                <img src={style.image} alt={style.label} />
                            </div>
                        ))}
                    </div>

                    <div className="home-style-row">
                        {DRESS_STYLES.slice(2, 4).map((style) => (
                            <div
                                key={style.key}
                                className={`home-style-card home-style-${style.key}`}
                            >
                                <img src={style.image} alt={style.label} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="home-reviews">

                <div className="home-reviews-heading">
                    <h2>OUR HAPPY CUSTOMERS</h2>

                    <div className="review-arrows">
                        ← →
                    </div>
                </div>

                <div className="home-review-grid">

                    <Review
                        name="Sarah M."
                        text="The quality of the clothes is amazing. I really loved my order!"
                    />

                    <Review
                        name="Alex K."
                        text="Great products and very fast delivery. I will definitely shop again."
                    />

                    <Review
                        name="James L."
                        text="The website is easy to use and the clothes look exactly like the pictures."
                    />

                </div>
            </section>

        </main>
    );
}

function ProductSection({ title, products }) {
    return (
        <section className="home-products-section">
            <h2>{title}</h2>

            <div className="home-products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Link to="/shop" className="home-view-all">
                View All
            </Link>
        </section>
    );
}

function Review({ name, text }) {
    return (
        <article className="home-review-card">
            <div className="review-stars">★★★★★</div>

            <h3>
                {name} <span className="verified">✓</span>
            </h3>

            <p>{text}</p>
        </article>
    );
}

export default Home;