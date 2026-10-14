import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch {
            return null;
        }
    });

    const [showProfile, setShowProfile] = useState(false);


    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("shopco-theme") === "dark"
    );

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);

        localStorage.setItem(
            "shopco-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);


    const profileRef = useRef(null);

    useEffect(() => {
        const updateUser = () => {
            try {
                const savedUser =
                    localStorage.getItem("user");

                setUser(
                    savedUser
                        ? JSON.parse(savedUser)
                        : null
                );
            } catch {
                setUser(null);
            }
        };

        // Login event from Login.jsx
        window.addEventListener(
            "userLogin",
            updateUser
        );

        // Logout/storage changes
        window.addEventListener(
            "storage",
            updateUser
        );

        return () => {
            window.removeEventListener(
                "userLogin",
                updateUser
            );

            window.removeEventListener(
                "storage",
                updateUser
            );
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");

        setUser(null);
        setShowProfile(false);

        window.dispatchEvent(
            new Event("userLogout")
        );

        navigate("/");
    };

    return (
        <header className="shop-navbar">
            <div className="shop-navbar-inner">

                {/* MOBILE MENU */}
                <button
                    className="shop-mobile-menu"
                    type="button"
                >
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

                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={() => setDarkMode((previous) => !previous)}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        title={darkMode ? "Light mode" : "Dark mode"}
                    >
                        {darkMode ? (
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2 M12 20v2 M4.93 4.93l1.42 1.42 M17.65 17.65l1.42 1.42 M2 12h2 M20 12h2 M4.93 19.07l1.42-1.42 M17.65 6.35l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
                            </svg>
                        )}
                    </button>

                    <div className="shop-search">
                        <SearchIcon />

                        <input
                            type="text"
                            placeholder="Search for products..."
                        />
                    </div>

                    {/* USER / PROFILE */}
                    <div
                        ref={profileRef}
                        style={{
                            position: "relative",
                        }}
                    >
                        <button
                            type="button"
                            className="shop-nav-icon"
                            onClick={() =>
                                setShowProfile(
                                    !showProfile
                                )
                            }
                            aria-label="Account"
                            style={{
                                border: "none",
                                background: "transparent",
                                padding: 0,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <UserIcon />
                        </button>

                        {showProfile && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "42px",
                                    right: 0,
                                    width: "240px",
                                    background: "#fff",
                                    border: "1px solid #e5e5e5",
                                    borderRadius: "14px",
                                    boxShadow:
                                        "0 12px 35px rgba(0,0,0,0.14)",
                                    padding: "16px",
                                    zIndex: 9999,
                                }}
                            >
                                {user ? (
                                    <>
                                        {/* USER INFO */}
                                        <div
                                            style={{
                                                paddingBottom: "12px",
                                                borderBottom:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            <strong
                                                style={{
                                                    display:
                                                        "block",
                                                    fontSize:
                                                        "16px",
                                                    marginBottom:
                                                        "5px",
                                                }}
                                            >
                                                {user.name}
                                            </strong>

                                            <span
                                                style={{
                                                    display:
                                                        "block",
                                                    fontSize:
                                                        "13px",
                                                    color: "#666",
                                                    wordBreak:
                                                        "break-word",
                                                }}
                                            >
                                                {user.email}
                                            </span>
                                        </div>

                                        {/* MY PROFILE */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowProfile(
                                                    false
                                                );

                                                navigate(
                                                    "/"
                                                );
                                            }}
                                            style={{
                                                width: "100%",
                                                textAlign:
                                                    "left",
                                                padding:
                                                    "12px 4px",
                                                border: "none",
                                                background:
                                                    "transparent",
                                                cursor: "pointer",
                                                fontSize:
                                                    "14px",
                                            }}
                                        >
                                            My Profile
                                        </button>

                                        {/* MY ORDERS */}
                                        <Link
                                            to="/orders"
                                            onClick={() =>
                                                setShowProfile(
                                                    false
                                                )
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                padding:
                                                    "12px 4px",
                                                color: "#111",
                                                textDecoration:
                                                    "none",
                                                fontSize:
                                                    "14px",
                                                borderTop:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            My Orders
                                        </Link>

                                        {/* ADMIN LOGIN */}
                                        <Link
                                            to="/admin/login"
                                            onClick={() =>
                                                setShowProfile(
                                                    false
                                                )
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                padding:
                                                    "12px 4px",
                                                color: "#111",
                                                textDecoration:
                                                    "none",
                                                fontSize:
                                                    "14px",
                                                borderTop:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            Admin Login
                                        </Link>

                                        {/* LOGOUT */}
                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            style={{
                                                width: "100%",
                                                textAlign:
                                                    "left",
                                                padding:
                                                    "12px 4px",
                                                border: "none",
                                                background:
                                                    "transparent",
                                                cursor: "pointer",
                                                fontSize:
                                                    "14px",
                                                color:
                                                    "#d11a2a",
                                                borderTop:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* WELCOME */}
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                marginBottom:
                                                    "10px",
                                            }}
                                        >
                                            Welcome to SHOP.CO
                                        </div>

                                        {/* LOGIN */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowProfile(
                                                    false
                                                );

                                                navigate(
                                                    "/login"
                                                );
                                            }}
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                background:
                                                    "#000",
                                                color: "#fff",
                                                borderRadius:
                                                    "8px",
                                                padding:
                                                    "11px",
                                                cursor:
                                                    "pointer",
                                                fontWeight:
                                                    600,
                                            }}
                                        >
                                            Login
                                        </button>

                                        {/* CREATE ACCOUNT */}
                                        <Link
                                            to="/signup"
                                            onClick={() =>
                                                setShowProfile(
                                                    false
                                                )
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                textAlign:
                                                    "center",
                                                marginTop:
                                                    "10px",
                                                color: "#111",
                                                fontSize:
                                                    "14px",
                                            }}
                                        >
                                            Create Account
                                        </Link>

                                        {/* ADMIN LOGIN */}
                                        <Link
                                            to="/admin/login"
                                            onClick={() =>
                                                setShowProfile(
                                                    false
                                                )
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                marginTop:
                                                    "12px",
                                                paddingTop:
                                                    "12px",
                                                borderTop:
                                                    "1px solid #eee",
                                                color: "#666",
                                                textDecoration:
                                                    "none",
                                                fontSize:
                                                    "13px",
                                                textAlign:
                                                    "center",
                                            }}
                                        >
                                            Admin Login
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* CART */}
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