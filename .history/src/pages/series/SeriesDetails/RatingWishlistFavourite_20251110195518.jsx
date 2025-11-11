// Added a small rating/wishlist/favourite icon row. Integrate manually where needed.
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const RatingWishlistFavourite = ({ isRated, isWishlisted, isFavourite }) => {
    return (
        <div className="flex items-center gap-4 mt-4 text-white">
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                {!isRated ? (
                    <FaStar className="text-red-500 text-xl" />
                ) : (
                    <FaRegStar className="text-gray-400 text-xl" />
                )}
                <span className="text-sm">Rated</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                {isWishlisted ? (
                    <FaBookmark className="text-red-500 text-xl" />
                ) : (
                    <FaRegBookmark className="text-gray-400 text-xl" />
                )}
                <span className="text-sm">Wishlist</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                {isFavourite ? (
                    <FaHeart className="text-red-500 text-xl" />
                ) : (
                    <FaRegHeart className="text-gray-400 text-xl" />
                )}
                <span className="text-sm">Favourite</span>
            </div>
        </div>
    );
};

export default RatingWishlistFavourite;
