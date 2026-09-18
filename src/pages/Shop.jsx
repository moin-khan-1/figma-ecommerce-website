import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sort, setSort] = useState("popular");

    const [searchParams] = useSearchParams();
    const urlSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(urlSearch);

    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        );
    };

    let filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (sort === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
        filteredProducts.sort((a, b) => b.id - a.id);
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

                        {["T-Shirts", "Shirts", "Jeans", "Shorts"].map(
                            (category) => (
                                <label key={category}>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                    />
                                    {category}
                                </label>
                            )
                        )}
                    </div>
                </aside>

                <section className="shop-products">
                    <div className="shop-top">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="newest">Newest</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="products">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Shop;