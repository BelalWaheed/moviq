import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import MovieLoader from "../loading/MovieLoader";
import { fetchMNow } from "../../redux/HomeSlices/mNow";
import { fetchMTop } from "../../redux/HomeSlices/mTop";
import { fetchTNow } from "../../redux/HomeSlices/tNow";
import { fetchTTop } from "../../redux/HomeSlices/tTop";
import MovieCarousel from "../../components/carousel/MovieCarousel";
import SeriesCarousel from "../../components/carousel/SeriesCarousel";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";

const POSTER = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.png";

function Home() {
  const dsp = useDispatch();

  const { mNowList, mNIsLoading } = useSelector((s) => s.mNowReducer);
  const { mTopList, mTisLoading } = useSelector((s) => s.mTopReducer);
  const { tNowList, tNisLoading } = useSelector((s) => s.tNowReducer);
  const { tTopList, tTisLoading } = useSelector((s) => s.tTopReducer);

  useEffect(() => {
    dsp(fetchMNow());
    dsp(fetchMTop());
    dsp(fetchTNow());
    dsp(fetchTTop());
  }, [dsp]);

  const navigate = useNavigate();

  if (mNIsLoading || mTisLoading || tNisLoading || tTisLoading)
    return <MovieLoader />;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="HomePage min-h-screen bg-black text-text-primary">
      <MovieCarousel />

      {/* Series Now Playing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="Series_NowPlaying mb-8"
      >
        <motion.h2
          variants={cardVariants}
          className="text-2xl md:text-3xl font-bold text-accent-primary mb-4"
        >
          Series Now Playing
        </motion.h2>

        <SeriesCarousel />
      </motion.section>

      {/* 🔹 Top Rated Movies */}
      <section className="Top_Movies mx-12">
        <div className="w-full px-4 py-6 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-primary mb-6">
            Top Rated Movies
          </h2>

          <div
            className="
              grid 
              gap-6 
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              justify-center 
              place-items-center
              container mx-auto
            "
          >
            {mTopList?.map((item, index) => {
              const posterPath = item.poster_path || item.backdrop_path || "";
              const title = item.title || "Untitled";
              const rating =
                item.vote_average !== undefined && item.vote_average !== null
                  ? Number(item.vote_average).toFixed(1)
                  : "—";
              const date = item.release_date || "—";

              return (
                <motion.div
                  key={item.id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  variants={cardVariants}
                  className="w-full"
                >
                  <Card
                    onClick={() => {
                      dsp(getMovieDetails(item.id));
                      navigate("/moviedetails");
                    }}
                    className="bg-black text-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="relative w-full aspect-[2/3] bg-black">
                      <img
                        src={POSTER(posterPath)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <CardBody className="p-4">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm sm:text-base font-bold truncate">
                          {title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-text-secondary">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold">{rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{date}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🔹 Top Rated Series */}
      <section className="Top_Series mx-12">
        <div className="w-full px-4 py-6 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-primary mb-6">
            Top Rated Series
          </h2>

          <div
            className="
              grid 
              gap-6 
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              justify-center 
              place-items-center
              container mx-auto
            "
          >
            {tTopList?.map((item, index) => {
              const posterPath = item.poster_path || item.backdrop_path || "";
              const title = item.name || "Untitled";
              const rating =
                item.vote_average !== undefined && item.vote_average !== null
                  ? Number(item.vote_average).toFixed(1)
                  : "—";
              const date = item.first_air_date || "—";

              return (
                <motion.div
                  key={item.id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  variants={cardVariants}
                  className="w-full"
                >
                  <Card
                    onClick={() => {
                      dsp(getSeriesDetails(item.id));
                      navigate("/seriesDetails");
                    }}
                    className="bg-black text-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="relative w-full aspect-[2/3] bg-black">
                      <img
                        src={POSTER(posterPath)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <CardBody className="p-4">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm sm:text-base font-bold truncate">
                          {title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-text-secondary">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold">{rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{date}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
