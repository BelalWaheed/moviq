import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import MainCard from "./SeriesCard/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Pagination from "./Pagination";
import MovieLoader from "../loading/MovieLoader";
import {
    getSeries,
    pageReset,
    setType
} from "../../redux/SeriesSlices/SeriesSlice";
import NotFound from "../notFound/NotFound";
import { RequestSingIn } from "../../redux/AuthSlices/RequestSingIn";
import { AccountInfo, signOut } from "../../redux/AuthSlices/AccountInfo";

function Series() {
    const { RequestSingInDetails, isLogged } = useSelector(
        state => state.SignInTokenReducer
    );

    const dispatch = useDispatch();

    const {
        seriesList,
        seriesLoading,
        typing,
        seriesError,
        page,
        currentType
    } = useSelector(state => state.seriesReducer);
    // scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [page, currentType]);

    // if page was updated
    useEffect(() => {
        dispatch(getSeries({ page: page, type: typing }));
    }, []);
    useEffect(() => {
        if (RequestSingInDetails?.success && !localStorage.getItem("token")) {
            localStorage.setItem("token", RequestSingInDetails?.request_token);

            window.location.href = `https://www.themoviedb.org/authenticate/${RequestSingInDetails.request_token}?redirect_to=http://localhost:5173/series`;
        }
    }, []);

    useEffect(() => {
        dispatch(AccountInfo());
    }, []);

    if (seriesError) {
        return <NotFound />;
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-black min-h-screen">
            <div className="px-6 lg:px-12 py-12">
                <h1 className="text-white text-center md:text-start lg:text-start xl:text-start text-4xl sm:text-4xl lg:text-6xl font-bold mb-6">
                    Series
                </h1>

                {isLogged && (
                    <Button
                        onClick={() => dispatch(RequestSingIn())}
                        color="yellow"
                        className="flex items-center gap-2 rounded-xl">
                        Sign in
                    </Button>
                )}
                {!isLogged && (
                    <Button
                        onClick={() => dispatch(signOut())}
                        color="red"
                        className="flex items-center gap-2 rounded-xl">
                        Sign OUT
                    </Button>
                )}

                {/* Start Series type buttons */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {[
                        { label: "Airing Today", type: "airing_today" },
                        { label: "On the Air", type: "on_the_air" },
                        { label: "Popular", type: "popular" },
                        { label: "Top Rated", type: "top_rated" }
                    ].map(({ label, type }) => (
                        <Button
                            key={type}
                            onClick={() => {
                                dispatch(pageReset());
                                dispatch(setType(type));
                                dispatch(getSeries({ type: type }));
                            }}
                            variant="gradient"
                            color={typing === type ? "red" : "gray"}
                            className="rounded-full">
                            {label}
                        </Button>
                    ))}
                </div>
                {/* End Series type buttons */}

                {/* Start Series Cards */}
                {seriesLoading ? (
                    <MovieLoader />
                ) : (
                    <div
                        className="
                        grid 
                        gap-6 
                        grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                        justify-center 
                        place-items-center
                        container mx-auto
                    ">
                        {seriesList?.map((series, index) => (
                            <motion.div
                                key={series.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.01
                                }}
                                variants={cardVariants}
                                className="w-full">
                                <MainCard series={series} />
                            </motion.div>
                        ))}
                    </div>
                )}
                {/* End Series Cards */}
            </div>

            <Pagination />
        </div>
    );
}

export default Series;
