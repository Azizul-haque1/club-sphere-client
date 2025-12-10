import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAlert from '../../../hooks/userAlert';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const showAlert = useAlert()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleChangeRole = (user, role) => {

        const updateDoc = {
            role: role,
        }
        Swal.fire({
            title: `Are you sure, ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user._id}/role`, updateDoc)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // console.log(res.data);
                            refetch()
                            showAlert({
                                title: `${user.displayName} maked as an ${role}`
                            })
                        }
                    })
                    .catch(err => console.log(err))


            }
        });


    }

    const handleMakeAdmin = (user, role) => {
        handleChangeRole(user, role)

    }
    const handleMakeManager = (user, role) => {
        handleChangeRole(user, role)

    }
    const handleMakeMember = (user, role) => {
        handleChangeRole(user, role)

    }




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
                                        onClick={() => handleMakeAdmin(user, 'admin')}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Make Admin
                                    </button>

                                    {/* Make Club Manager */}
                                    <button
                                        onClick={() => handleMakeManager(user, 'manager')}

                                        className="btn btn-sm btn-accent"
                                    >
                                        Club Manager
                                    </button>

                                    {/* Make Member */}
                                    <button
                                        onClick={() => handleMakeMember(user, 'member')}

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