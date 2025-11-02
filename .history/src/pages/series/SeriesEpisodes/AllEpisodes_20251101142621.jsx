import React, { useEffect } from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { FaStar, FaClock } from "react-icons/fa";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesSeasons } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasons";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";

const AllEpisodes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { seasonDetails } = useSelector(state => state.seriesSeasonsReducer);
    console.log("fuck niggers");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [seasonDetails]);

    useEffect(() => {
        dispatch(
            GetSeriesSeasons({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    // wrapper animation for staggered children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // each card animation
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-black min-h-screen px-6 py-10 text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">All Episode</h1>
                <Button
                    onClick={() => navigate("/SeasonDetails")}
                    color="gray"
                    className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-gray-500/30">
                    <IoArrowBackOutline className="w-5 h-5 text-white" />
                    Back
                </Button>
            </div>

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible">
                {seasonDetails?.episodes?.map(episode => (
                    <motion.div
                        key={episode.id}
                        variants={cardVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.35 }}>
                        <Card className="w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-xl cursor-pointer group">
                            {/* === Image === */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={
                                        episode.still_path
                                            ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={episode.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
                                />
                                <div className="absolute top-0 left-0 bg-red-600 opacity-50 text-white text-xs font-semibold px-3 py-1 rounded-br-xl">
                                    Ep {episode.episode_number}
                                </div>
                            </div>

                            {/* === Details === */}
                            <CardBody className="text-white space-y-2 p-4">
                                <div className="flex justify-between items-start gap-2">
                                    <h2 className="text-base font-medium truncate w-4/5">
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
                                                ? episode.vote_average.toFixed(
                                                      1
                                                  )
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
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AllEpisodes;
