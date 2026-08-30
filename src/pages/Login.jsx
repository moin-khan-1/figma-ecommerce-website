import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    return (
        <main className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                {message && <p>{message}</p>}

                <p>
                    Don't have an account?{" "}
                    <span
                        className="auth-link"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </main>
    );
}

export default Login;