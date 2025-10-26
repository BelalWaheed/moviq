import React, { useEffect } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesReviews } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";

const AllReviewsSeries = () => {
    const { SeriesReviewsDetails } = useSelector(
        state => state.SeriesReviewsReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            GetSeriesReviews({ seriesId: localStorage.getItem("seriesId") })
        );
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    const reviews = SeriesReviewsDetails?.results || [];

    return (
        <section className="my-10 px-4 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    All User Reviews
                </span>
            </h2>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id || index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="bg-black rounded-2xl p-5 mx-auto w-full shadow-lg hover:shadow-red-700/20 transition">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <a
                                href={`https://www.themoviedb.org/u/${
                                    review.author ||
                                    review.author_details.name ||
                                    review.author_details.username
                                }`}
                                target="_blank"
                                rel="noreferrer">
                                <img
                                    src={
                                        review.author_details.avatar_path
                                            ? review.author_details.avatar_path.startsWith(
                                                  "http"
                                              )
                                                ? review.author_details.avatar_path.replace(
                                                      /^\/+/,
                                                      ""
                                                  )
                                                : `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`
                                            : "/Image-not-found.png"
                                    }
                                    alt={review.author}
                                    className="w-12 h-12 rounded-full object-cover border border-red-500"
                                />
                            </a>

                            <div>
                                <a
                                    href={`https://www.themoviedb.org/u/${
                                        review.author ||
                                        review.author_details.name ||
                                        review.author_details.username
                                    }`}
                                    target="_blank"
                                    rel="noreferrer">
                                    <h3 className="text-white font-semibold hover:text-red-400 transition">
                                        {review.author_details.name ||
                                            review.author}
                                    </h3>
                                </a>

                                <div className="flex items-center text-sm text-gray-400">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    {review.author_details.rating || "_"}
                                    /10
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-gray-300 text-sm leading-relaxed mb-3 max-h-24 overflow-y-auto pr-2">
                            {review.content}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto flex justify-between items-center text-gray-500 text-xs">
                            <span>
                                {new Date(review.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    }
                                )}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {SeriesReviewsDetails?.total_pages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center items-center gap-4 mt-10 select-none">
                    {/* Prev Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={SeriesReviewsDetails?.page <= 1}
                        onClick={() => {
                            dispatch(
                                GetSeriesReviews({
                                    seriesId: localStorage.getItem("seriesId"),
                                    pageNumber: SeriesReviewsDetails?.page - 1
                                })
                            );
                        }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                            SeriesReviewsDetails?.page <= 1
                                ? "bg-neutral-800 text-gray-600 cursor-not-allowed"
                                : "bg-neutral-900 text-white hover:bg-red-600"
                        }`}>
                        <MdOutlineNavigateBefore size={28} />
                    </motion.button>

                    {/* Page Counter */}
                    <span className="text-white text-lg font-medium">
                        {SeriesReviewsDetails?.page} /{" "}
                        {SeriesReviewsDetails?.total_pages}
                    </span>

                    {/* Next Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={
                            SeriesReviewsDetails?.page >=
                            SeriesReviewsDetails?.total_pages
                        }
                        onClick={() => {
                            dispatch(
                                GetSeriesReviews({
                                    seriesId: localStorage.getItem("seriesId"),
                                    pageNumber: SeriesReviewsDetails?.page + 1
                                })
                            );
                        }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                            SeriesReviewsDetails?.page >=
                            SeriesReviewsDetails?.total_pages
                                ? "bg-neutral-800 text-gray-600 cursor-not-allowed"
                                : "bg-neutral-900 text-white hover:bg-red-600"
                        }`}>
                        <MdOutlineNavigateNext size={28} />
                    </motion.button>
                </motion.div>
            )}
        </section>
    );
};

export default AllReviewsSeries;
