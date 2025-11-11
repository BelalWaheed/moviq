import { motion } from "framer-motion";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "../../../redux/SharedSlices/PostRequest/AddFavorite";
import { useState } from "react";

const FavouriteWishlistSection = ({
    onFavourite,
    onWishlist,
    isFavourite,
    isInWishlist
}) => {
    const { AccountInfoDetails } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    const { favoriteDetails } = useSelector(state => state.favoriteReducer);

    const [isFavourite_, setIsFavourite_] = useState(favoriteDetails?.success);

    const dispatch = useDispatch();
    console.log(isFavourite_);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
                flex flex-col sm:flex-row 
                gap-2 
                p-3 
                bg-black/40 backdrop-blur-md 
                rounded-2xl 
                shadow-lg 
                w-full sm:w-fit
            ">
            {/* === Favourite Button === */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    setIsFavourite_(prev => !prev);
                    dispatch(
                        AddFavorite({
                            media_type: "tv",
                            media_id: localStorage.getItem("seriesId"),
                            favorite: favoriteDetails?.success,
                            accountId: AccountInfoDetails.id,
                            sessionId: localStorage.getItem("sessionId")
                        })
                    );
                }}
                className={`
                    flex-1 text-xs sm:text-sm 
                    flex items-center justify-center gap-2 
                    py-2 px-4 
                    rounded-xl font-semibold 
                    transition-all duration-200
                    ${
                        !isFavourite
                            ? "bg-red-600 text-white"
                            : "bg-white/20 text-white hover:bg-red-600/50"
                    }
                `}>
                <FaHeart className="text-base sm:text-lg" />
                {!isFavourite ? "Added to Favourite" : "Add Favourite"}
            </motion.button>

            {/* === Wishlist Button === */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onWishlist}
                className={`
                    flex-1 text-xs sm:text-sm 
                    flex items-center justify-center gap-2 
                    py-2 px-4 
                    rounded-xl font-semibold 
                    transition-all duration-200
                    ${
                        !isInWishlist
                            ? "bg-yellow-500 text-black"
                            : "bg-white/20 text-white hover:bg-yellow-500/60 hover:text-black"
                    }
                `}>
                <FaBookmark className="text-base sm:text-lg" />
                {!isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </motion.button>
        </motion.div>
    );
};

export default FavouriteWishlistSection;
