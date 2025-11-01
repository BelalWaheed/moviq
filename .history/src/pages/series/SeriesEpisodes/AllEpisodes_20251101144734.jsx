// Updated AllEpisodes component with smaller image and added details
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

            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-items-center container mx-auto">
                {seasonDetails?.episodes?.map((episode, index) => (
                    <motion.div
                        key={episode.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: index * 0.01 }}
                        variants={cardVariants}
                        className="w-full">
                        <Card className="w-full max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group bg-black">
                            <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-black">
                                <img
                                    src={
                                        episode.still_path
                                            ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={episode.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <CardBody className="p-3 text-white space-y-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-base  font-bold truncate">
                                        {episode.name}
                                    </h2>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                </div>

                                {/* <div className="text-xs text-gray-400 max-h-10 overflow-y-auto pr-1 custom-scroll scroll-indicator">
                                    {episode.overview}
                                </div> */}

                                <div className="flex items-center justify-between text-xs text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <CalendarDaysIcon className="w-4 h-4" />
                                        {episode.air_date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock className="w-3 h-3" />{" "}
                                        {episode.runtime}m
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar className="w-4 h-4" />
                                        <span className="font-semibold">
                                            {episode.vote_average}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        Episode: #{episode.episode_number}
                                    </span>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllEpisodes;
