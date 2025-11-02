// MediaSection updated: replaced getImageStyle with Tailwind classes
// Backdrops fixed height ~200px, Posters ~300px, maintaining proportional width using fixed height + auto width

import React, { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesImages } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesImages";
import { getSeriesTrailer } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../SeriesImages/Preview/ImagePreview";

const MediaSection = () => {
    const [activeTab, setActiveTab] = useState("videos");
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { SeriesImagesDetails } = useSelector(
        state => state.SeriesImagesDetailsReducer
    );
    const { seriesVideosData, seriesVideosDataLoading } = useSelector(
        state => state.seriesTrailerReducer
    );

    useEffect(() => {
        dispatch(
            GetSeriesImages({ seriesId: localStorage.getItem("seriesId") })
        );
        dispatch(getSeriesTrailer(localStorage.getItem("seriesId")));
    }, []);

    const tabs = [
        { key: "videos", label: "Videos" },
        { key: "backdrops", label: "Backdrops" },
        { key: "logos", label: "Logos" },
        { key: "posters", label: "Posters" }
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-6">
                <PlayIcon className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Media
                </h2>
            </div>

            <div className="flex gap-3 mb-6 flex-wrap">
                {tabs.map(tab => (
                    <Button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-full ${
                            activeTab === tab.key
                                ? "bg-red-600"
                                : "bg-gray-800 hover:bg-gray-700"
                        } text-white text-sm px-4 py-2`}>
                        {tab.label}
                    </Button>
                ))}
            </div>

            <div className="flex overflow-x-auto overflow-y-hidden gap-4 pb-2 scroll-indicator">
                {activeTab === "backdrops" && (
                    <>
                        {SeriesImagesDetails?.backdrops
                            ?.slice(0, 10)
                            .map(backdrop => (
                                <div
                                    key={backdrop.file_path}
                                    onClick={() => setSelectedImage(backdrop)}
                                    className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 h-[200px] w-auto min-w-[300px]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                                        alt="backdrop"
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ))}
                    </>
                )}

                {activeTab === "posters" && (
                    <>
                        {SeriesImagesDetails?.posters
                            ?.slice(0, 10)
                            .map(poster => (
                                <div
                                    key={poster.file_path}
                                    onClick={() => setSelectedImage(poster)}
                                    className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 h-[300px] w-auto min-w-[200px]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                                        alt="poster"
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MediaSection;
