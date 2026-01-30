import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../notFound/NotFound";
import MovieLoader from "../../loading/MovieLoader";
import { GetPersonDetails } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import CollapsibleSection from "../../../components/CollapsibleSection";
import { GrUserWorker } from "react-icons/gr";

const MovieCrewSection = () => {
  const {
    MovieCreditsDetails,
    MovieCreditsDetailsLoading,
    MovieCreditsDetailsError,
  } = useSelector((state) => state.MovieCreditsReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: movieId } = useParams();

  // Deduplicate crew by id - keep first occurrence
  const uniqueCrew = useMemo(() => {
    if (!MovieCreditsDetails?.crew) return [];
    const seen = new Set();
    return MovieCreditsDetails.crew.filter((worker) => {
      if (seen.has(worker.id)) return false;
      seen.add(worker.id);
      return true;
    });
  }, [MovieCreditsDetails?.crew]);

  if (MovieCreditsDetailsError) return <NotFound />;
  if (MovieCreditsDetailsLoading) return <MovieLoader />;
  if (!uniqueCrew.length) return null;

  return (
    <CollapsibleSection 
      title="Crew" 
      icon={GrUserWorker}
      itemCount={uniqueCrew.length}
    >
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
        {uniqueCrew.slice(0, 10).map((worker) => (
          <div
            onClick={() => {
              dispatch(GetPersonDetails({ personId: worker.id }));
              dispatch(GetPersonCombinedCredits({ personId: worker.id }));
              navigate(`/person/${worker.id}`);
            }}
            key={worker.id}
            className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={
                  worker.profile_path
                    ? `https://image.tmdb.org/t/p/w500${worker.profile_path}`
                    : "./Image-not-found.png"
                }
                alt={worker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">{worker.name}</h3>
              <p className="text-gray-400 text-xs truncate">
                {worker.job || "Unknown Role"}
              </p>
            </div>
          </div>
        ))}

        {uniqueCrew.length > 10 && (
          <button
            onClick={() => navigate(`/movie/${movieId}/crew`)}
            className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300"
          >
            <span className="text-white text-lg font-bold">
              +{uniqueCrew.length - 10}
            </span>
            <span className="text-sm text-gray-300">Show More</span>
          </button>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default MovieCrewSection;
