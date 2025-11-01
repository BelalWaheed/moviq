import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaFilm, FaFire } from "react-icons/fa";

const CrewSection = () => {
    const { SeriesEpisodesData } = useSelector(
        state => state.SeriesEpisodesDataReducer
    );

    return (
        <div>
            {/* === Crew === */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Crew</h2>

                <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                    {SeriesEpisodesData?.crew?.slice(0, 10).map(star => (
                        <motion.div
                            key={star.id}
                            whileHover={{ scale: 1.05 }}
                            className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="h-56 w-full overflow-hidden">
                                <img
                                    src={
                                        star.profile_path
                                            ? `https://image.tmdb.org/t/p/w500${star.profile_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={star.name}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            <div className="p-2">
                                <h3 className="text-sm font-semibold truncate">
                                    {star.name}
                                </h3>

                                <p className="text-gray-400 text-xs truncate flex items-center gap-2">
                                    <FaFilm className="text-red-500" />{" "}
                                    {star.known_for_department}
                                </p>

                                <p className="text-gray-400 text-xs truncate flex items-center gap-2">
                                    <FaFire className="text-red-500" />{" "}
                                    Popularity: {star.popularity}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {SeriesEpisodesData?.crew?.length > 10 && (
                        <button
                            onClick={() => {}}
                            className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                            <span className="text-white text-lg font-bold">
                                +{SeriesEpisodesData.crew.length - 10}
                            </span>
                            <span className="text-sm text-gray-300">
                                Show More
                            </span>
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CrewSection;
