import React, { useEffect } from "react";
import { FaCalendarAlt, FaStar, FaHashtag, FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesSeasons } from "../../../redux/SeriesSlices/GetSeriesSeasons";
import MovieLoader from "../../loading/MovieLoader";
import NotFound from "../../notFound/NotFound";
import { Button } from "@material-tailwind/react";
import { MdSlowMotionVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GetSeriesSeasonsAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesSesonsAggregateCredits";

const SeasonDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { seasonDetails, seasonDetailsLoading, seasonDetailsError } =
        useSelector(state => state.seriesSeasonsReducer);

    const {
        seasonsAggregateCreditsDetails,
        seasonsAggregateCreditsDetailsLoading,
        seasonsAggregateCreditsDetailsError
    } = useSelector(state => state.seriesSeasonsAggregateCreditsReducer);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [seasonDetails]);

    useEffect(() => {
        dispatch(
            GetSeriesSeasons({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
        dispatch(
            GetSeriesSeasonsAggregateCredits({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    return (
        <>
            {seasonDetailsError ? (
                <NotFound />
            ) : (
                <>
                    {seasonDetailsLoading ? (
                        <MovieLoader />
                    ) : (
                        <div className="w-full min-h-screen bg-black text-white font-poppins">
                            {/* === Backdrop Section === */}
                            <div className="relative h-[350px] w-full">
                                <img
                                    src={
                                        seasonDetails?.poster_path
                                            ? `https://image.tmdb.org/t/p/original${seasonDetails.poster_path}`
                                            : "/fallback-image.jpg"
                                    }
                                    alt="Season Poster"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                                        {seasonDetails?.name}
                                    </h1>
                                    <p className="text-sm text-gray-300 flex items-center gap-2">
                                        <FaFilm className="text-red-500" />
                                        Season {seasonDetails?.season_number}
                                    </p>
                                </div>
                            </div>

                            {/* === Season Details === */}
                            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Poster */}
                                <div className="flex justify-center md:justify-start">
                                    <div className="rounded-2xl overflow-hidden shadow-xl bg-[#0f0f0f]">
                                        <img
                                            src={
                                                seasonDetails?.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`
                                                    : "Image-not-found.png"
                                            }
                                            alt={seasonDetails?.name}
                                            className="object-cover w-[250px] md:w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Overview
                                        </h2>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {seasonDetails?.overview ||
                                                "No overview available for this season."}
                                        </p>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                                        <div className="flex items-center gap-3">
                                            <FaHashtag className="text-red-500 text-lg" />
                                            <span>
                                                <strong className="text-red-500">
                                                    Season:
                                                </strong>{" "}
                                                {seasonDetails?.season_number}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-red-500 text-lg" />
                                            <span>
                                                <strong className="text-red-500">
                                                    Air Date:
                                                </strong>{" "}
                                                {seasonDetails?.air_date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaStar className="text-yellow-500 text-lg" />
                                            <span>
                                                <strong className="text-red-500">
                                                    Rating:
                                                </strong>{" "}
                                                {seasonDetails?.vote_average}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaFilm className="text-red-500 text-lg" />
                                            <span>
                                                <strong className="text-red-500">
                                                    Episodes:
                                                </strong>{" "}
                                                {
                                                    seasonDetails?.episodes
                                                        ?.length
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            navigate("/seriesDetails")
                                        }
                                        color="gray"
                                        className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-gray-500/30">
                                        <MdSlowMotionVideo className="w-5 h-5 text-white" />
                                        Season Page
                                    </Button>
                                </div>
                            </div>

                            {/* === Cast Section === */}
                            {seasonsAggregateCreditsDetailsError ? (
                                <NotFound />
                            ) : (
                                <>
                                    {seasonsAggregateCreditsDetailsLoading ? (
                                        <MovieLoader />
                                    ) : (
                                        <>
                                            {seasonsAggregateCreditsDetails
                                                ?.cast?.length > 0 && (
                                                <section className="max-w-6xl mx-auto px-6 pb-20">
                                                    <h2 className="text-2xl font-bold mb-4 text-red-500">
                                                        Cast
                                                    </h2>
                                                    <div className="flex gap-4 overflow-x-auto pb-3 scroll-indicator">
                                                        {seasonsAggregateCreditsDetails.cast
                                                            .slice(0, 10)
                                                            .map(actor => (
                                                                <div
                                                                    key={
                                                                        actor.id
                                                                    }
                                                                    className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                                                                    <div className="h-56 w-full overflow-hidden">
                                                                        <img
                                                                            src={
                                                                                actor.profile_path
                                                                                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                                                    : "./Image-not-found.png"
                                                                            }
                                                                            alt={
                                                                                actor.name
                                                                            }
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="p-2">
                                                                        <h3 className="text-sm font-semibold truncate">
                                                                            {
                                                                                actor.name
                                                                            }
                                                                        </h3>
                                                                        <p className="text-gray-400 text-xs truncate">
                                                                            {actor
                                                                                .roles?.[0]
                                                                                ?.character ||
                                                                                "Unknown Role"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        {seasonsAggregateCreditsDetails
                                                            .cast.length >
                                                            10 && (
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        "/SeasonDetailsCast"
                                                                    )
                                                                }
                                                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl hover:bg-red-600 transition-colors duration-300">
                                                                <span className="text-white text-lg font-bold">
                                                                    +
                                                                    {seasonsAggregateCreditsDetails
                                                                        .cast
                                                                        .length -
                                                                        10}
                                                                </span>
                                                                <span className="text-sm text-gray-300">
                                                                    Show More
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </section>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default SeasonDetails;
