import useAuth from "../../hooks/useAuth";



const MyClubs = () => {

    const { role, roleLoading } = useAuth()
    const clubs = []

    // if(role === '')

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">My Clubs</h2>

            {clubs.length === 0 ? (
                <p className="text-gray-500">No clubs found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {clubs.map((club) => (
                        <ClubCard key={club._id} club={club} />
                    ))} */}

                    data coming very soon
                </div>
            )}
        </div>
    );
};

export default MyClubs;
