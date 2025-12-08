import React from 'react';

const ManageUsers = () => {
    const users = [
        { name: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2025-01-03" },
        { name: "Sarah Smith", email: "sarah@example.com", role: "User", createdAt: "2025-02-10" },
        { name: "Mike Johnson", email: "mike@example.com", role: "Moderator", createdAt: "2025-03-15" }
    ];


    return (
        <div>
            <h2>user {users.length}</h2>

            <div className="">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;