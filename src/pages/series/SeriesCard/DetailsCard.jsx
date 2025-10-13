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

const DetailsCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedSeriesDetails, detailsLoading, detailsError } = useSelector(
        state => state.seriesDetailsReducer
    );

    const [isTrailerOn, setIsTrailerOn] = useState(false);

    const { seriesTrailerData } = useSelector(
        state => state.seriesTrailerReducer
    );

    if (detailsError) return <NotFound />;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [selectedSeriesDetails]);

    useEffect(() => {
        if (selectedSeriesDetails?.id) {
            localStorage.setItem("seriesId", selectedSeriesDetails.id);
        }
    }, [selectedSeriesDetails]);

    useEffect(() => {
        const storedId = localStorage.getItem("seriesId");

        dispatch(getSeriesDetails(storedId));
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-poppins">
            {detailsLoading ? (
                <MovieLoader />
            ) : (
                <>
                    {/* Backdrop Image */}
                    <div className="relative h-[400px] w-full">
                        <img
                            src={`https://image.tmdb.org/t/p/original${selectedSeriesDetails?.backdrop_path}`}
                            alt="Backdrop"
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                        {/* Title */}
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                                {selectedSeriesDetails?.name}
                            </h1>
                            <p className="text-sm text-gray-300 flex items-center gap-2">
                                <FaCalendarAlt className="text-red-500" />
                                First aired:{" "}
                                {selectedSeriesDetails?.first_air_date} • Last
                                aired: {selectedSeriesDetails?.last_air_date}
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Poster */}
                        <div className="flex justify-center md:justify-start">
                            <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${selectedSeriesDetails?.poster_path}`}
                                    alt="Poster"
                                    className="object-cover w-[250px] md:w-full h-full"
                                />
                            </Card>
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
                            {/* Overview */}
                            <Typography
                                variant="h2"
                                className="text-white font-bold tracking-wide">
                                Overview
                            </Typography>
                            <Typography className="text-gray-300 leading-relaxed text-lg">
                                {selectedSeriesDetails?.overview}
                            </Typography>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 text-gray-300 mt-4">
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
                                    <PlayIcon className="w-5 h-5 text-red-500" />
                                    <span>
                                        <strong className="text-red-500">
                                            Genres:
                                        </strong>{" "}
                                        {selectedSeriesDetails?.genres.map(
                                            gen => (
                                                <span
                                                    key={gen.id}
                                                    className="ml-1">
                                                    {gen.name}
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
                                            Episode Duration:
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
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">
                                        Status:
                                    </span>
                                    <span>{selectedSeriesDetails?.status}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={() => {
                                        dispatch(
                                            getSeriesTrailer(
                                                selectedSeriesDetails?.id
                                            )
                                        );
                                        setIsTrailerOn(true);
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
                        </div>
                    </div>
                    {isTrailerOn ? (
                        <>
                            {seriesTrailerData ? (
                                <>
                                    {/* Trailer Iframe Section */}
                                    <div className="pb-10 px-12 w-full flex justify-center">
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
                                    </div>
                                </>
                            ) : (
                                <div className="mx-auto mt-10 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
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
                                        Sorry, we couldn’t find a trailer for
                                        this show.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
};

export default DetailsCard;
