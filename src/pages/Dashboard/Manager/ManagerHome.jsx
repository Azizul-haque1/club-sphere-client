import React from 'react';
import { FaUniversity, FaUsers } from "react-icons/fa";
import { MdEvent, MdPayment } from "react-icons/md";

const ManagerHome = () => {
    // Dummy data (replace with API data)
    const summary = {
        clubs: 2,
        members: 128,
        events: 12,
        payments: 4500,
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    Manager Overview
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your clubs, members, and events efficiently
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Clubs Managed */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-primary text-white">
                        <FaUniversity size={26} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Clubs Managed</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {summary.clubs}
                        </h2>
                    </div>
                </div>

                {/* Total Members */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-secondary text-white">
                        <FaUsers size={26} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Members</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {summary.members}
                        </h2>
                    </div>
                </div>

                {/* Events Created */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-primary text-white">
                        <MdEvent size={28} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Events Created</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {summary.events}
                        </h2>
                    </div>
                </div>

                {/* Payments Received */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-secondary text-white">
                        <MdPayment size={28} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Payments Received</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            ${summary.payments}
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManagerHome;