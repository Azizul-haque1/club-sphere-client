import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";

const ViewPayments = () => {

    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure('/all-paymentns/view')
            return res.data
        }
    })

    if (isLoading) {
        return <Loader />
    }
    // console.log('payments ', data);
    const typeBadge = (type) => {
        const classes = {
            membership: "badge badge-primary",
            Event: "badge badge-secondary"
        };
        return classes[type] || "badge";
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-4">View Payments</h1>

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
                                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPayments;
