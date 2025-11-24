import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSeriesAccountStates } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates.js";

const RatingWishlistFavourite = () => {
    const dispatch = useDispatch();
    const { isLogged } = useSelector(state => state.AccountInfoSliceReducer);
    const { accountSeriesStatesDetails } = useSelector(
        state => state.GetAccountSeriesStatesReducer
    );
    const { favoriteDetails } = useSelector(state => state.favoriteReducer);
    console.log(favoriteDetails);

    // if page was updated
    // useEffect(() => {
    //     const seriesId = localStorage.getItem("seriesId");
    //     const sessionId = localStorage.getItem("sessionId");

    //     if (seriesId && sessionId && !accountSeriesStatesDetails) {
    //         dispatch(GetSeriesAccountStates({ seriesId, sessionId }));
    //     }
    // }, [accountSeriesStatesDetails]);
    useEffect(() => {
        dispatch(
            GetSeriesAccountStates({
                seriesId: localStorage.getItem("seriesId"),
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, [favoriteDetails]);
    return (
        <>
            {isLogged && localStorage.getItem("sessionId") && (
                <div className="flex items-center gap-4 mt-4 text-white select-none">
                    {/* Rated */}
                    <div className="flex items-center gap-1">
                        {accountSeriesStatesDetails?.rated ? (
                            <>
                                <FaStar className="text-yellow-500 text-lg" />
                                <span className="text-sm text-gray-200">
                                    {accountSeriesStatesDetails?.rated.value}/10
                                </span>
                            </>
                        ) : (
                            <>
                                <FaRegStar className="text-gray-400 text-lg" />
                            </>
                        )}
                    </div>

                    {/* Watchlist */}
                    <div className="flex items-center gap-1">
                        {accountSeriesStatesDetails?.watchlist ? (
                            <>
                                <FaBookmark className="text-blue-400 text-lg" />
                            </>
                        ) : (
                            <>
                                <FaRegBookmark className="text-gray-400 text-lg" />
                            </>
                        )}
                    </div>

                    {/* Favourite */}
                    <div className="flex items-center gap-1">
                        {accountSeriesStatesDetails?.favorite ? (
                            <>
                                <FaHeart className="text-red-500 text-lg" />
                            </>
                        ) : (
                            <>
                                <FaRegHeart className="text-gray-400 text-lg" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RatingWishlistFavourite;
