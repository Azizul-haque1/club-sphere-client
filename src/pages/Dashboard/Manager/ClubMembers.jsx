import React from 'react';

const ClubMembers = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Club Members</h1>

            {/* Club */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-3">Chess Club</h2>

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
                            <tr>
                                <td>Alice Morgan</td>
                                <td>alice@example.com</td>
                                <td>
                                    <span className="badge badge-success">active</span>
                                </td>
                                <td>2023-04-12</td>
                                <td className="text-right">
                                    <button className="btn btn-sm btn-warning">
                                        Set Expired
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td>Bob Jennings</td>
                                <td>bob@example.com</td>
                                <td>
                                    <span className="badge badge-error">expired</span>
                                </td>
                                <td>2022-02-20</td>
                                <td className="text-right">
                                    <span className="text-gray-400 text-sm italic">
                                        already expired
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Another Club */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-3">Book Club</h2>

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
                            <tr>
                                <td>Sarah West</td>
                                <td>sarah@example.com</td>
                                <td>
                                    <span className="badge badge-warning">pending</span>
                                </td>
                                <td>2024-01-10</td>
                                <td className="text-right">
                                    <button className="btn btn-sm btn-warning">
                                        Set Expired
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



export default ClubMembers;