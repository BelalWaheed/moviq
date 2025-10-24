import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
const POSTER = path =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.png";

// Animation for each card
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function TopCard({ item, isSeries }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const posterPath = item.poster_path || item.backdrop_path || "";
    const title = isSeries ? item.name : item.title || "Untitled";
    const rating = item.vote_average
        ? Number(item.vote_average).toFixed(1)
        : "—";
    const date = isSeries
        ? item.first_air_date?.split("-")[0] || "—"
        : item.release_date?.split("-")[0] || "—";

    const handleClick = () => {
        if (isSeries) {
            dispatch(getSeriesDetails(item.id));
            localStorage.setItem("seriesId", item.id);
            navigate("/seriesDetails");
        } else {
            dispatch(getMovieDetails(item.id));
            navigate("/moviedetails");
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            className="w-full group">
            <Card
                onClick={handleClick}
                className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden cursor-pointer group bg-black transition-all duration-300">
                {/* Image */}
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-black">
                    <img
                        src={POSTER(posterPath)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                </div>

                {/* Info */}
                <CardBody className="p-3 text-white space-y-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base sm:text-lg font-bold truncate">
                            {title}
                        </h2>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex items-center gap-1">
                        <FaStar className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm">{rating}</span>
                    </div>

                    <p className="text-xs text-gray-400">{date}</p>
                </CardBody>
            </Card>
        </motion.div>
    );
}
