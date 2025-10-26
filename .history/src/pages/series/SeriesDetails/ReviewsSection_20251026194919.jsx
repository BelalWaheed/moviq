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

    return (
        <section className="my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    User Reviews
                </span>
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-red-600 to-red-400 mb-6 w-24 rounded-full"></div>

            <motion.div
                className="flex gap-5 overflow-x-auto scrollbar-hide pb-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.15 }
                    }
                }}>
                {SeriesReviewsDetails?.results?.map(review => (
                    <motion.div
                        key={review.id}
                        className="min-w-[350px] bg-[#141414] rounded-2xl p-5 shadow-lg hover:shadow-red-700/30 transition-transform duration-300 hover:scale-[1.03] flex flex-col"
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
                                        : "/default-avatar.png"
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
                                    {review.author_details.rating ?? "–"}/10
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-6 mb-3">
                            {review.content}
                        </p>

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
                            <a
                                href={review.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:text-red-400 font-medium transition-colors">
                                Read more →
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ReviewsSection;
