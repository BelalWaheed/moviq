import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const WatchProvidersSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const countries = [
        { code: "US", name: "United States" },
        { code: "GB", name: "United Kingdom" },
        { code: "CA", name: "Canada" },
        { code: "FR", name: "France" },
        { code: "DE", name: "Germany" },
        { code: "EG", name: "Egypt" },
        { code: "SA", name: "Saudi Arabia" },
        { code: "IN", name: "India" },
        { code: "JP", name: "Japan" },
        { code: "KR", name: "Korea" }
    ];

    return (
        <div className=" container mx-auto relative w-full md:w-1/2 min-h-fit z-[1] mt-6">
            {/* Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between bg-[#111] rounded-xl p-3 cursor-pointer hover:bg-[#1b1b1b] transition-all">
                <div className="flex items-center gap-2">
                    <GlobeAltIcon className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-semibold text-white">
                        Where to Watch
                    </h3>
                </div>
                {isOpen ? (
                    <FaChevronUp className="text-gray-400" />
                ) : (
                    <FaChevronDown className="text-gray-400" />
                )}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <Card
                    className="
            absolute left-0 top-full mt-2
            w-full bg-[#0f0f0f] border border-gray-800
            rounded-xl p-4 shadow-xl
            max-h-56 overflow-y-auto
            z-50
          ">
                    <div className="flex flex-col gap-2">
                        {countries.map(country => (
                            <label
                                key={country.code}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1c1c1c] transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="country"
                                        value={country.code}
                                        checked={
                                            selectedCountry === country.code
                                        }
                                        onChange={() => {
                                            setSelectedCountry(country.code);
                                            setIsOpen(false);
                                        }}
                                        className="accent-red-500 w-4 h-4"
                                    />
                                    <span className="text-gray-300">
                                        {country.name}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {country.code}
                                </span>
                            </label>
                        ))}
                    </div>
                </Card>
            )}

            {/* Selected Country Link */}
            {selectedCountry && (
                <div className="mt-3 flex items-center justify-between bg-[#111] rounded-xl p-3">
                    <span className="text-gray-400 text-sm">
                        Selected:{" "}
                        <span className="text-white font-medium">
                            {selectedCountry}
                        </span>
                    </span>
                    <a
                        href={`https://www.themoviedb.org/provider/${selectedCountry}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 font-medium hover:underline">
                        Open on TMDB
                    </a>
                </div>
            )}
        </div>
    );
};

export default WatchProvidersSection;
