import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ForbiddenAccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
            <motion.h1
                className="text-9xl font-extrabold text-red-500 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                403
            </motion.h1>

            <motion.h2
                className="text-3xl font-semibold mb-6 text-gray-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                Forbidden Access
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-8 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                You don’t have permission to access this page. Please contact the admin
                if you think this is a mistake.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <Link to="/">
                    <button className="btn btn-primary px-6 py-3">Go to Home</button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ForbiddenAccessPage;
