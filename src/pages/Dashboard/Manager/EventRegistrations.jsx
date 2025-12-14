import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

export default function EventRegistrations() {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    const { data: registrations = [] } = useQuery({
        queryKey: ['registrations', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/my-clubs/event-registrations?email=${user.email}`)
            return res.data
        }
    })


    // Sample registration data
    // const registrations = [
    //     {
    //         id: "1",
    //         userEmail: "alice@example.com",
    //         status: "registered",
    //         registeredAt: "2025-12-01 10:15",
    //     },
    //     {
    //         id: "2",
    //         userEmail: "bob@example.com",
    //         status: "cancelled",
    //         registeredAt: "2025-12-02 14:30",
    //     },
    //     {
    //         id: "3",
    //         userEmail: "charlie@example.com",
    //         status: "registered",
    //         registeredAt: "2025-12-03 09:45",
    //     },
    // ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Event Registrations</h1>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>User Email</th>
                            <th>Status</th>
                            <th>Registered At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {registrations.map((reg) => (
                            <tr key={reg._id}>
                                <td>{reg.userEmail}</td>
                                <td>
                                    <span
                                        className={`badge ${reg.status === "registered" ? "badge-success" : "badge-error"
                                            }`}
                                    >
                                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                                    </span>
                                </td>
                                <td>{reg.registeredAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
