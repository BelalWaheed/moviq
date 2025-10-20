import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetSeriesSeasonsAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesSesonsAggregateCredits";
import { motion, AnimatePresence } from "framer-motion";
import { GetPersonDetails } from "../../../redux/SeriesSlices/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SeriesSlices/GetPersonCombinedCredits";

function AllCrewPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        seasonsAggregateCreditsDetails,
        seasonsAggregateCreditsDetailsLoading,
        seasonsAggregateCreditsDetailsError
    } = useSelector(state => state.seriesSeasonsAggregateCreditsReducer);

    const [crewCount, setcrewCount] = useState(20);
    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [seasonsAggregateCreditsDetails]);

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesSeasonsAggregateCredits({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

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
                            All crew
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

            {/* ===== Grid of crew ===== */}
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 mt-6">
                {seasonsAggregateCreditsDetails?.crew
                    ?.filter(
                        (value, index, self) =>
                            index === self.findIndex(t => t.id === value.id)
                    )
                    ?.slice(0, crewCount)
                    ?.map((Worker, index) => (
                        <div
                            onClick={() => {
                                dispatch(
                                    GetPersonDetails({
                                        personId: Worker.id
                                    })
                                );
                                dispatch(
                                    GetPersonCombinedCredits({
                                        personId: Worker.id
                                    })
                                );
                                localStorage.setItem("personId", Worker.id);
                                navigate("/PersonalInfo");
                            }}
                            key={Worker.id}
                            className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <div className="h-36 w-full overflow-hidden">
                                <img
                                    src={
                                        Worker.profile_path
                                            ? `https://image.tmdb.org/t/p/w500${Worker.profile_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={Worker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <h2 className="text-sm font-semibold truncate">
                                    {Worker.name}
                                </h2>
                                <p className="text-gray-400 text-xs truncate">
                                    {Worker.roles?.[0]?.character ||
                                        "Unknown Role"}
                                </p>
                                <p className="text-gray-500 text-[10px] mt-1">
                                    Ep: {Worker.total_episode_count}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* ====== Buttons Section ====== */}
            <div className="flex justify-center gap-4 mt-10">
                {seasonsAggregateCreditsDetails?.crew.length > crewCount && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setcrewCount(crewCount + 20)}
                        className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-red-500/40 transition">
                        Show More
                    </motion.button>
                )}
                {crewCount > 20 && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setcrewCount(crewCount - 20)}
                        className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-gray-500/40 transition">
                        Show Less
                    </motion.button>
                )}
            </div>
        </div>
    );
}

export default AllCrewPage;
