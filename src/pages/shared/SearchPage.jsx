import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Tv } from "lucide-react";
import { searchMulti, clearSearchResults } from "../../redux/HomeSlices/searcheSlice";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";

const POSTER = (path) =>
  path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder.png";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, isSearching } = useSelector((s) => s.searchReducer);

  // extract ?query=value from URL
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query.trim().length >= 2) {
      dispatch(searchMulti({ query }));
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handleResultClick = (item) => {
    if (item.media_type === "movie") {
      dispatch(getMovieDetails(item.id));
      navigate("/moviedetails");
    } else if (item.media_type === "tv") {
      dispatch(getSeriesDetails(item.id));
      localStorage.setItem("seriesId", item.id);
      navigate("/seriesDetails");
    }
  };

  return (
    <div className="min-h-screen bg-background-primary px-4 sm:px-8 pt-24">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-bold text-text-primary mb-6"
      >
        Search results for <span className="text-accent-primary">"{query}"</span>
      </motion.h1>

      {/* --- Loading Spinner --- */}
      {isSearching && (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* --- No Results --- */}
      {!isSearching && query && searchResults.length === 0 && (
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-text-secondary text-lg mt-20"
        >
          No results found for "{query}"
        </motion.p>
      )}

      {/* --- Results Grid --- */}
      {!isSearching && searchResults.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {searchResults.map((item) => {
            const title = item.title || item.name || "Untitled";
            const year = (item.release_date || item.first_air_date || "").split("-")[0];
            const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleResultClick(item)}
                className="bg-background-elevated rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <img
                  src={POSTER(item.poster_path || item.backdrop_path)}
                  alt={title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-text-primary font-semibold text-sm truncate">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                    {item.media_type === "movie" ? (
                      <Play className="w-3 h-3" />
                    ) : (
                      <Tv className="w-3 h-3" />
                    )}
                    <span>{item.media_type === "movie" ? "Movie" : "Series"}</span>
                    {year && <span>• {year}</span>}
                    <span>• ⭐ {rating}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
