import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEvents = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: events = [] } = useQuery({
        queryKey: ['my-events'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-events')
            return res.data
        },
        enabled: !!user,
    })


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Events</h1>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Event Title</th>
                            <th>Club</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events?.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.clubName}</td>
                                <td>{
                                    new Date(event.date).toLocaleDateString()
                                }</td>
                                <td>
                                    <span
                                        className={`badge ${event.status === "registered"
                                            ? "badge-success"
                                            : event.status === "cancelled"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {event.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {events.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center text-gray-500 py-4">
                                    You have not registered for any events.
                                </td>
                            </tr>
                        )



                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;
