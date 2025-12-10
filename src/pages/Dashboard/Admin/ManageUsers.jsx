import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td className="capitalize font-semibold">{user.role}</td>
                                <td>{user.createdAt}</td>
                                <td className="flex gap-2">

                                    {/* Make Admin */}
                                    <button
                                        // onClick={() => changeRole(user.id, "admin")}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Make Admin
                                    </button>

                                    {/* Make Club Manager */}
                                    <button
                                        // onClick={() => changeRole(user.id, "clubManager")}
                                        className="btn btn-sm btn-accent"
                                    >
                                        Club Manager
                                    </button>

                                    {/* Make Member */}
                                    <button
                                        // onClick={() => changeRole(user.id, "member")}
                                        className="btn btn-sm btn-success"
                                    >
                                        Member
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default ManageUsers;