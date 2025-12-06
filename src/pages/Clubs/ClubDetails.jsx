import { Link } from "react-router";

const ClubDetails = () => {
    // Demo data (later you will replace with real data)
    const club = {
        name: "Photography Club",
        category: "Photography",
        image:
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        description:
            "The Photography Club is a creative space for people who love capturing moments. We organize weekly photo walks, workshops, and competitions to improve your skills and connect with fellow photographers.",
        location: "Community Center, New York",
        members: 120,
        fee: 15,
        organizer: {
            name: "Alex Johnson",
            email: "alex@photo.com",
        },
        activities: [
            "Weekly Photo Walks",
            "Editing Workshops",
            "Monthly Competitions",
            "Guest Photographer Talks",
        ],
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Back Button */}
            <Link
                to="/clubs"
                className="text-blue-600 font-medium mb-6 inline-block"
            >
                ← Back to Clubs
            </Link>

            {/* Main Section */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

                {/* Image */}
                <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-[350px] object-cover"
                />

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2">

                        <span className="badge badge-primary mb-3">
                            {club.category}
                        </span>

                        <h1 className="text-3xl font-bold mb-4">
                            {club.name}
                        </h1>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {club.description}
                        </p>

                        {/* Activities */}
                        <h2 className="text-xl font-semibold mb-3">
                            Activities
                        </h2>

                        <ul className="space-y-2">
                            {club.activities.map((activity, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-gray-600"
                                >
                                    ✅ {activity}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-gray-50 rounded-xl p-6 shadow-inner">

                        <h3 className="text-xl font-bold mb-4">
                            Club Information
                        </h3>

                        <div className="space-y-3 text-gray-700">

                            <p>
                                📍 <span className="font-semibold">Location:</span>{" "}
                                {club.location}
                            </p>

                            <p>
                                👥 <span className="font-semibold">Members:</span>{" "}
                                {club.members}
                            </p>

                            <p>
                                💰 <span className="font-semibold">Joining Fee:</span>{" "}
                                ${club.fee}
                            </p>
                        </div>

                        <div className="border-t mt-5 pt-4">

                            <h4 className="font-semibold mb-2">Organizer</h4>

                            <p className="text-gray-600">
                                {club.organizer.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {club.organizer.email}
                            </p>
                        </div>

                        <button className="btn btn-primary w-full mt-6">
                            Join This Club
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
