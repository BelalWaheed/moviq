import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../notFound/NotFound";
import MovieLoader from "../../../loading/MovieLoader";
import { GetSeriesEpisodesCredits } from "../../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesCredits";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import { FaUser, FaTheaterMasks } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { FaUsers } from "react-icons/fa";

const CastSection = () => {
    const { seriesId, seasonNumber, episodeNumber } = useParams();
    const {
        SeriesEpisodesCreditsData,
        SeriesEpisodesCreditsDataLoading,
        SeriesEpisodesCreditsDataError
    } = useSelector(state => state.SeriesEpisodesCreditsDataReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch using URL params
    useEffect(() => {
        if (seriesId && seasonNumber && episodeNumber) {
            dispatch(
                GetSeriesEpisodesCredits({
                    seriesId,
                    seasonNumber,
                    episodeNumber
                })
            );
        }
    }, [dispatch, seriesId, seasonNumber, episodeNumber]);

    // Deduplicate cast by id
    const uniqueCast = useMemo(() => {
        if (!SeriesEpisodesCreditsData?.cast) return [];
        const seen = new Set();
        return SeriesEpisodesCreditsData.cast.filter((actor) => {
            if (seen.has(actor.id)) return false;
            seen.add(actor.id);
            return true;
        });
    }, [SeriesEpisodesCreditsData?.cast]);

    if (SeriesEpisodesCreditsDataError) return <NotFound />;
    if (SeriesEpisodesCreditsDataLoading) return <MovieLoader />;
    if (!uniqueCast.length) return null;

    return (
        <CollapsibleSection 
            title="Actors" 
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
                            {/* Name */}
                            <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
                                <FaUser className="text-red-500 text-xs" />
                                <span className="whitespace-normal">
                                    {actor.name}
                                </span>
                            </div>
                            {/* Department */}
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                <MdWork className="text-[10px]" />
                                <span className="whitespace-normal">
                                    {actor.known_for_department || "Unknown"}
                                </span>
                            </div>
                            {/* Character */}
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                <FaTheaterMasks className="text-[10px]" />
                                <span className="whitespace-normal">
                                    {actor.character || "Unknown character"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {uniqueCast.length > 10 && (
                    <button
                        onClick={() =>
                            navigate(`/series/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/cast`)
                        }
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
