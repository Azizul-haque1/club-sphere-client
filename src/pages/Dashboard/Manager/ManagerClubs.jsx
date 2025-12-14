import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function ManagerClubs() {
  const createModalRef = useRef();
  const editModalRef = useRef();
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: clubs = [], refetch } = useQuery({
    queryKey: ['clubs', user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs/by-creator?email=${user.email}&status=approved`)
      return res.data
    }
  })
  // console.log(data);

  const [selectedClub, setSelectedClub] = useState(null);

  // Create form
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    // reset: resetCreate,
  } = useForm();

  // Edit form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm();

  const openCreateModal = () => {
    // resetCreate();
    createModalRef.current.showModal();
  };

  const openEditModal = (club) => {
    setSelectedClub(club);
    resetEdit(club); // prefill edit form
    editModalRef.current.showModal();
  };

  const handleCreateClub = (data) => {
    const clubInfo = {
      clubName: data.clubName,
      description: data.description,
      category: data.category,
      location: data.location,
      bannerImage: data.bannerImage,
      membershipFee: Number(data.membershipFee),
      managerEmail: user.email
    };

    axiosSecure.post('/clubs', clubInfo)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    console.log("Club Object:", clubInfo);
    createModalRef.current.close();
  };


  const handleEditClub = (data) => {
    const updateInfo = {
      clubName: data.clubName,
      description: data.description,
      category: data.category,
      location: data.location,
      bannerImage: data.bannerImage,
      membershipFee: Number(data.membershipFee),
    }

    console.log(data._id);
    axiosSecure.patch(`/clubs/${data._id}`, updateInfo)
      .then(res => {
        console.log(res.data);
        refetch()
        editModalRef.current.close()
      })
      .catch(err => console.log(err))




    console.log("Updated club:", data);
  };

  const handleDeleteClub = (id) => {
    setClubs((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Clubs</h1>

        {/* Open Create Modal */}
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={openCreateModal}
        >
          <MdAdd /> New Club
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Fee</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td className="font-semibold">{club.clubName}</td>
                <td>{club.category}</td>
                <td>${club.membershipFee}</td>
                <td>{club.location}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning text-white flex items-center gap-1"
                    onClick={() => openEditModal(club)}
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white flex items-center gap-1"
                    onClick={() => handleDeleteClub(club.id)}
                  >
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Club Modal */}
      <dialog ref={createModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Create New Club</h3>
          <form
            className="space-y-4 body"
            onSubmit={handleSubmitCreate(handleCreateClub)}
          >
            <label className="label">Club Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerCreate("clubName", { required: true })}
            />

            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...registerCreate("description", { required: true })}
            ></textarea>

            <label className="label">Location</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerCreate("location", { required: true })}
            />

            <label className="label">Category</label>
            <select
              className="select select-bordered w-full"
              {...registerCreate("category")}
            >
              <option>Art</option>
              <option>Science</option>
              <option>Sports</option>
              <option>Technology</option>
              <option>Culture</option>
            </select>

            <label className="label">Membership Fee</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...registerCreate("membershipFee")}
            />

            <label className="label">Banner Image URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerCreate("bannerImage")}
            />

            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary mr-4">
                Create Club
              </button>
              <button
                type="button"
                onClick={() => createModalRef.current.close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Club Modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Edit Club</h3>
          <form
            className="space-y-4 body"
            onSubmit={handleSubmitEdit(handleEditClub)}
          >
            <label className="label">Club Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerEdit("clubName", { required: true })}
            />

            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...registerEdit("description", { required: true })}
            ></textarea>

            <label className="label">Location</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerEdit("location", { required: true })}
            />

            <label className="label">Category</label>
            <select
              className="select select-bordered w-full"
              {...registerEdit("category")}
            >
              <option>Art</option>
              <option>Science</option>
              <option>Sports</option>
              <option>Technology</option>
              <option>Culture</option>
            </select>

            <label className="label">Membership Fee</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...registerEdit("membershipFee")}
            />

            <label className="label">Banner Image URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...registerEdit("bannerImage")}
            />

            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary mr-4">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => editModalRef.current.close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
