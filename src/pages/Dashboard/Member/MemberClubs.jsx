import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";


const MyClubs = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: myClubs = [], isLoading } = useQuery({
        queryKey: ['myClubs', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-clubs?email=${user.email}`)
            return res.data || [];
        }

    })

    if (isLoading) {
        return <Loader />
    }

    console.log(myClubs);



    // const clubs = [
    //     {
    //         id: "1",
    //         clubName: "Photography Club",
    //         location: "Room A3",
    //         membershipStatus: "active",
    //         expiryDate: "2026-03-31",
    //         detailsUrl: "/clubs/1", // could be a React Router path or full URL
    //     },
    //     {
    //         id: "2",
    //         clubName: "Chess Club",
    //         location: "Room B1",
    //         membershipStatus: "expired",
    //         expiryDate: "2025-11-30",
    //         detailsUrl: "/clubs/2",
    //     },
    // ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl text-primary font-bold mb-6">My Clubs</h2>

            {myClubs?.length === 0 && <p>You have not joined any clubs yet.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClubs?.map((club) => {
                    // const club = item.club;
                    return (
                        <div
                            key={club._id}
                            className=" rounded-xl shadow-sm p-5 hover:shadow-lg transition"
                        >
                            <div className="bg-cover  overflow-hidden">
                                <img
                                    src={club?.bannerImage}
                                    alt={club?.clubName}
                                    className="w-full h-40 object-cover  hover:overflow-hidden ease-in-out   hover:transition-transform duration-300  hover:scale-110 rounded-lg mb-4"
                                />
                            </div>

                            <h3 className="text-xl font-semibold">{club?.clubName}</h3>
                            <p className="text-gray-600">📍 {club?.location}</p>
                            <p className="text-gray-500">Category: {club?.category}</p>

                            <p className="mt-2">
                                <span className="font-semibold">Membership Status:</span>{" "}
                                <span
                                    className={
                                        club.membership.membershipStatus === "active"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    }
                                >
                                    {club.membership.membershipStatus}
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Joined At:</span>{" "}
                                {new Date(club.membership.joinedAt).toLocaleDateString()}
                            </p>


                            <Link to={`/club-details/${club?._id}`}>
                                <button className="mt-4 w-full btn btn-primary">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default MyClubs;
