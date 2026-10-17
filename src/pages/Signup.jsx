import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                setMessage(
                    data.message ||
                    "Signup failed"
                );
                return;
            }

            setMessage(
                "Signup successful!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error(
                "Signup error:",
                error
            );

            setMessage(
                "Server connection failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >
                <h1>Create Account</h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                {/* PASSWORD FIELD */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
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

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Sign Up"}
                </button>

                {message && (
                    <p
                        style={{
                            color: message.includes(
                                "successful"
                            )
                                ? "green"
                                : "crimson",
                        }}
                    >
                        {message}
                    </p>
                )}

                <p>
                    Already have an account?{" "}
                    <span
                        className="auth-link"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </span>
                </p>
            </form>
        </main>
    );
}

export default Signup;