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
    
    return (
        <div className="p-6  max-w-6xl mx-auto">
            <h1 className="text-3xl text-primary font-bold mb-6">Payment History</h1>

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