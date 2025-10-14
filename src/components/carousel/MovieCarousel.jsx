import Slider from "react-slick";
import { Play, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { MdSlowMotionVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import MovieLoader from "../../pages/loading/MovieLoader";

const BACKDROP = (path) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "/placeholder.png";

export default function MovieCarousel() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    fade: false,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const { mNowList } = useSelector((s) => s.mNowReducer);
  const navigate = useNavigate();
  const dsp = useDispatch();
  if (!mNowList || mNowList.length === 0) return <MovieLoader />;

  return (
    <div className="w-full relative mb-5 min-h-[484px]">
      <Slider {...settings}>
        {mNowList.map((it, i) => {
          const title = it.title || it.name || "Untitled";
          const backdrop = it.backdrop_path || it.poster_path;
          const overview = it.overview || "";
          const rating = it.vote_average ? it.vote_average.toFixed(1) : "N/A";
          const year =
            (it.release_date || it.first_air_date || "").split("-")[0] || "—";

          return (
            <div
              key={it.id || i}
              className="relative max-h-[600px] overflow-hidden"
            >
              <img
                src={BACKDROP(backdrop)}
                alt={title}
                className="w-full h-full object-cover object-center transform-gpu scale-100 md:scale-105 transition-transform duration-1000 ease-out brightness-[0.75] contrast-[1.05] saturate-[1.05]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background-primary/95 via-black/40 to-transparent pointer-events-none" />

              <div
                className="absolute z-20 max-w-xl w-[90%] sm:w-[80%] md:w-[44%]
                           left-1/2 md:left-14 lg:left-16 bottom-12 md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2
                             md:text-left text-text-primary"
              >
                <span className="text-accent-secondary  text-xs sm:text-sm  ">
                  #{i + 1} Spotlight
                </span>

                <h2 className=" w-5/12 md:w-full text-sm sm:text-xl md:text-3xl lg:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">
                  {title}
                </h2>

                <div className="flex items-center  md:justify-start gap-4 text-text-secondary sm:text-sm text-xs mb-3">
                  <span>⭐ {rating}</span>
                  <span className="opacity-60">|</span>
                  <span>📅 {year}</span>
                </div>

                <p className="text-text-secondary w-2/4 text-xs sm:text-sm  line-clamp-1 mb-1 sm:line-clamp-2 sm:mb-5">
                  {overview}
                </p>
              </div>

              <div className="absolute z-30  translate-x-1/2 bottom-4 md:bottom-10">
                <button
                  className="watch-btn flex items-center justify-center gap-1.5 sm:gap-2 
               bg-accent-primary/80 hover:bg-accent-hover text-white font-semibold
               px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 
               
               rounded-full text-[10px] sm:text-xs md:text-sm
               shadow-lg transition-transform transform-gpu hover:scale-105"
                  onClick={() => {
                    dsp(getMovieDetails(it.id));
                    navigate("/moviedetails");
                  }}
                >
                  <span className="whitespace-nowrap">Watch Now</span>
                  <MdSlowMotionVideo className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
