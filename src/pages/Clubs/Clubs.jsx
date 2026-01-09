import { useEffect, useState } from "react";
import ClubCard from "../../components/ClubCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxios from "../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SortAsc, LayoutGrid, X } from "lucide-react";


const Clubs = () => {
    const axiosInstance = useAxios();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const categories = ["Photography", "Sports", "Tech", "Music", "Art"];

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs', search, category, debouncedSearch, sort],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs?status=approved&search=${search}&category=${category}&sort=${sort}`);
            return res.data;
        },
        enabled: true,
    });


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);
    
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-base-100 pb-20">
            {/* <Helmet> */}
                <title>Explore Clubs | Club Sphere</title>
            {/* </Helmet> */}

            {/* Hero Section */}
            <div className="relative bg-primary/5 py-16 px-4 mb-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-base-content mb-4"
                    >
                        Explore Communities
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-base-content/60 max-w-2xl mx-auto"
                    >
                        Discover clubs that match your passions, connect with like-minded people, and grow together.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search & Sort Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 mb-8 sticky top-10 z-30 pt-6 pb-2 bg-base-100/95 backdrop-blur-sm"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                        <input
                            type="text"
                            placeholder="Find your tribe..."
                            className="input input-bordered w-full pl-12 pr-10 rounded-2xl focus:shadow-md transition-shadow py-6 text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    <div className="relative min-w-[180px]">
                        <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                        <select
                            onChange={(e) => setSort(e.target.value)}
                            value={sort}
                            className="select select-bordered w-full pl-12 rounded-2xl h-full focus:shadow-md transition-shadow font-medium"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="feeLow">Lowest Fee</option>
                            <option value="feeHigh">Highest Fee</option>
                        </select>
                    </div>
                </motion.div>

                {/* Categories Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-base-200"
                >
                    <button
                        onClick={() => setCategory("")}
                        className={`btn rounded-full px-6 transition-all ${category === ""
                            ? "btn-primary shadow-lg shadow-primary/25"
                            : "btn-ghost bg-base-200/50 hover:bg-base-200"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn rounded-full px-6 transition-all ${category === cat
                                ? "btn-primary shadow-lg shadow-primary/25"
                                : "btn-ghost bg-base-200/50 hover:bg-base-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-medium text-base-content/60">
                        Showing {clubs.length} {clubs.length === 1 ? 'club' : 'clubs'}
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : clubs.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {clubs.map((club) => (
                                <motion.div key={club._id} variants={item} layout>
                                    <ClubCard club={club} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300"
                    >
                        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LayoutGrid size={40} className="text-base-content/30" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No clubs found</h3>
                        <p className="text-base-content/60 max-w-md mx-auto">
                            We couldn't find any clubs matching your search. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setCategory(""); }}
                            className="btn btn-primary btn-outline mt-6 rounded-xl"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Clubs;
