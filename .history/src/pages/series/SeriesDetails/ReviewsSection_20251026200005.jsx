import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesReviews } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews";

const ReviewsSection = () => {
    const { SeriesReviewsDetails } = useSelector(
        state => state.SeriesReviewsReducer
    );
    const dispatch = useDispatch();

    const [showAll, setShowAll] = useState(false);
    const [expandedReviews, setExpandedReviews] = useState({});

    useEffect(() => {
        dispatch(
            GetSeriesReviews({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, [dispatch]);

    const toggleExpand = id =>
        setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));

    const reviews = SeriesReviewsDetails?.results || [];
    const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

    return (
        <section className="my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    User Reviews
                </span>
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-red-600 to-red-400 mb-6 w-24 rounded-full"></div>

            <div className="flex flex-col gap-5">
                {displayedReviews.map(review => {
                    const expanded = expandedReviews[review.id];
                    const content = expanded
                        ? review.content
                        : review.content.slice(0, 300);

                    return (
                        <motion.div
                            key={review.id}
                            className="bg-[#141414] rounded-2xl p-5 shadow-md hover:shadow-red-700/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-3">
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

                            <p className="text-gray-300 text-sm leading-relaxed mb-2">
                                {content}
                                {review.content.length > 300 && (
                                    <button
                                        onClick={() => toggleExpand(review.id)}
                                        className="text-red-500 hover:text-red-400 ml-2 font-medium">
                                        {expanded ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </p>

                            <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                    {new Date(
                                        review.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {reviews.length > 5 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-400 rounded-lg text-white font-semibold hover:opacity-90 transition-all">
                        {showAll ? "Show Less Reviews" : "Show All Reviews"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default ReviewsSection;
