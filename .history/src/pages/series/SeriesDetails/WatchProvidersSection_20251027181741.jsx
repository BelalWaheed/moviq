import React from "react";
import { motion } from "framer-motion";
import { FaGlobeAmericas } from "react-icons/fa";

const WatchProvidersSection = () => {
    // Static mock data (for design only)
    const countries = [
        {
            code: "US",
            name: "United States",
            flag: "https://flagcdn.com/us.svg"
        },
        {
            code: "GB",
            name: "United Kingdom",
            flag: "https://flagcdn.com/gb.svg"
        },
        {
            code: "FR",
            name: "France",
            flag: "https://flagcdn.com/fr.svg"
        },
        {
            code: "JP",
            name: "Japan",
            flag: "https://flagcdn.com/jp.svg"
        },
        {
            code: "EG",
            name: "Egypt",
            flag: "https://flagcdn.com/eg.svg"
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full px-6 mt-10">
            {/* Section title */}
            <div className="flex items-center gap-3 mb-6">
                <FaGlobeAmericas className="text-red-500 text-xl" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Streaming Availability by Country
                </h2>
            </div>

            {/* Country cards (design only, no actual links) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {countries.map((country, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 bg-[#0f0f0f] hover:bg-red-600/20 rounded-xl px-4 py-3 transition-colors border border-neutral-800 cursor-default">
                        <img
                            src={country.flag}
                            alt={country.code}
                            className="w-8 h-6 object-cover rounded shadow-md"
                        />
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium tracking-wide">
                                {country.name}
                            </span>
                            <span className="text-gray-400 text-xs uppercase">
                                {country.code}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder box to represent where platform links would appear */}
            <div className="mt-10 bg-[#141414] border border-neutral-800 rounded-xl p-6 text-center text-gray-400 text-sm italic">
                {/* English comment: This box represents the area where platform links will appear after a country is selected */}
                Platform links will appear here once a country is selected.
            </div>
        </motion.section>
    );
};

export default WatchProvidersSection;
