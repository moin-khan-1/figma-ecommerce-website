
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sort, setSort] = useState("popular");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const urlSearch = searchParams.get("search") || "";
    const [search, setSearch] = useState(urlSearch);

    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/products`
                );

                if (!response.ok) {
                    throw new Error(
                        `Products request failed (${response.status})`
                    );
                }

                const data = await response.json();

                // Support common API response formats.
                const productList = Array.isArray(data)
                    ? data
                    : Array.isArray(data.products)
                        ? data.products
                        : Array.isArray(data.data)
                            ? data.data
                            : Array.isArray(data.data?.products)
                                ? data.data.products
                                : null;

                if (!productList) {
                    console.error(
                        "Unexpected products API response:",
                        data
                    );

                    throw new Error(
                        "Products data format is unexpected. Please check the API response."
                    );
                }

                if (!cancelled) {
                    setProducts(productList);
                }
            } catch (err) {
                console.error("Failed to load products:", err);

                if (!cancelled) {
                    setError(
                        err.message ||
                        "Unable to load products. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        );
    };

    const normalizedSearch = search.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const productName = String(product.name || "").toLowerCase();

        const matchesSearch =
            productName.includes(normalizedSearch);

        return matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts];

    if (sort === "low") {
        sortedProducts.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    }

    if (sort === "high") {
        sortedProducts.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
    }

    if (sort === "newest") {
        sortedProducts.sort(
            (a, b) => Number(b.id) - Number(a.id)
        );
    }

    return (
        <main className="shop-page">
            <div className="shop-header">
                <h1>Shop</h1>
                <p>Explore our latest collection</p>
            </div>

            <div className="shop-content">
                <aside className="filters">
                    <h2>Filters</h2>

                    <div className="filter-group">
                        <h3>Categories</h3>

                        {[
                            "T-Shirts",
                            "Shirts",
                            "Jeans",
                            "Shorts",
                        ].map((category) => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        category
                                    )}
                                    onChange={() =>
                                        handleCategoryChange(category)
                                    }
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </aside>

                <section className="shop-products">
                    <div className="shop-top">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                        >
                            <option value="popular">
                                Most Popular
                            </option>
                            <option value="newest">
                                Newest
                            </option>
                            <option value="low">
                                Price: Low to High
                            </option>
                            <option value="high">
                                Price: High to Low
                            </option>
                        </select>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <div role="alert">
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <div className="products">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Shop;
