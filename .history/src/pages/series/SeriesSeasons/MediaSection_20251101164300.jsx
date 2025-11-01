import React, { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesImages } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesImages";
import { getSeriesTrailer } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../SeriesImages/Preview/ImagePreview";
import { GetSeriesSeasonsImages } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsImages";
import { GetSeriesSeasonsVideos } from "../../../redux/SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsVideos";

const MediaSection = () => {
    const [activeTab, setActiveTab] = useState("videos");
    const [selectedImage, setSelectedImage] = useState(null);

    const { SeriesSeasonsImagesDetails } = useSelector(
        state => state.SeriesSeasonsImagesDetailsReducer
    );

    const { SeriesSeasonsVideosData, SeriesSeasonsVideosDataLoading } =
        useSelector(state => state.SeriesSeasonsVideosReducer);
    useEffect(() => {
        dispatch(
            GetSeriesSeasonsImages({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
        dispatch(
            GetSeriesSeasonsVideos({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tabs = [
        { key: "videos", label: "Videos" },

        { key: "posters", label: "Posters" }
    ];

    //  calculate the width and height of an image appropriately
    const getImageStyle = (width, height, type) => {
        let maxHeight = 0;

        if (type === "backdrops") maxHeight = 200; // backdrops
        else if (type === "posters") maxHeight = 300; // posters

        const scale = maxHeight / height;
        const newWidth = width * scale;

        return {
            minWidth: `${newWidth}px`,
            height: `${maxHeight}px`
        };
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <PlayIcon className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Media
                </h2>
            </div>

            {/* Tabs */}
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

            {/* Content */}
            <div className="flex overflow-x-auto overflow-y-hidden gap-4 pb-2 scroll-indicator">
                {/* Videos */}
                {activeTab === "videos" && (
                    <>
                        {seriesVideosDataLoading ? (
                            <span className="loader"></span>
                        ) : seriesVideosData?.results?.length === 0 ? (
                            <div className="pb-10 px-12 mx-auto mt-10 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-gray-500 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L15 12 9.75 7v10zM19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                    />
                                </svg>
                                <h2 className="text-gray-400 text-lg font-semibold mb-2">
                                    No Vidoes Available
                                </h2>
                                <p className="text-gray-500 text-sm text-center max-w-xs">
                                    Sorry, we couldn’t find a videos for this
                                    show.
                                </p>
                            </div>
                        ) : (
                            seriesVideosData?.results
                                ?.slice(0, 10)
                                ?.map(vid => (
                                    <div
                                        key={vid.id}
                                        className="
      min-w-[250px] h-[150px] 
      sm:min-w-[300px] sm:h-[180px] 
      md:min-w-[400px] md:h-[220px] 
      lg:min-w-[500px] lg:h-[300px]
      bg-black rounded-2xl overflow-hidden flex-shrink-0 
      hover:scale-105 transition-transform duration-300
    ">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid.key}?playsinline=1`}
                                            title={vid.name}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full object-cover"></iframe>
                                    </div>
                                ))
                        )}
                    </>
                )}

                {/* Backdrops */}
                {activeTab === "backdrops" && (
                    <>
                        {SeriesImagesDetails?.backdrops
                            ?.slice(0, 10)
                            .map((backdrop, idx) => (
                                <div
                                    onClick={() => setSelectedImage(backdrop)}
                                    key={backdrop.file_path}
                                    style={getImageStyle(
                                        backdrop.width,
                                        backdrop.height,
                                        "backdrops"
                                    )}
                                    className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                                        alt="backdrop"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        {SeriesImagesDetails?.backdrops?.length > 10 && (
                            <button
                                onClick={() => navigate("/BackdropsPage")}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +
                                    {SeriesImagesDetails?.backdrops.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </>
                )}

                {/* Logos */}
                {activeTab === "logos" && (
                    <>
                        {SeriesImagesDetails?.logos
                            ?.slice(0, 10)
                            ?.map((logo, idx) => (
                                <div
                                    onClick={() => setSelectedImage(logo)}
                                    key={logo.file_path}
                                    className="cursor-pointer w-[200px] h-[100px] bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${logo.file_path}`}
                                        alt="logo"
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>
                            ))}
                        {SeriesImagesDetails?.logos?.length > 10 && (
                            <button
                                onClick={() => navigate("/LogosPage")}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +{SeriesImagesDetails?.logos.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </>
                )}

                {/* Posters */}
                {activeTab === "posters" && (
                    <>
                        {SeriesImagesDetails?.posters
                            ?.slice(0, 10)
                            ?.map((poster, idx) => (
                                <div
                                    onClick={() => setSelectedImage(poster)}
                                    key={poster.file_path}
                                    style={getImageStyle(
                                        poster.width,
                                        poster.height,
                                        "posters"
                                    )}
                                    className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                                        alt="poster"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        {SeriesImagesDetails?.posters?.length > 10 && (
                            <button
                                onClick={() => navigate("/PostersPage")}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +{SeriesImagesDetails?.posters?.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </>
                )}
                {/* image preview */}
                <ImagePreview
                    image={selectedImage}
                    onClick={() => setSelectedImage(null)}
                />
            </div>
        </div>
    );
};

export default MediaSection;
