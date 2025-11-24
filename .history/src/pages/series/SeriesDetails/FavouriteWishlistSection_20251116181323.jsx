import { motion } from "framer-motion";
import { FaHeart, FaBookmark, FaListUl } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "../../../redux/SharedSlices/PostRequest/AddFavorite";
import { useEffect, useState } from "react";
import { GetSeriesAccountStates } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates";
import Swal from "sweetalert2";
import { AddToWatchlist } from "../../../redux/SharedSlices/PostRequest/AddToWatchlist";
import { RequestSingIn } from "../../../redux/AuthSlices/RequestSingIn";
import ListsModal from "./ListsModal";
import CreateListModal from "./CreateListModal";
import { GetLists } from "../../../redux/SharedSlices/GetRequest/Lists";
import { AddMedia } from "../../../redux/SharedSlices/PostRequest/List/AddMedia";

const FavouriteWishlistSection = ({}) => {
    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    const { favoriteDetails } = useSelector(state => state.favoriteReducer);
    const { accountSeriesStatesDetails } = useSelector(
        state => state.GetAccountSeriesStatesReducer
    );

    const { listDetails, listLoading, listError } = useSelector(
        state => state.getListsReducer
    );

    const dispatch = useDispatch();

    // Get Series Account States
    useEffect(() => {
        dispatch(
            GetSeriesAccountStates({
                seriesId: localStorage.getItem("seriesId"),
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, [favoriteDetails]);

    // Get user lists
    useEffect(() => {
        console.log(listDetails?.id);

        dispatch(
            GetLists({
                page: 1,
                accountId: AccountInfoDetails?.id,
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, [listDetails]);

    const [openLists, setOpenLists] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <>
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
                                      media_type: "tv",
                                      media_id:
                                          localStorage.getItem("seriesId"),
                                      favorite:
                                          !accountSeriesStatesDetails?.favorite,
                                      accountId: AccountInfoDetails?.id,
                                      sessionId:
                                          localStorage.getItem("sessionId")
                                  })
                              )
                            : Swal.fire({
                                  icon: "info",
                                  title: "TMDB Connection Required!",
                                  text: "You need to connect your TMDB account before you can rate any series.",
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
                        accountSeriesStatesDetails?.favorite
                            ? "bg-red-600 text-white"
                            : "bg-white/20 text-white hover:bg-red-600/50"
                    }
                `}>
                    <FaHeart className="text-base sm:text-lg" />
                    {accountSeriesStatesDetails?.favorite
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
                                      media_type: "tv",
                                      media_id:
                                          localStorage.getItem("seriesId"),
                                      watchlist:
                                          !accountSeriesStatesDetails?.watchlist,
                                      accountId: AccountInfoDetails?.id,
                                      sessionId:
                                          localStorage.getItem("sessionId")
                                  })
                              )
                            : Swal.fire({
                                  icon: "info",
                                  title: "TMDB Connection Required!",
                                  text: "You need to connect your TMDB account before you can rate any series.",
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
                        accountSeriesStatesDetails?.watchlist
                            ? "bg-yellow-500 text-black"
                            : "bg-white/20 text-white hover:bg-yellow-500/60 hover:text-black"
                    }
                `}>
                    <FaBookmark className="text-base sm:text-lg" />
                    {accountSeriesStatesDetails?.watchlist
                        ? "Added to Wishlist"
                        : "Add to Wishlist"}
                </motion.button>
                {/* === Add To List Button === */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setOpenLists(true);
                        dispatch(
                            AddMedia({
                                list: listDetails?.id,
                                media_id: localStorage.getItem("seriesId"),
                                sessionId: localStorage.getItem("sessionId")
                            })
                        ).then(() => setOpenLists(false));
                    }}
                    className={`
        flex-1 text-xs sm:text-sm 
        flex items-center justify-center gap-2 
        py-2 px-4 
        rounded-xl font-semibold 
        transition-all duration-200
        bg-white/20 text-white hover:bg-blue-500/60 hover:text-black
    `}>
                    <FaListUl className="text-base sm:text-lg" />
                    Add to List
                </motion.button>
            </motion.div>
            {openLists && (
                <ListsModal
                    lists={listDetails?.results}
                    onClose={() => setOpenLists(false)}
                    onCreate={() => {
                        setOpenLists(false);
                        setOpenCreate(true);
                    }}
                />
            )}
            {openCreate && (
                <CreateListModal
                    onClose={() => setOpenCreate(false)}
                    setOpenLists={setOpenLists}
                    setOpenCreate={setOpenCreate}
                />
            )}
        </>
    );
};

export default FavouriteWishlistSection;
