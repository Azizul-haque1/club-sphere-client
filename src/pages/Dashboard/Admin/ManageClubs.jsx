import React from "react";

const ManageClubs = () => {
  // Sample club data
  const clubs = [
    {
      clubName: "Chess Club",
      managerEmail: "chess@example.com",
      status: "Pending",
      membershipFee: 50,
      membersCount: 20,
      eventsCount: 5
    },
    {
      clubName: "Book Club",
      managerEmail: "book@example.com",
      status: "Active",
      membershipFee: 30,
      membersCount: 15,
      eventsCount: 3
    },
    {
      clubName: "Fitness Club",
      managerEmail: "fitness@example.com",
      status: "Pending",
      membershipFee: 75,
      membersCount: 40,
      eventsCount: 10
    }
  ];

  // Map status to DaisyUI badge classes
  const statusBadge = (status) => {
    const classes = {
      Active: "badge badge-success",
      Pending: "badge badge-warning",
      Inactive: "badge badge-error"
    };
    return classes[status] || "badge";
  };

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
            {clubs.map((club, index) => (
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
                  {club.status === "Pending" && (
                    <>
                      <button className="btn btn-sm btn-success">
                        Approve
                      </button>
                      <button className="btn btn-sm btn-error">Reject</button>
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
