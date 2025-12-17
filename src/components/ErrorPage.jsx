import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-6 text-center">

            <motion.h1
                className="text-9xl font-extrabold text-primary mb-4"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                404
            </motion.h1>

            <motion.h2
                className="text-2xl md:text-3xl font-semibold mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Page Not Found
            </motion.h2>

            <motion.p
                className="text-gray-600 max-w-md mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link to="/">
                    <button className="btn btn-primary btn-lg">
                        Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
