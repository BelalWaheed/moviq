import React, { useEffect, useRef, useState } from "react";
import { Film, Menu, X, Search, Sparkles, Play, Tv } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    searchMulti,
    clearSearchResults
} from "../../redux/HomeSlices/searcheSlice";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/series", label: "Series" }
];

const POSTER = path =>
    path ? `https://image.tmdb.org/t/p/w92${path}` : "/placeholder.png";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const timeoutRef = useRef(null);

    const { searchResults, isSearching } = useSelector(s => s.searchReducer);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
        setShowResults(false);
    }, [location.pathname]);

    // Click outside to close
    useEffect(() => {
        function onClick(e) {
            if (
                menuRef.current &&
                menuOpen &&
                !menuRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [menuOpen]);

    // Debounced search
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (searchQuery.trim().length >= 2) {
            timeoutRef.current = setTimeout(() => {
                dispatch(searchMulti({ query: searchQuery.trim() }));
                setShowResults(true);
            }, 500);
        } else {
            dispatch(clearSearchResults());
            setShowResults(false);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [searchQuery, dispatch]);

    const isActive = path =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    const placeholder = location.pathname.startsWith("/series")
        ? "Search Series..."
        : location.pathname.startsWith("/movies")
        ? "Search Movies..."
        : "Search Movies & Series...";

    const handleSearchSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setShowResults(false);
            setIsSearchFocused(false);
            setMenuOpen(false);
        }
    };

    const handleResultClick = item => {
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
        setMenuOpen(false);
    };

    return (
        <header className=" bg-background-primary/95 backdrop-blur-md border-b border-background-elevated/50 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="relative">
                                <Film className="w-8 h-8 text-accent-primary" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                    className="absolute inset-0 bg-accent-primary rounded-full blur-md opacity-50"
                                />
                            </motion.div>
                            <span className="text-2xl font-black bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
                                Moviq
                            </span>
                            <Sparkles className="w-4 h-4 text-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </motion.div>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden md:flex md:items-center md:gap-2"
                        aria-label="Primary">
                        {navLinks.map((l, idx) => (
                            <motion.div
                                key={l.to}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}>
                                <Link
                                    to={l.to}
                                    className="relative px-4 py-2 rounded-lg transition-all text-md group">
                                    <span
                                        className={`relative z-10 ${
                                            isActive(l.to)
                                                ? "text-accent-primary font-bold"
                                                : "text-text-secondary group-hover:text-text-primary"
                                        }`}>
                                        {l.label}
                                    </span>
                                    {isActive(l.to) && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-accent-primary/10 rounded-lg border border-accent-primary/30"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                    {!isActive(l.to) && (
                                        <div className="absolute inset-0 bg-background-elevated/0 group-hover:bg-background-elevated rounded-lg transition-colors" />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Desktop Search */}
                    <div className="flex items-center gap-3">
                        <motion.form
                            ref={searchRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleSearchSubmit}
                            className="hidden md:block relative"
                            role="search"
                            aria-label="Site search">
                            <div className="relative group">
                                <input
                                    type="search"
                                    placeholder="Search Movies & Series"
                                    value={searchQuery}
                                    onChange={e =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onFocus={() => setIsSearchFocused(true)}
                                    className="w-64 bg-surface-secondary text-text-primary placeholder:text-text-secondary px-10 py-2.5 rounded-xl outline-none border-2 border-transparent focus:border-accent-primary transition-all focus:w-72 focus:shadow-lg focus:shadow-accent-primary/20"
                                />
                                <Search
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                                        isSearchFocused
                                            ? "text-accent-primary"
                                            : "text-text-secondary"
                                    }`}
                                />

                                {isSearching && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {showResults && searchResults.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full mt-2 w-72 max-h-[500px] overflow-y-auto bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl shadow-black/50 z-50">
                                        <div className="p-2">
                                            {searchResults
                                                .slice(0, 8)
                                                .map(item => {
                                                    const title =
                                                        item.title ||
                                                        item.name ||
                                                        "Untitled";
                                                    const year = (
                                                        item.release_date ||
                                                        item.first_air_date ||
                                                        ""
                                                    ).split("-")[0];
                                                    const rating =
                                                        item.vote_average
                                                            ? item.vote_average.toFixed(
                                                                  1
                                                              )
                                                            : "N/A";
                                                    const poster =
                                                        item.poster_path ||
                                                        item.backdrop_path;

                                                    return (
                                                        <motion.div
                                                            key={item.id}
                                                            whileHover={{
                                                                backgroundColor:
                                                                    "rgba(220, 38, 38, 0.1)"
                                                            }}
                                                            onClick={() =>
                                                                handleResultClick(
                                                                    item
                                                                )
                                                            }
                                                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors">
                                                            <img
                                                                src={POSTER(
                                                                    poster
                                                                )}
                                                                alt={title}
                                                                className="w-12 h-16 object-cover rounded-md"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-text-primary font-semibold text-sm truncate">
                                                                    {title}
                                                                </h4>
                                                                <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                                                                    <span className="flex items-center gap-1">
                                                                        {item.media_type ===
                                                                        "movie" ? (
                                                                            <Play className="w-3 h-3" />
                                                                        ) : (
                                                                            <Tv className="w-3 h-3" />
                                                                        )}
                                                                        {item.media_type ===
                                                                        "movie"
                                                                            ? "Movie"
                                                                            : "Series"}
                                                                    </span>
                                                                    {year && (
                                                                        <span>
                                                                            •{" "}
                                                                            {
                                                                                year
                                                                            }
                                                                        </span>
                                                                    )}
                                                                    <span>
                                                                        • ⭐{" "}
                                                                        {rating}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}

                                            {searchResults.length > 8 && (
                                                <button
                                                    onClick={handleSearchSubmit}
                                                    className="w-full mt-2 py-2 text-sm text-accent-primary hover:text-accent-hover font-semibold transition-colors">
                                                    See all{" "}
                                                    {searchResults.length}{" "}
                                                    results →
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* No Results Message */}
                            <AnimatePresence>
                                {showResults &&
                                    searchQuery.trim().length >= 2 &&
                                    searchResults.length === 0 &&
                                    !isSearching && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full mt-2 w-[400px] bg-background-elevated border border-background-muted/30 rounded-xl shadow-2xl p-4 text-center text-text-secondary">
                                            No results found for "{searchQuery}"
                                        </motion.div>
                                    )}
                            </AnimatePresence>
                        </motion.form>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center gap-2">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMenuOpen(s => !s)}
                                className="p-2 rounded-lg hover:bg-background-elevated text-text-secondary transition-colors">
                                <AnimatePresence mode="wait">
                                    {menuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{
                                                rotate: -90,
                                                opacity: 0
                                            }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}>
                                            <X className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}>
                                            <Menu className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        ref={menuRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden border-t border-background-elevated/50 bg-background-primary">
                        <div className="px-4 pt-4 pb-6 space-y-4">
                            <div className="flex flex-col gap-1">
                                {navLinks.map((l, idx) => (
                                    <motion.div
                                        key={l.to}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}>
                                        <Link
                                            to={l.to}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg text-base transition-all ${
                                                isActive(l.to)
                                                    ? "text-accent-primary font-bold bg-accent-primary/10 border border-accent-primary/30"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                                            }`}>
                                            {l.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile Search */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative">
                                <div className="relative">
                                    <input
                                        type="search"
                                        placeholder={placeholder}
                                        value={searchQuery}
                                        onChange={e =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full bg-surface-secondary text-text-primary  px-10 py-3 rounded-xl outline-none border-2 border-transparent focus:border-accent-primary transition-all"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                    {isSearching && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Search Results */}
                                <AnimatePresence>
                                    {showResults &&
                                        searchResults.length > 0 && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    height: 0
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto"
                                                }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-2 max-h-[300px] overflow-y-auto bg-background-elevated border border-background-muted/30 rounded-xl">
                                                <div className="p-2">
                                                    {searchResults
                                                        .slice(0, 5)
                                                        .map(item => {
                                                            const title =
                                                                item.title ||
                                                                item.name ||
                                                                "Untitled";
                                                            const year = (
                                                                item.release_date ||
                                                                item.first_air_date ||
                                                                ""
                                                            ).split("-")[0];

                                                            return (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    onClick={() =>
                                                                        handleResultClick(
                                                                            item
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-primary/10 cursor-pointer transition-colors">
                                                                    <img
                                                                        src={POSTER(
                                                                            item.poster_path ||
                                                                                item.backdrop_path
                                                                        )}
                                                                        alt={
                                                                            title
                                                                        }
                                                                        className="w-10 h-14 object-cover rounded-md"
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="text-text-primary font-semibold text-sm truncate">
                                                                            {
                                                                                title
                                                                            }
                                                                        </h4>
                                                                        <p className="text-xs text-text-secondary">
                                                                            {item.media_type ===
                                                                            "movie"
                                                                                ? "Movie"
                                                                                : "Series"}{" "}
                                                                            •{" "}
                                                                            {
                                                                                year
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </motion.div>
                                        )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
