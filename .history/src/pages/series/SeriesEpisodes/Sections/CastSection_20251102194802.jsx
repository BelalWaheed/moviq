import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../../../notFound/NotFound";
import MovieLoader from "../../../loading/MovieLoader";
import { GetSeriesEpisodesCredits } from "../../../../redux/SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesCredits";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";
import { FaUser, FaTheaterMasks } from "react-icons/fa";

const CastSection = () => {
    const {
        SeriesEpisodesCreditsData,
        SeriesEpisodesCreditsDataLoading,
        SeriesEpisodesCreditsDataError
    } = useSelector(state => state.SeriesEpisodesCreditsDataReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // if page was refreshing
    useEffect(() => {
        dispatch(
            GetSeriesEpisodesCredits({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber"),
                episodeNumber: localStorage.getItem("episodeNumber")
            })
        );
    }, []);
    return (
        <>
            {SeriesEpisodesCreditsDataError ? (
                <NotFound />
            ) : SeriesEpisodesCreditsDataLoading ? (
                <MovieLoader />
            ) : (
                <>
                    {/* CAST SECTION */}
                    {/* import {(FaUser, FaTheaterMasks)} from "react-icons/fa"; */}
                    {SeriesEpisodesCreditsData.cast.slice(0, 10).map(actor => (
                        <div
                            onClick={() => {
                                dispatch(
                                    GetPersonDetails({ personId: actor.id })
                                );
                                dispatch(
                                    GetPersonCombinedCredits({
                                        personId: actor.id
                                    })
                                );
                                localStorage.setItem("personId", actor.id);
                                navigate("/PersonalInfo");
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

                            <div className="p-2 flex flex-col gap-[2px] leading-tight">
                                {/* Name */}
                                <div className="flex items-center gap-1 text-sm font-semibold whitespace-normal">
                                    <FaUser className="text-red-500 text-xs" />
                                    <span>{actor.name}</span>
                                </div>

                                {/* Character */}
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 whitespace-normal">
                                    <FaTheaterMasks className="text-[10px]" />
                                    <span>
                                        {actor.roles?.[0]?.character ||
                                            "Unknown Role"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default CastSection;
