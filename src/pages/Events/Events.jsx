import { Link } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";


const events = [
    {
        _id: "665f01a1b7a1f001a1110001",
        title: "Photography Workshop",
        description:
            "Learn professional photography techniques with hands-on practice.",
        eventDate: "2025-12-20",
        location: "Studio Room A",
        isPaid: true,
        eventFee: 25,
        clubName: "Creative Lens Club",
    },
    {
        _id: "665f01a1b7a1f001a1110002",
        title: "Weekend Hiking Meetup",
        description:
            "Join us for a refreshing hiking trip to the mountains.",
        eventDate: "2025-12-28",
        location: "Blue Mountain Trail",
        isPaid: false,
        eventFee: 0,
        clubName: "Adventure Seekers Club",
    },
    {
        _id: "665f01a1b7a1f001a1110003",
        title: "Tech Talk: AI & Future",
        description:
            "Discussion on AI trends and future career opportunities.",
        eventDate: "2026-01-05",
        location: "Auditorium Hall",
        isPaid: true,
        eventFee: 15,
        clubName: "Tech Innovators Club",
    },
];

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
            <h1 className="text-3xl font-bold mb-8 text-center">
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
