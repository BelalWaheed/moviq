import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";

const EpisodesListSection = () => {
    const { seasonDetails } = useSelector(state => state.seriesSeasonsReducer);
    const navigate = useNavigate();

    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Episodes</h2>
            <div className="flex gap-4 scroll-indicator overflow-x-auto overflow-y-hidden pb-4">
                {seasonDetails?.episodes?.slice(0, 10).map(ep => (
                    <div
                        key={ep.id}
                        className="
                flex-shrink-0
                w-[45%] sm:w-[38%] md:w-[28%] lg:w-[22%]
                bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800 cursor-pointer
            ">
                        <div className="relative">
                            <img
                                src={
                                    ep.still_path
                                        ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                                        : "/Image-not-found.png"
                                }
                                alt={ep.name}
                                className="w-full h-40 object-cover object-top"
                            />
                            <div className="absolute top-0 left-0 bg-red-600 opacity-70 text-white text-xs font-semibold px-3 py-1 rounded-br-xl">
                                Ep {ep.episode_number}
                            </div>
                        </div>

                        <div className="p-3 space-y-2">
                            <h3 className="text-lg font-medium truncate">
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
                        </div>
                    </div>
                ))}
                {seasonDetails?.episodes.length > 10 && (
                    <button
                        onClick={() => navigate("/AllEpisode")}
                        className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer p-4">
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
