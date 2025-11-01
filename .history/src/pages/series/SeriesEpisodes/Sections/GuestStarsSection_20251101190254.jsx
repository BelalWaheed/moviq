import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaFilm, FaFire, FaUser } from "react-icons/fa";

const GuestStarsSection = () => {
    const { SeriesEpisodesData } = useSelector(
        state => state.SeriesEpisodesDataReducer
    );
    return (
        <div>
            {/* === Guest Stars === */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Guest Stars
                </h2>
                <div className="flex gap-6 overflow-x-auto scroll-indicator pb-4">
                    {SeriesEpisodesData?.guest_stars.map(star => (
                        <motion.div
                            key={star.id}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 w-56 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-transform duration-200 ease-in-out cursor-pointer">
                            <img
                                src={
                                    star.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${star.profile_path}`
                                        : "Image-not-found.png"
                                }
                                alt={star.name}
                                className="w-full h-56 object-cover object-top"
                            />
                            <div className="p-3 space-y-1">
                                <h3 className="text-base font-bold text-white truncate">
                                    {star.name}
                                </h3>
                                <p className="text-gray-400 text-sm truncate flex items-center gap-2">
                                    <FaUser className="text-red-500" />{" "}
                                    {star.character}
                                </p>
                                <p className="text-gray-400 text-sm truncate flex items-center gap-2">
                                    <FaFilm className="text-red-500" />{" "}
                                    {star.known_for_department}
                                </p>
                                <p className="text-gray-400 text-sm truncate flex items-center gap-2">
                                    <FaFire className="text-red-500" />{" "}
                                    Popularity: {star.popularity}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default GuestStarsSection;
