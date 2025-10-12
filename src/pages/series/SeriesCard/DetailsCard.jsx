import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaLayerGroup, FaListUl } from "react-icons/fa";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSlowMotionVideo } from "react-icons/md";
import MovieLoader from "../../loading/MovieLoader";
import NotFound from "../../notFound/NotFound";
const DetailsCard = () => {
    const [seriesData, setSeriesData] = useState({
        backdrop_path: "",
        first_air_date: "",
        genres: [],
        last_air_date: "",
        name: "",
        number_of_episodes: 0,
        number_of_seasons: 0,
        poster_path: "",
        overview: ""
    });

    const navigate = useNavigate();

    const { selectedSeriesDetails, detailsLoading, detailsError } = useSelector(
        state => state.seriesDetailsReducer
    );

    if (detailsError) {
        return <NotFound />;
    }

    useEffect(() => {
        if (selectedSeriesDetails) {
            const {
                backdrop_path,
                first_air_date,
                genres,
                last_air_date,
                name,
                number_of_episodes,
                number_of_seasons,
                poster_path,
                overview
            } = selectedSeriesDetails;
            setSeriesData({
                backdrop_path,
                first_air_date,
                genres,
                last_air_date,
                name,
                number_of_episodes,
                number_of_seasons,
                poster_path,
                overview
            });
        }
    }, [selectedSeriesDetails]);

    return (
        <>
            <div className="relative w-full min-h-screen bg-black text-white font-poppins">
                {detailsLoading ? (
                    <MovieLoader />
                ) : (
                    <>
                        {/* Backdrop Image */}
                        <div className="relative h-[400px] w-full">
                            <img
                                src={`https://image.tmdb.org/t/p/original${seriesData?.backdrop_path}`}
                                alt="Backdrop"
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                            {/* Title */}
                            <div className="absolute bottom-6 left-6">
                                <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                                    {seriesData?.name}
                                </h1>
                                <p className="text-sm text-gray-300 flex items-center gap-2">
                                    <FaCalendarAlt className="text-red-500" />
                                    First aired: {seriesData?.first_air_date} •
                                    Last aired: {seriesData?.last_air_date}
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Poster */}
                            <div className="flex justify-center md:justify-start">
                                <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${seriesData?.poster_path}`}
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
                                    {seriesData?.overview}
                                </Typography>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 text-gray-300 mt-4">
                                    <div className="flex items-center gap-2">
                                        <FaLayerGroup className="text-red-500 text-lg" />
                                        <span>
                                            <strong className="text-red-500">
                                                Seasons:
                                            </strong>{" "}
                                            {seriesData?.number_of_seasons}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaListUl className="text-red-500 text-lg" />
                                        <span>
                                            <strong className="text-red-500">
                                                Episodes:
                                            </strong>{" "}
                                            {seriesData?.number_of_episodes}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PlayIcon className="w-5 h-5 text-red-500" />
                                        <span>
                                            <strong className="text-red-500">
                                                Genres:
                                            </strong>{" "}
                                            {seriesData?.genres.map(gen => (
                                                <p key={gen.id}>👉{gen.name}</p>
                                            ))}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button (optional for seriesData?) */}
                                <Button
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
                    </>
                )}
            </div>
        </>
    );
};

export default DetailsCard;
