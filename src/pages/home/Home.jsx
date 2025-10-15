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
import { FaStar, FaPlay, FaFire, FaTrophy } from "react-icons/fa";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetSeriesDetails";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

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
  }, []);

  const navigate = useNavigate();

  if (mNIsLoading) return <MovieLoader />;

  const cardVariants = {
    hidden: { opacity: 50, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 50 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 50, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <main className="HomePageaa min-h-screen bg-background-primary text-text-primary relative overflow-hidden">
      <div className="relative z-10">
        <MovieCarousel />

        {/* Trending Series Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="relative mb-20 mt-10"
        >
          <motion.div
            variants={titleVariants}
            className="flex items-center justify-center px-6 md:px-12 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent-primary/30">
                <FaFire className="w-6 h-6 text-accent-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-1">
                  Trending <span className="text-accent-primary">Series</span>
                </h2>
                <p className="text-sm text-text-secondary">
                  What's hot right now
                </p>
              </div>
            </div>
          </motion.div>

          <SeriesCarousel />
        </motion.section>

        {/* Top Rated Movies */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="px-6 md:px-12 mb-24"
        >
          <motion.div variants={titleVariants} className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent-secondary/30">
                <FaTrophy className="w-6 h-6 text-accent-secondary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
                Top Rated <span className="text-accent-secondary">Movies</span>
              </h2>
            </div>
            <p className="text-center text-text-secondary">
              The best of the best
            </p>
          </motion.div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 container mx-auto">
            {mTopList?.map((item, index) => {
              const posterPath = item.poster_path || item.backdrop_path || "";
              const title = item.title || "Untitled";
              const rating = item.vote_average
                ? Number(item.vote_average).toFixed(1)
                : "—";
              const date = item.release_date?.split("-")[0] || "—";

              return (
                <motion.div
                  key={item.id || index}
                  variants={cardVariants}
                  whileHover={{
                    y: -12,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="w-full group"
                >
                  <Card
                    onClick={() => {
                      dsp(getMovieDetails(item.id));
                      navigate("/moviedetails");
                    }}
                    className="relative bg-background-elevated text-text-primary shadow-xl rounded-2xl overflow-hidden cursor-pointer border border-background-muted/20 group-hover:border-accent-primary/50 transition-all duration-300 "
                  >
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-background-primary/90 backdrop-blur-md rounded-xl border border-background-muted/30">
                      <FaStar className="w-3.5 h-3.5 text-accent-secondary" />
                      <span className="text-sm font-bold">{rating}</span>
                    </div>

                    <div className="relative w-full aspect-[2/3] bg-background-primary overflow-hidden">
                      <img
                        src={POSTER(posterPath)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          whileHover={{}} /* keep empty — we rely on group-hover on parent below */
                          animate={{}} /* keep default */
                          className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center pointer-events-auto transition-transform duration-300"
                        >
                          {/* Play button itself becomes visible on group hover without dark background */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{}}
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                          >
                            <button
                              className="w-14 h-14 bg-accent-primary hover:bg-accent-hover rounded-full flex items-center justify-center text-text-primary shadow-2xl transition-transform duration-200 transform scale-90 group-hover:scale-100 group-hover:opacity-100 opacity-0"
                              aria-label="Play"
                            >
                              <FaPlay className="w-6 h-6" />
                            </button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    <CardBody className="p-4 bg-background-elevated border-t border-background-muted/10">
                      <h3 className="text-base font-bold mb-2 line-clamp-1 group-hover:text-accent-primary transition-colors duration-300">
                        {title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          {date}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-background-muted group-hover:text-accent-secondary transition-colors">
                          <span className="font-semibold">Movie</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Top Rated Series */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="px-6 md:px-12 pb-24"
        >
          <motion.div variants={titleVariants} className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent-primary/30">
                <FaTrophy className="w-6 h-6 text-accent-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
                Top Rated <span className="text-accent-primary">Series</span>
              </h2>
            </div>
            <p className="text-center text-text-secondary">
              Critics' choice collection
            </p>
          </motion.div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 container mx-auto">
            {tTopList?.map((item, index) => {
              const posterPath = item.poster_path || item.backdrop_path || "";
              const title = item.name || "Untitled";
              const rating = item.vote_average
                ? Number(item.vote_average).toFixed(1)
                : "—";
              const date = item.first_air_date?.split("-")[0] || "—";

              return (
                <motion.div
                  key={item.id || index}
                  variants={cardVariants}
                  whileHover={{
                    y: -12,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="w-full group"
                >
                  <Card
                    onClick={() => {
                      dsp(getSeriesDetails(item.id));
                      navigate("/seriesDetails");
                    }}
                    className="relative bg-background-elevated text-text-primary shadow-xl rounded-2xl overflow-hidden cursor-pointer border border-background-muted/20 group-hover:border-accent-secondary/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-accent-secondary/20"
                  >
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-background-primary/90 backdrop-blur-md rounded-xl border border-background-muted/30">
                      <FaStar className="w-3.5 h-3.5 text-accent-secondary" />
                      <span className="text-sm font-bold">{rating}</span>
                    </div>

                    <div className="relative w-full aspect-[2/3] bg-background-primary overflow-hidden">
                      <img
                        src={POSTER(posterPath)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Gradient overlay */}
                      {/* Gradient overlay — removed darkening */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />

                      {/* Play button overlay — transparent background, show only the button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          whileHover={{}} /* keep empty — we rely on group-hover on parent below */
                          animate={{}} /* keep default */
                          className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center pointer-events-auto transition-transform duration-300"
                        >
                          {/* Play button itself becomes visible on group hover without dark background */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{}}
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                          >
                            <button
                              className="w-14 h-14 bg-accent-primary hover:bg-accent-hover rounded-full flex items-center justify-center text-text-primary shadow-2xl transition-transform duration-200 transform scale-90 group-hover:scale-100 group-hover:opacity-100 opacity-0"
                              aria-label="Play"
                            >
                              <FaPlay className="w-6 h-6" />
                            </button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    <CardBody className="p-4 bg-background-elevated border-t border-background-muted/10">
                      <h3 className="text-base font-bold mb-2 line-clamp-1 group-hover:text-accent-secondary transition-colors duration-300">
                        {title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          {date}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-background-muted group-hover:text-accent-primary transition-colors">
                          <span className="font-semibold">Series</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default Home;
