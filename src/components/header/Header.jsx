import { useEffect } from "react";
import { Film } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
];

export default function Header() {
  const location = useLocation();

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className=" bg-background-primary/95 backdrop-blur-md border-b border-background-elevated/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo + (mobile) inline icon */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.34 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 6, scale: 1.03 }}
                transition={{ duration: 0.24 }}
                className="relative"
              >
                <Film className="w-5 md:w-7 text-accent-primary" />
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="absolute inset-0 bg-accent-primary rounded-full blur-md opacity-40"
                />
              </motion.div>

              <span className="text-xl md:text-2xl mr-1 font-black bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
                Moviq
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex md:items-center md:gap-2 search-scroll"
            aria-label="Primary"
          >
            {navLinks.map((l, idx) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  to={l.to}
                  className={`relative px-4 py-2 rounded-lg text-md font-medium transition-all
    ${
      isActive(l.to)
        ? "text-accent-primary bg-accent-primary/10 border border-accent-primary/20"
        : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
    }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/*  Desktop search  */}
          <div className="hidden md:flex items-center gap-3">
            <Search />
          </div>
          <div className="md:hidden border-t border-background-elevated/50 bg-background-primary">
            <div className="max-w-7xl mx-auto  flex gap-2 items-center overflow-x-auto">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex-shrink-0 px-1.5 py-1 sm:px-3 sm:py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(l.to)
                      ? "text-accent-primary bg-accent-primary/10 border border-accent-primary/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Search iconOnly />
          </div>
        </div>
      </div>
    </header>
  );
}
