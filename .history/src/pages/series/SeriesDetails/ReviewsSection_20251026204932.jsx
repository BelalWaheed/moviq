import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesReviews } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews";

const ReviewsSection = () => {
    const { SeriesReviewsDetails } = useSelector(
        state => state.SeriesReviewsReducer
    );

    const dispatch = useDispatch();

    // if page was updated
    useEffect(() => {
        dispatch(
            GetSeriesReviews({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    const reviews = SeriesReviewsDetails?.results || [];

    return (
        <section className="my-10 px-4 container lg:ml-8 ">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 ml-6">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    User Reviews
                </span>
            </h2>

            <motion.div
                className="flex flex-col gap-5 w-full md:w-11/12 lg:w-4/5 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.15 }
                    }
                }}>
                {reviews.slice(0, 3).map(review => (
                    <motion.div
                        key={review.id}
                        className="bg-black rounded-2xl p-5 "
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.35 }
                            }
                        }}>
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
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
                            <div>
                                <h3 className="text-white font-semibold">
                                    {review.author_details.name ||
                                        review.author}
                                </h3>
                                <div className="flex items-center text-sm text-gray-400">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    {review.author_details.rating || "_"}
                                    /10
                                </div>
                            </div>
                        </div>

                        {/* Content (now scrollable) */}
                        <div className="text-gray-300 text-sm leading-relaxed mb-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
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
            </motion.div>

            {reviews.length > 5 && (
                <div className="flex justify-center mt-6 w-2/3">
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-full transition-colors">
                        Show all reviews
                    </button>
                </div>
            )}
        </section>
    );
};

export default ReviewsSection;
