
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

import useAdminStats from "../../../hooks/useAdminStats";
import Loader from "../../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
    const { data, isLoading } = useAdminStats();
    const axiosSecure = useAxiosSecure()
    const { data: barData } = useQuery({
        queryKey: ['members-count'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/clubs/members-count')
            return res.data;
        }
    })

    console.log('bar', barData);



    if (isLoading) {
        return <Loader />
    }

    const { users, clubs, memberships, events, payments } = data;


    console.log({ users, clubs, memberships, events, payments });

    console.log('per data', data);



    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    Admin Overview
                </h1>
                <p className="text-gray-500">
                    Platform-wide insights and performance
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

                <Card
                    icon={<FaUsers size={24} />}
                    label="Total Users"
                    value={users.totoalUser}
                    color="primary"
                />

                <Card
                    icon={<FaUniversity size={24} />}
                    label="Total Clubs"
                    value={clubs.total}
                    subText={`✔ ${clubs.approved} | ⏳ ${clubs.pending} | ✖ ${clubs.rejected}`}
                    color="secondary"
                />

                <Card
                    icon={<FaUsers size={24} />}
                    label="Memberships"
                    value={memberships.totalMemberships}
                    color="primary"
                />

                <Card
                    icon={<MdEvent size={26} />}
                    label="Events"
                    value={events.totalEvents}
                    color="secondary"
                />

                <Card
                    icon={<MdPayment size={26} />}
                    label="Payments"
                    value={`$${payments.totalPayments}`}
                    color="primary"
                />
            </div>


            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Memberships per Club
                    </h2>
                    <span className="text-sm text-gray-500">
                        Active members
                    </span>
                </div>

                {/* Chart */}
                {barData?.length ? (
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                            >
                                <XAxis
                                    dataKey="club"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    angle={-20}
                                    textAnchor="end"
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "#eef2ff" }}
                                    contentStyle={{
                                        borderRadius: "10px",
                                        border: "none",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Bar
                                    dataKey="members"
                                    fill="#a3dba3"
                                    radius={[8, 8, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-80 flex items-center justify-center text-gray-400">
                        No membership data available
                    </div>
                )}
            </div>

        </div>
    );
};




export default AdminHome;


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


