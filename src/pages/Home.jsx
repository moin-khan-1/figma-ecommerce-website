import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    }, []);

    const newArrivals = products.filter(
        (product) => product.section === "new-arrivals"
    );

    const topSelling = products.filter(
        (product) => product.section === "top-selling"
    );

    return (
        <main className="home-page">

            {/* HERO */}
            <section className="home-hero">
                <div className="home-hero-content">

                    <h1>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    <p>
                        Browse through our diverse range of meticulously crafted
                        garments, designed to bring out your individuality and
                        cater to your sense of style.
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
                    <img
                        src="/hero image.jpg"
                        alt="Fashion collection"
                    />
                </div>
            </section>


            {/* BRANDS */}
            <section className="home-brands">

                <span className="brand-versace">VERSACE</span>

                <span className="brand-zara">ZARA</span>

                <span className="brand-gucci">GUCCI</span>

                <span className="brand-prada">PRADA</span>

                <span className="brand-calvin">
                    Calvin Klein
                </span>

            </section>


            {/* NEW ARRIVALS */}
            <section className="home-products-section">

                <h2>NEW ARRIVALS</h2>

                <div className="home-products-grid">
                    {newArrivals.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

                <Link
                    to="/shop"
                    className="home-view-all"
                >
                    View All
                </Link>

            </section>


            {/* TOP SELLING */}
            <section className="home-products-section home-top-selling">

                <h2>TOP SELLING</h2>

                <div className="home-products-grid">
                    {topSelling.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

                <Link
                    to="/shop"
                    className="home-view-all"
                >
                    View All
                </Link>

            </section>


            {/* DRESS STYLE */}
            <section className="home-dress-style">

                <h2>BROWSE BY DRESS STYLE</h2>

                <div className="home-style-grid">

                    <div className="home-style-card home-style-casual">
                        <img
                            src={`${API_URL}/products/casual.jpg`}
                            alt="Casual"
                        />
                    </div>

                    <div className="home-style-card home-style-formal">
                        <img
                            src={`${API_URL}/products/formal.jpg`}
                            alt="Formal"
                        />
                    </div>

                    <div className="home-style-card home-style-party">
                        <img
                            src={`${API_URL}/products/party.jpg`}
                            alt="Party"
                        />
                    </div>

                    <div className="home-style-card home-style-gym">
                        <img
                            src={`${API_URL}/products/gym.jpg`}
                            alt="Gym"
                        />
                    </div>

                </div>

            </section>


            {/* REVIEWS */}
            <section className="home-reviews">

                <h2>OUR HAPPY CUSTOMERS</h2>

                <div className="home-review-grid">

                    <div className="home-review-card">
                        <div className="review-stars">
                            ★★★★★
                        </div>

                        <h3>Sarah M.</h3>

                        <p>
                            "The quality of the clothes is amazing.
                            I really loved my order!"
                        </p>
                    </div>


                    <div className="home-review-card">
                        <div className="review-stars">
                            ★★★★★
                        </div>

                        <h3>Alex K.</h3>

                        <p>
                            "Great products and very fast delivery.
                            I will definitely shop again."
                        </p>
                    </div>


                    <div className="home-review-card">
                        <div className="review-stars">
                            ★★★★★
                        </div>

                        <h3>James L.</h3>

                        <p>
                            "The website is easy to use and the clothes
                            look exactly like the pictures."
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;