import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesWatchProviders } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesWatchProviders";
import { Radio } from "@material-tailwind/react";

const WatchProvidersSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { SeriesWatchProvidersDetails } = useSelector(
        state => state.SeriesWatchProvidersReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            GetSeriesWatchProviders({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    useEffect(() => {
        const getFullCountry = async () => {
            try {
                const request = await fetch(
                    "https://countriesnow.space/api/v0.1/countries"
                );
                const response = await request.json();
                console.log(response);
            } catch (error) {}
        };
        getFullCountry();
    }, [SeriesWatchProvidersDetails]);

    const keys = SeriesWatchProvidersDetails?.results
        ? Object.keys(SeriesWatchProvidersDetails?.results)
        : [];

    const filteredKeys = keys.filter(key =>
        key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-8 md:mx-auto relative w-full md:w-1/2 min-h-fit z-[1] mt-6">
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
                <Card className="scroll-indicator absolute left-0 top-full mt-2 w-full bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 shadow-xl max-h-56 overflow-y-auto z-50">
                    <input
                        type="text"
                        placeholder="Search country code (e.g. us, eg, fr)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="mb-3 p-2 w-full bg-[#1a1a1a] text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                    />

                    <div className="flex flex-col gap-2 ">
                        {filteredKeys.length > 0 ? (
                            filteredKeys.map(key => (
                                <label
                                    key={key}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1c1c1c] transition-all cursor-pointer ">
                                    <div className="flex items-center gap-3 scroll-indicator">
                                        <img
                                            src={`https://flagsapi.com/${key}/flat/64.png`}
                                            alt={key}
                                            className="w-8 h-8 object-cover"
                                        />
                                        <Radio
                                            name="color"
                                            color="red"
                                            value={key}
                                            checked={selectedCountry === key}
                                            onChange={() => {
                                                setSelectedCountry(key);
                                                setIsOpen(false);
                                            }}
                                        />
                                        <span className="text-gray-300">
                                            {key}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {SeriesWatchProvidersDetails.results[
                                            key
                                        ]?.link
                                            ? "Available"
                                            : "No link"}
                                    </span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center">
                                No results found
                            </p>
                        )}
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
                        href={`${SeriesWatchProvidersDetails.results[selectedCountry]?.link}`}
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
