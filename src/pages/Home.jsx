import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    }, []);

    return (

        <main>
            <section className="hero">
                <div className="hero-content">
                    <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

                    <p>
                        Browse through our diverse range of meticulously crafted
                        garments, designed to bring out your individuality and cater to
                        your sense of style.
                    </p>

                    <Link to="/shop" className="shop-button">
                        Shop Now
                    </Link>

                    <div className="stats">
                        <div>
                            <h3>200+</h3>
                            <p>International Brands</p>
                        </div>

                        <div>
                            <h3>2,000+</h3>
                            <p>High-Quality Products</p>
                        </div>

                        <div>
                            <h3>30,000+</h3>
                            <p>Happy Customers</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="/hero image.jpg"
                        alt="Fashion collection"
                    />
                </div>
            </section>
            <section className="brands">
                <h2>VERSACE</h2>
                <h2>ZARA</h2>
                <h2>GUCCI</h2>
                <h2>PRADA</h2>
                <h2>Calvin Klein</h2>
            </section>

            <section id="new-arrivals" className="products-section">
                <h2>NEW ARRIVALS</h2>

                <div className="products">
                    {products
                        .filter((product) => product.section === "new-arrivals")
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                <button className="view-button">View All</button>
            </section>
            <section className="products-section">
                <h2>TOP SELLING</h2>

                <div className="products">
                    {products
                        .filter((product) => product.section === "top-selling")
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                <button className="view-button">View All</button>
            </section>
            <section className="dress-style">
                <h2>BROWSE BY DRESS STYLE</h2>

                <div className="style-grid">

                    <div className="style-card casual">
                        <img
                            src="http://localhost:5000/products/casual.jpg"
                            alt="Casual"
                        />
                    </div>

                    <div className="style-card formal">
                        <img
                            src="http://localhost:5000/products/formal.jpg"
                            alt="Formal"
                        />
                    </div>

                    <div className="style-card party">
                        <img
                            src="http://localhost:5000/products/party.jpg"
                            alt="Party"
                        />
                    </div>

                    <div className="style-card gym">
                        <img
                            src="http://localhost:5000/products/gym.jpg"
                            alt="Gym"
                        />
                    </div>

                </div>
            </section>
            <section className="reviews-section">
                <h2>OUR HAPPY CUSTOMERS</h2>

                <div className="reviews">
                    <div className="review-card">
                        <h3>Sarah M.</h3>
                        <p>
                            "The quality of the clothes is amazing. I really loved my order!"
                        </p>
                    </div>

                    <div className="review-card">
                        <h3>Alex K.</h3>
                        <p>
                            "Great products and very fast delivery. I will definitely shop again."
                        </p>
                    </div>

                    <div className="review-card">
                        <h3>James L.</h3>
                        <p>
                            "The website is easy to use and the clothes look exactly like the
                            pictures."
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;