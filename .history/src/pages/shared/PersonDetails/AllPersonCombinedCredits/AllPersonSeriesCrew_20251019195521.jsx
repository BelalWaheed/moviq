import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
    getSeriesDetails,
    setSeriesId
} from "../../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { GetSeriesAggregateCredits } from "../../../../redux/SeriesSlices/GetSeriesAggregateCredits";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MovieLoader from "../../../loading/MovieLoader";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";

const AllPersonSeriesCrew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        personCombinedCreditsDetails,
        personCombinedCreditsDetailsLoading
    } = useSelector(state => state.personCombinedCreditsReducer);

    const { PersonDetails } = useSelector(state => state.PersonReducer);

    const [showHeaderButtons, setShowHeaderButtons] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [seriesCount, setSeriesCount] = useState(20);

    // Scroll To Top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [PersonDetails]);

    // Hide Header on Scroll
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

    // if page was updated
    useEffect(() => {
        dispatch(
            GetPersonCombinedCredits({
                personId: localStorage.getItem("personId")
            })
        );
        dispatch(
            GetPersonDetails({ personId: localStorage.getItem("personId") })
        );
    }, []);

    if (personCombinedCreditsDetailsLoading) return <MovieLoader />;

    //  remove same series
    const tvSeries =
        personCombinedCreditsDetails?.crew
            ?.filter(item => item.media_type === "tv")
            ?.filter(
                (value, index, self) =>
                    index === self.findIndex(t => t.id === value.id)
            ) || [];

    return (
        <div className="bg-black text-white min-h-screen pt-28 px-6 pb-20">
            {/* ===== Floating Back Button ===== */}
            <AnimatePresence>
                {showHeaderButtons && (
                    <div className="fixed top-[70px] left-0 w-full px-6 z-40 flex justify-between items-center py-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 
                                       px-5 py-2 rounded-full shadow-md hover:shadow-red-500/30 transition">
                            <ArrowRightIcon className="w-4 h-4 text-white rotate-180" />
                            <span className="text-white font-medium ">
                                Back
                            </span>
                        </button>
                    </div>
                )}
            </AnimatePresence>

            {/* ===== Person Info Section ===== */}
            <div
                className="flex flex-col md:flex-row gap-8 mt-10 mb-14 bg-zinc-900/60 
                           rounded-2xl p-6 shadow-xl backdrop-blur-xl">
                {/* Person Image */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                        src={
                            PersonDetails?.profile_path
                                ? `https://image.tmdb.org/t/p/w500${PersonDetails.profile_path}`
                                : "./Image-not-found.png"
                        }
                        alt={PersonDetails?.name}
                        className="w-56 h-72 md:w-64 md:h-80 object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Person Info Text */}
                <div className="flex-1 space-y-4 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-500">
                        {PersonDetails?.name} Series (Crew)
                    </h2>
                    {PersonDetails?.known_for_department && (
                        <p className="text-gray-400 text-lg">
                            {PersonDetails.known_for_department}
                        </p>
                    )}
                    {PersonDetails?.birthday && (
                        <p className="text-sm text-gray-500">
                            🎂 {PersonDetails.birthday}
                        </p>
                    )}
                </div>
            </div>

            {/* ===== Series Grid ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {tvSeries.slice(0, seriesCount).map((series, index) => (
                    <div key={index}>
                        <Card
                            onClick={() => {
                                dispatch(getSeriesDetails(series.id));
                                dispatch(setSeriesId(series.id));
                                dispatch(
                                    GetSeriesAggregateCredits({
                                        seriesId: series.id
                                    })
                                );
                                navigate("/seriesDetails");
                            }}
                            className="w-full shadow-lg rounded-xl overflow-hidden 
                                       hover:scale-[1.05] transition-transform cursor-pointer 
                                       group bg-zinc-900">
                            <div className="relative w-full aspect-[2/3] overflow-hidden">
                                <img
                                    src={
                                        series.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                                            : "./Image-not-found.png"
                                    }
                                    alt={series.name || series.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <CardBody className="p-3 text-white space-y-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-sm sm:text-base font-semibold truncate">
                                        {series.name || series.title}
                                    </h2>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaStar className="w-4 h-4 text-yellow-500" />
                                    <span className="font-semibold text-sm">
                                        {series.vote_average?.toFixed(1) || 0}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    {series.first_air_date ||
                                        series.release_date ||
                                        "N/A"}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

            {/* ✅ Show More / Show Less Buttons */}
            {tvSeries.length > 20 && (
                <div className="flex justify-center gap-4 mt-10">
                    {seriesCount < tvSeries.length && (
                        <button
                            onClick={() => setSeriesCount(seriesCount + 20)}
                            className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-red-500/40 transition">
                            Show More
                        </button>
                    )}
                    {seriesCount > 20 && (
                        <button
                            onClick={() => setSeriesCount(seriesCount - 20)}
                            className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-gray-500/40 transition">
                            Show Less
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllPersonSeriesCrew;
