import React from "react";

const MyEvents = () => {

    const events = [
        {
            id: "1",
            title: "Photography Workshop",
            clubName: "Photography Club",
            date: "2025-12-15 10:00",
            status: "registered",
        },
        {
            id: "2",
            title: "Chess Tournament",
            clubName: "Chess Club",
            date: "2025-12-20 14:00",
            status: "cancelled",
        },
    ];

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
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.clubName}</td>
                                <td>{event.date}</td>
                                <td>
                                    <span
                                        className={`badge ${event.status === "registered"
                                            ? "badge-success"
                                            : event.status === "cancelled"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
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
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;
