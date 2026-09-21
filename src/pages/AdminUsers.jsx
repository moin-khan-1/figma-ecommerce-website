import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminUsers({ headers }) {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const loadUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users`, {
                headers,
            });
            const data = await response.json();
            if (response.ok) setUsers(data);
        } catch (error) {
            setMessage("Could not load customers.");
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <section className="admin-page-section">
            <div className="admin-page-heading">
                <div>
                    <p className="admin-eyebrow">CUSTOMERS</p>
                    <h1>Customers</h1>
                    <p>View registered customer accounts.</p>
                </div>
                <button className="admin-outline-btn" onClick={loadUsers}>
                    Refresh
                </button>
            </div>

            {message && <div className="admin-message">{message}</div>}

            <div className="admin-panel">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Customer ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td><strong>{user.name}</strong></td>
                                    <td>{user.email}</td>
                                    <td>#{String(user.id).slice(-8)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!users.length && (
                        <div className="admin-empty">No customers found.</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminUsers;
