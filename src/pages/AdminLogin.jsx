import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/admin-auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Admin login failed");
                return;
            }

            localStorage.setItem(
                "adminAuth",
                JSON.stringify(data)
            );

            navigate("/admin");
        } catch (error) {
            console.error(error);
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    SHOP.CO
                </div>

                <p className="admin-eyebrow">
                    STORE MANAGEMENT
                </p>

                <h1>Admin Login</h1>

                <p className="admin-login-subtitle">
                    Sign in to manage your store.
                </p>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Admin email"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Admin password"
                        required
                    />

                    {error && (
                        <p className="admin-login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-black-btn admin-login-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Admin Login"}
                    </button>
                </form>

                <button
                    className="admin-back-store"
                    onClick={() => navigate("/")}
                >
                    ← Back to Store
                </button>
            </div>
        </main>
    );
}

export default AdminLogin;