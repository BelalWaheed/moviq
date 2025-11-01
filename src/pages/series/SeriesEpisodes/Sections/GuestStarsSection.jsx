import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { s } from "framer-motion/m";
import { useNavigate } from "react-router-dom";
import { GetPersonDetails } from "../../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";

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
                        SeriesEpisodesData.guest_stars.map(star => (
                            <div
                                onClick={() => {
                                    localStorage.setItem("personId", star.id);
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
                                    <h3 className="text-sm font-semibold truncate">
                                        {star.name}
                                    </h3>

                                    <p className="text-gray-400 text-xs truncate">
                                        {star.character || "Unknown Role"}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default GuestStarsSection;
