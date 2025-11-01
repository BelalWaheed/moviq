import React from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaStar,
    FaHashtag,
    FaRegIdBadge,
    FaPlayCircle,
    FaUser,
    FaFire,
    FaFilm
} from "react-icons/fa";
import { motion } from "framer-motion";

const EpisodeDetailsCard = () => {
    const episode = {
        id: 3727904,
        air_date: "2023-01-23",
        episode_number: 1,
        name: "The Beginning",
        overview:
            "This episode dives deep into the story, introducing key characters and setting the tone for the rest of the season. A powerful start full of twists and emotions.",
        runtime: 45,
        vote_average: 8.2,
        episode_type: "standard",
        still_path:
            "https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        guest_stars: [
            {
                id: 1,
                name: "John Doe",
                character: "Agent Smith",
                profile_path: "https://randomuser.me/api/portraits/men/1.jpg",
                department: "Acting",
                popularity: 68.5
            },
            {
                id: 2,
                name: "Jane Smith",
                character: "Sarah Connor",
                profile_path: "https://randomuser.me/api/portraits/women/2.jpg",
                department: "Acting",
                popularity: 72.1
            },
            {
                id: 3,
                name: "Mike Ross",
                character: "Hunter",
                profile_path: "https://randomuser.me/api/portraits/men/3.jpg",
                department: "Guest",
                popularity: 51.3
            }
        ]
    };
    // scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [seasonDetails]);

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesEpisodesDetails({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber"),
                episodeNumber: localStorage.getItem("episodeNumber")
            })
        );
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-poppins">
            {/* === Backdrop === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[350px] w-full">
                <img
                    src={episode.still_path}
                    alt="Backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="absolute bottom-6 left-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                        {episode.name}
                    </h1>
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                        <FaPlayCircle className="text-red-500" />
                        Episode {episode.episode_number}
                    </p>
                </motion.div>
            </motion.div>

            {/* === Main Content === */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Poster */}
                <div className="flex justify-center md:justify-start">
                    <div className="rounded-2xl overflow-hidden shadow-xl bg-[#0f0f0f]">
                        <img
                            src={episode.still_path}
                            alt="Episode Poster"
                            className="object-cover w-[250px] md:w-full h-full"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
                    {/* Overview */}
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide mb-2">
                            Overview
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {episode.overview}
                        </p>
                    </div>

                    {/* Episode Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                        <div className="flex items-center gap-3">
                            <FaRegIdBadge className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">ID:</strong>{" "}
                                {episode.id}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaHashtag className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Episode:
                                </strong>{" "}
                                {episode.episode_number}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Air Date:
                                </strong>{" "}
                                {episode.air_date}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClock className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Runtime:
                                </strong>{" "}
                                {episode.runtime} min
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaStar className="text-yellow-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Rating:
                                </strong>{" "}
                                {episode.vote_average}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaFilm className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">Type:</strong>{" "}
                                {episode.episode_type}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* === Guest Stars === */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Guest Stars
                </h2>
                <div className="flex gap-6 overflow-x-auto scroll-indicator pb-4">
                    {episode.guest_stars.map(star => (
                        <motion.div
                            key={star.id}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 w-56 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-transform duration-200 ease-in-out cursor-pointer">
                            <img
                                src={star.profile_path}
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
                                    {star.department}
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

export default EpisodeDetailsCard;
