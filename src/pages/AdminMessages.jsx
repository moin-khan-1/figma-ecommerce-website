import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminMessages({ headers }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const loadMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/messages`, {
                headers,
            });
            const data = await response.json();
            if (response.ok) setMessages(data);
        } catch (error) {
            setMessage("Could not load messages.");
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/messages/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ status }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Could not update message.");
                return;
            }

            loadMessages();
        } catch (error) {
            setMessage("Server connection failed.");
        }
    };

    return (
        <section className="admin-page-section">
            <div className="admin-page-heading">
                <div>
                    <p className="admin-eyebrow">CUSTOMER SUPPORT</p>
                    <h1>Messages</h1>
                    <p>Read customer messages and contact requests.</p>
                </div>
                <button className="admin-outline-btn" onClick={loadMessages}>
                    Refresh
                </button>
            </div>

            {message && <div className="admin-message">{message}</div>}

            <div className="admin-message-grid">
                {messages.map((item) => (
                    <article className="admin-message-card" key={item.id}>
                        <div className="admin-message-card-top">
                            <div>
                                <h3>{item.name}</h3>
                                <a href={`mailto:${item.email}`}>{item.email}</a>
                            </div>
                            <select
                                value={item.status}
                                onChange={(e) => updateStatus(item.id, e.target.value)}
                            >
                                <option>New</option>
                                <option>Read</option>
                                <option>Replied</option>
                            </select>
                        </div>
                        <p>{item.message}</p>
                        <small>{new Date(item.createdAt).toLocaleString()}</small>
                    </article>
                ))}

                {!messages.length && (
                    <div className="admin-panel admin-empty">No messages found.</div>
                )}
            </div>
        </section>
    );
}

export default AdminMessages;
