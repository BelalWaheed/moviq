import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../../../notFound/NotFound";
import MovieLoader from "../../../loading/MovieLoader";
import { GetPersonDetails } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import { GetSeriesEpisodesCredits } from "../../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesCredits";

const CastSection = () => {
    const {
        SeriesEpisodesCreditsData,
        SeriesEpisodesCreditsDataLoading,
        SeriesEpisodesCreditsDataError
    } = useSelector(state => state.SeriesEpisodesCreditsDataReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // if page was refreshing
    useEffect(() => {
        dispatch(
            GetSeriesEpisodesCredits({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber"),
                episodeNumber: localStorage.getItem("episodeNumber")
            })
        );
    }, []);
    return (
        <>
            {SeriesEpisodesCreditsDataError ? (
                <NotFound />
            ) : SeriesEpisodesCreditsDataLoading ? (
                <MovieLoader />
            ) : (
                <>
                    {/* CAST SECTION */}
                    {SeriesEpisodesCreditsData?.cast?.length > 0 && (
                        <section className="max-w-6xl mx-auto px-6 pb-20">
                            <h2 className="text-2xl font-bold mb-4 text-red-500">
                                Actors
                            </h2>
                            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                                {SeriesEpisodesCreditsData.cast
                                    .slice(0, 10)
                                    .map(actor => (
                                        <div
                                            onClick={() => {
                                                dispatch(
                                                    GetPersonDetails({
                                                        personId: actor.id
                                                    })
                                                );
                                                dispatch(
                                                    GetPersonCombinedCredits({
                                                        personId: actor.id
                                                    })
                                                );
                                                localStorage.setItem(
                                                    "personId",
                                                    actor.id
                                                );
                                                navigate("/PersonalInfo");
                                            }}
                                            key={actor.id}
                                            className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <div className="h-56 w-full overflow-hidden">
                                                <img
                                                    src={
                                                        actor.profile_path
                                                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                            : "./Image-not-found.png"
                                                    }
                                                    alt={actor.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-2">
                                                <h3 className="text-sm font-semibold truncate">
                                                    {actor.name}
                                                </h3>
                                                <p className="text-gray-400 text-xs truncate">
                                                    {actor.roles?.[0]
                                                        ?.character ||
                                                        "Unknown Role"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                {SeriesEpisodesCreditsData.cast.length > 10 && (
                                    <button
                                        // onClick={() =>
                                        //     navigate("/AllCastSeries")
                                        // }
                                        className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                        <span className="text-white text-lg font-bold">
                                            +
                                            {SeriesEpisodesCreditsData.cast
                                                .length - 10}
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
    );
};

export default CastSection;
