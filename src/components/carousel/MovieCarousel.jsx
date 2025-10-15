import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { MdSlowMotionVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { IoIosArrowForward } from "react-icons/io";

const BACKDROP = (path) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "/placeholder.png";

export default function MovieCarousel() {
  const { mNowList, mNowisLoading } = useSelector((s) => s.mNowReducer);
  const navigate = useNavigate();
  const dsp = useDispatch();

  return (
    <div className="w-full relative mb-5">
      {/* Navigation buttons - hidden on mobile */}
      <div className="absolute inset-0 hidden sm:flex justify-between items-center px-3 md:px-6 z-10 pointer-events-none">
        <button className="custom-prev pointer-events-auto w-10 h-10 bg-accent-primary/70 hover:bg-accent-hover rounded-full flex items-center justify-center transition-all duration-300 text-text-primary hover:scale-110">
          <IoIosArrowForward className="rotate-180 w-5 h-5" />
        </button>

        <button className="custom-next pointer-events-auto w-10 h-10 bg-accent-primary/70 hover:bg-accent-hover rounded-full flex items-center justify-center transition-all duration-300 text-text-primary hover:scale-110">
          <IoIosArrowForward className="w-5 h-5" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        allowTouchMove={true}
        grabCursor={true}
        speed={700}
        loop={true}
        slidesPerView={1}
        className="movie-swiper w-full"
      >
        {mNowList.map((it, i) => {
          const title = it.title || it.name || "Untitled";
          const backdrop = it.backdrop_path || it.poster_path;
          const overview = it.overview || "";
          const rating = it.vote_average ? it.vote_average.toFixed(1) : "N/A";
          const year =
            (it.release_date || it.first_air_date || "").split("-")[0] || "—";

          return (
            <SwiperSlide key={it.id || i}>
              <div className="relative min-h-[400px] sm:min-h-[500px] md:max-h-[600px] overflow-hidden">
                <img
                  src={BACKDROP(backdrop)}
                  alt={title}
                  className="w-full h-full min-h-[400px] sm:min-h-[500px] object-cover object-center transform-gpu scale-100 md:scale-105 transition-transform duration-1000 ease-out brightness-[0.75] contrast-[1.05] saturate-[1.05]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/95 via-black/40 to-transparent pointer-events-none" />

                <div
                  className="absolute z-20 max-w-xl w-[90%] sm:w-[80%] md:w-[44%]
                             left-1/2 md:left-14 lg:left-16 bottom-16 sm:bottom-12 md:top-1/2 
                             -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2
                             text-center md:text-left text-text-primary"
                >
                  <span className="text-accent-secondary text-sm sm:text-sm">
                    #{i + 1} Spotlight
                  </span>

                  <h2 className="w-full text-lg sm:text-xl md:text-3xl lg:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">
                    {title}
                  </h2>

                  <div className="flex items-center justify-center md:justify-start gap-4 text-text-secondary text-sm sm:text-sm mb-3">
                    <span>⭐ {rating}</span>
                    <span className="opacity-60">|</span>
                    <span>📅 {year}</span>
                  </div>

                  <p className="text-text-secondary w-full sm:w-3/4 md:w-2/4 mx-auto md:mx-0 text-sm sm:text-sm line-clamp-2 sm:line-clamp-2 mb-6 sm:mb-5">
                    {overview}
                  </p>
                </div>

                <div className="absolute z-30 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-14 lg:left-16 bottom-6 md:bottom-10">
                  <button
                    className="watch-btn flex items-center justify-center gap-2 sm:gap-2 
                               bg-accent-primary/80 hover:bg-accent-hover text-white font-semibold
                               px-4 sm:px-3 md:px-4 py-2 sm:py-1.5 md:py-2 
                               rounded-full text-sm sm:text-xs md:text-sm
                               shadow-lg transition-transform transform-gpu hover:scale-105"
                    onClick={() => {
                      dsp(getMovieDetails(it.id));
                      navigate("/moviedetails");
                    }}
                  >
                    <span className="whitespace-nowrap">Watch Now</span>
                    <MdSlowMotionVideo className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}