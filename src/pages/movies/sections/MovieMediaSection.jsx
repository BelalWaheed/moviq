import React, { useState, useMemo } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CollapsibleSection from "../../../components/CollapsibleSection";
import { MdPhotoLibrary } from "react-icons/md";

const MovieMediaSection = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const { id: movieId } = useParams();

  const { MovieImagesDetails } = useSelector(
    (state) => state.MovieImagesReducer
  );

  const { movieVideosData, movieVideosDataLoading } = useSelector(
    (state) => state.MovieVideosReducer
  );

  const navigate = useNavigate();

  const tabs = [
    { key: "videos", label: "Videos" },
    { key: "backdrops", label: "Backdrops" },
    { key: "posters", label: "Posters" },
  ];

  // Deduplicate videos by key
  const uniqueVideos = useMemo(() => {
    if (!movieVideosData?.results) return [];
    const seen = new Set();
    return movieVideosData.results.filter((vid) => {
      if (seen.has(vid.key)) return false;
      seen.add(vid.key);
      return true;
    });
  }, [movieVideosData?.results]);

  // Deduplicate backdrops by file_path
  const uniqueBackdrops = useMemo(() => {
    if (!MovieImagesDetails?.backdrops) return [];
    const seen = new Set();
    return MovieImagesDetails.backdrops.filter((img) => {
      if (seen.has(img.file_path)) return false;
      seen.add(img.file_path);
      return true;
    });
  }, [MovieImagesDetails?.backdrops]);

  // Deduplicate posters by file_path
  const uniquePosters = useMemo(() => {
    if (!MovieImagesDetails?.posters) return [];
    const seen = new Set();
    return MovieImagesDetails.posters.filter((img) => {
      if (seen.has(img.file_path)) return false;
      seen.add(img.file_path);
      return true;
    });
  }, [MovieImagesDetails?.posters]);

  const totalItems = uniqueVideos.length + uniqueBackdrops.length + uniquePosters.length;

  const getImageStyle = (width, height, type) => {
    let maxHeight = 0;

    if (type === "backdrops") maxHeight = 200;
    else if (type === "posters") maxHeight = 300;

    const scale = maxHeight / height;
    const newWidth = width * scale;

    return {
      minWidth: `${newWidth}px`,
      height: `${maxHeight}px`,
    };
  };

  return (
    <CollapsibleSection 
      title="Media" 
      icon={MdPhotoLibrary}
      itemCount={totalItems}
    >
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full ${
              activeTab === tab.key
                ? "bg-red-600"
                : "bg-gray-800 hover:bg-gray-700"
            } text-white text-sm px-4 py-2`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="flex overflow-x-auto overflow-y-hidden gap-4 pb-2 scroll-indicator">
        {activeTab === "videos" && (
          <>
            {movieVideosDataLoading ? (
              <span className="loader"></span>
            ) : uniqueVideos.length === 0 ? (
              <div className="pb-10 px-12 mx-auto mt-10 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L15 12 9.75 7v10zM19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
                <h2 className="text-gray-400 text-lg font-semibold mb-2">
                  No Videos Available
                </h2>
                <p className="text-gray-500 text-sm text-center max-w-xs">
                  Sorry, we couldn't find videos for this movie.
                </p>
              </div>
            ) : (
              uniqueVideos.slice(0, 10).map((vid) => (
                <div
                  key={vid.id}
                  className="min-w-[250px] h-[150px] sm:min-w-[300px] sm:h-[180px] md:min-w-[400px] md:h-[220px] lg:min-w-[500px] lg:h-[300px] bg-black rounded-2xl overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.key}?playsinline=1`}
                    title={vid.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === "backdrops" && (
          <>
            {uniqueBackdrops.slice(0, 10).map((backdrop) => (
              <div
                key={backdrop.file_path}
                style={getImageStyle(
                  backdrop.width,
                  backdrop.height,
                  "backdrops"
                )}
                className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                  alt="backdrop"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {uniqueBackdrops.length > 10 && (
              <button
                onClick={() => navigate(`/movie/${movieId}/backdrops`)}
                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300"
              >
                <span className="text-white text-lg font-bold">
                  +{uniqueBackdrops.length - 10}
                </span>
                <span className="text-sm text-gray-300">Show More</span>
              </button>
            )}
          </>
        )}

        {activeTab === "posters" && (
          <>
            {uniquePosters.slice(0, 10).map((poster) => (
              <div
                key={poster.file_path}
                style={getImageStyle(poster.width, poster.height, "posters")}
                className="cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                  alt="poster"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {uniquePosters.length > 10 && (
              <button
                onClick={() => navigate(`/movie/${movieId}/posters`)}
                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300"
              >
                <span className="text-white text-lg font-bold">
                  +{uniquePosters.length - 10}
                </span>
                <span className="text-sm text-gray-300">Show More</span>
              </button>
            )}
          </>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default MovieMediaSection;
