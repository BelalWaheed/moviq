import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MovieLoader from "../loading/MovieLoader";
import NotFound from "../notFound/NotFound";
import {
  getMovies,
  pageReset,
  setType,
} from "../../redux/moviesSlices/MoviesSlice";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import MoviePagination from "./MoviePagination";

function Movies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moviesList, moviesLoading, typing, moviesError, page, currentType } =
    useSelector((state) => state.moviesReducer);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page, currentType]);

  // Initial fetch
  useEffect(() => {
    dispatch(getMovies({ page: page, type: typing }));
  }, []);

  if (moviesError) {
    return <NotFound />;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="px-6 lg:px-12 py-12">
        <h1 className="text-white text-center md:text-start lg:text-start xl:text-start text-4xl sm:text-4xl lg:text-6xl font-bold mb-6">
          Movies
        </h1>

        {/* Movie type buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { label: "Now Playing", type: "now_playing" },
            { label: "Popular", type: "popular" },
            { label: "Top Rated", type: "top_rated" },
            { label: "Upcoming", type: "upcoming" },
          ].map(({ label, type }) => (
            <Button
              key={type}
              onClick={() => {
                dispatch(pageReset());
                dispatch(setType(type));
                dispatch(getMovies({ type: type }));
              }}
              variant="gradient"
              color={typing === type ? "red" : "gray"}
              className="rounded-full"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Movies Cards */}
        {moviesLoading ? (
          <MovieLoader />
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-items-center container mx-auto">
            {moviesList?.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.01,
                }}
                variants={cardVariants}
                className="w-full"
              >
                <Card
                  onClick={() => {
                    dispatch(getMovieDetails(movie.id));
                    navigate(`/movie/${movie.id}`);
                  }}
                  className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group bg-black"
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-black">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "./Image-not-found.png"
                      }
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <CardBody className="p-3 text-white space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-base sm:text-lg font-bold truncate">
                        {movie.title}
                      </h2>
                      <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-sm">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {movie.release_date}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <MoviePagination />
    </div>
  );
}

export default Movies;
