import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import MovieLoader from "../../pages/loading/MovieLoader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { IoIosArrowForward } from "react-icons/io";

function SeriesCarousel() {
    const { tNowList, tNisLoading } = useSelector(s => s.tNowReducer);
    const navigate = useNavigate();
    const dsp = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (tNisLoading) return <MovieLoader />;

    return (
        <div className="w-full px-4 py-8 mb-10 relative">
            {/* ✅ Custom Navigation Buttons */}
            <div className="absolute inset-0 flex justify-between items-center px-3 md:px-6 z-10 pointer-events-none">
                <button className="custom-prev pointer-events-auto w-10 h-10 bg-accent-primary/70 hover:bg-accent-hover rounded-full flex items-center justify-center transition-all duration-300 text-text-primary hover:scale-110">
                    <IoIosArrowForward className="rotate-180 w-5 h-5" />
                </button>
                <button className="custom-next pointer-events-auto w-10 h-10 bg-accent-primary/70 hover:bg-accent-hover rounded-full flex items-center justify-center transition-all duration-300 text-text-primary hover:scale-110">
                    <IoIosArrowForward className="w-5 h-5" />
                </button>
            </div>

            {/* ✅ Swiper */}
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                allowTouchMove={true}
                grabCursor={true}
                speed={600}
                slidesPerView={1.5}
                spaceBetween={16}
                breakpoints={{
                    1280: { slidesPerView: 6 }, // PC → 5 كروت
                    1024: { slidesPerView: 5 }, // Tablet → 4 كروت
                    600: { slidesPerView: 3.7 }, // Mobile → 3 كروت
                    300: { slidesPerView: 2.8 },
                    200: { slidesPerView: 1.8 }
                }}
                className="series-swiper">
                {tNowList?.map((item, index) => {
                    const { poster_path, name, id } = item;
                    const posterSrc = poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "/placeholder.png";

                    return (
                        <SwiperSlide key={id || index}>
                            <div className="flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -6 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300
                                    }}
                                    className="w-full">
                                    <Card
                                        onClick={() => {
                                            dsp(getSeriesDetails(id));
                                            navigate(`/series/${id}`);
                                        }}
                                        className="w-full shadow-lg rounded-xl overflow-hidden cursor-pointer group bg-surface-secondary border border-background-muted transition-all">
                                        <div className="relative w-full aspect-[2/3] bg-black">
                                            <img
                                                src={posterSrc}
                                                alt={name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                                loading="lazy"
                                            />
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default SeriesCarousel;
