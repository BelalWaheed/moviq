import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../../redux/moviesSlices/getMovieDetails";

const MovieSimilarSection = () => {
  const { MovieSimilarDetails } = useSelector(
    (state) => state.MovieSimilarReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-bold mb-6 text-red-500">Similar</h2>
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
        {MovieSimilarDetails?.results?.length > 0 ? (
          MovieSimilarDetails?.results?.map((similar, idx) => (
            <div
              key={idx}
              className="hover:scale-105 transition duration-250 flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
              onClick={() => {
                localStorage.setItem("movieId", similar.id);
                dispatch(getMovieDetails(similar.id));
                navigate("/moviedetails");
              }}
            >
              <img
                src={
                  similar.poster_path
                    ? `https://image.tmdb.org/t/p/w500${similar.poster_path}`
                    : "/Image-not-found.png"
                }
                alt={similar.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover object-top"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                  {similar.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-red-500 font-semibold">Release:</span>{" "}
                  {similar.release_date || "N/A"}
                </p>

                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-red-500 font-semibold">Rating:</span>{" "}
                  {similar.vote_average || 0} ⭐
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
            <p className="text-gray-400 text-lg font-medium">
              ❌ No Similar movies available for this movie.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              This movie doesn't have any similar information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieSimilarSection;
