import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getSeriesDetails } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { GetSeriesSimilar } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesSimilar";

const SimilarSection = () => {
    const { SeriesSimilarDetails } = useSelector(
        state => state.SeriesSimilarReducer
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesSimilar({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Similars</h2>
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                {SeriesSimilarDetails?.results?.length > 0 ? (
                    SeriesSimilarDetails?.results?.map((similar, idx) => (
                        <div
                            key={idx}
                            className="hover:scale-105 transition duration-250 flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
                            onClick={() => {
                                localStorage.setItem("seriesId", similar.id);

                                dispatch(getSeriesDetails(similar.id));
                                navigate("/seriesDetails");
                            }}>
                            <img
                                src={
                                    similar.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${similar.poster_path}`
                                        : "/Image-not-found.png"
                                }
                                alt={similar.name}
                                className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                                    {similar.name}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    <span className="text-red-500 font-semibold">
                                        Air Date:
                                    </span>{" "}
                                    {similar.first_air_date || "N/A"}
                                </p>

                                <p className="text-gray-400 text-xs sm:text-sm">
                                    <span className="text-red-500 font-semibold">
                                        Rating:
                                    </span>{" "}
                                    {similar.vote_average || 0} ⭐
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                        <p className="text-gray-400 text-lg font-medium">
                            ❌ No Similars available for this series.
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            This Similar doesn’t have any information.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SimilarSection;
