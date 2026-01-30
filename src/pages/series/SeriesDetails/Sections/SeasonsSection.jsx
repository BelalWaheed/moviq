import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesSeasons } from "../../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasons";
import { GetSeriesSeasonsAggregateCredits } from "../../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSesonsAggregateCredits";
import { useNavigate } from "react-router-dom";
import { GetSeriesSeasonsImages } from "../../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsImages";
import { GetSeriesSeasonsVideos } from "../../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsVideos";

const SeasonsSection = () => {
    const { selectedSeriesDetails } = useSelector(
        state => state.seriesDetailsReducer
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Seasons</h2>
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                {selectedSeriesDetails?.seasons.length > 0 ? (
                    selectedSeriesDetails.seasons.map((season, idx) => (
                        <div
                            key={idx}
                            className="hover:scale-105 transition duration-250 flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
                            onClick={() => {
                                dispatch(
                                    GetSeriesSeasons({
                                        seriesId: selectedSeriesDetails.id,
                                        seasonNumber: season.season_number
                                    })
                                );
                                dispatch(
                                    GetSeriesSeasonsAggregateCredits({
                                        seriesId: selectedSeriesDetails.id,
                                        seasonNumber: season.season_number
                                    })
                                );
                                dispatch(
                                    GetSeriesSeasonsImages({
                                        seriesId: selectedSeriesDetails.id,
                                        seasonNumber: season.season_number
                                    })
                                );
                                dispatch(
                                    GetSeriesSeasonsVideos({
                                        seriesId: selectedSeriesDetails.id,
                                        seasonNumber: season.season_number
                                    })
                                );
                                navigate(`/series/${selectedSeriesDetails.id}/season/${season.season_number}`);
                            }}>
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
                                    {season.air_date || "N/A"}
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
                                    {season.vote_average || 0} ⭐
                                </p>
                            </div>
                        </div>
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

export default SeasonsSection;
