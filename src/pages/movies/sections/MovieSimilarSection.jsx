import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../redux/moviesSlices/getMovieDetails";
import { GetMovieSimilar } from "../../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieSimilar";
import { motion } from "framer-motion";

const MovieSimilarSection = () => {
  const { MovieSimilarDetails, MovieSimilarLoading } = useSelector(
    (state) => state.MovieSimilarReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: movieId } = useParams();

  const [hasFetched, setHasFetched] = useState(false);

  // Deduplicate similar movies by id
  const uniqueSimilar = useMemo(() => {
    if (!MovieSimilarDetails?.results) return [];
    const seen = new Set();
    return MovieSimilarDetails.results.filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [MovieSimilarDetails?.results]);

  const handleViewportEnter = () => {
    if (!hasFetched) {
      setHasFetched(true);
      dispatch(GetMovieSimilar({ movieId }));
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-bold mb-6 text-red-500">Similar</h2>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        onViewportEnter={handleViewportEnter}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        {hasFetched && MovieSimilarLoading ? (
            <div className="text-white h-48 flex items-center justify-center">Loading similar movies...</div>
        ) : (
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4 min-h-[200px]">
                {uniqueSimilar.length > 0 ? (
                uniqueSimilar.map((similar) => (
                    <div
                    key={similar.id}
                    className="hover:scale-105 transition duration-250 flex-shrink-0 cursor-pointer w-44 sm:w-56 md:w-64 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
                    onClick={() => {
                        dispatch(getMovieDetails(similar.id));
                        navigate(`/movie/${similar.id}`);
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
                 hasFetched && (
                    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10 w-full">
                        <p className="text-gray-400 text-lg font-medium">
                        ❌ No Similar movies available for this movie.
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                        This movie doesn't have any similar information.
                        </p>
                    </div>
                 )
                )}
            </div>
        )}
      </motion.div>
    </section>
  );
};

export default MovieSimilarSection;
