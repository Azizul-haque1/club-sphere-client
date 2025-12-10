import { useState } from "react";

const EventsManagement = () => {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Chess Tournament",
            description: "Competitive chess event",
            date: "2025-06-20",
            location: "Main Hall",
            isPaid: true,
            eventFee: 15,
            maxAttendees: 40,
        },
        {
            id: "2",
            title: "Book Reading",
            description: "Monthly reading session",
            date: "2025-07-05",
            location: "Library Room 1",
            isPaid: false,
            eventFee: 0,
            maxAttendees: 25,
        },
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Events Management</h1>

            {/* CREATE BUTTON */}
            <button
                className="btn btn-primary mb-4"
                onClick={() => document.getElementById("create_modal")?.showModal()}
            >
                Create Event
            </button>

            {/* EVENTS TABLE */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
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
                        {events.map((ev) => (
                            <tr key={ev.id}>
                                <td>{ev.title}</td>
                                <td>{ev.date}</td>
                                <td>{ev.location}</td>
                                <td>
                                    <span className={`badge ${ev.isPaid ? "badge-warning" : "badge-success"}`}>
                                        {ev.isPaid ? "Paid" : "Free"}
                                    </span>
                                </td>
                                <td>${ev.eventFee}</td>
                                <td>{ev.maxAttendees}</td>
                                <td className="text-right flex gap-2 justify-end">
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => {
                                            setSelectedEvent(ev);
                                            document.getElementById("edit_modal")?.showModal();
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => {
                                            setSelectedEvent(ev);
                                            document.getElementById("delete_modal")?.showModal();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===================================================== */}
            {/* CREATE EVENT MODAL */}
            {/* ===================================================== */}
            <dialog id="create_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Create Event</h3>
                    <form className="grid grid-cols-1 gap-3">
                        <input className="input input-bordered" placeholder="Title" />
                        <textarea className="textarea textarea-bordered" placeholder="Description"></textarea>
                        <input type="date" className="input input-bordered" />
                        <input className="input input-bordered" placeholder="Location" />
                        <label className="label cursor-pointer">
                            <span className="label-text">Paid Event?</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </label>
                        <input type="number" className="input input-bordered" placeholder="Event Fee" />
                        <input type="number" className="input input-bordered" placeholder="Max Attendees" />
                    </form>
                    <div className="modal-action">
                        <button className="btn btn-primary">Create</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* ===================================================== */}
            {/* EDIT EVENT MODAL */}
            {/* ===================================================== */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-lg mb-4">Edit Event</h3>
                    <form className="grid grid-cols-1 gap-3">
                        <input
                            className="input input-bordered"
                            defaultValue={selectedEvent?.title}
                            placeholder="Title"
                        />
                        <textarea
                            className="textarea textarea-bordered"
                            defaultValue={selectedEvent?.description}
                            placeholder="Description"
                        ></textarea>
                        <input
                            type="date"
                            className="input input-bordered"
                            defaultValue={selectedEvent?.date}
                        />
                        <input
                            className="input input-bordered"
                            defaultValue={selectedEvent?.location}
                            placeholder="Location"
                        />
                        <label className="label cursor-pointer">
                            <span className="label-text">Paid Event?</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                defaultChecked={selectedEvent?.isPaid}
                            />
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            defaultValue={selectedEvent?.eventFee}
                            placeholder="Event Fee"
                        />
                        <input
                            type="number"
                            className="input input-bordered"
                            defaultValue={selectedEvent?.maxAttendees}
                            placeholder="Max Attendees"
                        />
                    </form>
                    <div className="modal-action">
                        <button className="btn btn-primary">Update</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* ===================================================== */}
            {/* DELETE CONFIRM MODAL */}
            {/* ===================================================== */}
            <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Delete Event</h3>
                    <p className="py-4">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{selectedEvent?.title}</span>?
                    </p>
                    <div className="modal-action">
                        <button className="btn btn-error">Delete</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
export default EventsManagement