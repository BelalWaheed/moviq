import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { s } from "framer-motion/m";
import { useNavigate } from "react-router-dom";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { FaTheaterMasks, FaUser } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const GuestStarsSection = () => {
    const { SeriesEpisodesData } = useSelector(
        state => state.SeriesEpisodesDataReducer
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Guest Stars
                </h2>

                <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
                    {SeriesEpisodesData?.guest_stars?.length > 0 &&
                        SeriesEpisodesData?.guest_stars
                            ?.slice(0, 10)
                            .map(star => (
                                <div
                                    onClick={() => {
                                        localStorage.setItem(
                                            "personId",
                                            star.id
                                        );
                                        dispatch(
                                            GetPersonDetails({
                                                personId: star.id
                                            })
                                        );
                                        navigate("/PersonalInfo");
                                    }}
                                    key={star.id}
                                    className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                                    <div className="h-56 w-full overflow-hidden">
                                        <img
                                            src={
                                                star.profile_path
                                                    ? `https://image.tmdb.org/t/p/w500${star.profile_path}`
                                                    : "./Image-not-found.png"
                                            }
                                            alt={star.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-2">
                                        {/* Name */}
                                        <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
                                            <FaUser className="text-red-500 text-xs" />
                                            <span className="whitespace-normal">
                                                {star.name}
                                            </span>
                                        </div>
                                        {/* Department */}
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                            <MdWork className="text-[10px]" />
                                            <span className="whitespace-normal">
                                                {star.known_for_department ||
                                                    "Unknown"}
                                            </span>
                                        </div>
                                        {/* Character */}
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 leading-tight">
                                            <FaTheaterMasks className="text-[10px]" />
                                            <span className="whitespace-normal">
                                                {star.character ||
                                                    "Unknown character"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    {SeriesEpisodesData?.guest_stars.length > 10 && (
                        <button
                            onClick={() =>
                                navigate("/AllGuestStarsEpisodesPage")
                            }
                            className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300">
                            <span className="text-white text-lg font-bold">
                                +{SeriesEpisodesData?.guest_stars.length - 10}
                            </span>
                            <span className="text-sm text-gray-300">
                                Show More
                            </span>
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default GuestStarsSection;
