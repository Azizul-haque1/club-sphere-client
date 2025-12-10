import React from "react";
import { Link } from "react-router";


const MyClubs = () => {


    const clubs = [
        {
            id: "1",
            clubName: "Photography Club",
            location: "Room A3",
            membershipStatus: "active",
            expiryDate: "2026-03-31",
            detailsUrl: "/clubs/1", // could be a React Router path or full URL
        },
        {
            id: "2",
            clubName: "Chess Club",
            location: "Room B1",
            membershipStatus: "expired",
            expiryDate: "2025-11-30",
            detailsUrl: "/clubs/2",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Clubs</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                    <div key={club.id} className="card bg-base-100 shadow hover:shadow-lg transition duration-200">
                        <div className="card-body">
                            <h2 className="card-title">{club.clubName}</h2>
                            <p className="text-gray-600">{club.location}</p>
                            <p>
                                Status:{" "}
                                <span
                                    className={`badge ${club.membershipStatus === "active" ? "badge-success" : "badge-error"
                                        }`}
                                >
                                    {club.membershipStatus.charAt(0).toUpperCase() + club.membershipStatus.slice(1)}
                                </span>
                            </p>
                            <p>Expiry: {club.expiryDate}</p>
                            <div className="card-actions justify-end mt-2">
                                <Link href={`/clubs/${club.id}`} className="btn btn-sm btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {clubs.length === 0 && (
                    <p className="text-gray-500 col-span-full">You have no active club memberships.</p>
                )}
            </div>
        </div>
    );
};

export default MyClubs;
