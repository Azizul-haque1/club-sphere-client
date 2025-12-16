import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ClubMembers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: clubsMembers = [], refetch } = useQuery({
        queryKey: ['clubs-members', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/members?email=${user.email}`)
            return res.data;
        }
    })

    // console.log('club members', clubsMembers);

    // console.log(clubsMembers);
    const handleExpired = (membershipId) => {
        console.log(membershipId);
        axiosSecure.patch(`/membership/${membershipId}/status`,)
            .then(res => {
                refetch()
                console.log(res.data);
            })
            .catch(err => console.log(err))

    }
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Club Members</h1>

            {/* Club */}
            {
                clubsMembers.map(club =>
                    <div className="mb-10" key={club._id}>
                        <h2 className="text-xl font-semibold mb-3">{club.clubName}</h2>

                        <div className="overflow-x-auto shadow rounded-lg">
                            <table className="table w-full">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Join Date</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Member Row */}
                                    {
                                        club.members.map(m =>

                                            <tr key={m._id}>
                                                <td>{m.name}</td>
                                                <td>{m.email}</td>
                                                <td>

                                                    {m.email ?
                                                        m.status === 'active' ? (<span className="badge badge-success">{m.status}</span>
                                                        ) : (<span className="badge badge-error">{m.status}</span>
                                                        )
                                                        : ''
                                                    }                                            </td>
                                                <td>{
                                                m.email  ?
                                                new Date(m.joinDate).toLocaleDateString()
                                                    :''
                                                    }</td>
                                                <td className="text-right">
                                                    {
                                                        m.email ?
                                                            m.status === 'expired' ? (
                                                                <span className='text-gray-300'>Already expired</span>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleExpired(m.membershipId)}
                                                                    className="btn btn-sm btn-warning">
                                                                    Set Expired
                                                                </button>
                                                            )
                                                            : ''
                                                    }
                                                </td>
                                            </tr>

                                        )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }


        </div>
    );
}



export default ClubMembers;