import React from "react";
import { FaUsers, FaUniversity } from "react-icons/fa";
import { MdEvent, MdPayment } from "react-icons/md";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";



// const axiosSecure = useAxiosSecure()
// useEffect(() => {
//     axiosSecure('/usesr/test')
//         .then(res => {
//             console.log(res.data);
//         })
// }, [axiosSecure])

const AdminHome = () => {
    /* =====================
       DUMMY DATA (FINAL)
    ====================== */
    const summary = {
        users: 520,
        clubs: {
            total: 24,
            approved: 17,
            pending: 5,
            rejected: 2,
        },
        memberships: 860,
        events: 96,
        payments: 18750,
    };

    const membershipsPerClub = [
        { club: "Computer Club", members: 140 },
        { club: "Robotics Club", members: 110 },
        { club: "Cultural Club", members: 95 },
        { club: "Sports Club", members: 130 },
        { club: "Photography Club", members: 75 },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    Admin Overview
                </h1>
                <p className="text-gray-500">
                    Platform-wide insights and performance
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

                <Card
                    icon={<FaUsers size={24} />}
                    label="Total Users"
                    value={summary.users}
                    color="primary"
                />

                <Card
                    icon={<FaUniversity size={24} />}
                    label="Total Clubs"
                    value={summary.clubs.total}
                    subText={`✔ ${summary.clubs.approved} | ⏳ ${summary.clubs.pending} | ✖ ${summary.clubs.rejected}`}
                    color="secondary"
                />

                <Card
                    icon={<FaUsers size={24} />}
                    label="Memberships"
                    value={summary.memberships}
                    color="primary"
                />

                <Card
                    icon={<MdEvent size={26} />}
                    label="Events"
                    value={summary.events}
                    color="secondary"
                />

                <Card
                    icon={<MdPayment size={26} />}
                    label="Payments"
                    value={`$${summary.payments}`}
                    color="primary"
                />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Memberships per Club
                </h2>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={membershipsPerClub}>
                            <XAxis dataKey="club" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="members"
                                fill="#4f46e5"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

/* =====================
   Reusable Card
====================== */
const Card = ({ icon, label, value, subText, color }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition-all duration-300">
        <div
            className={`p-4 rounded-xl text-white ${color === "primary" ? "bg-primary" : "bg-secondary"
                }`}
        >
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <h2 className="text-2xl font-bold text-gray-800">
                {value}
            </h2>
            {subText && (
                <p className="text-xs text-gray-400 mt-1">
                    {subText}
                </p>
            )}
        </div>
    </div>
);


