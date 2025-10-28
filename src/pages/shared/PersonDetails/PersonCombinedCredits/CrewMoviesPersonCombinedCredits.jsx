import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  setMovieId,
} from "../../../../redux/moviesSlices/getMovieDetails";
import { GetMovieCredits } from "../../../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieCredits";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";

const CrewMoviesPersonCombinedCredits = ({ PersonDetailsname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { personCombinedCreditsDetails, personCombinedCreditsDetailsLoading } =
    useSelector((state) => state.personCombinedCreditsReducer);

  useEffect(() => {
    const personId = localStorage.getItem("personId");
    const movieId = localStorage.getItem("movieId");

    if (personId) {
      dispatch(GetPersonCombinedCredits({ personId }));
    }
    if (movieId) {
      dispatch(setMovieId(movieId));
      dispatch(getMovieDetails(movieId));
    }
  }, [dispatch]);

  const uniqueMovies =
    personCombinedCreditsDetails?.cast
      ?.filter((item) => item.media_type === "movie")
      ?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      ) || [];
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-medium mb-6 text-red-500">
        Movies in which <span className="font-bold">{PersonDetailsname}</span>{" "}
        worked as crew
      </h2>
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
        {personCombinedCreditsDetailsLoading ? (
          <span className="loader"></span>
        ) : uniqueMovies.length > 0 ? (
          <>
            {uniqueMovies.slice(0, 10).map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105"
                onClick={() => {
                  dispatch(getMovieDetails(item.id));
                  dispatch(setMovieId(item.id));
                  dispatch(GetMovieCredits({ movieId: item.id }));
                  localStorage.setItem("movieId", item.id);
                  navigate("/movieDetails");
                }}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/Image-not-found.png"
                  }
                  alt={item.title || item.name}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-white truncate">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    <span className="text-red-500 font-semibold">
                      Air Date:
                    </span>{" "}
                    {item.release_date || item.first_air_date || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    <span className="text-red-500 font-semibold">Type:</span>{" "}
                    {item.media_type || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    <span className="text-red-500 font-semibold">Rating:</span>{" "}
                    {item.vote_average || 0} ⭐
                  </p>
                </div>
              </div>
            ))}

            {uniqueMovies.length > 10 && (
              <button
                onClick={() => navigate("/AllPersonMoviesCrew")}
                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300"
              >
                <span className="text-white text-lg font-bold">
                  +{uniqueMovies.length - 10}
                </span>
                <span className="text-sm text-gray-300">Show More</span>
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
