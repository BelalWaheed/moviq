import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Heart, 
    Bookmark, 
    Star, 
    Film, 
    Tv, 
    User, 
    Calendar, 
    Globe, 
    ChevronRight,
    LogOut,
    Settings,
    TrendingUp
} from "lucide-react";
import { FaImdb } from "react-icons/fa";
import Swal from "sweetalert2";

import {
    GetFavoriteMovies,
    GetFavoriteSeries,
    GetWatchlistMovies,
    GetWatchlistSeries,
    GetRatedMovies,
    GetRatedSeries
} from "../../redux/AuthSlices/ProfileData";
import { signOut } from "../../redux/AuthSlices/AccountInfo";
import { RequestSingOut } from "../../redux/AuthSlices/RequestSignOut";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import SEO from "../../components/seo/SEO";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState("favorites");
    const [contentType, setContentType] = useState("movies");

    // Redux state
    const { isLogged, AccountInfoDetails, AccountInfoDetailsLoading } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    
    const {
        favoriteMovies,
        favoriteMoviesLoading,
        favoriteSeries,
        favoriteSeriesLoading,
        watchlistMovies,
        watchlistMoviesLoading,
        watchlistSeries,
        watchlistSeriesLoading,
        ratedMovies,
        ratedMoviesLoading,
        ratedSeries,
        ratedSeriesLoading
    } = useSelector(state => state.ProfileDataReducer);

    // Fetch all profile data when account is loaded
    useEffect(() => {
        if (AccountInfoDetails?.id) {
            const accountId = AccountInfoDetails.id;
            dispatch(GetFavoriteMovies({ accountId }));
            dispatch(GetFavoriteSeries({ accountId }));
            dispatch(GetWatchlistMovies({ accountId }));
            dispatch(GetWatchlistSeries({ accountId }));
            dispatch(GetRatedMovies({ accountId }));
            dispatch(GetRatedSeries({ accountId }));
        }
    }, [dispatch, AccountInfoDetails?.id]);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLogged && !AccountInfoDetailsLoading) {
            navigate("/");
        }
    }, [isLogged, AccountInfoDetailsLoading, navigate]);

    // Sign out handler
    const handleSignOut = () => {
        Swal.fire({
            theme: "dark",
            title: "Are you sure?",
            text: "You will be signed out of your account",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sign out"
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(RequestSingOut());
                dispatch(signOut());
                navigate("/");
                Swal.fire({
                    theme: "dark",
                    title: "Signed Out",
                    text: "You have been successfully signed out",
                    icon: "success"
                });
            }
        });
    };

    // Get current data based on tab and content type
    const getCurrentData = () => {
        if (activeTab === "favorites") {
            return contentType === "movies" ? favoriteMovies : favoriteSeries;
        } else if (activeTab === "watchlist") {
            return contentType === "movies" ? watchlistMovies : watchlistSeries;
        } else {
            return contentType === "movies" ? ratedMovies : ratedSeries;
        }
    };

    const isLoading = () => {
        if (activeTab === "favorites") {
            return contentType === "movies" ? favoriteMoviesLoading : favoriteSeriesLoading;
        } else if (activeTab === "watchlist") {
            return contentType === "movies" ? watchlistMoviesLoading : watchlistSeriesLoading;
        } else {
            return contentType === "movies" ? ratedMoviesLoading : ratedSeriesLoading;
        }
    };

    // Deduplicate results
    const uniqueResults = useMemo(() => {
        const data = getCurrentData();
        if (!data?.results) return [];
        const seen = new Set();
        return data.results.filter(item => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });
    }, [activeTab, contentType, favoriteMovies, favoriteSeries, watchlistMovies, watchlistSeries, ratedMovies, ratedSeries]);

    // Stats calculations
    const stats = useMemo(() => ({
        favoriteMoviesCount: favoriteMovies?.total_results || 0,
        favoriteSeriesCount: favoriteSeries?.total_results || 0,
        watchlistMoviesCount: watchlistMovies?.total_results || 0,
        watchlistSeriesCount: watchlistSeries?.total_results || 0,
        ratedMoviesCount: ratedMovies?.total_results || 0,
        ratedSeriesCount: ratedSeries?.total_results || 0
    }), [favoriteMovies, favoriteSeries, watchlistMovies, watchlistSeries, ratedMovies, ratedSeries]);

    // Handle item click
    const handleItemClick = (item) => {
        if (contentType === "movies") {
            dispatch(getMovieDetails(item.id));
            navigate(`/movie/${item.id}`);
        } else {
            dispatch(getSeriesDetails(item.id));
            navigate(`/series/${item.id}`);
        }
    };

    // Tab config
    const tabs = [
        { id: "favorites", label: "Favorites", icon: Heart, color: "text-pink-500" },
        { id: "watchlist", label: "Watchlist", icon: Bookmark, color: "text-blue-500" },
        { id: "rated", label: "Rated", icon: Star, color: "text-yellow-500" }
    ];

    if (AccountInfoDetailsLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background-primary via-background-elevated to-background-primary flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-t-accent-primary border-gray-700 rounded-full animate-spin" />
                    <p className="text-text-secondary">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!isLogged) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-primary via-background-elevated to-background-primary">
            <SEO 
                title={`${AccountInfoDetails?.username || "User"}'s Profile`}
                description={`View ${AccountInfoDetails?.username || "user"}'s favorite movies and TV series, watchlist, and ratings on Moviq.`}
                keywords="profile, favorites, watchlist, ratings, movies, TV series"
                type="profile"
            />
            
            {/* Hero Section with Profile Info */}
            <div className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent-primary/50 shadow-2xl shadow-accent-primary/25">
                                <img
                                    src={
                                        AccountInfoDetails?.avatar?.tmdb?.avatar_path
                                            ? `https://image.tmdb.org/t/p/w200${AccountInfoDetails.avatar.tmdb.avatar_path}`
                                            : `https://www.gravatar.com/avatar/${AccountInfoDetails?.avatar?.gravatar?.hash}?d=mp&s=200`
                                    }
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div 
                                className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-background-primary"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* User Info */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex-1 text-center md:text-left"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {AccountInfoDetails?.name || AccountInfoDetails?.username}
                            </h1>
                            <p className="text-text-secondary text-lg mb-4">
                                @{AccountInfoDetails?.username}
                            </p>
                            
                            {/* User details */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-secondary mb-6">
                                {AccountInfoDetails?.iso_3166_1 && (
                                    <span className="flex items-center gap-1.5 bg-background-muted/50 px-3 py-1.5 rounded-full">
                                        <Globe className="w-4 h-4" />
                                        {AccountInfoDetails.iso_3166_1}
                                    </span>
                                )}
                                {AccountInfoDetails?.iso_639_1 && (
                                    <span className="flex items-center gap-1.5 bg-background-muted/50 px-3 py-1.5 rounded-full">
                                        <span className="text-xs">🌐</span>
                                        {AccountInfoDetails.iso_639_1.toUpperCase()}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 bg-background-muted/50 px-3 py-1.5 rounded-full">
                                    <User className="w-4 h-4" />
                                    ID: {AccountInfoDetails?.id}
                                </span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <motion.a
                                    href={`https://www.themoviedb.org/u/${AccountInfoDetails?.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-[#01b4e4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0099c4] transition-colors"
                                >
                                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB" className="w-5 h-5" />
                                    View on TMDB
                                </motion.a>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors border border-red-600/30"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {[
                        { label: "Favorite Movies", value: stats.favoriteMoviesCount, icon: Film, color: "from-pink-600 to-pink-400" },
                        { label: "Favorite Series", value: stats.favoriteSeriesCount, icon: Tv, color: "from-pink-600 to-pink-400" },
                        { label: "Watchlist Movies", value: stats.watchlistMoviesCount, icon: Film, color: "from-blue-600 to-blue-400" },
                        { label: "Watchlist Series", value: stats.watchlistSeriesCount, icon: Tv, color: "from-blue-600 to-blue-400" },
                        { label: "Rated Movies", value: stats.ratedMoviesCount, icon: Film, color: "from-yellow-600 to-yellow-400" },
                        { label: "Rated Series", value: stats.ratedSeriesCount, icon: Tv, color: "from-yellow-600 to-yellow-400" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                            className="bg-background-elevated/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-800 hover:border-gray-700 transition-colors"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-text-secondary">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Tabs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Category Tabs */}
                    <div className="flex bg-background-elevated/50 rounded-xl p-1.5 gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                                    activeTab === tab.id
                                        ? "bg-accent-primary text-white shadow-lg"
                                        : "text-text-secondary hover:text-white hover:bg-background-muted"
                                }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "" : tab.color}`} />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Type Toggle */}
                    <div className="flex bg-background-elevated/50 rounded-xl p-1.5 gap-1">
                        <button
                            onClick={() => setContentType("movies")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                                contentType === "movies"
                                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                                    : "text-text-secondary hover:text-white hover:bg-background-muted"
                            }`}
                        >
                            <Film className="w-4 h-4" />
                            Movies
                        </button>
                        <button
                            onClick={() => setContentType("series")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                                contentType === "series"
                                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                                    : "text-text-secondary hover:text-white hover:bg-background-muted"
                            }`}
                        >
                            <Tv className="w-4 h-4" />
                            Series
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <AnimatePresence mode="wait">
                    {isLoading() ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center py-20"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-t-accent-primary border-gray-700 rounded-full animate-spin" />
                                <p className="text-text-secondary">Loading {activeTab}...</p>
                            </div>
                        </motion.div>
                    ) : uniqueResults.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-background-elevated flex items-center justify-center mb-6">
                                {activeTab === "favorites" && <Heart className="w-10 h-10 text-pink-500/50" />}
                                {activeTab === "watchlist" && <Bookmark className="w-10 h-10 text-blue-500/50" />}
                                {activeTab === "rated" && <Star className="w-10 h-10 text-yellow-500/50" />}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No {contentType} in your {activeTab}</h3>
                            <p className="text-text-secondary max-w-md">
                                Start adding {contentType} to your {activeTab} and they will appear here.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(contentType === "movies" ? "/movies" : "/series")}
                                className="mt-6 flex items-center gap-2 bg-accent-primary text-white px-6 py-3 rounded-xl font-medium"
                            >
                                Browse {contentType}
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`${activeTab}-${contentType}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                        >
                            {uniqueResults.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    onClick={() => handleItemClick(item)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-background-elevated mb-3">
                                        <img
                                            src={
                                                item.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                    : "/Image-not-found.png"
                                            }
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        {/* Rating badge */}
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs font-medium text-white">
                                                {item.vote_average?.toFixed(1) || "N/A"}
                                            </span>
                                        </div>

                                        {/* User's rating (for rated tab) */}
                                        {activeTab === "rated" && item.rating && (
                                            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-600 to-yellow-500 px-2 py-1 rounded-lg flex items-center gap-1">
                                                <span className="text-xs font-bold text-white">
                                                    Your: {item.rating}
                                                </span>
                                            </div>
                                        )}

                                        {/* Hover overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                                            <p className="text-sm text-gray-300 line-clamp-3">
                                                {item.overview || "No description available"}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-accent-primary transition-colors">
                                        {item.title || item.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="w-3 h-3 text-text-secondary" />
                                        <span className="text-xs text-text-secondary">
                                            {(item.release_date || item.first_air_date)?.split("-")[0] || "N/A"}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
