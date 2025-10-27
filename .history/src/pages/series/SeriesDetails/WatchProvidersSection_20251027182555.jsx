import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTv, FaGlobeAmericas, FaCheckSquare } from "react-icons/fa";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const WatchProvidersSection = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);

    const countries = [
        { code: "US", name: "United States" },
        { code: "GB", name: "United Kingdom" },
        { code: "JP", name: "Japan" },
        { code: "FR", name: "France" },
        { code: "EG", name: "Egypt" }
    ];

    // English comment: Handles selecting or unselecting a country checkbox
    const handleToggle = code => {
        setSelectedCountries(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 space-y-6">
            {/* === Title === */}
            <div className="flex items-center gap-3">
                <FaTv className="text-red-500 text-xl" />
                <h3 className="text-white font-bold text-2xl tracking-wide">
                    Where to Watch
                </h3>
            </div>

            {/* === Checkbox List === */}
            <div className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-wrap gap-6">
                    {countries.map(country => (
                        <label
                            key={country.code}
                            className="flex items-center gap-3 text-gray-300 cursor-pointer hover:text-white transition-colors">
                            <input
                                type="checkbox"
                                checked={selectedCountries.includes(
                                    country.code
                                )}
                                onChange={() => handleToggle(country.code)}
                                className="appearance-none w-5 h-5 border border-red-600 rounded-md checked:bg-red-600 checked:border-transparent transition-all cursor-pointer"
                            />
                            <FaGlobeAmericas className="text-red-500" />
                            <span className="text-sm">{country.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* === Placeholder Provider Cards === */}
            {selectedCountries.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedCountries.map((code, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#141414] border border-neutral-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-red-600 transition-all">
                            {/* English comment: Replace icon + text with provider logos (Netflix, Disney+, etc) later */}
                            <FaCheckSquare className="text-red-500 text-3xl" />
                            <p className="text-gray-300 text-sm text-center">
                                Available providers in{" "}
                                <span className="text-white font-semibold">
                                    {code}
                                </span>
                            </p>
                            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default WatchProvidersSection;
