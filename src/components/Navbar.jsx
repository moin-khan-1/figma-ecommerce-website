function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="menu-icon">☰</div>

                <a href="/" className="logo">
                    SHOP.CO
                </a>
            </div>

            <nav className="nav-links">
                <a href="/">Shop</a>
                <a href="/">On Sale</a>
                <a href="/">New Arrivals</a>
                <a href="/">Brands</a>
            </nav>

            <div className="navbar-right">
                <div className="search-box">
                    <span>⌕</span>
                    <input type="text" placeholder="Search for products..." />
                </div>

                <button className="icon-button">🛒</button>
                <button className="icon-button">👤</button>
            </div>
        </header>
    );
}

export default Navbar;