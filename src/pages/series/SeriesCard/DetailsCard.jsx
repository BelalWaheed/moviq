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
import { MdSlowMotionVideo } from "react-icons/md";
import MovieLoader from "../../loading/MovieLoader";
import NotFound from "../../notFound/NotFound";
import { getSeriesTrailer } from "../../../redux/SeriesSlices/GetSeriesTrailer";
import { getSeriesDetails } from "../../../redux/SeriesSlices/GetSeriesDetails";
import { AnimatePresence, motion } from "framer-motion";
import { FaBuildingFlag } from "react-icons/fa6";
const DetailsCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedSeriesDetails, detailsLoading, detailsError } = useSelector(
        state => state.seriesDetailsReducer
    );
    const [seasonId, setSeasonId] = useState();

    const [isTrailerOn, setIsTrailerOn] = useState(false);

    const { seriesTrailerData } = useSelector(
        state => state.seriesTrailerReducer
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [selectedSeriesDetails]);

    useEffect(() => {
        const storedId = localStorage.getItem("seriesId");

        dispatch(getSeriesDetails(storedId));
    }, []);

    useEffect(() => {
        console.log(seasonId);
    }, [seasonId]);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-poppins">
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
                                    src={`https://image.tmdb.org/t/p/w500${selectedSeriesDetails?.poster_path}`}
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
                                        {selectedSeriesDetails?.production_countries.map(
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
                                        {selectedSeriesDetails?.genres.map(
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
                                    <MdSlowMotionVideo className="w-5 h-5 text-white" />
                                    Series Page
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                    {/* === Trailer Section === */}
                    <AnimatePresence>
                        {isTrailerOn && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.5 }}
                                className="pb-10 px-12 w-full flex justify-center">
                                {seriesTrailerData ? (
                                    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] rounded-2xl overflow-hidden shadow-lg border border-red-600">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${seriesTrailerData?.key}`}
                                            title="Trailer"
                                            allowFullScreen
                                            className="w-full h-full bg-black"
                                            style={{
                                                border: "none",
                                                outline: "none"
                                            }}></iframe>
                                    </div>
                                ) : (
                                    <div className="pb-10 px-12 mx-auto mt-10 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-gray-500 mb-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L15 12 9.75 7v10zM19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                            />
                                        </svg>
                                        <h2 className="text-gray-400 text-lg font-semibold mb-2">
                                            No Trailer Available
                                        </h2>
                                        <p className="text-gray-500 text-sm text-center max-w-xs">
                                            Sorry, we couldn’t find a trailer
                                            for this show.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* === Networks === */}
                    <section className="max-w-6xl mx-auto px-6 pb-10">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">
                            Networks
                        </h2>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {selectedSeriesDetails?.networks.length > 0 ? (
                                <>
                                    {selectedSeriesDetails?.networks.map(
                                        net => (
                                            <div
                                                key={net.id}
                                                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-[#0f0f0f] px-4 py-3 rounded-xl border border-gray-800 transition">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${net.logo_path}`}
                                                    alt={net.name}
                                                    className="h-14 w-auto max-w-[150px] object-contain"
                                                />
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                                        <p className="text-gray-400 text-lg font-medium">
                                            ❌ No Networks available for this
                                            series.
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            This series doesn’t have any
                                            Networks information.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* === Production Companies === */}
                    <section className="max-w-6xl mx-auto px-6 pb-10">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">
                            Production Companies
                        </h2>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {selectedSeriesDetails?.production_companies
                                .length > 0 ? (
                                <>
                                    {selectedSeriesDetails?.production_companies.map(
                                        comp => (
                                            <div
                                                key={comp.id}
                                                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-[#0f0f0f] px-4 py-3 rounded-xl border border-gray-800 transition">
                                                {comp.logo_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w200${comp.logo_path}`}
                                                        alt={comp.name}
                                                        className="h-14 w-auto max-w-[150px] object-contain"
                                                    />
                                                ) : (
                                                    <p className="text-gray-400 text-center text-sm">
                                                        {comp.name}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                                        <p className="text-gray-400 text-lg font-medium">
                                            ❌ No Production Companies available
                                            for this series.
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            This series doesn’t have any
                                            Production Companies information.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* === Seasons Section === */}
                    <section className="max-w-6xl mx-auto px-6 pb-20">
                        <h2 className="text-2xl font-bold mb-6 text-red-500">
                            Seasons
                        </h2>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {selectedSeriesDetails?.seasons.length > 0 ? (
                                <>
                                    {" "}
                                    {selectedSeriesDetails?.seasons?.map(
                                        (season, idx) => (
                                            <div
                                                onClick={() => {
                                                    setSeasonId(season.id);
                                                }}
                                                key={idx}
                                                className="flex-shrink-0
        cursor-pointer
                                        w-44 sm:w-56 md:w-64
        bg-[#0f0f0f]
        rounded-2xl
        overflow-hidden
        shadow-lg
        border border-gray-800
        transition-transform
        duration-200
        ease-in-out
        hover:scale-105">
                                                <img
                                                    src={
                                                        season.poster_path
                                                            ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                                                            : "/Image-not-found.png"
                                                    }
                                                    alt={season.name}
                                                    className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
                                                />
                                                <div className="p-4 space-y-2">
                                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                                                        {season.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-xs sm:text-sm">
                                                        <span className="text-red-500 font-semibold">
                                                            Air Date:
                                                        </span>{" "}
                                                        {season.air_date ||
                                                            "N/A"}
                                                    </p>
                                                    <p className="text-gray-400 text-xs sm:text-sm">
                                                        <span className="text-red-500 font-semibold">
                                                            Episodes:
                                                        </span>{" "}
                                                        {season.episode_count}
                                                    </p>
                                                    <p className="text-gray-400 text-xs sm:text-sm">
                                                        <span className="text-red-500 font-semibold">
                                                            Rating:
                                                        </span>{" "}
                                                        {season.vote_average ||
                                                            0}{" "}
                                                        ⭐
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                                        <p className="text-gray-400 text-lg font-medium">
                                            ❌ No seasons available for this
                                            series.
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            This series doesn’t have any season
                                            information.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default DetailsCard;
