import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import ClubCard from "../../../components/ClubCard";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const FeaturedClubs = () => {
    const axiosInstance = useAxios();

    const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ["featuredClubs"],
        queryFn: async () => {
            const res = await axiosInstance.get('/featured/clubs');
            return res.data;
        }
    });

    return (
        <section className="py-20 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-base-content mb-4">
                        Featured <span className="text-primary">Clubs</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Check out the top-rated communities making waves in your area.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="skeleton h-48 w-full rounded-xl"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-10 text-error">
                        <p>Failed to load featured clubs. Please try again later.</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {clubs.length > 0 ? (
                            clubs.map((club) => (
                                <motion.div key={club._id} variants={itemVariants}>
                                    <ClubCard club={club} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                No featured clubs found.
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FeaturedClubs;
