import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/shared/Loader";
import { data } from "react-router";

const EventsManagement = () => {
    // const [events, setEvents] = useState([
    //     {
    //         id: "1",
    //         clubId: "c101",
    //         title: "Photography Workshop",
    //         description: "Learn advanced photography techniques.",
    //         date: "2025-12-20",
    //         location: "Studio Room A",
    //         isPaid: true,
    //         eventFee: 25,
    //         maxAttendees: 30,
    //     },
    //     {
    //         id: "2",
    //         clubId: "c102",
    //         title: "Hiking Meetup",
    //         description: "Weekend hiking trip to the mountains.",
    //         date: "2025-12-28",
    //         location: "Blue Mountain Trail",
    //         isPaid: false,
    //         eventFee: 0,
    //         maxAttendees: 20,
    //     },
    // ]);

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const createModalRef = useRef()
    const editModalRef = useRef()
    const deleteModalRef = useRef()
    const { data: clubs = [] } = useQuery({
        queryKey: ['clubs', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/club-name?email=${user.email}`)
            // console.log('data', res.data);
            return res.data;
        }
    })



    const [selectedEvent, setSelectedEvent] = useState(null)
    // console.log('selectedevnt', selectedEvent);

    const { data: events, isLoading, refetch } = useQuery({
        queryKey: ['events', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/events?email=${user.email}`)
            return res.data
        }
    })


    // console.log('events', events);



    // const [selectedEvent, setSelectedEvent] = useState(null);

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
    if (isLoading) {
        return <Loader />
    }

    const handleCreateEvent = (data) => {

        axiosSecure.post(`/event`, data)
            .then(res => {
                console.log(res.data);
                refetch()

            })
            .catch(err => console.log(err))


        resetCreateForm();

        console.log('club data', data);

    };

    const hanldeEditModalShow = (event) => {
        // console.log(event.clubId);
        editModalRef.current.showModal();
        // editOpenModalRef.current.resetEditForm()
        resetEditForm({
            clubId: String(event.clubId),
            title: event.title,
            description: event.description,
            eventDate: new Date(event.eventDate).toISOString().split("T")[0],
            location: event.location,
            isPaid: event.isPaid ?? false,
            eventFee: event.eventFee ?? 0,
            maxAttendees: event.maxAttendees,
        });

        setSelectedEvent(event);



    }

    const handleUpdateEvent = (data) => {
        console.log('WCW', data);
        const eventInfo = {
            clubId: data.clubId,
            title: data.title,
            description: data.description,
            eventDate: data.eventDate,
            location: data.location,
            isPaid: data.isPaid,
            eventFee: Number(data.eventFee) || 0,
            maxAttendees: Number(data.maxAttendees) || 0,
            createdAt: data.date
        };

        axiosSecure.patch(`/events/${selectedEvent._id}`, eventInfo)
            .then(res => {
                console.log(res.data);
                refetch()
            })
            .catch(err => console.log(err))
        resetEditForm(eventInfo);
        editModalRef.current.close();
    };



    const handleDeleteModalShow = (ev) => {
        deleteModalRef.current.showModal()
        setSelectedEvent(ev)
        // console.log(_id);
        // setSelectedEvent({ _id })
    }
    const handleDeleteEvent = () => {

        axiosSecure.delete(`/events/${selectedEvent._id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                deleteModalRef.current.close()

            })
            .catch(err => console.log(err))
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Events Management</h1>

            {/* CREATE BUTTON */}
            <button
                className="btn btn-primary mb-4"
                onClick={() => createModalRef.current.showModal()}
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



                        {events?.length === '0' && (
                            <tr>
                                <td colSpan={8} className="text-center py-6">
                                    No events found
                                </td>
                            </tr>
                        )}
                        {events.map((ev) => {
                            // const club = clubs.find((c) => c._id === ev.clubId);
                            return (
                                <tr key={ev._id}>
                                    <td>{ev.clubName}</td>
                                    <td>{ev.title}</td>
                                    <td>{ev.eventDate}</td>
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
                                                onClick={() => hanldeEditModalShow({ ...ev })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleDeleteModalShow({ ...ev })
                                                }
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

            {/*create event modal */}
            <dialog ref={createModalRef} className="modal modal-bottom sm:modal-middle">
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
                            className="input input-bordered w-full"
                            placeholder="Title"
                            {...createRegister("title", { required: true })}
                        />
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                            {...createRegister("description", { required: true })}
                        />
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            {...createRegister("eventDate", { required: true })}
                        />
                        <input
                            className="input input-bordered w-full"
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
                            className="input input-bordered w-full"
                            placeholder="Event Fee"
                            {...createRegister("eventFee")}
                        />
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="Max Attendees"
                            {...createRegister("maxAttendees", { required: true })}
                        />
                        <div className="modal-action">
                            <button className="btn btn-primary">Create</button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => createModalRef.current.close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* edit modal */}
            <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Edit Event</h3>
                    {selectedEvent && (
                        <form
                            className="grid grid-cols-1 gap-3"
                            onSubmit={handleEditSubmit(handleUpdateEvent)}
                        >
                            <select
                                className="select select-bordered w-full"
                                {...editRegister("clubId", { required: true })}
                            >
                                {clubs.map((club) =>
                                (
                                    <option key={club._id} value={club._id}>
                                        {club.clubName}
                                    </option>
                                )

                                )

                                }
                            </select>

                            <input
                                className="input input-bordered w-full"
                                placeholder="Title"
                                {...editRegister("title", { required: true })}
                                defaultValue={selectedEvent.title}
                            />
                            <span className=" hidden"
                                {...editRegister('_id')}
                            >{selectedEvent._id}</span>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Description"
                                {...editRegister("description", { required: true })}
                                defaultValue={selectedEvent.description}
                            />
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                {...editRegister("date", { required: true })}
                                defaultValue={new Date(selectedEvent.eventDate).toISOString().split("T")[0]}
                            />
                            <input
                                className="input input-bordered w-full"
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
                                className="input input-bordered w-full"
                                placeholder="Event Fee"
                                {...editRegister("eventFee")}
                                defaultValue={selectedEvent.eventFee}
                            />
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                placeholder="Max Attendees"
                                {...editRegister("maxAttendees", { required: true })}
                                defaultValue={selectedEvent.maxAttendees}
                            />
                            <div className="modal-action">
                                <button className="btn btn-primary">Update</button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => editModalRef.current.close()}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog >

            {/* delete modal */}
            <dialog dialog ref={deleteModalRef} className="modal modal-bottom sm:modal-middle" >
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
                            onClick={() => deleteModalRef.current.close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog >
        </div >
    );
};

export default EventsManagement;
