import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
    const { user } = useAuth()
    const { role } = useRole()
    // const user = {
    //     name: "John Doe",
    //     role: "Admin",
    //     email: "john.doe@example.com",
    //     phone: "+1 234 567 890",
    //     avatar: "https://i.pravatar.cc/150?img=12",
    // };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <div className="avatar">
                    <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden">
                        <img src={user.photoURL || "https://i.pravatar.cc"} alt="User Avatar" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-primary">{user.displayName}</h1>
                    <p className="text-secondary font-medium">{role}</p>
                </div>
            </div>

            {/* Profile Details Card */}
            <div className="bg-white shadow-xl rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Profile Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <p className="text-secondary font-medium mb-1">Full Name</p>
                        <p className="text-gray-800 font-semibold">{user.displayName}</p>
                    </div>
                    <div>
                        <p className="text-secondary font-medium mb-1">Role</p>
                        <p className="text-gray-800 font-semibold">{role}</p>
                    </div>
                    <div>
                        <p className="text-secondary font-medium mb-1">Email</p>
                        <p className="text-gray-800 font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-secondary font-medium mb-1">+1 234 567 890</p>
                        <p className="text-gray-800 font-semibold">{user.phone}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:scale-105">Edit Profile</button>
                    <button className="btn btn-secondary w-full sm:w-auto transition-all duration-300 hover:scale-105">Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
