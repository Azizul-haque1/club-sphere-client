import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";
import ClubEvents from "../../components/ClubEvents";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, DollarSign, User, Mail, CheckCircle, Calendar } from "lucide-react";

const ClubDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const { data: club, isLoading } = useQuery({
        queryKey: ['club', id],
        queryFn: async () => {
            const res = await axiosSecure(`/clubs/${id}/details`)
            return res.data;
        }
    })

    const { data: membershipInfo = { status: '' }, isLoading: membershipLoading, refetch } =
        useQuery({
            queryKey: ['membershipStatus', id, user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/clubs/${id}/membership-status`);
                return res.data || { status: '' };
            },
            enabled: !!user,
        });

    if (isLoading || membershipLoading) {
        return <Loader />
    }

    const handleJoinClub = (club) => {
        const clubInfo = {
            _id: club._id,
            name: user.displayName,
            clubName: club.clubName,
            membershipFee: club.membershipFee,
            email: user.email,
        }

        axiosSecure.post(`/payment-checkout-session`, clubInfo)
            .then(res => {
                window.location.assign(res.data.url)
                refetch()
            })
            .catch(err => console.error('error', err))
    }

    const handleJoinFreeClub = (club) => {
        const memberInfo = {
            userEmail: user.email,
            clubId: club._id,
            status: "active",
            paymentStatus: 'free',
            paymentId: '',
            joinedAt: new Date(),
        };

        axiosSecure.post('/free-clubs/membershsip', memberInfo)
            .then(res => {
                refetch()
                toast.success(club.clubName + ' joined successfully')
            })
            .catch(err => console.log(err))
    }

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-base-100 pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors mb-8 group font-medium"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Clubs
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Image Card */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="bg-base-100 rounded-3xl overflow-hidden shadow-xl border border-base-200"
                        >
                            <div className="relative h-[300px] sm:h-[400px]">
                                <img
                                    src={club?.bannerImage}
                                    alt={club?.clubName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <span className="badge badge-primary border-none text-white px-4 py-3 text-sm font-semibold mb-3 shadow-lg">
                                        {club?.category}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-shadow-sm">
                                        {club?.clubName}
                                    </h1>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ delay: 0.1 }}
                            className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200"
                        >
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-8 bg-primary rounded-full"></span>
                                About the Club
                            </h2>
                            <p className="text-lg text-base-content/70 leading-relaxed whitespace-pre-wrap">
                                {club?.description}
                            </p>
                        </motion.div>

                        {/* Events Section (Only if Member) */}
                        {membershipInfo.status === "active" && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUp}
                                transition={{ delay: 0.2 }}
                            >
                                <ClubEvents clubId={club._id} />
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Club Details Card */}
                        <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-200 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-base-200 pb-4">
                                Club Details
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-base-content/50">Location</p>
                                        <p className="text-base font-semibold">{club?.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                        <DollarSign className="text-secondary" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-base-content/50">Membership Fee</p>
                                        <p className="text-xl font-bold text-secondary">
                                            {club?.membershipFee > 0 ? `$${club?.membershipFee}` : 'Free'}
                                        </p>
                                    </div>
                                </div>

                                <div className="divider my-4"></div>

                                <div>
                                    <p className="text-sm font-medium text-base-content/50 mb-3">Organizer</p>
                                    <div className="flex items-center gap-3 bg-base-200/50 p-3 rounded-xl border border-base-200">
                                        <div className="w-10 h-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-lg font-bold">
                                            {club?.organizer?.displayName?.[0]?.toUpperCase() || <User size={20} />}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold truncate">{club?.organizer?.displayName}</p>
                                            <p className="text-xs text-base-content/60 truncate">{club?.organizer?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    {membershipInfo.status === "active" ? (
                                        <button className="btn btn-success btn-block rounded-xl text-white no-animation cursor-default font-bold shadow-lg shadow-success/20">
                                            <CheckCircle size={20} />
                                            Already a Member
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => club.membershipFee !== 0 ? handleJoinClub(club) : handleJoinFreeClub(club)}
                                            className="btn btn-primary btn-block rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                                        >
                                            {club.membershipFee !== 0 ? 'Join Now & Pay' : 'Join for Free'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
