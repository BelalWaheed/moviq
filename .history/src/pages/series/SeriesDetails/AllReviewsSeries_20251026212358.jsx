import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesReviews } from "../../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews";

const AllReviewsSeries = () => {
    const { SeriesReviewsDetails } = useSelector(
        state => state.SeriesReviewsReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            GetSeriesReviews({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, []);

    const reviews = SeriesReviewsDetails?.results || [];

    return (
        <section className="my-10 px-4 container lg:ml-8 mx-auto ">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 ml-6">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    All User Reviews
                </span>
            </h2>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.15 }
                    }
                }}>
                {reviews.map(review => (
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
                                    <h3 className="text-white font-semibold hover:text-blue-700">
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
                        <div className="text-gray-300 text-sm leading-relaxed mb-3 max-h-24 overflow-y-auto pr-2 scroll-indicator">
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
        </section>
    );
};

export default AllReviewsSeries;
