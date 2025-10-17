import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GetSeriesAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesAggregateCredits";
function AllCastSeries() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        SeriesAggregateCreditsDetails,
        SeriesAggregateCreditsDetailsLoading,
        SeriesAggregateCreditsDetailsError
    } = useSelector(state => state.SeriesAggregateCreditsReducer);

    //for scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [SeriesAggregateCreditsDetails]);

    //if the page was updated
    useEffect(() => {
        dispatch(
            GetSeriesAggregateCredits({
                seriesId: localStorage.getItem("seriesId"),
                seasonNumber: localStorage.getItem("seasonNumber")
            })
        );
    }, []);

    return (
        <div className="bg-black min-h-screen text-white px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">All Cast</h1>
                <Button
                    onClick={() => navigate("/SeriesDetails")}
                    color="gray"
                    className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-gray-500/30">
                    <IoArrowBackOutline className="w-5 h-5 text-white" />
                    Back
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {SeriesAggregateCreditsDetails?.cast?.map(actor => (
                    <div
                        key={actor.id}
                        className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <div className="h-72 w-full overflow-hidden">
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
                        <div className="p-4">
                            <h2 className="text-lg font-semibold truncate">
                                {actor.name}
                            </h2>
                            <p className="text-gray-400 text-sm truncate">
                                {actor.roles?.[0]?.character || "Unknown Role"}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Episodes: {actor.total_episode_count}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllCastSeries;
