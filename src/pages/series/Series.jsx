import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import MainCard from "./SeriesCard/MainCard";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "./Pagination ";
import MovieLoader from "../loading/MovieLoader";
import {
    getSeries,
    pageReset,
    setType
} from "../../redux/SeriesSlices/SeriesSlice";
import NotFound from "../notFound/NotFound";

function Series() {
    console.log("hi");

    const dispatch = useDispatch();

    const { seriesList, seriesLoading, typing, seriesError } = useSelector(
        state => state.seriesReducer
    );

    if (seriesError) {
        return <NotFound />;
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="px-6 lg:px-12 py-12">
                <h1 className="text-white text-center md:text-start lg:text-start xl:text-start text-4xl sm:text-4xl lg:text-6xl font-bold mb-6">
                    Series
                </h1>
                {/* Start Series type buttons */}
                <div className="flex flex-wrap gap-3 mb-10">
                    <Button
                        onClick={() => {
                            dispatch(pageReset());
                            dispatch(setType("airing_today"));
                            dispatch(getSeries({ type: "airing_today" }));
                        }}
                        variant="gradient"
                        color={typing === "airing_today" ? "red" : "gray"}
                        className="rounded-full">
                        Airing Today
                    </Button>

                    <Button
                        onClick={() => {
                            dispatch(pageReset());
                            dispatch(setType("on_the_air"));
                            dispatch(getSeries({ type: "on_the_air" }));
                        }}
                        variant="gradient"
                        color={typing === "on_the_air" ? "red" : "gray"}
                        className="rounded-full">
                        on the air
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(pageReset());
                            dispatch(setType("popular"));
                            dispatch(getSeries({ type: "popular" }));
                        }}
                        variant="gradient"
                        color={typing === "popular" ? "red" : "gray"}
                        className="rounded-full">
                        popular
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(pageReset());
                            dispatch(setType("top_rated"));
                            dispatch(getSeries({ type: "top_rated" }));
                        }}
                        variant="gradient"
                        color={typing === "top_rated" ? "red" : "gray"}
                        className="rounded-full">
                        top rated
                    </Button>
                </div>
                {/* End Series type buttons */}

                {/* Start Series Cards */}
                {seriesLoading ? (
                    <MovieLoader />
                ) : (
                    <>
                        <div
                            className="
                    grid 
                    gap-6 
                    grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    justify-center 
                    place-items-center
                    container mx-auto
                ">
                            {seriesList?.map(series => (
                                <MainCard key={series.id} series={series} />
                            ))}
                        </div>
                    </>
                )}
                {/* End Series Cards */}
            </div>

            <Pagination />
        </div>
    );
}

export default Series;
