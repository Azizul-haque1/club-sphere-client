import React from "react";

const ErrorPage = () => {
    const handleBackHome = () => {
        window.location.href = "/"; // navigate to home
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 text-center">
            <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-2">Oops! Page not found.</h2>
            <p className="text-gray-600 mb-6">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button className="btn btn-primary btn-lg" onClick={handleBackHome}>
                Back to Home
            </button>
        </div>
    );
};

export default ErrorPage;
