import React, { useEffect } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
    CalendarIcon,
    MapPinIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import { FaImdb } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { GiTombstone } from "react-icons/gi";
import { GetPersonDetails } from "../../../redux/SeriesSlices/GetPersonDetails";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import MovieLoader from "../../loading/MovieLoader";
import NotFound from "../../notFound/NotFound";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { IoPersonCircleOutline } from "react-icons/io5";
import PersonCombinedCredits from "./PersonCombinedCredits/CastSeriesPersonCombinedCredits";
import CastSeriesPersonCombinedCredits from "./PersonCombinedCredits/CastSeriesPersonCombinedCredits";
import CastMoviesPersonCombinedCredits from "./PersonCombinedCredits/CastMoviesPersonCombinedCredits";
import CrewSeriesPersonCombinedCredits from "./PersonCombinedCredits/CrewSeriesPersonCombinedCredits";
import CrewMoviesPersonCombinedCredits from "./PersonCombinedCredits/CrewMoviesPersonCombinedCredits";

const PersonalInfo = () => {
    const { PersonDetails, PersonDetailsLoading, PersonDetailsError } =
        useSelector(state => state.PersonReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [PersonDetails]);

    // if page was refreshing
    useEffect(() => {
        dispatch(
            GetPersonDetails({
                personId: localStorage.getItem("personId")
            })
        );
    }, []);

    return (
        <>
            {PersonDetailsError ? (
                <NotFound />
            ) : (
                <>
                    {PersonDetailsLoading ? (
                        <MovieLoader />
                    ) : (
                        <>
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="max-w-5xl mx-auto px-6 py-10">
                                <Card className="bg-black text-white flex flex-col md:flex-row gap-8 rounded-2xl overflow-hidden shadow-xl">
                                    {/* Profile Image */}
                                    <div className="md:w-1/3 w-full flex justify-center items-center p-4">
                                        <img
                                            src={
                                                PersonDetails?.profile_path
                                                    ? `https://image.tmdb.org/t/p/w500${PersonDetails?.profile_path}`
                                                    : "./Image-not-found.png"
                                            }
                                            alt={PersonDetails?.name}
                                            className="w-64 h-64 object-cover rounded-2xl shadow-lg"
                                        />
                                    </div>

                                    {/* Info Section */}
                                    <CardBody className="flex flex-col justify-center md:w-2/3 space-y-4">
                                        <Typography
                                            variant="h3"
                                            className="font-bold">
                                            {PersonDetails?.name}
                                        </Typography>

                                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-5 h-5 text-red-500" />
                                                <span>
                                                    birthday:{" "}
                                                    {PersonDetails?.birthday ||
                                                        "Unknown"}
                                                </span>
                                            </div>

                                            {PersonDetails?.place_of_birth && (
                                                <div className="flex items-center gap-2">
                                                    <MapPinIcon className="w-5 h-5 text-red-500" />
                                                    <span>
                                                        born in:{" "}
                                                        {
                                                            PersonDetails?.place_of_birth
                                                        }
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <UserIcon className="w-5 h-5 text-red-500" />
                                                <span>
                                                    {PersonDetails?.known_for_department ||
                                                        "Unknown"}
                                                </span>
                                            </div>
                                            {PersonDetails?.homepage && (
                                                <div className="flex items-center gap-2">
                                                    <AiOutlineInfoCircle className="w-5 h-5 text-red-500" />
                                                    homepage:{" "}
                                                    <a
                                                        className="text-blue-800"
                                                        href={
                                                            PersonDetails?.homepage
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer">
                                                        {
                                                            PersonDetails?.homepage
                                                        }
                                                    </a>
                                                </div>
                                            )}
                                            {PersonDetails?.deathday && (
                                                <div className="flex items-center gap-2">
                                                    <GiTombstone className="w-5 h-5 text-red-500" />
                                                    <span>
                                                        died in:{" "}
                                                        {
                                                            PersonDetails?.deathday
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <Typography className="flex text-gray-300 leading-relaxed max-w-2xl max-h-40 overflow-y-auto pr-2 scroll-indicator scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-lg">
                                            {PersonDetails?.biography}
                                        </Typography>

                                        <div className="pt-4 flex gap-4">
                                            {PersonDetails?.imdb_id && (
                                                <a
                                                    href={`https://www.imdb.com/name/${PersonDetails?.imdb_id}`}
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    <Button
                                                        color="yellow"
                                                        className="flex items-center gap-2 rounded-xl">
                                                        <FaImdb className="text-2xl" />
                                                        IMDB
                                                    </Button>
                                                </a>
                                            )}
                                            <Button
                                                onClick={() => {
                                                    navigate(-1);
                                                }}
                                                color="gray"
                                                className="flex items-center gap-2 rounded-xl">
                                                <IoArrowBackOutline className="text-2xl" />
                                                Back
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                                <CastSeriesPersonCombinedCredits
                                    PersonDetailsname={PersonDetails?.name}
                                />
                                <CastMoviesPersonCombinedCredits
                                    PersonDetailsname={PersonDetails?.name}
                                />
                                <CrewSeriesPersonCombinedCredits
                                    PersonDetailsname={PersonDetails?.name}
                                />
                                <CrewMoviesPersonCombinedCredits
                                    PersonDetailsname={PersonDetails?.name}
                                />
                            </motion.section>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PersonalInfo;
