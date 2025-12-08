import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import axiosSecure from "../../api/axiosSecure";
import Loading from "../../components/Loading";
// import ClubCard from "../../components/ClubCard";

const MyClubs = () => {
    const { user } = useAuth();
    const { role, isRoleLoading } = useRole();
    const fetchMyClubs = async () => {

        if (role === "manager") {
            // const res = await axiosSecure.get(`/clubs?managerEmail=${user?.email}`);
            // return res.data;
            return 'manager'
        }

        // // member
        // const res = await axiosSecure.get(`/memberships?email=${user?.email}`);
        // return res.data;
    };

    const {
        data: clubs = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["myClubs", role, user?.email],
        enabled: !!user && !isRoleLoading,
        queryFn: fetchMyClubs,
    });

    if (isLoading || isRoleLoading) return <Loading />;

    if (error)
        return <p className="text-red-500 text-center">Failed to load clubs.</p>;

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
