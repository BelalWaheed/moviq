import Slider from "react-slick";
import { Card, CardBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import MovieLoader from "../../pages/loading/MovieLoader";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { useNavigate } from "react-router-dom";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";
function SeriesCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const { tNowList, tNisLoading } = useSelector((s) => s.tNowReducer);
  const navigate = useNavigate();
  const dsp = useDispatch();

  if (tNisLoading) return <MovieLoader />;

  return (
    <div className="w-full  px-4 py-6 mb-16">
      <Slider {...settings}>
        {tNowList.map((item, index) => {
          const { poster_path, name } = item;
          return (
            <div key={index} className="px-2">
              <Card
                onClick={() => {
                  dsp(getSeriesDetails(item.id));
                  navigate("/seriesDetails");
                }}
                className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group bg-black mx-auto"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-black">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
              </Card>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SeriesCarousel;
