import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getSeriesDetails,
    setSeriesId
} from "../../../../redux/SeriesSlices/GetSeriesDetails";
import { GetSeriesAggregateCredits } from "../../../../redux/SeriesSlices/GetSeriesAggregateCredits";
import { GetPersonCombinedCredits } from "../../../../redux/SeriesSlices/GetPersonCombinedCredits";

const CrewMoviesPersonCombinedCredits = ({ PersonDetailsname }) => {
    const {
        personCombinedCreditsDetails,
        personCombinedCreditsDetailsLoading
    } = useSelector(state => state.personCombinedCreditsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            GetPersonCombinedCredits({
                personId: localStorage.getItem("personId")
            })
        );
        dispatch(getSeriesDetails(localStorage.getItem("seriesId")));
        dispatch(setSeriesId(localStorage.getItem("seriesId")));
        dispatch(
            GetSeriesAggregateCredits({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    //  remove same movies
    const uniqueMovies =
        personCombinedCreditsDetails?.crew
            ?.filter(item => item.media_type === "movie")
            ?.filter(
                (value, index, self) =>
                    index === self.findIndex(t => t.id === value.id)
            ) || [];

    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-medium mb-6 text-red-500">
                Movies in which{" "}
                <span className="font-bold">{PersonDetailsname}</span> worked as
                crew
            </h2>
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                {personCombinedCreditsDetailsLoading ? (
                    <span className="loader"></span>
                ) : uniqueMovies.length > 0 ? (
                    <>
                        {uniqueMovies.slice(0, 10).map((movie, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "/Image-not-found.png"
                                    }
                                    alt={movie.title || movie.name}
                                    className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
                                />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-white truncate">
                                        {movie.title || movie.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm">
                                        <span className="text-red-500 font-semibold">
                                            Air Date:
                                        </span>{" "}
                                        {movie.release_date ||
                                            movie.first_air_date ||
                                            "N/A"}
                                    </p>
                                    <p className="text-gray-400 text-xs sm:text-sm">
                                        <span className="text-red-500 font-semibold">
                                            Type:
                                        </span>{" "}
                                        {movie.media_type || "N/A"}
                                    </p>
                                    <p className="text-gray-400 text-xs sm:text-sm">
                                        <span className="text-red-500 font-semibold">
                                            Rating:
                                        </span>{" "}
                                        {movie.vote_average || 0} ⭐
                                    </p>
                                </div>
                            </div>
                        ))}

                        {uniqueMovies.length > 10 && (
                            <button
                                onClick={() => navigate("/AllPersonMoviesCrew")}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +{uniqueMovies.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </>
                ) : (
                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                        <p className="text-gray-400 text-lg font-medium">
                            ❌ No movies available for this person.
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            This crew member doesn’t have any movie information.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CrewMoviesPersonCombinedCredits;
