import React from "react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { FaStar, FaClock } from "react-icons/fa";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllEpisodes = () => {
    const navigate = useNavigate();
    const { seasonDetails, seasonDetailsLoading, seasonDetailsError } =
        useSelector(state => state.seriesSeasonsReducer);

    return (
        <div className="bg-black min-h-screen px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mb-8 text-red-500">
                All Episodes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {seasonDetails?.episodes?.map(episode => (
                    <Card
                        key={episode.id}
                        className="w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-xl 
                                hover:scale-105 transition-transform duration-300 cursor-pointer group">
                        {/* === Image === */}
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                                src={
                                    episode.still_path
                                        ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                        : "./Image-not-found.png"
                                }
                                alt={episode.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-br-xl">
                                S{episode.season_number} · Ep
                                {episode.episode_number}
                            </div>
                        </div>

                        {/* === Details === */}
                        <CardBody className="text-white space-y-2 p-4">
                            <div className="flex justify-between items-start gap-2">
                                <h2 className="text-base font-bold truncate w-4/5">
                                    {episode.name}
                                </h2>
                                <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <CalendarDaysIcon className="w-4 h-4" />
                                <span>{episode.air_date || "Unknown"}</span>
                            </div>

                            <div className="flex items-center justify-between text-gray-400 text-sm">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-500" />
                                    <span>
                                        {episode.vote_average
                                            ? episode.vote_average.toFixed(1)
                                            : "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaClock className="text-gray-400" />
                                    <span>
                                        {episode.runtime
                                            ? `${episode.runtime} min`
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 line-clamp-3">
                                {episode.overview || "No overview available."}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AllEpisodes;
