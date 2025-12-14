import { useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "./shared/Loader";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ClubEvents = ({ clubId }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch club events
    const { data: events = [], isLoading } = useQuery({
        queryKey: ["clubEvents", clubId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/${clubId}/events`);
            return res.data;
        },
    });


    const { data: registrations = [], } = useQuery({
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
        <div className="mt-10 grid md:grid-cols-2 gap-6">
            {events.map(event => {
                const registration = registrations.find(r => r.eventId === event._id);
                const isRegistered = registration?.status === "registered";
                return (
                    <div key={event._id} className="card bg-base-100 shadow-md p-5">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="text-sm text-gray-500">{new Date(event.eventDate).toLocaleDateString()}</p>
                        <p className="mt-2">{event.description}</p>

                        {isRegistered ? (
                            <button
                                onClick={() => handleCancel(event)}
                                className="btn btn-warning mt-4"
                            >
                                Cancel Registration
                            </button>
                        ) : event.isPaid ? (
                            <button
                                onClick={() => handleRegister(event)}
                                className="btn btn-primary mt-4"
                            >
                                Join Event – ${event.eventFee}
                            </button>
                        ) : (
                            <button
                                onClick={() => handleRegister(event)}
                                className="btn btn-success mt-4"
                            >
                                Free Event – Register
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ClubEvents;
