import React, { useEffect, useRef, useState } from "react";
import { Film, Menu, X, Search as SearchIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // click outside to close mobile menu
  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && menuOpen && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className=" bg-background-primary/95 backdrop-blur-md border-b border-background-elevated/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-1  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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
                <Film className="w-7 text-accent-primary" />
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="absolute inset-0 bg-accent-primary rounded-full blur-md opacity-40"
                />
              </motion.div>

              <span className="text-xl md:text-2xl mr-2 font-black bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
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
                  className="relative px-4 py-2 rounded-lg transition-all text-md group"
                >
                  <span
                    className={`relative z-10 ${
                      isActive(l.to)
                        ? "text-accent-primary font-bold"
                        : "text-text-secondary group-hover:text-text-primary"
                    }`}
                  >
                    {l.label}
                  </span>

                  {!isActive(l.to) && (
                    <div className="absolute inset-0 bg-background-elevated/0 group-hover:bg-background-elevated rounded-lg transition-colors" />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Search />

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2 ">
              <motion.button
                onClick={() => setMenuOpen((s) => !s)}
                className="p-1 rounded-lg hover:bg-background-elevated text-text-secondary transition-colors"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      onClick={() => setMenuOpen((s) => !s)}
                      key="close"
                      initial={{ rotate: -20, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 20, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 20, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -20, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="w-5 h-5" />
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
            transition={{ duration: 0.28 }}
            className="md:hidden overflow-hidden border-t border-background-elevated/50 bg-background-primary"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((l, idx) => (
                  <motion.div
                    key={l.to}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base transition-all ${
                        isActive(l.to)
                          ? "text-accent-primary font-bold bg-accent-primary/10 border border-accent-primary/30"
                          : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Search is rendered inside Search component (md:hidden) - just keep spacing here */}
              <div />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
