import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";
import ClubEvents from "../../components/ClubEvents";

const ClubDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const naviagte = useNavigate()
    // console.log(id);
    const axiosSecure = useAxiosSecure()
    const { data: club, isLoading } = useQuery({
        queryKey: ['club', id],
        queryFn: async () => {
            const res = await axiosSecure(`/clubs/${id}/details`)
            return res.data;
        }

    })

    // console.log(club);
    const { data: membershipInfo = { status: '' }, isLoading: membershipLoading } =
        useQuery({
            queryKey: ['membershipStatus', id, user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/clubs/${id}/membership-status`);
                return res.data || { status: '' };
            },
            enabled: !!user,
        });



    if (isLoading || membershipLoading) {
        return <Loader />
    }
    const handleJoinClub = (club) => {
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
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Back Button */}
            <span onClick={() => naviagte(-1)}
                to="/clubs"
                className="text-blue-600 font-medium mb-6 inline-block"
            >
                ← Back to Clubs
            </span>
            {/* Main Section */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Image */}

                <img
                    src={club?.bannerImage}
                    alt={club?.clubName}
                    className="w-full h-[350px] object-cover"
                />

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}

                    <div className="lg:col-span-2">

                        <span className="badge badge-primary mb-3">
                            {club.category}
                        </span>

                        <h1 className="text-3xl font-bold mb-4">
                            {club.clubName}
                        </h1>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {club.description}
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-inner">

                        <h3 className="text-xl font-bold mb-4">
                            Club Information
                        </h3>

                        <div className="space-y-3 text-gray-700">

                            <p>
                                📍 <span className="font-semibold">Location:</span>{" "}
                                {club?.location}
                            </p>

                            {/* <p>
                                👥 <span className="font-semibold">Members:</span>{" "}
                                {club.members}
                            </p> */}

                            <p>
                                💰 <span className="font-semibold">Joining Fee:</span>{" "}
                                ${club?.membershipFee}
                            </p>
                        </div>

                        <div className="border-t mt-5 pt-4">

                            <h4 className="font-semibold mb-2">Organizer</h4>

                            <p className="text-gray-600">
                                {club?.organizer.displayName}
                            </p>
                            <p className="text-sm text-gray-500">
                                {club?.organizer.email}
                            </p>
                        </div>

                        {membershipInfo.status === "active" ?


                            (
                                <button className="btn btn-success w-full mt-3" disabled>
                                    ✓ You Are Already a Member
                                </button>

                            ) : (
                                <button
                                    onClick={() => handleJoinClub(club)}
                                    className="btn btn-primary w-full mt-6">
                                    Join This Club
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>


            {
                membershipInfo.status === "active" &&
                <ClubEvents clubId={club._id} />
            }
        </div>
    );
};

export default ClubDetails;
