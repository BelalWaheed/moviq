// Import required modules and components
import React, { useEffect, useState, useRef } from "react";
import { Film, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SiThemoviedatabase } from "react-icons/si";

import { RequestSingIn } from "../../redux/AuthSlices/RequestSingIn";
import { AccountInfo, signOut } from "../../redux/AuthSlices/AccountInfo";
import { RequestSingOut } from "../../redux/AuthSlices/RequestSignOut";

// Navigation links
const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/series", label: "Series" }
];

export default function Header() {
    // Hooks and Redux setup
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { isLogged, AccountInfoDetails, AccountInfoDetailsLoading } =
        useSelector(state => state.AccountInfoSliceReducer);
    const { RequestSingInDetails } = useSelector(
        state => state.SignInTokenReducer
    );

    // Dropdown state and ref
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sign out alert
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

    // Handle access denied
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

    // Redirect to TMDB auth when token is ready
    useEffect(() => {
        if (RequestSingInDetails?.success) {
            window.location.href = `https://www.themoviedb.org/authenticate/${RequestSingInDetails.request_token}?redirect_to=http://localhost:5173/`;
        }
    }, [RequestSingInDetails]);

    // Fetch account info
    useEffect(() => {
        dispatch(AccountInfo());
    }, [dispatch]);

    // Close dropdown when clicking outside
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

    // Check if a link is active
    const isActive = path =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-accent-primary/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
                {/* Left section: logo + TMDB button (mobile) */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2 select-none"
                        onClick={() => navigate("/")}>
                        <motion.img
                            src="/logo.png"
                            alt="Moviq"
                            className="w-8 h-8 object-contain"
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="text-lg font-bold text-text-primary"
                            whileHover={{ x: 2 }}>
                            Moviq
                        </motion.span>
                    </Link>

                    {/* TMDB button for small screens only */}
                    {!isLogged && !AccountInfoDetailsLoading && (
                        <motion.button
                            onClick={() => {
                                dispatch(RequestSingIn());
                                navigate("/");
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex md:hidden items-center gap-2 bg-[#01b4e4] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md hover:bg-[#009fc9] transition-all">
                            <SiThemoviedatabase size={14} />
                            Connect TMDB
                        </motion.button>
                    )}
                </div>

                {/* Center navigation links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
                    <Link to="/" className="hover:text-text-primary transition">
                        Home
                    </Link>
                    <Link
                        to="/movies"
                        className="hover:text-text-primary transition">
                        Movies
                    </Link>
                    <Link
                        to="/series"
                        className="hover:text-text-primary transition">
                        Series
                    </Link>
                </nav>

                {/* Right side elements */}
                <div className="flex items-center gap-3">
                    {/* Desktop search bar */}
                    <div className="hidden md:flex items-center gap-3">
                        <Search />
                    </div>

                    {/* Loading state */}
                    {AccountInfoDetailsLoading ? (
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <span className="w-4 h-4 border-2 border-t-transparent border-white/70 rounded-full animate-spin"></span>
                            <span>Loading...</span>
                        </div>
                    ) : isLogged ? (
                        // User dropdown when logged in
                        <div className="relative" ref={dropdownRef}>
                            <motion.div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setDropdownOpen(prev => !prev)}
                                whileHover={{ scale: 1.05 }}>
                                <motion.img
                                    src={
                                        AccountInfoDetails?.avatar?.tmdb
                                            ?.avatar_path
                                            ? `https://image.tmdb.org/t/p/w45${AccountInfoDetails.avatar.tmdb.avatar_path}`
                                            : `https://www.gravatar.com/avatar/${AccountInfoDetails?.avatar?.gravatar?.hash}?d=mp`
                                    }
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full border border-accent-primary/40"
                                />
                                <span className="text-text-primary font-medium text-sm">
                                    {AccountInfoDetails?.username}
                                </span>
                            </motion.div>

                            {/* Dropdown menu */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: -5
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
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
                    ) : (
                        // TMDB connect button when not logged in
                        <motion.button
                            onClick={() => {
                                dispatch(RequestSingIn());
                                navigate("/");
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="hidden md:flex items-center gap-2 bg-[#01b4e4] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md hover:bg-[#009fc9] transition-all">
                            <SiThemoviedatabase size={14} />
                            Connect TMDB
                        </motion.button>
                    )}
                </div>
            </div>
        </header>
    );
}
