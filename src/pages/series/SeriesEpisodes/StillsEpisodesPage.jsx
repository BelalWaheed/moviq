import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import ImagePreview from "../SeriesImages/Preview/ImagePreview";
import { GetSeriesEpisodesImages } from "../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesImages";

const StillsEpisodesPage = () => {
    const { SeriesEpisodesImages } = useSelector(
        state => state.SeriesEpisodesImagesReducer
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesEpisodesImages({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber"),
                episodeNumber: localStorage.getItem("episodeNumber")
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
    }, [SeriesEpisodesImages]);

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
                            stills
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

            {/* ===== Grid of stills ===== */}
            <div className="mt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {SeriesEpisodesImages?.stills?.map((img, idx) => (
                    <motion.div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="rounded-2xl overflow-hidden bg-[#1a1a1a] hover:scale-105 cursor-pointer transition-transform duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                            alt="still"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                ))}
                {/* image preview */}
                <ImagePreview
                    image={selectedImage}
                    onClick={() => setSelectedImage(null)}
                />
            </div>
        </div>
    );
};

export default StillsEpisodesPage;
