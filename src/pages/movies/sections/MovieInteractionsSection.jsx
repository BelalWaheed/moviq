import { motion } from "framer-motion";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "../../../redux/SharedSlices/PostRequest/AddFavorite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetMovieAccountStates } from "../../../redux/moviesSlices/GetRequest/UserInteractions/GetMovieAccountStates";
import Swal from "sweetalert2";
import { AddToWatchlist } from "../../../redux/SharedSlices/PostRequest/AddToWatchlist";
import { RequestSingIn } from "../../../redux/AuthSlices/RequestSingIn";

const MovieInteractionsSection = () => {
    const { id: movieId } = useParams();
    
    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    const { favoriteDetails } = useSelector(state => state.favoriteReducer);
    const { watchlistDetails } = useSelector(state => state.watchlistReducer);
    const { accountMovieStatesDetails } = useSelector(
        state => state.GetAccountMovieStatesReducer
    );

    const dispatch = useDispatch();

    // Get Movie Account States
    useEffect(() => {
        if (movieId && localStorage.getItem("sessionId")) {
            dispatch(
                GetMovieAccountStates({
                    movieId: movieId,
                    sessionId: localStorage.getItem("sessionId")
                })
            );
        }
    }, [dispatch, movieId, favoriteDetails, watchlistDetails]);

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
                    isLogged && localStorage.getItem("sessionId")
                        ? dispatch(
                              AddFavorite({
                                  media_type: "movie",
                                  media_id: movieId,
                                  favorite: !accountMovieStatesDetails?.favorite,
                                  accountId: AccountInfoDetails?.id,
                                  sessionId: localStorage.getItem("sessionId")
                              })
                          )
                        : Swal.fire({
                              icon: "info",
                              title: "TMDB Connection Required!",
                              text: "You need to connect your TMDB account before you can add this movie to favorites.",
                              showCancelButton: true,
                              confirmButtonText: "Connect now",
                              cancelButtonText: "Maybe later",
                              confirmButtonColor: "#ef4444",
                              cancelButtonColor: "#6b7280",
                              background: "#111827",
                              color: "#fff"
                          }).then(result => {
                              if (result.isConfirmed) {
                                  dispatch(RequestSingIn());
                              }
                          });
                }}
                className={`
                flex-1 text-xs sm:text-sm 
                flex items-center justify-center gap-2 
                py-2 px-4 
                rounded-xl font-semibold 
                transition-all duration-200
                ${
                    accountMovieStatesDetails?.favorite
                        ? "bg-red-600 text-white"
                        : "bg-white/20 text-white hover:bg-red-600/50"
                }
            `}>
                <FaHeart className="text-base sm:text-lg" />
                {accountMovieStatesDetails?.favorite
                    ? "Added to Favourite"
                    : "Add Favourite"}
            </motion.button>

            {/* === Wishlist Button === */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    isLogged && localStorage.getItem("sessionId")
                        ? dispatch(
                              AddToWatchlist({
                                  media_type: "movie",
                                  media_id: movieId,
                                  watchlist: !accountMovieStatesDetails?.watchlist,
                                  accountId: AccountInfoDetails?.id,
                                  sessionId: localStorage.getItem("sessionId")
                              })
                          )
                        : Swal.fire({
                              icon: "info",
                              title: "TMDB Connection Required!",
                              text: "You need to connect your TMDB account before you can add this movie to watchlist.",
                              showCancelButton: true,
                              confirmButtonText: "Connect now",
                              cancelButtonText: "Maybe later",
                              confirmButtonColor: "#ef4444",
                              cancelButtonColor: "#6b7280",
                              background: "#111827",
                              color: "#fff"
                          }).then(result => {
                              if (result.isConfirmed) {
                                  dispatch(RequestSingIn());
                              }
                          });
                }}
                className={`
                flex-1 text-xs sm:text-sm 
                flex items-center justify-center gap-2 
                py-2 px-4 
                rounded-xl font-semibold 
                transition-all duration-200
                ${
                    accountMovieStatesDetails?.watchlist
                        ? "bg-yellow-500 text-black"
                        : "bg-white/20 text-white hover:bg-yellow-500/60 hover:text-black"
                }
            `}>
                <FaBookmark className="text-base sm:text-lg" />
                {accountMovieStatesDetails?.watchlist
                    ? "Added to Wishlist"
                    : "Add to Wishlist"}
            </motion.button>
        </motion.div>
    );
};

export default MovieInteractionsSection;
