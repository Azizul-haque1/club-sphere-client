import { useState } from "react";
import ClubCard from "../../components/ClubCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxios from "../../hooks/useAxios";


// Dummy clubs data for UI
const dummyClubs = [
    {
        _id: "1",
        clubName: "Creative Photography Club",
        bannerImage: "https://source.unsplash.com/400x300/?camera",
        location: "New York",
        category: "Photography",
        membershipFee: 20,
    },
    {
        _id: "2",
        clubName: "Tech Innovators Hub",
        bannerImage: "https://source.unsplash.com/400x300/?technology",
        location: "San Francisco",
        category: "Tech",
        membershipFee: 0,
    },
    {
        _id: "3",
        clubName: "Downtown Book Lovers",
        bannerImage: "https://source.unsplash.com/400x300/?books",
        location: "London",
        category: "Art",
        membershipFee: 15,
    },
    {
        _id: "4",
        clubName: "Weekend Hiking Team",
        bannerImage: "https://source.unsplash.com/400x300/?mountain",
        location: "Colorado",
        category: "Sports",
        membershipFee: 10,
    },
    {
        _id: "5",
        clubName: "Music Production Society",
        bannerImage: "https://source.unsplash.com/400x300/?music",
        location: "Los Angeles",
        category: "Music",
        membershipFee: 25,
    },
    {
        _id: "6",
        clubName: "City Art & Sketch Club",
        bannerImage: "https://source.unsplash.com/400x300/?art",
        location: "Paris",
        category: "Art",
        membershipFee: 0,
    },
];

const Clubs = () => {
    const axiosSecure = useAxiosSecure()
    const axiosInstance = useAxios()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs?status=approved`)
            return res.data;
        }
    })

    if (isLoading) {
        return <Loader />
    }



    // // Basic UI filtering
    // const filteredClubs = clubs.filter((club) => {
    //     const matchesSearch = club.clubName
    //         .toLowerCase()
    //         .includes(search.toLowerCase());

    //     const matchesCategory = category
    //         ? club.category === category
    //         : true;

    //     return matchesSearch && matchesCategory;
    // });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* ===== Heading ===== */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">Explore All Clubs</h1>
                <p className="text-gray-500 mt-2">
                    Find and join communities that match your passion
                </p>
            </div>

            {/* ===== Filters Section ===== */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by club name..."
                    className="input input-bordered w-full md:w-1/3"
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Category */}
                <select
                    className="select select-bordered w-full md:w-1/4"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Photography">Photography</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                </select>
            </div>

            {/* ===== Clubs Grid ===== */}
            {clubs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club) => (
                        <ClubCard key={club._id} club={club} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No clubs found</p>
            )}
        </div>
    );
};

export default Clubs;
