import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetSeriesSeasonsVideos } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsVideos";

const AllSeasonsVideos = () => {
    const { SeriesSeasonsVideosData } = useSelector(
        state => state.SeriesSeasonsVideosReducer
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [validVideos, setValidVideos] = useState([]);

    useEffect(() => {
        dispatch(
            GetSeriesSeasonsVideos({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    useEffect(() => {
        if (!SeriesSeasonsVideosData?.results) return;

        const checkThumbnails = async () => {
            const promises = SeriesSeasonsVideosData.results.map(async vid => {
                const imgUrl = `https://img.youtube.com/vi/${vid.key}/hqdefault.jpg`;
                try {
                    const res = await fetch(imgUrl, { method: "HEAD" });
                    if (res.ok) return vid;
                    return null;
                } catch {
                    return null;
                }
            });

            const results = await Promise.all(promises);
            setValidVideos(results.filter(Boolean));
        };

        checkThumbnails();
    }, [SeriesSeasonsVideosData]);

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [SeriesSeasonsVideosData]);

    return (
        <div className="min-h-screen bg-black text-white font-poppins px-6 py-10 max-w-6xl mx-auto">
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

            <div className="mt-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {validVideos.map(vid => (
                        <motion.div
                            key={vid.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35 }}
                            whileHover={{ scale: 1.04 }}
                            className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg shadow-red-900/10 cursor-pointer"
                            onClick={() =>
                                window.open(
                                    `https://www.youtube.com/watch?v=${vid.key}`,
                                    "_blank"
                                )
                            }>
                            <img
                                src={`https://img.youtube.com/vi/${vid.key}/hqdefault.jpg`}
                                alt={vid.name}
                                className="w-full h-full object-cover"
                                onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = "./Image-not-found.png";
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AllSeasonsVideos;
