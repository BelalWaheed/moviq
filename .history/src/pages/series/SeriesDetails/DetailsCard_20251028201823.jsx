import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import {
    FaCalendarAlt,
    FaLayerGroup,
    FaListUl,
    FaGlobe,
    FaClock,
    FaStar,
    FaFlag
} from "react-icons/fa";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MovieLoader from "../../loading/MovieLoader";
import NotFound from "../../notFound/NotFound";
import { getSeriesTrailer } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer";
import { getSeriesDetails } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { motion } from "framer-motion";
import { FaBuildingFlag } from "react-icons/fa6";

import NetworksSection from "./NetworksSection";
import ProductionCompaniesSection from "./ProductionCompaniesSection";
import TrailersSection from "./TrailersSection";
import SeasonsSection from "./SeasonsSection";
import { IoArrowBackOutline } from "react-icons/io5";

import Cast_And_CrewSection from "./Cast_And_CrewSection";
import RecommendationsSection from "./RecommendationsSection";
import ExternalLinksSection from "./ExternalLinksSection";
import MediaSection from "./MediaSection";
import SimilarSection from "./SimilarSection";
import ReviewsSection from "./ReviewsSection";
import WatchProvidersSection from "./WatchProvidersSection";

const DetailsCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedSeriesDetails, detailsLoading, detailsError } = useSelector(
        state => state.seriesDetailsReducer
    );

    const [isTrailerOn, setIsTrailerOn] = useState(false);

    //for scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [selectedSeriesDetails]);

    //if the page was updated
    useEffect(() => {
        const storedId = localStorage.getItem("seriesId");

        dispatch(getSeriesDetails(storedId));
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-poppins overflow-x-hidden">
            {detailsError ? (
                <NotFound />
            ) : detailsLoading ? (
                <MovieLoader />
            ) : (
                <>
                    {/* === Backdrop === */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] w-full">
                        <img
                            src={`https://image.tmdb.org/t/p/original${selectedSeriesDetails?.backdrop_path}`}
                            alt="Backdrop"
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="absolute bottom-6 left-6">
                            <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                                {selectedSeriesDetails?.name}
                            </h1>
                            <p className="text-sm text-gray-300 flex items-center gap-2">
                                <FaCalendarAlt className="text-red-500" />
                                First aired:{" "}
                                {selectedSeriesDetails?.first_air_date} • Last
                                aired: {selectedSeriesDetails?.last_air_date}
                            </p>
                        </motion.div>
                    </motion.div>
                    {/* === Main Content === */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Poster */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="flex justify-center md:justify-start">
                            <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
                                <img
                                    src={
                                        selectedSeriesDetails?.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${selectedSeriesDetails?.poster_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt="Poster"
                                    className="object-cover w-[250px] md:w-full h-full"
                                />
                            </Card>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="md:col-span-2 space-y-6 flex flex-col justify-center">
                            <Typography
                                variant="h2"
                                className="text-white font-bold tracking-wide">
                                Overview
                            </Typography>
                            <Typography className="text-gray-300 leading-relaxed text-lg">
                                {selectedSeriesDetails?.overview}
                            </Typography>

                            {/* Stats */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 }
                                }}
                                className="flex flex-wrap gap-6 text-gray-300 mt-4">
                                {/* Existing Stats */}
                                <div className="flex items-center gap-2">
                                    <FaLayerGroup className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Seasons:
                                        </strong>{" "}
                                        {
                                            selectedSeriesDetails?.number_of_seasons
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaListUl className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Episodes:
                                        </strong>{" "}
                                        {
                                            selectedSeriesDetails?.number_of_episodes
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBuildingFlag className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Production Country:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.production_countries?.map(
                                            (country, inx) => (
                                                <span key={inx}>
                                                    {country.name}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PlayIcon className="w-5 h-5 text-red-500" />
                                    <span>
                                        <strong className="text-red-500">
                                            Genres:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.genres?.map(
                                            g => (
                                                <span
                                                    key={g.id}
                                                    className="ml-1">
                                                    {g.name}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGlobe className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Language:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.original_language?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaFlag className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Country:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.origin_country?.join(
                                            ", "
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Duration:
                                        </strong>{" "}
                                        {
                                            selectedSeriesDetails
                                                ?.episode_run_time?.[0]
                                        }{" "}
                                        min
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaStar className="text-red-500 text-lg" />
                                    <span>
                                        <strong className="text-red-500">
                                            Rating:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.vote_average} ⭐
                                        ({selectedSeriesDetails?.vote_count}{" "}
                                        votes)
                                    </span>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={() => {
                                        dispatch(
                                            getSeriesTrailer(
                                                selectedSeriesDetails?.id
                                            )
                                        );
                                        setIsTrailerOn(!isTrailerOn);
                                    }}
                                    color="red"
                                    className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-red-500/30">
                                    <PlayIcon className="w-5 h-5 text-white" />
                                    Watch Trailer
                                </Button>

                                <Button
                                    onClick={() => navigate("/series")}
                                    color="gray"
                                    className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-gray-500/30">
                                    <IoArrowBackOutline className="w-5 h-5 text-white" />
                                    Series Page
                                </Button>
                            </div>

                            {/*  External Links Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col w-full sm:w-3/4 mt-8 ">
                                <div className="flex items-center gap-3 mb-4">
                                    <PlayIcon className="w-6 h-6 text-red-500" />
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                                        Official & Social Links
                                    </h2>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">
                                    Official and social media links related to
                                    this series
                                </p>

                                <ExternalLinksSection />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <div className="flex justify-center items-center">
                        <WatchProvidersSection />
                    </div>
                    {/* === Trailer Section === */}
                    <TrailersSection isTrailerOn={isTrailerOn} />

                    {/* Reviews Section */}
                    <ReviewsSection />

                    {/* Cast_And_Crew */}
                    <Cast_And_CrewSection />

                    {/* Media */}
                    <MediaSection />

                    {/* === Networks === */}
                    <NetworksSection />

                    {/* === Production Companies === */}
                    <ProductionCompaniesSection />

                    {/* === Seasons Section === */}
                    <SeasonsSection />

                    {/* Similar Section */}
                    <SimilarSection />

                    {/* Recommendations Section */}
                    <RecommendationsSection />
                </>
            )}
        </div>
    );
};

export default DetailsCard;
