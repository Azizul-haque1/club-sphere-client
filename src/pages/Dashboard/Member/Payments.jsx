import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payments = () => {
    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['my-paymentns"'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-paymentns')
            return res.data
        }
    })
    // console.log(data);
    // const payments = [
    //     {
    //         id: "1",
    //         amount: 40,
    //         type: "Membership",
    //         clubName: "Photography Club",
    //         date: "2025-12-01",
    //         status: "completed",
    //     },
    //     {
    //         id: "2",
    //         amount: 30,
    //         type: "Membership",
    //         clubName: "Chess Club",
    //         date: "2025-11-15",
    //         status: "failed",
    //     },
    //     {
    //         id: "3",
    //         amount: 20,
    //         type: "Event",
    //         clubName: "Chess Club",
    //         date: "2025-12-05",
    //         status: "completed",
    //     },
    // ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Payment History</h1>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Club Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.clubName}</td>
                                <td>{payment.type}</td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>{payment.date}</td>
                                <td>
                                    <span
                                        className={`badge ${payment.status === "completed"
                                            ? "badge-success"
                                            : payment.status === "failed"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {payments.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-500 py-4">
                                    No payment history available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;