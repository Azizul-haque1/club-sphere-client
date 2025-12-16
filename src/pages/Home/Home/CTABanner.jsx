import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

const CTABanner = () => {
    return (
        <motion.section
            className="relative py-24 px-6 mx-4 md:mx-auto  rounded-xl overflow-hidden text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            {/* Background with Gradient and Blur Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>

            {/* Animated Floating Shapes */}
            <motion.div
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0"
            />
            <motion.div
                animate={{ rotate: -360, y: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-0"
            />

            <div className="relative z-10 max-w-3xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
                >
                    <Sparkles size={16} className="text-yellow-300" />
                    <span className="text-sm font-medium">Join the Movement</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Ready to Start Your <br /> Club Journey?
                </h2>

                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Join a club to meet new people or start your own and build a community around your passion.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/clubs">
                        <motion.button
                            className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100 shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join a Club
                            <ArrowRight size={20} />
                        </motion.button>
                    </Link>

                    <Link to="/events">
                        <motion.button
                            className="btn btn-lg btn-outline text-white hover:bg-white/20 border-white hover:border-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join an Event
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default CTABanner;
