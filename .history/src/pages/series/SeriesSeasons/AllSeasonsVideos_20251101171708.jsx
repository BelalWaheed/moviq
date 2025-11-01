import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetSeriesSeasonsVideos } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsVideos";

const AllSeasonsVideos = () => {
    const { SeriesSeasonsVideosData, SeriesSeasonsVideosDataLoading } =
        useSelector(state => state.SeriesSeasonsVideosReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesSeasonsVideos({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    // Hide / Show header on scroll
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
    //for scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [SeriesSeasonsVideosData]);

    return (
        <div className="min-h-screen bg-black text-white font-poppins px-6 py-10 max-w-6xl mx-auto">
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
                            Backdrops
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/seriesDetails")}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 px-5 py-2 rounded-full shadow-md hover:shadow-red-500/30 transition">
                            <IoArrowBackOutline className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">Back</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== Grid of Images ===== */}
            <div className="mt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SeriesSeasonsVideosData?.results?.map(vid => (
                    <div
                        key={vid.id}
                        className="
      min-w-[250px] h-[150px] 
      sm:min-w-[300px] sm:h-[180px] 
      md:min-w-[400px] md:h-[220px] 
      lg:min-w-[500px] lg:h-[300px]
      bg-black rounded-2xl overflow-hidden flex-shrink-0 
      hover:scale-105 transition-transform duration-300
    ">
                        <iframe
                            src={`https://www.youtube.com/embed/${vid.key}?playsinline=1`}
                            title={vid.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full object-cover"></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllSeasonsVideos;
