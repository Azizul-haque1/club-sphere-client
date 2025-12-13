import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const EventsManagement = () => {
    const [events, setEvents] = useState([
        {
            id: "1",
            clubId: "c101",
            title: "Photography Workshop",
            description: "Learn advanced photography techniques.",
            date: "2025-12-20",
            location: "Studio Room A",
            isPaid: true,
            eventFee: 25,
            maxAttendees: 30,
        },
        {
            id: "2",
            clubId: "c102",
            title: "Hiking Meetup",
            description: "Weekend hiking trip to the mountains.",
            date: "2025-12-28",
            location: "Blue Mountain Trail",
            isPaid: false,
            eventFee: 0,
            maxAttendees: 20,
        },
    ]);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const createOpenModalRef = useRef()
    const editOpenModalRef = useRef()
    const { data: clubs } = useQuery({
        queryKey: ['club-name', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/club-name?email=${user.email}`)
            return res.data;
        }
    })

    console.log(clubs);



    const [selectedEvent, setSelectedEvent] = useState(null);

    // React Hook Form for Create
    const {
        register: createRegister,
        handleSubmit: handleCreateSubmit,
        reset: resetCreateForm,
        watch: watchCreateForm,
    } = useForm();

    // React Hook Form for Edit
    const {
        register: editRegister,
        handleSubmit: handleEditSubmit,
        reset: resetEditForm,
        watch: watchEditForm,
    } = useForm();


    const handleCreateEvent = (data) => {
        // const newEvent = {
        //     ...data,
        //     id: Date.now().toString(),
        //     isPaid: data.isPaid || false,
        //     eventFee: data.isPaid ? Number(data.eventFee) : '0',
        //     maxAttendees: Number(data.maxAttendees),
        // };
        // setEvents([...events, newEvent]);

        axiosSecure.post(`/event`, data)
            .then(res => {
                console.log(res.data);

            })
            .catch(err => console.log(err))


        resetCreateForm();

        console.log('club data', data);

    };

    const handleEditEvent = (data) => {
        setEvents((prev) =>
            prev.map((ev) =>
                ev.id === selectedEvent.id
                    ? {
                        ...ev,
                        ...data,
                        isPaid: data.isPaid || false,
                        eventFee: data.isPaid ? Number(data.eventFee) : '0',
                        maxAttendees: Number(data.maxAttendees),
                    }
                    : ev
            )
        );
        resetEditForm();
        document.getElementById("edit_modal").close();
    };


    const handleDeleteEvent = () => {
        setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
        document.getElementById("delete_modal").close();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Events Management</h1>

            {/* CREATE BUTTON */}
            <button
                className="btn btn-primary mb-4"
                onClick={() => createOpenModalRef.current.showModal()}
            >
                Create Event
            </button>

            {/* EVENTS TABLE */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Club</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Paid</th>
                            <th>Fee</th>
                            <th>Max</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === '0' && (
                            <tr>
                                <td colSpan={8} className="text-center py-6">
                                    No events found
                                </td>
                            </tr>
                        )}
                        {events.map((ev) => {
                            const club = clubs.find((c) => c._id === ev.clubId);
                            return (
                                <tr key={ev.id}>
                                    <td>{club?.clubName}</td>
                                    <td>{ev.title}</td>
                                    <td>{ev.date}</td>
                                    <td>{ev.location}</td>
                                    <td>
                                        <span
                                            className={`badge ${ev.isPaid ? "badge-warning" : "badge-success"
                                                }`}
                                        >
                                            {ev.isPaid ? "Paid" : "Free"}
                                        </span>
                                    </td>
                                    <td>${ev.eventFee}</td>
                                    <td>{ev.maxAttendees}</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => {
                                                    setSelectedEvent(ev);
                                                    resetEditForm(ev);
                                                    editOpenModalRef.current.showModal();
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => {
                                                    setSelectedEvent(ev);
                                                    document.getElementById("delete_modal").showModal();
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* CREATE EVENT MODAL */}
            <dialog ref={createOpenModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Create Event</h3>
                    <form
                        className="grid grid-cols-1 gap-3"
                        onSubmit={handleCreateSubmit(handleCreateEvent)}
                    >
                        <select
                            className="select select-bordered w-full"
                            {...createRegister("clubId", { required: true })}
                            defaultValue={clubs[0]?._id || ""}
                        >
                            {clubs.map((club) => (
                                <option key={club._id} value={club._id}>
                                    {club.clubName}
                                </option>
                            ))}
                        </select>

                        <input
                            className="input input-bordered"
                            placeholder="Title"
                            {...createRegister("title", { required: true })}
                        />
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Description"
                            {...createRegister("description", { required: true })}
                        />
                        <input
                            type="date"
                            className="input input-bordered"
                            {...createRegister("eventDate", { required: true })}
                        />
                        <input
                            className="input input-bordered"
                            placeholder="Location"
                            {...createRegister("location", { required: true })}
                        />
                        <label className="label cursor-pointer">
                            <span className="label-text">Paid Event?</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                {...createRegister("isPaid")}
                            />
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            placeholder="Event Fee"
                            {...createRegister("eventFee")}
                        />
                        <input
                            type="number"
                            className="input input-bordered"
                            placeholder="Max Attendees"
                            {...createRegister("maxAttendees", { required: true })}
                        />
                        <div className="modal-action">
                            <button className="btn btn-primary">Create</button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => createOpenModalRef.current.close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* EDIT EVENT MODAL */}
            <dialog ref={editOpenModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Edit Event</h3>
                    {selectedEvent && (
                        <form
                            className="grid grid-cols-1 gap-3"
                            onSubmit={handleEditSubmit(handleEditEvent)}
                        >
                            <select
                                className="select select-bordered w-full"
                                {...editRegister("clubId", { required: true })}
                            >
                                {clubs.map((club) => (
                                    <option key={club._id} value={club._id}>
                                        {club.clubName}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="input input-bordered"
                                placeholder="Title"
                                {...editRegister("title", { required: true })}
                                defaultValue={selectedEvent.title}
                            />
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="Description"
                                {...editRegister("description", { required: true })}
                                defaultValue={selectedEvent.description}
                            />
                            <input
                                type="date"
                                className="input input-bordered"
                                {...editRegister("date", { required: true })}
                                defaultValue={selectedEvent.date}
                            />
                            <input
                                className="input input-bordered"
                                placeholder="Location"
                                {...editRegister("location", { required: true })}
                                defaultValue={selectedEvent.location}
                            />
                            <label className="label cursor-pointer">
                                <span className="label-text">Paid Event?</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    {...editRegister("isPaid")}
                                    defaultChecked={selectedEvent.isPaid}
                                />
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="Event Fee"
                                {...editRegister("eventFee")}
                                defaultValue={selectedEvent.eventFee}
                            />
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="Max Attendees"
                                {...editRegister("maxAttendees", { required: true })}
                                defaultValue={selectedEvent.maxAttendees}
                            />
                            <div className="modal-action">
                                <button className="btn btn-primary">Update</button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => editOpenModalRef.current.close()}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>

            {/* DELETE MODAL */}
            <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Delete Event</h3>
                    <p className="py-4">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{selectedEvent?.title}</span>?
                    </p>
                    <div className="modal-action">
                        <button className="btn btn-error" onClick={handleDeleteEvent}>
                            Delete
                        </button>
                        <button
                            className="btn"
                            onClick={() => document.getElementById("delete_modal").close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EventsManagement;
