import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";

export default function ManagerClubs() {
  const editModal = useRef()
  const createModal = useRef()
  const { data, register, handleSubmit } = useForm()
  const sampleClub = {
    clubName: "Photography Club",
    description: "We capture memories.",
    location: "Room A3",
    membershipFee: 40,
    category: "Art",
    bannerImage: "https://placehold.co/600x200",
  };

  const openEditModal = () => {
    editModal.current.showModal()
  }

  const openCreateModal = () => {
    createModal.current.showModal()
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Clubs</h1>

        {/* Open Create Modal */}
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => document.getElementById("create_club_modal")?.showModal()}
        >
          <MdAdd /> New Club
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Category</th>
              <th>Fee</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="font-semibold">{sampleClub.clubName}</td>
              <td>{sampleClub.category}</td>
              <td>${sampleClub.membershipFee}</td>
              <td>{sampleClub.location}</td>

              <td className="flex gap-2">
                {/* Open Edit Modal */}
                <button

                  className="btn btn-sm btn-warning text-white flex items-center gap-1"
                  onClick={openEditModal}
                  type="button"
                >
                  <MdEdit /> Edit
                </button>

                <button className="btn btn-sm btn-error text-white flex items-center gap-1">
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>





      <dialog id="create_club_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl">
          {/* <ClubFormModal title="Create New Club" submitLabel="Create" /> */}
          <form method="dialog" className="modal-action">
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>


      <dialog ref={editModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Edit Club</h3>

          <form
            className="space-y-4 body"
            onSubmit={handleSubmit((data) => console.log("UI only → submit", data))}
          >
            <fieldset className="fieldset text-[16px] w-full">
              {/* Club Name */}
              <label className="label">Club Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("clubName")}
              />

              {/* Description */}
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                {...register("description")}
              ></textarea>

              {/* Location */}
              <label className="label">Location</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("location")}
              />

              {/* Category */}
              <label className="label">Category</label>
              <select
                className="select select-bordered w-full"
                {...register("category")}
              >
                <option>Art</option>
                <option>Science</option>
                <option>Sports</option>
                <option>Technology</option>
                <option>Culture</option>
              </select>

              {/* Membership Fee */}
              <label className="label">Membership Fee</label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("membershipFee")}
              />

              {/* Banner Image */}
              <label className="label">Banner Image URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("bannerImage")}
              />

              <div className="text-end ">
                <button type="submit" className="btn btn-primary mr-4">
                  Save Changes
                </button>
                <button
                  onClick={() => editModal.current.close()}
                  className="btn">Cancel</button>
              </div>
            </fieldset>
          </form>

          {/* <form method="dialog" className="modal-action">
            <button className="btn w-full">Close</button>
          </form> */}
        </div>
      </dialog>

    </div>
  );
}

function ClubFormModal({ title, submitLabel, defaultValues = {} }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => console.log("UI only → submit", data))}
      >
        {/* Club Name */}
        <fieldset >
          <label className="label">Club Name</label>
          <input type="text" className="input input-bordered" {...register("clubName")} />
        </fieldset>

        {/* Description */}
        <fieldset >
          <label className="label">Description</label>
          <textarea className="textarea textarea-bordered" {...register("description")}></textarea>
        </fieldset>

        {/* Location */}
        <fieldset className="form-control">
          <label className="label">Location</label>
          <input type="text" className="input input-bordered" {...register("location")} />
        </fieldset>

        {/* Category */}
        <fieldset className="form-control">
          <label className="label">Category</label>
          <select className="select select-bordered" {...register("category")}>
            <option>Art</option>
            <option>Science</option>
            <option>Sports</option>
            <option>Technology</option>
            <option>Culture</option>
          </select>
        </fieldset>

        {/* Membership Fee */}
        <div className="form-control">
          <label className="label">Membership Fee</label>
          <input type="number" className="input input-bordered" {...register("membershipFee")} />
        </div>

        {/* Banner Image */}
        <div className="form-control">
          <label className="label">Banner Image URL</label>
          <input type="text" className="input input-bordered" {...register("bannerImage")} />
        </div>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}
