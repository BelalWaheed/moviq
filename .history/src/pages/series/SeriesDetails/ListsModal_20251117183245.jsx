import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AddMedia } from "../../../redux/SharedSlices/PostRequest/List/AddMedia";
import Swal from "sweetalert2";
import { GetLists } from "../../../redux/SharedSlices/GetRequest/Lists";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useEffect } from "react";
import { GetListsDetails } from "../../../redux/SharedSlices/GetRequest/ListsDetails";
import { CheckItemStatus } from "../../../redux/SharedSlices/GetRequest/CheckItemStatus";

const ListsModal = ({ lists, onClose, onCreate, openLists, setOpenLists }) => {
    const dispatch = useDispatch();

    const { userListDetails } = useSelector(state => state.getListsReducer);
    const { statusError } = useSelector(state => state.AddMediaReducer);
    const { listData } = useSelector(state => state.GetListsDetailsReducer);
    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );

    useEffect(() => {}, [listData]);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#0f0f0f] w-full max-w-md mx-4 p-6 rounded-3xl shadow-2xl border border-white/5 font-sans  z-50 bg-black/60 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Your Lists
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent scroll-indicator">
                    {lists.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-sm">
                                No lists yet
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                                Create your first list to get started
                            </p>
                        </div>
                    ) : (
                        lists.map((list, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{
                                    scale: 1.01,
                                    backgroundColor: "rgba(255, 255, 255, 0.03)"
                                }}
                                className="flex justify-between items-center bg-white/[0.02] px-4 py-3.5 rounded-2xl border border-white/5 transition-all cursor-pointer group">
                                <div className="flex-1 min-w-0 mr-3">
                                    <h3 className="text-white font-medium text-sm mb-0.5 truncate">
                                        {list.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs truncate">
                                        {list.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        const currentList =
                                            userListDetails?.results.find(
                                                userList =>
                                                    userList.id == list.id
                                            );
                                        dispatch(
                                            CheckItemStatus({
                                                listId: currentList?.id,
                                                mediaId:
                                                    localStorage.getItem(
                                                        "seriesId"
                                                    )
                                            })
                                        );
                                        // dispatch(
                                        //     GetListsDetails({
                                        //         listId: currentList?.id,
                                        //         pageNumber:
                                        //             userListDetails?.page
                                        //     })
                                        // )
                                        // .then(() => {
                                        const isMediaExist =
                                            listData?.items.some(
                                                exist =>
                                                    exist.id ==
                                                    localStorage.getItem(
                                                        "seriesId"
                                                    )
                                            );
                                        if (currentList) {
                                            if (isMediaExist) {
                                                Swal.fire({
                                                    theme: "dark",
                                                    icon: "error",
                                                    title: "Oops...",
                                                    text: "You have already added the series to this list."
                                                });
                                                setOpenLists(false);
                                            } else {
                                                dispatch(
                                                    AddMedia({
                                                        listId: currentList?.id,
                                                        media_id:
                                                            localStorage.getItem(
                                                                "seriesId"
                                                            ),
                                                        sessionId:
                                                            localStorage.getItem(
                                                                "sessionId"
                                                            )
                                                    })
                                                )
                                                    .then(() =>
                                                        setOpenLists(false)
                                                    )
                                                    .then(() =>
                                                        Swal.fire({
                                                            theme: "dark",
                                                            title: "Added successfuly",
                                                            icon: "success"
                                                        })
                                                    );
                                            }
                                        }
                                        // });
                                    }}
                                    className="px-4 py-1.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
                                    Add
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
                {/* Pagination */}

                <div className="flex justify-center items-center gap-4 mt-10">
                    {/* Prev Button */}
                    <button
                        disabled={userListDetails?.page <= 1}
                        onClick={() => {
                            dispatch(
                                GetLists({
                                    accountId: AccountInfoDetails?.id,
                                    sessionId:
                                        localStorage.getItem("sessionId"),
                                    pageNumber: userListDetails?.page - 1
                                })
                            );
                        }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                            userListDetails?.page <= 1
                                ? "bg-neutral-800 text-gray-600 cursor-not-allowed"
                                : "bg-neutral-900 text-gray-300  hover:text-white"
                        }`}>
                        <MdOutlineNavigateBefore size={30} />
                    </button>

                    {/* Current Page Number */}
                    <span className="text-white text-lg font-medium select-none">
                        {userListDetails?.page} / {userListDetails?.total_pages}
                    </span>

                    {/* Next Button */}
                    <button
                        disabled={
                            userListDetails?.page >=
                            userListDetails?.total_pages
                        }
                        onClick={() => {
                            dispatch(
                                GetLists({
                                    accountId: AccountInfoDetails?.id,
                                    sessionId:
                                        localStorage.getItem("sessionId"),
                                    pageNumber: userListDetails?.page + 1
                                })
                            );
                        }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                            userListDetails?.page >=
                            userListDetails?.total_pages
                                ? "bg-neutral-800 text-gray-600 cursor-not-allowed"
                                : "bg-neutral-900 text-gray-300  hover:text-white"
                        }`}>
                        <MdOutlineNavigateNext size={30} />
                    </button>
                </div>
                <button
                    onClick={onCreate}
                    className="w-full mt-6 px-4 py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10">
                    Create New List
                </button>
            </motion.div>
        </div>
    );
};

export default ListsModal;
