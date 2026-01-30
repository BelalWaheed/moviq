import React, { useEffect } from "react";
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
import { GetSeriesEpisodesDetails } from "../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GuestStarsSection from "../SeriesEpisodes/Sections/GuestStarsSection";
import CrewSection from "./Sections/CrewSection";
import { FaCircleInfo } from "react-icons/fa6";
import CastSection from "./Sections/CastSection";
import MediaSection from "./Sections/MediaSection";
import UserRateSection from "./Sections/UserRateSection";

const EpisodeDetailsCard = () => {
    const dispatch = useDispatch();
    const { seriesId, seasonNumber, episodeNumber } = useParams();
    const { SeriesEpisodesData } = useSelector(
        state => state.SeriesEpisodesDataReducer
    );
    // scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [SeriesEpisodesData]);

    // Fetch episode data using URL params
    useEffect(() => {
        if (seriesId && seasonNumber && episodeNumber) {
            dispatch(
                GetSeriesEpisodesDetails({
                    seriesId: seriesId,
                    seasonNumber: seasonNumber,
                    episodeNumber: episodeNumber
                })
            );
        }
    }, [dispatch, seriesId, seasonNumber, episodeNumber]);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-poppins">
            {/* === Backdrop === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[350px] w-full">
                <img
                    src={`https://image.tmdb.org/t/p/w500${SeriesEpisodesData?.still_path}`}
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
                        {SeriesEpisodesData?.name}
                    </h1>
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                        <FaPlayCircle className="text-red-500" />
                        Episode {SeriesEpisodesData?.episode_number}
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
                            src={`https://image.tmdb.org/t/p/w500${SeriesEpisodesData?.still_path}`}
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
                            {SeriesEpisodesData?.overview}
                        </p>
                    </div>

                    {/* Episode Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                        <div className="flex items-center gap-3">
                            <FaHashtag className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Episode:
                                </strong>{" "}
                                {SeriesEpisodesData?.episode_number}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Air Date:
                                </strong>{" "}
                                {SeriesEpisodesData?.air_date}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClock className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Runtime:
                                </strong>{" "}
                                {SeriesEpisodesData?.runtime} min
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaStar className="text-yellow-500 text-lg" />
                            <span>
                                <strong className="text-red-500">
                                    Rating:
                                </strong>{" "}
                                {SeriesEpisodesData?.vote_average}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaFilm className="text-red-500 text-lg" />
                            <span>
                                <strong className="text-red-500">Type:</strong>{" "}
                                {SeriesEpisodesData?.episode_type}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <UserRateSection />

            {/* === Cast  === */}
            <CastSection />

            {/* === Guest Stars === */}
            <GuestStarsSection />

            {/* === Crew === */}
            <CrewSection />

            {/* === Media === */}
            <MediaSection />
        </div>
    );
};

export default EpisodeDetailsCard;
