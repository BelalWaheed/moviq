// Added a small rating/wishlist/favourite icon row. Integrate manually where needed.
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSeriesAccountStates } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates";

const RatingWishlistFavourite = () => {
    const dispatch = useDispatch();
    const { isLogged } = useSelector(state => state.AccountInfoSliceReducer);
    const { accountSeriesStatesDetails } = useSelector(
        state => state.GetAccountSeriesStatesReducer
    );
    const { RatedSeriesDetails } = useSelector(state => {
        state.RatedSeriesReducer;
    });

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesAccountStates({
                seriesId: localStorage.getItem("seriesId"),
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, [RatedSeriesDetails]);
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
                                    {accountSeriesStatesDetails.rated.value}/10
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
