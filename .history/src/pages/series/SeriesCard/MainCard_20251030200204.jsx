import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
    getSeriesDetails,
    setSeriesId
} from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
// "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";

import { useNavigate } from "react-router-dom";
import { GetSeriesAggregateCredits } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesAggregateCredits";
import { GetSeriesRecommendations } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesRecommendations";
import { GetSeriesImages } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesImages";
import { getSeriesTrailer } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer";
import { GetSeriesSimilar } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesSimilar";
import { GetSeriesReviews } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews";
import { GetSeriesWatchProviders } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesWatchProviders";
import { GetRatedSeries } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetRatedSeries";

const MainCard = ({
    series: { id, name, poster_path, first_air_date, vote_average }
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );

    const { RatedSeriesDetails } = useSelector(
        state => state.RatedSeriesReducer
    );

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
                dispatch(GetSeriesRecommendations({ seriesId: id }));
                dispatch(GetSeriesSimilar({ seriesId: id }));
                dispatch(GetSeriesImages({ seriesId: id }));
                dispatch(getSeriesTrailer(id));
                dispatch(GetSeriesReviews({ seriesId: id }));
                dispatch(
                    GetSeriesWatchProviders({
                        seriesId: id
                    })
                );
                // if (AccountInfoDetails?.id) {
                //     if (RatedSeriesDetails?.results.length >= 20) {
                //         // RatedSeriesDetails?.page = RatedSeriesDetails?.page + 1

                //         dispatch(
                //             GetRatedSeries({
                //                 accountId: AccountInfoDetails?.id,
                //                 sessionId: localStorage.getItem("sessionId"),
                //                 page: RatedSeriesDetails?.page + 1
                //             })
                //         );
                //     }
                //     // else {
                //     //     dispatch(
                //     //         GetRatedSeries({
                //     //             accountId: AccountInfoDetails?.id,
                //     //             sessionId: localStorage.getItem("sessionId")
                //     //         })
                //     //     );
                //     // }
                // }

                navigate("/seriesDetails");
            }}
            className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group bg-black">
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-black">
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "./Image-not-found.png"
                    }
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
