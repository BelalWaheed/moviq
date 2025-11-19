// Added a small rating/wishlist/favourite icon row. Integrate manually where needed.
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSeriesAccountStates } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates";

const RatingWishlistFavourite = ({ isRated, isWishlisted, isFavourite }) => {
    const dispatch = useDispatch();

    const { accountSeriesStatesDetails } = useSelector(
        state => state.GetAccountSeriesStatesReducer
    );
    console.log(accountSeriesStatesDetails);

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesAccountStates({
                seriesId: localStorage.getItem("seriesId"),
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, []);
    return (
        <div className="flex items-center gap-4 mt-4 text-white select-none">
            {/* Rated */}
            <div className="flex items-center gap-1">
                {accountSeriesStatesDetails?.rated && (
                    <>
                        <FaStar className="text-yellow-500 text-lg" />
                        <span className="text-sm text-gray-200">
                            {accountSeriesStatesDetails.rated.value}/10
                        </span>
                    </>
                )}
            </div>

            {/* Watchlist */}
            <div className="flex items-center gap-1">
                {!accountSeriesStatesDetails?.watchlist ? (
                    <>
                        <FaBookmark className="text-blue-400 text-lg" />
                        <span className="text-sm text-gray-200">
                            In Watchlist
                        </span>
                    </>
                ) : (
                    <>
                        <FaRegBookmark className="text-gray-400 text-lg" />
                        <span className="text-sm text-gray-400">Watchlist</span>
                    </>
                )}
            </div>

            {/* Favourite */}
            <div className="flex items-center gap-1">
                {accountSeriesStatesDetails?.favorite ? (
                    <>
                        <FaHeart className="text-red-500 text-lg" />
                        <span className="text-sm text-gray-200">Favourite</span>
                    </>
                ) : (
                    <>
                        <FaRegHeart className="text-gray-400 text-lg" />
                        <span className="text-sm text-gray-400">Favourite</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default RatingWishlistFavourite;
