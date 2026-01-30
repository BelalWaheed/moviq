import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../notFound/NotFound";
import MovieLoader from "../../../loading/MovieLoader";
import { GetSeriesAggregateCredits } from "../../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesAggregateCredits";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const Cast_And_CrewSection = () => {
    const {
        SeriesAggregateCreditsDetails,
        SeriesAggregateCreditsDetailsLoading,
        SeriesAggregateCreditsDetailsError
    } = useSelector(state => state.SeriesAggregateCreditsReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: seriesId } = useParams();

    // Fetch aggregate credits using URL param
    useEffect(() => {
        if (seriesId) {
            dispatch(
                GetSeriesAggregateCredits({
                    seriesId: seriesId
                })
            );
        }
    }, [dispatch, seriesId]);

    // Deduplicate cast by id
    const uniqueCast = useMemo(() => {
        if (!SeriesAggregateCreditsDetails?.cast) return [];
        const seen = new Set();
        return SeriesAggregateCreditsDetails.cast.filter((actor) => {
            if (seen.has(actor.id)) return false;
            seen.add(actor.id);
            return true;
        });
    }, [SeriesAggregateCreditsDetails?.cast]);

    // Deduplicate crew by id
    const uniqueCrew = useMemo(() => {
        if (!SeriesAggregateCreditsDetails?.crew) return [];
        const seen = new Set();
        return SeriesAggregateCreditsDetails.crew.filter((worker) => {
            if (seen.has(worker.id)) return false;
            seen.add(worker.id);
            return true;
        });
    }, [SeriesAggregateCreditsDetails?.crew]);

    if (SeriesAggregateCreditsDetailsError) return <NotFound />;
    if (SeriesAggregateCreditsDetailsLoading) return <MovieLoader />;

    return (
        <>
            {/* CAST SECTION */}
            {uniqueCast.length > 0 && (
                <CollapsibleSection 
                    title="Cast" 
                    icon={FaUsers}
                    itemCount={uniqueCast.length}
                    defaultOpen={true}
                >
                    <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                        {uniqueCast.slice(0, 10).map(actor => (
                            <div
                                onClick={() => {
                                    dispatch(GetPersonDetails({ personId: actor.id }));
                                    dispatch(GetPersonCombinedCredits({ personId: actor.id }));
                                    navigate(`/person/${actor.id}`);
                                }}
                                key={actor.id}
                                className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                                <div className="h-56 w-full overflow-hidden">
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                : "./Image-not-found.png"
                                        }
                                        alt={actor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm font-semibold truncate">
                                        {actor.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs truncate">
                                        {actor.roles?.[0]?.character || "Unknown Role"}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {uniqueCast.length > 10 && (
                            <button
                                onClick={() => navigate(`/series/${seriesId}/cast`)}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +{uniqueCast.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </div>
                </CollapsibleSection>
            )}

            {/* CREW SECTION */}
            {uniqueCrew.length > 0 && (
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
                                className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
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
                                    <h3 className="text-sm font-semibold truncate">
                                        {worker.name}
                                    </h3>
                                    {worker.jobs?.slice(0, 1).map(job => (
                                        <p
                                            key={job.credit_id}
                                            className="text-gray-400 text-xs truncate">
                                            {job.job || "Unknown Role"}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {uniqueCrew.length > 10 && (
                            <button
                                onClick={() => navigate(`/series/${seriesId}/crew`)}
                                className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                                <span className="text-white text-lg font-bold">
                                    +{uniqueCrew.length - 10}
                                </span>
                                <span className="text-sm text-gray-300">
                                    Show More
                                </span>
                            </button>
                        )}
                    </div>
                </CollapsibleSection>
            )}
        </>
    );
};

export default Cast_And_CrewSection;
