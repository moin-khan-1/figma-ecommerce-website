import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

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
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Admin login failed"
                );
                return;
            }

            localStorage.setItem(
                "adminAuth",
                JSON.stringify(data)
            );

            navigate("/admin");
        } catch (error) {
            console.error(
                "Admin login error:",
                error
            );

            setError(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    SHOPPING.CO
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
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        placeholder="Admin email"
                        required
                    />

                    <label>Password</label>

                    {/* PASSWORD FIELD */}

                    <div className="admin-password-wrapper">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Admin password"
                            required
                            style={{
                                width: "100%",
                                boxSizing:
                                    "border-box",
                                paddingRight:
                                    "55px",
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "36px",
                                height: "36px",
                                minWidth: "36px",
                                padding: 0,
                                margin: 0,
                                border: "none",
                                borderRadius: "8px",
                                background: "transparent",
                                color: "#777",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2,
                            }}
                        >
                            {showPassword ? (
                                <EyeOff size={19} strokeWidth={1.8} />
                            ) : (
                                <Eye size={19} strokeWidth={1.8} />
                            )}
                        </button>
                    </div>

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
                        {loading
                            ? "Signing in..."
                            : "Admin Login"}
                    </button>
                </form>

                <button
                    type="button"
                    className="admin-back-store"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Back to Store
                </button>
            </div>
        </main>
    );
}

export default AdminLogin;