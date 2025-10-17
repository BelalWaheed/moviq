import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";
const EpisodesListSection = () => {
    const { seasonDetails, seasonDetailsLoading, seasonDetailsError } =
        useSelector(state => state.seriesSeasonsReducer);

    const navigate = useNavigate();
    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Episodes</h2>
            <div className="flex gap-6 overflow-x-auto scroll-indicator pb-4">
                {seasonDetails?.episodes?.slice(0, 10).map(ep => (
                    <motion.div
                        key={ep.id}
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-transform duration-200 ease-in-out cursor-pointer">
                        <img
                            src={
                                ep.still_path
                                    ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                                    : "/Image-not-found.png"
                            }
                            alt={ep.name}
                            className="w-full h-40 object-cover object-top"
                        />
                        <div className="p-3 space-y-2">
                            <h3 className="text-lg font-bold truncate">
                                {ep.name}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FaStar className="text-yellow-500" />{" "}
                                {ep.vote_average}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FaCalendarAlt className="text-red-500" />{" "}
                                {ep.air_date}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <FaClock className="text-red-500" />{" "}
                                {ep.runtime} min
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2">
                                {ep.overview}
                            </p>
                        </div>
                    </motion.div>
                ))}
                {seasonDetails?.episodes.length > 10 && (
                    <button
                        onClick={() => navigate("/AllEpisode")}
                        className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl hover:bg-red-600 transition-colors duration-300">
                        <span className="text-white text-lg font-bold">
                            +{seasonDetails?.episodes.length - 10}
                        </span>
                        <span className="text-sm text-gray-300">Show More</span>
                    </button>
                )}
            </div>
        </section>
    );
};

export default EpisodesListSection;
