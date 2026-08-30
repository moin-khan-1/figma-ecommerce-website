import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            navigate(`/shop?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="menu-icon">☰</div>

                <Link to="/" className="logo">
                    SHOP.CO
                </Link>
            </div>

            <nav className="nav-links">
                <Link to="/shop">Shop</Link>
                <a href="/">On Sale</a>
                <a href="/#new-arrivals">New Arrivals</a>
                <a href="/">Brands</a>
            </nav>

            <div className="navbar-right">

                <form
                    className="search-box"
                    onSubmit={handleSearch}
                >
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                <Link
                    to="/cart"
                    className="icon-button"
                >
                    🛒
                </Link>

                <Link
                    to="/login"
                    className="icon-button"
                >
                    👤
                </Link>

            </div>
        </header>
    );
}

export default Navbar;