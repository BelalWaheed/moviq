import React, { useEffect, useState, useRef } from "react";
import { Film, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SiThemoviedatabase } from "react-icons/si";

// Actions
import { RequestSingIn } from "../../redux/AuthSlices/RequestSingIn";
import { AccountInfo, signOut } from "../../redux/AuthSlices/AccountInfo";
import { RequestSingOut } from "../../redux/AuthSlices/RequestSignOut";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/series", label: "Series" }
];

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogged, userData } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    const { RequestSingInDetails } = useSelector(
        state => state.SignInTokenReducer
    );

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle sign out alert
    const signOutAlert = () => {
        Swal.fire({
            theme: "dark",
            title: "Are you sure?",
            text: "You will sign out now!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sign out"
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(RequestSingOut());
                dispatch(signOut());
                Swal.fire({
                    theme: "dark",
                    title: "Done!",
                    text: "Sign out complete",
                    icon: "success"
                });
            }
        });
    };

    // Check denied redirect
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const denied = params.get("denied");
        if (denied === "true") {
            Swal.fire({
                icon: "error",
                theme: "dark",
                title: "Access Denied",
                text: "You denied the authorization request. Please sign in again."
            }).then(() => navigate("/"));
            localStorage.removeItem("token");
        }
    }, [navigate]);

    // Redirect to TMDB auth page
    useEffect(() => {
        if (RequestSingInDetails?.success) {
            window.location.href = `https://www.themoviedb.org/authenticate/${RequestSingInDetails.request_token}?redirect_to=http://localhost:5173/`;
        }
    }, [RequestSingInDetails]);

    // Get account info
    useEffect(() => {
        dispatch(AccountInfo());
    }, [dispatch]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = e => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = path =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    return (
        <header className="bg-background-primary/98 backdrop-blur-xl border-b border-background-elevated/30 sticky top-0 z-50 shadow-2xl shadow-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Logo + TMDB button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-3 md:gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group">
                            <motion.div
                                whileHover={{ rotate: 8, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative">
                                <Film className="w-6 h-6 md:w-8 md:h-8 text-accent-primary drop-shadow-lg" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.4, 0.7, 0.4]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-accent-primary rounded-full blur-lg opacity-50"
                                />
                            </motion.div>

                            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-sm">
                                Moviq
                            </span>
                        </Link>

                        {/* TMDB connect button (visible only when logged out) */}
                        {!isLogged && (
                            <motion.button
                                onClick={() => {
                                    dispatch(RequestSingIn());
                                    navigate("/");
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#01b4e4] to-[#0190b8] text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg shadow-lg shadow-[#01b4e4]/30 hover:shadow-xl hover:shadow-[#01b4e4]/40 transition-all duration-300">
                                <SiThemoviedatabase
                                    size={16}
                                    className="flex-shrink-0"
                                />
                                <span className="hidden md:inline">
                                    Connect TMDB
                                </span>
                                <span className="md:hidden">Connect</span>
                            </motion.button>
                        )}
                    </motion.div>

                    {/* Desktop nav */}
                    <nav
                        className="hidden md:flex md:items-center md:gap-1 lg:gap-2"
                        aria-label="Primary">
                        {navLinks.map((l, idx) => (
                            <motion.div
                                key={l.to}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: idx * 0.1,
                                    type: "spring",
                                    stiffness: 300
                                }}>
                                <Link
                                    to={l.to}
                                    className={`relative px-4 lg:px-5 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-300 ${
                                        isActive(l.to)
                                            ? "text-accent-primary bg-accent-primary/15 shadow-lg shadow-accent-primary/10 border border-accent-primary/30"
                                            : "text-text-secondary hover:text-text-primary hover:bg-background-elevated/80 hover:shadow-md"
                                    }`}>
                                    {l.label}
                                    {isActive(l.to) && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Right side: Search + user dropdown */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="hidden md:flex items-center">
                            <Search />
                        </div>

                        {/* If logged in show dropdown */}
                        {isLogged && (
                            <div className="relative" ref={dropdownRef}>
                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative">
                                    <img
                                        src={
                                            userData?.avatar?.tmdb?.avatar_path
                                                ? `https://image.tmdb.org/t/p/w45${userData.avatar.tmdb.avatar_path}`
                                                : `https://www.gravatar.com/avatar/${userData?.avatar?.gravatar?.hash}?d=mp`
                                        }
                                        alt="avatar"
                                        className="w-10 h-10 md:w-11 md:h-11 rounded-full cursor-pointer border-2 border-accent-primary/50 shadow-lg shadow-accent-primary/20 hover:border-accent-primary transition-all duration-300"
                                        onClick={() =>
                                            setDropdownOpen(prev => !prev)
                                        }
                                    />
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background-primary"
                                        />
                                    )}
                                </motion.div>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: -10
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: -10
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25
                                            }}
                                            className="absolute right-0 mt-3 w-44 bg-background-elevated/95 backdrop-blur-md rounded-xl shadow-2xl border border-accent-primary/20 p-2 z-50">
                                            <div className="px-3 py-2 border-b border-background-elevated/50 mb-1">
                                                <p className="text-xs font-semibold text-text-primary truncate">
                                                    {userData?.username ||
                                                        "User"}
                                                </p>
                                                <p className="text-xs text-text-secondary/70">
                                                    {userData?.name || ""}
                                                </p>
                                            </div>
                                            <motion.button
                                                whileHover={{
                                                    scale: 1.02,
                                                    x: 2
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    signOutAlert();
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/15 rounded-lg transition-all duration-200">
                                                <LogOut size={18} />
                                                Sign out
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile nav */}
                <div className="md:hidden border-t border-background-elevated/30 bg-background-primary/80 backdrop-blur-sm">
                    <div className="flex gap-2 items-center overflow-x-auto px-2 py-3 scrollbar-hide">
                        {navLinks.map(l => (
                            <Link
                                key={l.to}
                                to={l.to}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                    isActive(l.to)
                                        ? "text-accent-primary bg-accent-primary/15 border border-accent-primary/30 shadow-md"
                                        : "text-text-secondary hover:text-text-primary hover:bg-background-elevated/60"
                                }`}>
                                {l.label}
                            </Link>
                        ))}

                        {/* Mobile search */}
                        <div className="ml-auto flex items-center gap-2">
                            <Search iconOnly />

                            {/* Mobile TMDB connect (logged out only) */}
                            {!isLogged && (
                                <motion.button
                                    onClick={() => {
                                        dispatch(RequestSingIn());
                                        navigate("/");
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#01b4e4] to-[#0190b8] text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-md sm:hidden">
                                    <SiThemoviedatabase size={14} />
                                    Connect
                                </motion.button>
                            )}

                            {/* Mobile avatar only if logged in */}
                            {isLogged && (
                                <motion.img
                                    whileTap={{ scale: 0.9 }}
                                    src={
                                        userData?.avatar?.tmdb?.avatar_path
                                            ? `https://image.tmdb.org/t/p/w45${userData.avatar.tmdb.avatar_path}`
                                            : `https://www.gravatar.com/avatar/${userData?.avatar?.gravatar?.hash}?d=mp`
                                    }
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full border-2 border-accent-primary/50 shadow-lg flex-shrink-0"
                                    onClick={() =>
                                        setDropdownOpen(prev => !prev)
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </header>
    );
}
