import { Link } from "react-router-dom";

function SearchIcon() {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M16.5 16.5L21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M4 21C4.8 16.8 7.5 14.5 12 14.5C16.5 14.5 19.2 16.8 20 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 4H5L7.2 15.2C7.4 16.2 8.3 17 9.4 17H17.5C18.5 17 19.4 16.3 19.7 15.3L21 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx="9"
                cy="21"
                r="1.3"
                fill="currentColor"
            />

            <circle
                cx="18"
                cy="21"
                r="1.3"
                fill="currentColor"
            />
        </svg>
    );
}

function Navbar() {
    return (
        <header className="shop-navbar">

            <div className="shop-navbar-inner">

                {/* MOBILE MENU */}
                <button className="shop-mobile-menu">
                    ☰
                </button>


                {/* LOGO */}
                <Link
                    to="/"
                    className="shop-logo"
                >
                    SHOP.CO
                </Link>


                {/* NAV LINKS */}
                <nav className="shop-nav-links">

                    <Link to="/shop">
                        Shop
                    </Link>

                    <Link to="/shop">
                        On Sale
                    </Link>

                    <Link to="/shop">
                        New Arrivals
                    </Link>

                    <Link to="/shop">
                        Brands
                    </Link>

                </nav>


                {/* RIGHT SIDE */}
                <div className="shop-navbar-right">

                    <div className="shop-search">

                        <SearchIcon />

                        <input
                            type="text"
                            placeholder="Search for products..."
                        />

                    </div>


                    <Link
                        to="/login"
                        className="shop-nav-icon"
                    >
                        <UserIcon />
                    </Link>


                    <Link
                        to="/cart"
                        className="shop-nav-icon"
                    >
                        <CartIcon />
                    </Link>

                </div>

            </div>

        </header>
    );
}

export default Navbar;