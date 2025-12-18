import { useState } from "react";
import ClubCard from "../../components/ClubCard";

import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxios from "../../hooks/useAxios";
const Clubs = () => {
    const axiosInstance = useAxios()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', search, category, sort],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs?status=approved&search=${search}&category=${category}&sort=${sort}`)
            return res.data;
        },
        enabled: true,
    })


    console.log('sort', sort,);



    if (isLoading) {
        return <Loader />
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">


            <div className="text-center mb-10">
                <h1 className="text-3xl text-primary font-bold">Explore All Clubs</h1>
                <p className="text-gray-500 mt-2">
                    Find and join communities that match your passion
                </p>
            </div>

            {/* filter and seacrch */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-3">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by club name..."
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
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
            <div className=" flex justify-end">
                <select
                    // value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-bordered w-full md:w-1/4 mb-8"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="feeLow">Lowest Fee</option>
                    <option value="feeHigh">Highest Fee</option>
                </select>
            </div>


            {clubs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {clubs.map((club) => (
                        isLoading ? <Loader /> :
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
