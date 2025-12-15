import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const EventDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [isMember, setIsMember] = useState(false);
    const [club, setclub] = useState({})

    // Fetch event details
    const { data: event, isLoading, isError, refetch } = useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/events/${id}`);
            return res.data;
        },
        enabled: !!user,
    });
    console.log('club ifo', club);

    const { data: registration = {}, isLoading: regiLoading, } = useQuery({
        queryKey: ["myRegistration"],
        queryFn: async () => {
            if (!user) return [];
            const res = await axiosSecure.get(`/events/${event._id}/registration`);
            return res.data;
        },
        enabled: !!user,
    });

    console.log('reg', registration);
    console.log('ev', event);

    // Fetch membership status if event data loaded
    const { data: membershipInfo = { status: '' }, isLoading: membershipLoading, } =
        useQuery({
            queryKey: ['membershipStatus', event?.clubId, user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/clubs/${event.clubId}/membership-status`);
                if (res.data.status === 'active') {
                    return setIsMember(res.data.status)
                } else {
                    setIsMember('')
                }

            },
            enabled: !!user,
        });
    console.log(event);
    console.log('membershipInfo', membershipInfo);

    if (isLoading || membershipLoading || regiLoading) return <Loader />;

    if (isError || !event) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Event not found
            </p>
        );
    }



    const handleJoinClub = (clubId) => {

        axiosSecure(`/clubs/${clubId}/details`)
            .then(res => {
                console.log(res.data);
                setclub(res.data)
            })
            .catch(err => console.log(err))

        const clubInfo = {
            _id: club._id,
            name: user.displayName,
            clubName: club.clubName,
            membershipFee: club.membershipFee,
            email: user.email,
        }

        console.log(clubInfo);
        axiosSecure.post(`/payment-checkout-session`, clubInfo)
            .then(res => {
                console.log(res.data.url);
                window.location.assign(res.data.url)
            })
            .catch(err => console.error('error', err)
            )

    }


    const handleRegister = async (event) => {
        const e = {
            clubId: event.clubId,
            isPaid: event.isPaid,
            paymentId: event.isPaid ? "stripe_payment_id_here" : null
        }
        console.log('event', e);

        axiosSecure.post(`/events/${event._id}/register`, e)
            .then(res => {
                console.log(res.data);
                refetch()

            })
            .catch(err => console.log(err))
    };



    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8">

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {event.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-6">
                    <span>📅 {new Date(event.eventDate).toDateString()}</span>
                    <span>📍 {event.location}</span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed mb-8">
                    {event.description}
                </p>

                {/* CLUB INFO */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="badge badge-primary badge-outline">
                        Club
                    </span>
                    <span className="font-medium text-gray-800">
                        {event.clubName}
                    </span>
                </div>

                {/* ACTION AREA */}
                <div className="border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-gray-600 text-sm">
                        {event.isPaid ? (
                            <span>
                                💰 Event Fee:
                                <span className="font-semibold text-gray-900">
                                    {" "} ${event.eventFee}
                                </span>
                            </span>
                        ) : (
                            <span className="text-green-600 font-semibold">
                                🎉 Free Event
                            </span>
                        )}
                    </div>

                    {/* Membership & Registration Buttons */}
                    {!isMember ? (
                        <button
                            className="btn btn-primary btn-wide"
                            onClick={() => handleJoinClub(event.clubId)}
                        >
                            Join Club First
                        </button>
                    ) : (

                        registration.status === "registered" ?
                            <button className="btn" disabled >
                                Already registered
                            </button>
                            : <button onClick={() => handleRegister(event)} className={`btn ${event.isPaid ? 'btn-warning' : 'btn-success'} btn-wide`}>
                                Register for Free
                            </button>

                    )


                    }
                </div>

            </div>
        </div>
    );
};

export default EventDetails;
