import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesSeasons } from "../../../redux/SeriesSlices/GetSeriesSeasons";
import { GetSeriesSeasonsAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesSesonsAggregateCredits";
import { useNavigate } from "react-router-dom";
import {
    getSeriesDetails,
    setSeriesId
} from "../../../redux/SeriesSlices/GetSeriesDetails";
import { GetSeriesAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesAggregateCredits";
import { GetPersonCombinedCredits } from "../../../redux/SeriesSlices/GetPersonCombinedCredits";

const PersonCombinedCredits = () => {
    const {
        personCombinedCreditsDetails,
        personCombinedCreditsDetailsLoading,
        personCombinedCreditsDetailsError
    } = useSelector(state => state.personCombinedCreditsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" }
        }
    };

    //if the page was updated
    useEffect(() => {
        dispatch(
            GetPersonCombinedCredits({
                personId: localStorage.getItem("personId")
            })
        );
        dispatch(getSeriesDetails(localStorage.getItem("seriesId")));
        dispatch(getSeriesDetails(localStorage.getItem("seriesId")));
        dispatch(setSeriesId(localStorage.getItem("seriesId")));
        dispatch(
            GetSeriesAggregateCredits({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Cast</h2>
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                {personCombinedCreditsDetailsLoading ? (
                    <span className="loader"></span>
                ) : personCombinedCreditsDetails?.cast.length > 0 ? (
                    personCombinedCreditsDetails.cast.map((season, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
                            onClick={() => {
                                if (season.media_type === "tv") {
                                    const targetId =
                                        personCombinedCreditsDetails?.cast.find(
                                            x => x.id === season.id
                                        );

                                    dispatch(getSeriesDetails(targetId.id));

                                    dispatch(setSeriesId(targetId.id));
                                    dispatch(
                                        GetSeriesAggregateCredits({
                                            seriesId: targetId.id
                                        })
                                    );
                                    localStorage.setItem(
                                        "seriesId",
                                        targetId.id
                                    );
                                    navigate("/SeriesDetails");
                                }
                            }}>
                            <img
                                src={
                                    season.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                                        : "/Image-not-found.png"
                                }
                                alt={season.title || season.name}
                                className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                                    {season.title || season.name}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    <span className="text-red-500 font-semibold">
                                        Air Date:
                                    </span>{" "}
                                    {season.release_date ||
                                        season.first_air_date ||
                                        "N/A"}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    <span className="text-red-500 font-semibold">
                                        Type:
                                    </span>{" "}
                                    {season.media_type || "N/A"}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    {season.media_type === "tv" ? (
                                        <>
                                            <span className="text-red-500 font-semibold">
                                                Episodes:
                                                {season.episode_count}
                                            </span>{" "}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    <span className="text-red-500 font-semibold">
                                        Rating:
                                    </span>{" "}
                                    {season.vote_average || 0} ⭐
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                        <p className="text-gray-400 text-lg font-medium">
                            ❌ No seasons available for this series.
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            This series doesn’t have any season information.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PersonCombinedCredits;
