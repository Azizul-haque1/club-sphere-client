import React from "react";

const ViewPayments = () => {
    // Sample static payment data
    const payments = [
        {
            userEmail: "john@example.com",
            amount: 50,
            type: "Membership",
            clubName: "Chess Club",
            date: "2025-12-01"
        },
        {
            userEmail: "alice@example.com",
            amount: 20,
            type: "Event",
            clubName: "Book Club",
            date: "2025-12-02"
        },
        {
            userEmail: "bob@example.com",
            amount: 75,
            type: "Membership",
            clubName: "Fitness Club",
            date: "2025-12-03"
        }
    ];

    // Badge color based on type
    const typeBadge = (type) => {
        const classes = {
            Membership: "badge badge-primary",
            Event: "badge badge-secondary"
        };
        return classes[type] || "badge";
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">View Payments</h1>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300">
                    {/* Table head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>User Email</th>
                            <th>Amount ($)</th>
                            <th>Type</th>
                            <th>Club Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    {/* Table body */}
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.userEmail}</td>
                                <td>${payment.amount}</td>
                                <td>
                                    <span className={typeBadge(payment.type)}>
                                        {payment.type}
                                    </span>
                                </td>
                                <td>{payment.clubName}</td>
                                <td>{payment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPayments;
