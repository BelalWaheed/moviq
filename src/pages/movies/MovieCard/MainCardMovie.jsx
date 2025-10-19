import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import {
    getSeriesDetails,
    setSeriesId
} from "../../../redux/moviesSlices/getMovieDetails";

import { useNavigate } from "react-router-dom";
import { GetSeriesAggregateCredits } from "../../../redux/SeriesSlices/GetSeriesAggregateCredits";

const MainCard = ({
    series: { id, name, poster_path, first_air_date, vote_average }
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => {
                dispatch(getSeriesDetails(id));
                dispatch(setSeriesId(id));
                dispatch(
                    GetSeriesAggregateCredits({
                        seriesId: id
                    })
                );
                navigate("/seriesDetails");
            }}
            className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group bg-black">
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-black">
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
            </div>
            <CardBody className="p-3 text-white space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-base sm:text-lg font-bold truncate">
                        {name}
                    </h2>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-sm">
                        {vote_average}
                    </span>
                </div>
                <p className="text-xs text-gray-400">{first_air_date}</p>
            </CardBody>
        </Card>
    );
};

export default MainCard;
