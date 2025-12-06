import { Link } from "react-router";

const ClubCard = ({ club }) => {
    const { _id, clubName, bannerImage, location, category, membershipFee } = club;

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
            <img
                src={bannerImage}
                alt={clubName}
                className="h-48 w-full object-cover rounded-lg"
            />

            <div className="mt-4 space-y-2">
                <h2 className="text-xl font-bold">{clubName}</h2>
                <p className="text-gray-600 text-sm">{location}</p>
                <p className="text-xs bg-gray-100 inline-block px-3 py-1 rounded-full">
                    {category}
                </p>

                <div className="flex justify-between items-center pt-3">
                    <span className="font-semibold text-primary">
                        {membershipFee === 0 ? "Free" : `$${membershipFee}`}
                    </span>

                    <Link to={`/club-details/${_id}`} className="btn btn-sm btn-outline">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;
