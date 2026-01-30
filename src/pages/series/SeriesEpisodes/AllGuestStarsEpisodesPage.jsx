import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetSeriesSeasonsAggregateCredits } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSesonsAggregateCredits";
import { motion, AnimatePresence } from "framer-motion";
import { GetPersonDetails } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import { FaUser, FaTheaterMasks } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { GetSeriesEpisodesDetails } from "../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesDetails";

function AllGuestStarsEpisodesPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { seriesId, seasonNumber, episodeNumber } = useParams();

    const { SeriesEpisodesData } = useSelector(
        state => state.SeriesEpisodesDataReducer
    );

    const [castCount, setCastCount] = useState(20);
    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [SeriesEpisodesData]);

    // Fetch using URL params
    useEffect(() => {
        if (seriesId && seasonNumber && episodeNumber) {
            dispatch(
                GetSeriesEpisodesDetails({
                    seriesId,
                    seasonNumber,
                    episodeNumber
                })
            );
        }
    }, [dispatch, seriesId, seasonNumber, episodeNumber]);

    // Hide / Show Buttons on Scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeaderButtons(
                !(currentScrollY > lastScrollY && currentScrollY > 100)
            );
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className="bg-black min-h-screen text-white px-6 pt-28 pb-10">
            {/* ===== Header Buttons (Fixed) ===== */}
            <AnimatePresence>
                {showHeaderButtons && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[70px] left-0 w-full px-6 z-40 flex justify-between items-center py-3">
                        <h1 className="text-3xl font-bold text-red-500 bg-black/30 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
                            All Guest Stars
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 px-5 py-2 rounded-full shadow-md hover:shadow-red-500/30 transition">
                            <IoArrowBackOutline className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">Back</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== Grid of Cast ===== */}
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 mt-6">
                {SeriesEpisodesData?.guest_stars
                    ?.slice(0, castCount)
                    ?.map(actor => (
                        <div
                            onClick={() => {
                                dispatch(
                                    GetPersonDetails({ personId: actor.id })
                                );
                                dispatch(
                                    GetPersonCombinedCredits({
                                        personId: actor.id
                                    })
                                );
                                navigate(`/person/${actor.id}`);
                            }}
                            key={actor.id}
                            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="h-36 w-full overflow-hidden">
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={actor.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-2 flex flex-col gap-[2px]">
                                {/* Name */}
                                <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
                                    <FaUser className="text-red-500 text-xs" />
                                    <span className="whitespace-normal">
                                        {actor.name}
                                    </span>
                                </div>

                                {/* Department */}
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                    <MdWork className="text-[10px]" />
                                    <span className="whitespace-normal">
                                        {actor.known_for_department ||
                                            "Unknown"}
                                    </span>
                                </div>

                                {/* Character */}
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                    <FaTheaterMasks className="text-[10px]" />
                                    <span className="whitespace-normal">
                                        {actor.character || "Unknown character"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* ====== Buttons Section ====== */}
            <div className="flex justify-center gap-4 mt-10">
                {SeriesEpisodesData?.guest_stars.length > castCount && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCastCount(castCount + 20)}
                        className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-red-500/40 transition">
                        Show More
                    </motion.button>
                )}
                {castCount > 20 && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCastCount(castCount - 20)}
                        className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-gray-500/40 transition">
                        Show Less
                    </motion.button>
                )}
            </div>
        </div>
    );
}

export default AllGuestStarsEpisodesPage;
