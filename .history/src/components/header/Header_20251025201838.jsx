import React, { useEffect, useState, useRef } from "react";
import { Film, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SiThemoviedatabase } from "react-icons/si"; // TMDB icon

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
        <header className="bg-background-primary/95 backdrop-blur-md border-b border-background-elevated/50 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo + TMDB button */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.34 }}
                        className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: 6, scale: 1.03 }}
                                transition={{ duration: 0.24 }}
                                className="relative">
                                <Film className="w-5 md:w-7 text-accent-primary" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        opacity: [0.5, 0.9, 0.5]
                                    }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Infinity
                                    }}
                                    className="absolute inset-0 bg-accent-primary rounded-full blur-md opacity-40"
                                />
                            </motion.div>

                            <span className="text-xl md:text-2xl mr-1 font-black bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
                                Moviq
                            </span>
                        </Link>

                        {/* TMDB connect button (visible only when logged out) */}
                        {!isLogged && (
                            <motion.button
                                onClick={() => {
                                    dispatch(RequestSingIn());
                                    navigate("/"); // always go home
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 bg-[#01b4e4] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md hover:bg-[#009fc9] transition-all ml-2">
                                <SiThemoviedatabase size={14} />
                                Connect TMDB
                            </motion.button>
                        )}
                    </motion.div>

                    {/* Desktop nav */}
                    <nav
                        className="hidden md:flex md:items-center md:gap-2 search-scroll"
                        aria-label="Primary">
                        {navLinks.map((l, idx) => (
                            <motion.div
                                key={l.to}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}>
                                <Link
                                    to={l.to}
                                    className={`relative px-4 py-2 rounded-lg text-md font-medium transition-all ${
                                        isActive(l.to)
                                            ? "text-accent-primary bg-accent-primary/10 border border-accent-primary/20"
                                            : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                                    }`}>
                                    {l.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Right side: Search + user dropdown */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            <Search />
                        </div>

                        {/* If logged in show dropdown */}
                        {isLogged && (
                            <div className="relative" ref={dropdownRef}>
                                <motion.img
                                    src={
                                        userData?.avatar?.tmdb?.avatar_path
                                            ? `https://image.tmdb.org/t/p/w45${userData.avatar.tmdb.avatar_path}`
                                            : `https://www.gravatar.com/avatar/${userData?.avatar?.gravatar?.hash}?d=mp`
                                    }
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full cursor-pointer border border-accent-primary/40"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() =>
                                        setDropdownOpen(prev => !prev)
                                    }
                                />

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                                y: -5
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.95,
                                                y: -5
                                            }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-36 bg-background-elevated rounded-lg shadow-lg border border-accent-primary/20 p-1 z-50">
                                            <button
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    signOutAlert();
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition">
                                                <LogOut size={16} />
                                                Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile nav */}
                <div className="md:hidden border-t border-background-elevated/50 bg-background-primary">
                    <div className="max-w-7xl mx-auto flex gap-2 items-center overflow-x-auto px-2 py-2">
                        {navLinks.map(l => (
                            <Link
                                key={l.to}
                                to={l.to}
                                className={`flex-shrink-0 px-2 py-1 rounded-lg text-sm font-medium transition-all ${
                                    isActive(l.to)
                                        ? "text-accent-primary bg-accent-primary/10 border border-accent-primary/20"
                                        : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                                }`}>
                                {l.label}
                            </Link>
                        ))}

                        {/* Mobile search only */}
                        <Search iconOnly />

                        {/* Mobile avatar only if logged in */}
                        {isLogged && (
                            <img
                                src={
                                    userData?.avatar?.tmdb?.avatar_path
                                        ? `https://image.tmdb.org/t/p/w45${userData.avatar.tmdb.avatar_path}`
                                        : `https://www.gravatar.com/avatar/${userData?.avatar?.gravatar?.hash}?d=mp`
                                }
                                alt="avatar"
                                className="ml-auto w-8 h-8 rounded-full border border-accent-primary/40"
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
