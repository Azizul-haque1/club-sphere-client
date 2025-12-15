import { useQuery } from "@tanstack/react-query";

import Loader from "./shared/Loader";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ClubEvents = ({ clubId }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    // Fetch club events
    const { data: events = [], isLoading } = useQuery({
        queryKey: ["clubEvents", clubId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/${clubId}/events`);
            return res.data;
        },
    });


    const { data: registrations = [], refetch } = useQuery({
        queryKey: ["myRegistrations"],
        queryFn: async () => {
            if (!user) return [];
            const res = await axiosSecure.get("/events/registrations");
            return res.data;
        },
        enabled: !!user,
    });

    const handleRegister = async (event) => {
        const e = {
            clubId: event.clubId,
            isPaid: event.isPaid,
            paymentId: event.isPaid ? "stripe_payment_id_here" : null
        }

        axiosSecure.post(`/events/${event._id}/register`, e)
            .then(res => {
                console.log(res.data);
                refetch()

            })
            .catch(err => console.log(err))
    };


    const handleCancel = async (event) => {
        axiosSecure.patch(`/events/${event._id}/cancel`)
            .then(res => {
                console.log(res.data);
            }
            )
            .catch(err => console.log(err))

    };

    if (isLoading) return <Loader />;

    if (!events.length) {
        return <p className="text-gray-500 mt-6">No events available</p>;
    }

    return (
        <div className="">

            {/* Section Heading */}
            <div className="mt-6 mb-8">
                <h2 className="text-3xl font-bold text-base-content">
                    Club Events                </h2>
                <p className="text-gray-500 mt-1">
                    Explore events and manage your registrations
                </p>
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {events.map(event => {
                    const registration = registrations.find(
                        r => r.eventId === event._id
                    );
                    const isRegistered = registration?.status === "registered";

                    return (
                        <div
                            key={event._id}
                            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200"
                        >
                            <div className="card-body p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            📅 {new Date(event.eventDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {isRegistered && (
                                        <span className="badge badge-success badge-outline">
                                            Registered
                                        </span>
                                    )}
                                </div>

                                <p className="mt-3 text-gray-600 leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="mt-6">
                                    {isRegistered ? (
                                        <button
                                            onClick={() => handleCancel(event)}
                                            className="btn btn-warning btn-outline w-full"
                                        >
                                            Cancel Registration
                                        </button>
                                    ) : event.isPaid ? (
                                        <button
                                            onClick={() => handleRegister(event)}
                                            className="btn btn-primary w-full"
                                        >
                                            Join Event – ${event.eventFee}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRegister(event)}
                                            className="btn btn-success w-full"
                                        >
                                            Free Event – Register
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ClubEvents;
