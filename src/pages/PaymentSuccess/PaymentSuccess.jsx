import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams();
    const [clubData, setClubData] = useState({})
    const sessionId = searchParams.get("session_id");
    const { clubName, amount } = location.state || {};

    useEffect(() => {
        axiosSecure.get(`/session-status?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                setClubData(res.data)
            })
            .catch(err => console.log(err))
    }, [axiosSecure, sessionId])
    console.log('club data', clubData);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard/my-clubs");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

                {/* Success Icon */}
                <div className="text-green-600 text-6xl mb-4">✔</div>

                {/* Heading */}
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Your membership has been activated.
                </p>

                {/* Payment Details Card */}
                <div className="bg-gray-100 p-4 rounded-lg text-left mb-6">
                    <h2 className="font-semibold text-lg mb-3">Payment Details</h2>

                    <p><span className="font-semibold">Club Name:</span> {clubData.clubName || "N/A"}</p>
                    <p><span className="font-semibold">Amount Paid:</span> ${clubData.amount || "N/A"}</p>
                    <p><span className="font-semibold">Status:</span> {clubData.status}</p>
                </div>

                {/* Button */}
                <button
                    onClick={() => navigate("/dashboard/member/my-clubs")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                    Go to My Clubs
                </button>

                <p className="text-gray-400 text-sm mt-3">Redirecting in 3 seconds...</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
