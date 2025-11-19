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
        <div className="flex items-center gap-4 mt-4 text-white">
            <div className="flex items-center gap-2 select-none">
                {accountSeriesStatesDetails?.rated && (
                    <>
                        <span className="text-sm font-semibold text-yellow-400">
                            {`${accountSeriesStatesDetails?.rated.value}⭐`}
                        </span>
                        {/* <FaStar className="text-yellow-500 text-lg" />
                        <span className="text-xs text-gray-300">Rated</span> */}
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 select-none">
                {!isWishlisted && (
                    <FaBookmark className="text-yellow-400 text-xl" />
                )}
            </div>

            <div className="flex items-center gap-2 select-none">
                {!isFavourite && <FaHeart className="text-red-600 text-xl" />}
            </div>
        </div>
    );
};

export default RatingWishlistFavourite;
