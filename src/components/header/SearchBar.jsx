import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon, Play, Tv } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMulti,
  clearSearchResults,
  setSearchQuery,
} from "../../redux/HomeSlices/searcheSlice";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";

const POSTER = (path) =>
  path ? `https://image.tmdb.org/t/p/w92${path}` : "/placeholder.png";

const softFadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 6, transition: { duration: 0.22, ease: "easeIn" } },
};

export function Search({ placeholderOverride, iconOnly = false }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  const { searchQuery, searchResults, isSearching } = useSelector(
    (s) => s.searchReducer
  );

  const isSearchPath = (pathname) =>
    pathname === "/search" || pathname.startsWith("/search");

  // 🔎 Handle live search
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (searchQuery.trim().length >= 2) {
      timeoutRef.current = setTimeout(() => {
        dispatch(searchMulti({ query: searchQuery.trim() }));
        setShowResults(!isSearchPath(location.pathname));
      }, 400);
    } else {
      dispatch(clearSearchResults());
      setShowResults(false);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [searchQuery, dispatch, location.pathname]);

  // 🔄 Handle route change
  useEffect(() => {
    const onSearchPage = isSearchPath(location.pathname);
    setShowResults(false);
    setIsSearchFocused(false);
    setMobileOpen(false);

    if (!onSearchPage) {
      dispatch(clearSearchResults());
      dispatch(setSearchQuery(""));
      const inputEl = searchRef.current?.querySelector("input");
      inputEl?.blur();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [location.pathname, dispatch]);

  // 🖱️ Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
        setIsSearchFocused(false);
        setMobileOpen(false);

        if (!isSearchPath(location.pathname)) {
          dispatch(clearSearchResults());
          dispatch(setSearchQuery(""));
        }

        const inputEl = searchRef.current.querySelector("input");
        inputEl?.blur();

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    if (showResults || mobileOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showResults, mobileOpen, dispatch, location.pathname]);

  // 🔍 Submit handler
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setIsSearchFocused(false);
      setMobileOpen(false);
    }
  };

  // 🎬 Click on search result
  const handleResultClick = (item) => {
    if (item.media_type === "movie") {
      dispatch(getMovieDetails(item.id));
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      dispatch(getSeriesDetails(item.id));
      navigate(`/series/${item.id}`);
    }

    dispatch(clearSearchResults());
    dispatch(setSearchQuery(""));
    setShowResults(false);
    setMobileOpen(false);
  };

  const placeholder = placeholderOverride || "Search Movies & Series";

  // 📱 Mobile layout
  if (iconOnly) {
    return (
      <div ref={searchRef} className="relative">
        <button
          onClick={() => {
            setMobileOpen((s) => !s);
            setTimeout(() => inputRef.current?.focus(), 80);
          }}
          aria-label="Open search"
          className="p-2 rounded-lg hover:bg-background-elevated text-text-secondary transition-colors"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-[calc(100vw-1rem)] max-w-xs sm:max-w-sm z-[200]"
            >
              <div className="bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl p-3">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowResults(true);
                    }}
                    className="w-full bg-surface-secondary text-text-primary px-10 py-2.5 rounded-xl outline-none border-2 border-transparent focus:border-accent-primary transition-all"
                  />
                  {isSearching && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </form>

                {/* Results */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 scroll-indicator w-full max-h-[280px] overflow-y-auto rounded-md"
                    >
                      <div className="border-t border-background-muted/40 my-1" />
                      <div className="space-y-1">
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
                                src={POSTER(
                                  item.poster_path || item.backdrop_path
                                )}
                                alt={title}
                                className="w-10 h-14 object-cover rounded-md"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-text-primary font-semibold text-sm truncate">
                                  {title}
                                </h4>
                                <p className="text-xs text-text-secondary">
                                  {item.media_type === "movie"
                                    ? "Movie"
                                    : "Series"}{" "}
                                  • {year}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {searchResults.length > 5 && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full mt-2 py-2 text-sm text-accent-primary hover:text-accent-hover font-semibold transition-colors"
                        >
                          See all {searchResults.length} results →
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 💻 Desktop layout
  return (
    <div ref={searchRef} className="relative">
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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onFocus={() => {
              setIsSearchFocused(true);
              setShowResults(true);
            }}
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

        {/* Results dropdown */}
        <AnimatePresence>
          {showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute scroll-indicator left-0 mt-2 w-72 max-h-[500px] overflow-y-auto bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl shadow-black/40 z-[200]"
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
                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => handleResultClick(item)}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent-primary/6 transition-colors"
                    >
                      <img
                        src={POSTER(item.poster_path || item.backdrop_path)}
                        alt={title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-text-primary font-semibold text-sm truncate">
                          {title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                          {item.media_type === "movie" ? (
                            <Play className="w-3 h-3" />
                          ) : (
                            <Tv className="w-3 h-3" />
                          )}
                          <span>
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
      </motion.form>
    </div>
  );
}
