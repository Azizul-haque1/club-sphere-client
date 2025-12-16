import React from "react";
import { motion } from "framer-motion";
import { Camera, Trophy, Monitor, Music, Globe, Utensils } from "lucide-react";

const categories = [
    { name: "Photography", icon: <Camera size={32} />, color: "text-blue-500", bg: "bg-blue-100" },
    { name: "Sports", icon: <Trophy size={32} />, color: "text-orange-500", bg: "bg-orange-100" },
    { name: "Tech", icon: <Monitor size={32} />, color: "text-purple-500", bg: "bg-purple-100" },
    { name: "Music", icon: <Music size={32} />, color: "text-pink-500", bg: "bg-pink-100" },
    { name: "Culture", icon: <Globe size={32} />, color: "text-green-500", bg: "bg-green-100" },
    { name: "Food & Culinary", icon: <Utensils size={32} />, color: "text-red-500", bg: "bg-red-100" },
];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

const WhyJoin = () => {
    return (
        <section id="categories" className=" mx-4 md:mx-auto">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-12 text-base-content">
                    Explore Popular <span className="text-secondary">Categories</span>
                </h2>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="card-body items-center text-center p-6">
                                <div className={`p-4 rounded-full mb-3 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {cat.icon}
                                </div>
                                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                                    {cat.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyJoin;
