import React, { useEffect, useRef, useState } from "react";
import { Film, Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close (mobile menu)
  useEffect(() => {
    function onClick(e) {
      if (!menuRef.current) return;
      if (menuOpen && !menuRef.current.contains(e.target)) {
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

  const placeholder = location.pathname.startsWith("/series")
    ? "Search Series..."
    : location.pathname.startsWith("/movies")
    ? "Search Movies..."
    : "Movies & Series...";

  return (
    <header className="bg-background-primary border-b border-background-elevated sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-8 h-8 text-accent-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Moviq
              </span>
            </Link>
          </div>

          {/* Center: desktop nav */}
          <nav
            className="hidden md:flex md:items-center md:gap-4"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded transition-colors text-sm ${
                  isActive(l.to)
                    ? "text-accent-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: desktop search + mobile buttons */}
          <div className="flex items-center gap-3">
            {/* desktop search i will handle it later after i finish redux */}
            <div
              className="hidden md:flex items-center gap-2"
              role="search"
              aria-label="Site search"
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder={placeholder}
                  className="w-56 bg-surface-secondary text-text-primary placeholder:text-text-secondary px-10 py-2 rounded-md outline-none border border-transparent focus:border-accent-primary transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              </div>
              <button
                type="button"
                className="px-3 py-2 rounded-md bg-accent-primary hover:bg-accent-hover text-text-primary text-sm"
              >
                Search
              </button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              {/* menu toggle */}
              <button
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-background-elevated text-text-secondary"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden transform origin-top transition-all duration-200 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden border-t border-background-elevated`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base ${
                  isActive(l.to)
                    ? "text-accent-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobaile search i will handle it later after i finish redux */}
          <div className="mt-1 flex items-center gap-2" role="search">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder={placeholder}
                className="w-full bg-surface-secondary text-text-primary placeholder:text-text-secondary px-10 py-2 rounded-md outline-none border border-transparent focus:border-accent-primary transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            </div>
            <button
              type="button"
              className="px-3 py-2 rounded-md bg-accent-primary hover:bg-accent-hover text-text-primary text-sm"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
