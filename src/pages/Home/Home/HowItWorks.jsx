import React from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Calendar, Users } from "lucide-react";

const steps = [
    {
        icon: <Search className="w-8 h-8" />,
        title: "Discover Clubs",
        desc: "Browse a wide variety of clubs and events happening right in your city.",
        color: "text-primary"
    },
    {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Join or Create",
        desc: "Become a member of an existing community or start your own club today.",
        color: "text-secondary"
    },
    {
        icon: <Calendar className="w-8 h-8" />,
        title: "Attend Events",
        desc: "RSVP to meetups, workshops, and social gatherings nearby.",
        color: "text-primary"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Grow Community",
        desc: "Connect with members, share interests, and build lasting friendships.",
        color: "text-secondary"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "backOut" }
    }
};

const HowItWorks = () => {
    return (
        <section className=" mx-4 md:mx-auto">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold mb-4 text-base-content">
                        How <span className="text-primary">ClubSphere</span> Works
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Getting started is easy. Join thousands of members already connecting in your area.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="card-body items-center text-center">
                                <div className={`p-4 rounded-full bg-base-200 mb-4 ${step.color}`}>
                                    {step.icon}
                                </div>
                                <h3 className="card-title text-xl mb-2">{step.title}</h3>
                                <p className="text-base-content/70">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
