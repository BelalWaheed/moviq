import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaFlag } from "react-icons/fa";
import { GlobeAltIcon, LinkIcon } from "@heroicons/react/24/solid";

const CountrySelector = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

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
        { code: "JP", name: "Japan", flag: "https://flagcdn.com/jp.svg" },
        { code: "FR", name: "France", flag: "https://flagcdn.com/fr.svg" },
        { code: "EG", name: "Egypt", flag: "https://flagcdn.com/eg.svg" },
        { code: "DE", name: "Germany", flag: "https://flagcdn.com/de.svg" },
        { code: "IT", name: "Italy", flag: "https://flagcdn.com/it.svg" },
        { code: "IN", name: "India", flag: "https://flagcdn.com/in.svg" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 space-y-6">
            {/* === Header === */}
            <div className="flex items-center gap-3">
                <GlobeAltIcon className="w-6 h-6 text-red-500" />
                <h3 className="text-white font-bold text-2xl tracking-wide">
                    Choose Country
                </h3>
            </div>

            {/* === Selector Button === */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full bg-[#0f0f0f] border border-neutral-800 rounded-2xl px-5 py-3 flex items-center justify-between text-gray-300 hover:border-red-600 hover:text-white transition-all">
                <div className="flex items-center gap-2">
                    {selected ? (
                        <>
                            <img
                                src={selected.flag}
                                alt={selected.name}
                                className="w-6 h-4 rounded-sm object-cover"
                            />
                            <span>{selected.name}</span>
                        </>
                    ) : (
                        <span>Select a country</span>
                    )}
                </div>
                {open ? (
                    <FaChevronUp className="text-red-500" />
                ) : (
                    <FaChevronDown className="text-red-500" />
                )}
            </button>

            {/* === Dropdown List === */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#141414] border border-neutral-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-transparent">
                            {countries.map(country => (
                                <label
                                    key={country.code}
                                    onClick={() => {
                                        setSelected(country);
                                        setOpen(false);
                                    }}
                                    className={`flex items-center justify-between px-5 py-3 text-gray-300 hover:bg-red-600/10 cursor-pointer transition-colors ${
                                        selected?.code === country.code
                                            ? "text-white bg-red-600/20"
                                            : ""
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            className="w-6 h-4 rounded-sm object-cover"
                                        />
                                        <span className="text-sm">
                                            {country.name}
                                        </span>
                                    </div>
                                    <input
                                        type="radio"
                                        checked={
                                            selected?.code === country.code
                                        }
                                        readOnly
                                        className="accent-red-600 w-4 h-4 cursor-pointer"
                                    />
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === Link Section === */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center gap-3 text-gray-300">
                        <FaFlag className="text-red-500" />
                        <p>
                            Selected:{" "}
                            <span className="text-white font-semibold">
                                {selected.name} ({selected.code})
                            </span>
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition-all">
                        <LinkIcon className="w-5 h-5" />
                        Go to Provider Link
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CountrySelector;
