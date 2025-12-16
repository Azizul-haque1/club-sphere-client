import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { MapPin, Tag, CreditCard, ArrowRight } from "lucide-react";

const ClubCard = ({ club }) => {
    const { _id, clubName, bannerImage, location, category, membershipFee } = club;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-base-200"
        >
            <figure className="relative h-48 overflow-hidden group">
                <img
                    src={bannerImage}
                    alt={clubName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                    <div className="badge badge-secondary font-medium shadow-md">
                        {category}
                    </div>
                </div>
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title text-xl font-bold text-base-content mb-1">
                    {clubName}
                    {membershipFee === 0 && (
                        <div className="badge badge-accent badge-sm text-xs">Free</div>
                    )}
                </h2>

                <div className="flex items-center gap-2 text-base-content/70 text-sm mb-3">
                    <MapPin size={16} className="text-primary" />
                    <span>{location}</span>
                </div>

                <div className="divider my-2"></div>

                <div className="card-actions justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                        <CreditCard size={18} />
                        <span>{membershipFee === 0 ? "Free Membership" : `$${membershipFee} `}</span>
                    </div>

                    <Link to={`/club-details/${_id}`}>
                        <button className="btn btn-sm btn-primary md:btn-md gap-2 rounded-lg">
                            View Details
                            <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ClubCard;
