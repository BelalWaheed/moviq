import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon, Play, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMulti,
  clearSearchResults,
} from "../../redux/HomeSlices/searcheSlice";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";

const POSTER = (path) =>
  path ? `https://image.tmdb.org/t/p/w92${path}` : "/placeholder.png";

// Soft animation variants used across components
const softFadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 6, transition: { duration: 0.22, ease: "easeIn" } },
};

export function Search({ placeholderOverride }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const { searchResults, isSearching } = useSelector((s) => s.searchReducer);

  // Debounced search logic
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (searchQuery.trim().length >= 2) {
      timeoutRef.current = setTimeout(() => {
        dispatch(searchMulti({ query: searchQuery.trim() }));
        setShowResults(true);
      }, 450); // slightly longer debounce for softer network bursts
    } else {
      dispatch(clearSearchResults());
      setShowResults(false);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    if (showResults) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showResults]);

  const handleSearchSubmit = (e) => {
    e && e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowResults(false);
      setIsSearchFocused(false);
    }
  };

  const handleResultClick = (item) => {
    if (item.media_type === "movie") {
      dispatch(getMovieDetails(item.id));
      navigate("/moviedetails");
    } else if (item.media_type === "tv") {
      dispatch(getSeriesDetails(item.id));
      localStorage.setItem("seriesId", item.id);
      navigate("/seriesDetails");
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const placeholder = placeholderOverride || "Search Movies & Series";

  return (
    <div ref={searchRef} className="relative">
      {/* Desktop */}
      <motion.form
        onSubmit={handleSearchSubmit}
        className="hidden md:block"
        role="search"
        aria-label="Site search"
        {...softFadeUp}
      >
        <div className="relative group">
          <input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-64 bg-surface-secondary text-text-primary placeholder:text-text-secondary px-10 py-2.5 rounded-xl outline-none border-2 border-transparent focus:border-accent-primary transition-all focus:w-72 focus:shadow-lg focus:shadow-accent-primary/10"
          />
          <SearchIcon
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
              isSearchFocused ? "text-accent-primary" : "text-text-secondary"
            }`}
          />

          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.28, ease: "easeOut" },
              }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
              className="absolute search-scroll  left-0 mt-2 w-72 max-h-[500px] overflow-y-auto bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl shadow-black/40 z-[200]"
            >
              <div className="p-2">
                {searchResults.slice(0, 8).map((item) => {
                  const title = item.title || item.name || "Untitled";
                  const year = (
                    item.release_date ||
                    item.first_air_date ||
                    ""
                  ).split("-")[0];
                  const rating = item.vote_average
                    ? item.vote_average.toFixed(1)
                    : "N/A";
                  const poster = item.poster_path || item.backdrop_path;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => handleResultClick(item)}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent-primary/6 transition-colors"
                    >
                      <img
                        src={POSTER(poster)}
                        alt={title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-semibold text-sm truncate">
                          {title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                          <span className="flex items-center gap-1">
                            {item.media_type === "movie" ? (
                              <Play className="w-3 h-3" />
                            ) : (
                              <Tv className="w-3 h-3" />
                            )}
                            {item.media_type === "movie" ? "Movie" : "Series"}
                          </span>
                          {year && <span>• {year}</span>}
                          <span>• ⭐ {rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {searchResults.length > 8 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-2 py-2 text-sm text-accent-primary hover:text-accent-hover font-semibold transition-colors"
                  >
                    See all {searchResults.length} results →
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No results */}
        <AnimatePresence>
          {showResults &&
            searchQuery.trim().length >= 2 &&
            searchResults.length === 0 &&
            !isSearching && (
              <motion.div
                {...softFadeUp}
                className="absolute search-scroll  left-0 mt-2 w-full bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl p-4 text-center text-text-secondary z-[200]"
              >
                No results found for "{searchQuery}"
              </motion.div>
            )}
        </AnimatePresence>
      </motion.form>
      {/* ==================== MOBILE VERSION ==================== */}
      <div className="md:hidden">
        <motion.div {...softFadeUp} className="relative">
          <div className="relative">
            <input
              type="search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-secondary text-text-primary px-10 py-3 rounded-xl outline-none border-2 border-transparent focus:border-accent-primary transition-all"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* --- Search Results --- */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute left-0 w-full max-h-[300px] overflow-y-auto search-scroll bg-background-elevated border border-background-muted/30 rounded-xl z-[200]"
              >
                <div className="p-2">
                  {searchResults.slice(0, 5).map((item) => {
                    const title = item.title || item.name || "Untitled";
                    const year = (
                      item.release_date ||
                      item.first_air_date ||
                      ""
                    ).split("-")[0];

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleResultClick(item)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-primary/10 cursor-pointer transition-colors"
                      >
                        <img
                          src={POSTER(item.poster_path || item.backdrop_path)}
                          alt={title}
                          className="w-10 h-14 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-text-primary font-semibold text-sm truncate">
                            {title}
                          </h4>
                          <p className="text-xs text-text-secondary">
                            {item.media_type === "movie" ? "Movie" : "Series"} •{" "}
                            {year}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showResults &&
              searchQuery.trim().length >= 2 &&
              searchResults.length === 0 &&
              !isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-0 w-full mt-2 bg-background-elevated border border-background-muted/30 rounded-xl shadow-lg text-center py-4 text-text-secondary text-sm z-[200]"
                >
                  No results found for "{searchQuery}"
                </motion.div>
              )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
