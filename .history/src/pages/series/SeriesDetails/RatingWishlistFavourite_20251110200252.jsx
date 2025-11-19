// Added a small rating/wishlist/favourite icon row. Integrate manually where needed.
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const RatingWishlistFavourite = ({ isRated, isWishlisted, isFavourite }) => {
    return (
        <div className="flex items-center gap-4 mt-4 text-white">
            <div className="flex items-center gap-2 select-none">
                {!isRated && <FaStar className="text-yellow-500 text-xl" />}
            </div>

            <div className="flex items-center gap-2 select-none">
                {!isWishlisted && (
                    <FaBookmark className="text-yellow-300 text-xl" />
                )}
            </div>

            <div className="flex items-center gap-2 select-none">
                {!isFavourite && <FaHeart className="text-red-600 text-xl" />}
            </div>
        </div>
    );
};

export default RatingWishlistFavourite;
