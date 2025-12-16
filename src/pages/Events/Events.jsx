import { Link } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";



const Events = () => {
    const axiosInstance = useAxios()
    const { data: events = [] } = useQuery({
        queryKey: ['upcoming', 'events'],
        queryFn: async () => {
            const res = await axiosInstance.get('/upcoming/events')
            return res.data
        }
    })

    // console.log(data);

    if (!events.length) {
        return (
            <p className="text-center mt-10 text-gray-500">
                No upcoming events
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl text-primary font-bold mb-8 text-center">
                Upcoming Events
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Link
                        to={`/events/event-details/${event._id}`}
                        key={event._id}
                        className="group drop-shadow-xl rounded-xl   bg-white shadow-sm hover:shadow-xl transition overflow-hidden"
                    >
                        <div className="p-5">
                            {/* Title */}
                            <h3 className="text-lg font-semibold group-hover:text-primary transition">
                                {event.title}
                            </h3>

                            {/* Club */}
                            <p className="text-sm text-gray-500 mt-1">
                                {event.clubName}
                            </p>

                            {/* Date & Location */}
                            <div className="mt-3 text-sm text-gray-600 space-y-1">
                                <p>📅 {new Date(event.eventDate).toDateString()}</p>
                                <p>📍 {event.location}</p>
                            </div>

                            {/* Description */}
                            <p className="mt-3 text-gray-700 text-sm line-clamp-2">
                                {event.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-5 flex items-center justify-between">
                                {event.isPaid ? (
                                    <span className="badge badge-warning">
                                        Paid · ${event.eventFee}
                                    </span>
                                ) : (
                                    <span className="badge badge-success">Free</span>
                                )}

                                <span className="text-sm text-primary font-medium">
                                    View Details →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Events;
