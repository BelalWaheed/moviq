import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTv, FaGlobe } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const WatchProvidersSection = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);

    const countries = [
        { code: "US", name: "United States" },
        { code: "GB", name: "United Kingdom" },
        { code: "FR", name: "France" },
        { code: "JP", name: "Japan" },
        { code: "EG", name: "Egypt" }
    ];

    // Handle checkbox toggle
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
            className="mt-8 space-y-6">
            {/* === Title === */}
            <div className="flex items-center gap-2 mb-2">
                <FaTv className="text-red-500 text-lg" />
                <h3 className="text-white font-bold text-xl">Where to Watch</h3>
            </div>

            {/* === Country Selection List === */}
            <Card className="bg-[#0f0f0f] border border-neutral-800 p-4 rounded-2xl shadow-lg">
                <div className="flex flex-wrap gap-4">
                    {countries.map(country => (
                        <label
                            key={country.code}
                            className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
                            <input
                                type="checkbox"
                                checked={selectedCountries.includes(
                                    country.code
                                )}
                                onChange={() => handleToggle(country.code)}
                                className="accent-red-600 w-4 h-4 rounded"
                            />
                            <FaGlobe className="text-red-500" />
                            <span className="text-sm tracking-wide">
                                {country.name}
                            </span>
                        </label>
                    ))}
                </div>
            </Card>

            {/* === Placeholder Area for Providers === */}
            {selectedCountries.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                    {selectedCountries.map((code, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-red-600/20 transition-colors">
                            {/* English comment: Replace this icon and text later with the provider logo */}
                            <FaTv className="text-red-500 text-2xl" />
                            <p className="text-gray-300 text-sm">
                                Providers for{" "}
                                <span className="text-white font-semibold">
                                    {code}
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default WatchProvidersSection;
