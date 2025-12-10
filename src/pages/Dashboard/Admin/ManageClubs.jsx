import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAlert from "../../../hooks/userAlert";

const ManageClubs = () => {
  const showAlert = useAlert()
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: clubs = [], refetch } = useQuery({
    queryKey: ['clubs', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?email=${user.email}`)
      return res.data
    }
  })

  const statusBadge = (status) => {
    const classes = {
      approved: "badge badge-success",
      pending: "badge badge-warning",
      rejected: "badge badge-error"
    };
    return classes[status] || "badge";
  };


  const handleChangeStatus = (club, status) => {
    const updateDoc = { status };

    Swal.fire({
      title: `Are you sure you want to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/clubs/${club._id}/status`, updateDoc)
          .then(res => {
            if (res.data.modifiedCount) {
              // Refetch data after successful update
              refetch();
              const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
              Swal.fire({
                title: `${capitalizedStatus}d Successfully`,
                text: `The club "${club.name}" has been ${status}d.`
              });
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleMakeStatus = (club, status) => {
    handleChangeStatus(club, status)
  }



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Clubs</h1>

      <div className="overflow-x-auto ">
        <table className="table w-full border border-gray-300">
          {/* Table head */}
          <thead>
            <tr className="bg-base-200">
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Status</th>
              <th>Membership Fee</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {clubs?.map((club, index) => (
              <tr key={index}>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td>
                  <span className={statusBadge(club.status)}>
                    {club.status}
                  </span>
                </td>
                <td>${club.membershipFee}</td>
                <td>
                  Members: {club.membersCount} <br />
                  Events: {club.eventsCount}
                </td>
                <td className="flex gap-2">
                  {club.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleMakeStatus(club, 'approved')}
                        className="btn btn-sm btn-success">
                        Approve
                      </button>
                      <button
                        onClick={() => handleMakeStatus(club, 'rejected')}
                        className="btn btn-sm btn-error">Reject</button>
                    </>
                  )}
                  <button className="btn btn-sm btn-primary">View Stats</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClubs;
