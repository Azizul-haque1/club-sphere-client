import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        name: "Alice Johnson",
        role: "Photography Enthusiast",
        club: "Photography Club",
        feedback: "I found my people here! The events are well organized and I've learned so much from the community.",
        rating: 5,
        img: "https://i.pravatar.cc/150?u=alice"
    },
    {
        name: "Bob Smith",
        role: "Grandmaster in Training",
        club: "Chess Club",
        feedback: "Great platform to find local matches. The tournament management features are a lifesaver.",
        rating: 5,
        img: "https://i.pravatar.cc/150?u=bob"
    },
    {
        name: "Carol White",
        role: "Indie Artist",
        club: "Music Club",
        feedback: "Met my bandmates through this app. It's the best way to connect with local talent.",
        rating: 4,
        img: "https://i.pravatar.cc/150?u=carol"
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
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

const Testimonials = () => {
    return (
        <section className="mx-4 md:mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-base-content mb-4">
                        Member <span className="text-primary">Stories</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from the community building their passions with us.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="card bg-base-100 shadow-xl border border-base-200 relative overflow-hidden"
                        >
                            {/* Decorative Quote Icon */}
                            <Quote className="absolute top-4 right-4 text-primary/10 w-20 h-20 rotate-12" />

                            <div className="card-body">
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < t.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>

                                <p className="text-base-content/80 italic mb-6 relative z-10">"{t.feedback}"</p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={t.img} alt={t.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base-content">{t.name}</h3>
                                        <p className="text-xs text-primary font-medium">{t.club}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
