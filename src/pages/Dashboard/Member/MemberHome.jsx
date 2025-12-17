
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import { MdEvent, MdGroups } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/shared/Loader';
const MemberHome = () => {
    const axiosSecure = useAxiosSecure()

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs/joined-clubs/stats')
            return res.data;

        }
    })
    const { data: events = [], isLoading: evnetsLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get('/events/registered-evnet/stats')
            return res.data;

        }
    })
    const { data: upcomingEvents = [], isLoading: upcomingLoading } = useQuery({
        queryKey: ['my-upcoming'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-upcoming/registered-events')
            return res.data;

        }
    })
    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const res = await axiosSecure.get('/usesr/test')
            return res.data;

        }
    })


    console.log('data test', data);
    // console.log('my', myUpcoming);
    // console.log('club', clubs);

    // console.log('ev', events);
    if (isLoading || evnetsLoading || upcomingLoading) {
        return <Loader />
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    Welcome back
                </h1>
                <p className="text-gray-500 mt-1">
                    Here’s a quick overview of your activities
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {/* Clubs Joined */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-primary text-white">
                        <MdGroups size={28} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Clubs Joined</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {clubs[0]?.totalClubs}
                        </h2>
                    </div>
                </div>

                {/* Events Registered */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105">
                    <div className="p-4 rounded-xl bg-secondary text-white">
                        <MdEvent size={28} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Events Registered</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {events[0]?.totalEvents}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Upcoming Events
                </h2>

                {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500">No upcoming events</p>
                ) : (
                    <ul className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <li
                                key={event.id}
                                className="flex justify-between items-center p-4 rounded-xl border border-base-200 hover:bg-base-100 transition"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {event.clubName}
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-primary">
                                    {event.eventDate}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};


export default MemberHome;