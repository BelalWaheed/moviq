import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../../notFound/NotFound";
import MovieLoader from "../../loading/MovieLoader";
import { GetSeriesAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesAggregateCredits";
import { GetPersonDetails } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";

const Cast_And_CrewSection = () => {
    const {
        SeriesAggregateCreditsDetails,
        SeriesAggregateCreditsDetailsLoading,
        SeriesAggregateCreditsDetailsError
    } = useSelector(state => state.SeriesAggregateCreditsReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // if page was refreshing
    useEffect(() => {
        dispatch(
            GetSeriesAggregateCredits({
                seriesId: localStorage.getItem("seriesId")
            })
        );
        // dispatch(
        //     GetPersonDetails({
        //         personId: localStorage.getItem("personId")
        //     })
        // );
    }, []);
    return (
        <>
            {SeriesAggregateCreditsDetailsError ? (
                <NotFound />
            ) : SeriesAggregateCreditsDetailsLoading ? (
                <MovieLoader />
            ) : (
                <>
                    {/* CAST SECTION */}
                    {SeriesAggregateCreditsDetails?.cast?.length > 0 && (
                        <section className="max-w-6xl mx-auto px-6 pb-20">
                            <h2 className="text-2xl font-bold mb-4 text-red-500">
                                All actors in this work
                            </h2>
                            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                                {SeriesAggregateCreditsDetails.cast
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

                                {SeriesAggregateCreditsDetails.cast.length >
                                    10 && (
                                    <button
                                        onClick={() =>
                                            navigate("/AllCastSeries")
                                        }
                                        className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                        <span className="text-white text-lg font-bold">
                                            +
                                            {SeriesAggregateCreditsDetails.cast
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
                    {/* CREW SECTION */}
                    {SeriesAggregateCreditsDetails?.crew?.length > 0 && (
                        <section className="max-w-6xl mx-auto px-6 pb-20">
                            <h2 className="text-2xl font-bold mb-4 text-red-500">
                                All crew in this work
                            </h2>
                            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                                {SeriesAggregateCreditsDetails.crew
                                    .slice(0, 10)
                                    .map((worker, index) => (
                                        <div
                                            onClick={() => {
                                                dispatch(
                                                    GetPersonDetails({
                                                        personId: worker.id
                                                    })
                                                );
                                                dispatch(
                                                    GetPersonCombinedCredits({
                                                        personId: worker.id
                                                    })
                                                );
                                                localStorage.setItem(
                                                    "personId",
                                                    worker.id
                                                );
                                                navigate("/PersonalInfo");
                                            }}
                                            key={index}
                                            className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <div className="h-56 w-full overflow-hidden">
                                                <img
                                                    src={
                                                        worker.profile_path
                                                            ? `https://image.tmdb.org/t/p/w500${worker.profile_path}`
                                                            : "./Image-not-found.png"
                                                    }
                                                    alt={worker.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-2">
                                                <h3 className="text-sm font-semibold truncate">
                                                    {worker.name}
                                                </h3>
                                                {worker.jobs?.map(job => (
                                                    <p
                                                        key={job.credit_id}
                                                        className="text-gray-400 text-xs truncate">
                                                        {job.job ||
                                                            "Unknown Role"}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                {SeriesAggregateCreditsDetails.crew.length >
                                    10 && (
                                    <button
                                        onClick={() =>
                                            navigate("/AllCrewSeries")
                                        }
                                        className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                        <span className="text-white text-lg font-bold">
                                            +
                                            {SeriesAggregateCreditsDetails.crew
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

export default Cast_And_CrewSection;
