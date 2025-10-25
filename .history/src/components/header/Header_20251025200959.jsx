import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SiThemoviedatabase } from "react-icons/si";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Handle sign in simulation
    const handleSignIn = () => {
        setIsSignedIn(true);
        navigate("/"); // Always navigate home
    };

    // Handle sign out
    const signOutAlert = () => {
        setIsSignedIn(false);
        setShowDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = e => {
            if (!e.target.closest(".dropdown-container"))
                setShowDropdown(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full bg-black bg-opacity-60 backdrop-blur-md shadow-md z-50">
            <div className="flex items-center justify-between px-4 md:px-8 py-3">
                {/* Left section: Logo and Connect button */}
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link to="/" className="text-white font-bold text-xl">
                        Moviq
                    </Link>

                    {/* Connect TMDB button (only if not signed in) */}
                    {!isSignedIn && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSignIn}
                            className="hidden sm:flex items-center gap-2 bg-[#01b4e4] text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-md">
                            <SiThemoviedatabase className="text-lg" />
                            Connect TMDB Account
                        </motion.button>
                    )}
                </div>

                {/* Center section: Nav links */}
                <nav className="hidden md:flex items-center gap-6 text-white font-medium">
                    <Link
                        to="/"
                        className={`hover:text-[#01b4e4] transition-colors ${
                            location.pathname === "/" ? "text-[#01b4e4]" : ""
                        }`}>
                        Home
                    </Link>
                    <Link
                        to="/movies"
                        className={`hover:text-[#01b4e4] transition-colors ${
                            location.pathname === "/movies"
                                ? "text-[#01b4e4]"
                                : ""
                        }`}>
                        Movies
                    </Link>
                    <Link
                        to="/series"
                        className={`hover:text-[#01b4e4] transition-colors ${
                            location.pathname === "/series"
                                ? "text-[#01b4e4]"
                                : ""
                        }`}>
                        Series
                    </Link>
                </nav>

                {/* Right section: Search + Account */}
                <div className="flex items-center gap-4 relative">
                    {/* Search icon */}
                    <FiSearch
                        className="text-white text-xl cursor-pointer hover:text-[#01b4e4] transition-colors"
                        onClick={() => navigate("/")}
                    />

                    {/* If signed in: avatar + dropdown */}
                    {isSignedIn ? (
                        <div className="relative dropdown-container">
                            <IoPersonCircleSharp
                                className="text-white text-3xl cursor-pointer hover:text-[#01b4e4] transition-colors"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />

                            <AnimatePresence>
                                {showDropdown && (
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
                                        className="absolute right-0 mt-2 bg-[#121212] text-white rounded-lg shadow-lg overflow-hidden min-w-[130px] border border-gray-700">
                                        <button
                                            onClick={signOutAlert}
                                            className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-[#1c1c1c] transition-colors">
                                            <FiLogOut className="text-red-400" />
                                            <span className="text-sm text-red-400 font-medium">
                                                Sign out
                                            </span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        // Show connect button on mobile only
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSignIn}
                            className="flex sm:hidden items-center gap-2 bg-[#01b4e4] text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-md">
                            <SiThemoviedatabase className="text-lg" />
                            Connect TMDB
                        </motion.button>
                    )}
                </div>
            </div>
        </header>
    );
}
