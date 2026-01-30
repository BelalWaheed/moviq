import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../notFound/NotFound";
import MovieLoader from "../../../loading/MovieLoader";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { FaUsers } from "react-icons/fa";

const CastSection = () => {
    const {
        seasonsAggregateCreditsDetails,
        seasonsAggregateCreditsDetailsLoading,
        seasonsAggregateCreditsDetailsError
    } = useSelector(state => state.seriesSeasonsAggregateCreditsReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { seriesId, seasonNumber } = useParams();

    // Deduplicate cast by id
    const uniqueCast = useMemo(() => {
        if (!seasonsAggregateCreditsDetails?.cast) return [];
        const seen = new Set();
        return seasonsAggregateCreditsDetails.cast.filter((actor) => {
            if (seen.has(actor.id)) return false;
            seen.add(actor.id);
            return true;
        });
    }, [seasonsAggregateCreditsDetails?.cast]);

    if (seasonsAggregateCreditsDetailsError) return <NotFound />;
    if (seasonsAggregateCreditsDetailsLoading) return <MovieLoader />;
    if (!uniqueCast.length) return null;

    return (
        <CollapsibleSection 
            title="Cast" 
            icon={FaUsers}
            itemCount={uniqueCast.length}
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
                        onClick={() => navigate(`/series/${seriesId}/season/${seasonNumber}/cast`)}
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
    );
};

export default CastSection;
