import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../../notFound/NotFound";
import MovieLoader from "../../loading/MovieLoader";

const CastSection = () => {
    const {
        seasonsAggregateCreditsDetails,
        seasonsAggregateCreditsDetailsLoading,
        seasonsAggregateCreditsDetailsError
    } = useSelector(state => state.seriesSeasonsAggregateCreditsReducer);

    const navigate = useNavigate();

    return (
        <>
            {seasonsAggregateCreditsDetailsError ? (
                <NotFound />
            ) : seasonsAggregateCreditsDetailsLoading ? (
                <MovieLoader />
            ) : (
                seasonsAggregateCreditsDetails?.cast?.length > 0 && (
                    <section className="max-w-6xl mx-auto px-6 pb-20">
                        <h2 className="text-2xl font-bold mb-4 text-red-500">
                            Cast
                        </h2>
                        <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                            {seasonsAggregateCreditsDetails.cast
                                .slice(0, 10)
                                .map(actor => (
                                    <div
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
                                                {actor.roles?.[0]?.character ||
                                                    "Unknown Role"}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            {seasonsAggregateCreditsDetails.cast.length >
                                10 && (
                                <button
                                    onClick={() =>
                                        navigate("/SeasonDetailsCast")
                                    }
                                    className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                    <span className="text-white text-lg font-bold">
                                        +
                                        {seasonsAggregateCreditsDetails.cast
                                            .length - 10}
                                    </span>
                                    <span className="text-sm text-gray-300">
                                        Show More
                                    </span>
                                </button>
                            )}
                        </div>
                    </section>
                )
            )}
        </>
    );
};

export default CastSection;
