import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaStar,
  FaFilm,
  FaClock,
  FaGlobe,
  FaMoneyBillWave,
} from "react-icons/fa";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
import NotFound from "../notFound/NotFound";
import MovieLoader from "../loading/MovieLoader";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { GetMovieCredits } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieCredits";
import { GetMovieRecommendations } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieRecommendations";
import { GetMovieSimilar } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieSimilar";
import { GetMovieReviews } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieReviews";
import { GetMovieImages } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieImages";
import { GetMovieExternalLinks } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieExternalLinks";
import { GetMovieVideos } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieVideos";
import MovieCastSection from "./sections/MovieCastSection";
import MovieCrewSection from "./sections/MovieCrewSection";
import MovieReviewsSection from "./sections/MovieReviewsSection";
import MovieRecommendationsSection from "./sections/MovieRecommendationsSection";
import MovieSimilarSection from "./sections/MovieSimilarSection";
import MovieMediaSection from "./sections/MovieMediaSection";
import MovieExternalLinksSection from "./sections/MovieExternalLinksSection";
import MovieTrailersSection from "./sections/MovieTrailersSection";
import MovieProductionCompaniesSection from "./sections/MovieProductionCompaniesSection";

const MovieDetailsCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMovieDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.movieDetailsReducer
  );

  const [isTrailerOn, setIsTrailerOn] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedMovieDetails]);

  // Fetch movie data
  useEffect(() => {
    const storedId = localStorage.getItem("movieId");
    if (storedId) {
      dispatch(getMovieDetails(storedId));
      dispatch(GetMovieCredits({ movieId: storedId }));
      dispatch(GetMovieRecommendations({ movieId: storedId }));
      dispatch(GetMovieSimilar({ movieId: storedId }));
      dispatch(GetMovieReviews({ movieId: storedId }));
      dispatch(GetMovieImages({ movieId: storedId }));
      dispatch(GetMovieExternalLinks({ movieId: storedId }));
      dispatch(GetMovieVideos(storedId));
    }
  }, [dispatch]);

  // Keep localStorage synced when movie details change
  useEffect(() => {
    if (selectedMovieDetails?.id) {
      localStorage.setItem("movieId", selectedMovieDetails.id);
    }
  }, [selectedMovieDetails]);

  //  If there's no valid movie after all attempts
  if (!localStorage.getItem("movieId") && !detailsLoading) {
    return <NotFound />;
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-poppins overflow-x-hidden">
      {detailsError ? (
        <NotFound />
      ) : detailsLoading ? (
        <MovieLoader />
      ) : (
        <>
          {/* === Backdrop === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${selectedMovieDetails?.backdrop_path}`}
              alt="Backdrop"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute bottom-6 left-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                {selectedMovieDetails?.title}
              </h1>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                Release: {selectedMovieDetails?.release_date}
              </p>
            </motion.div>
          </motion.div>

          {/* === Main Content === */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {/* Poster */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex justify-center md:justify-start"
            >
              <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
                <img
                  src={
                    selectedMovieDetails?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${selectedMovieDetails?.poster_path}`
                      : "./Image-not-found.png"
                  }
                  alt="Poster"
                  className="object-cover w-[250px] md:w-full h-full"
                />
              </Card>
            </motion.div>

            {/* Details */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="md:col-span-2 space-y-6 flex flex-col justify-center"
            >
              <Typography
                variant="h2"
                className="text-white font-bold tracking-wide"
              >
                Overview
              </Typography>
              <Typography className="text-gray-300 leading-relaxed text-lg">
                {selectedMovieDetails?.overview}
              </Typography>

              {/* Stats */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="flex flex-wrap gap-6 text-gray-300 mt-4"
              >
                <div className="flex items-center gap-2">
                  <FaStar className="text-red-500 text-lg" />
                  <span>
                    <strong className="text-red-500">Rating:</strong>{" "}
                    {selectedMovieDetails?.vote_average?.toFixed(1)} ⭐ (
                    {selectedMovieDetails?.vote_count} votes)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-red-500 text-lg" />
                  <span>
                    <strong className="text-red-500">Runtime:</strong>{" "}
                    {selectedMovieDetails?.runtime} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayIcon className="w-5 h-5 text-red-500" />
                  <span>
                    <strong className="text-red-500">Genres:</strong>{" "}
                    {selectedMovieDetails?.genres?.map((g) => (
                      <span key={g.id} className="ml-1">
                        {g.name}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-red-500 text-lg" />
                  <span>
                    <strong className="text-red-500">Language:</strong>{" "}
                    {selectedMovieDetails?.original_language?.toUpperCase()}
                  </span>
                </div>
                {selectedMovieDetails?.budget > 0 && (
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-red-500 text-lg" />
                    <span>
                      <strong className="text-red-500">Budget:</strong> $
                      {selectedMovieDetails?.budget?.toLocaleString()}
                    </span>
                  </div>
                )}
                {selectedMovieDetails?.revenue > 0 && (
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-red-500 text-lg" />
                    <span>
                      <strong className="text-red-500">Revenue:</strong> $
                      {selectedMovieDetails?.revenue?.toLocaleString()}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    dispatch(GetMovieVideos(selectedMovieDetails?.id));
                    setIsTrailerOn(!isTrailerOn);
                  }}
                  color="red"
                  className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-red-500/30"
                >
                  <PlayIcon className="w-5 h-5 text-white" />
                  Watch Trailer
                </Button>

                <Button
                  onClick={() => navigate("/movies")}
                  color="gray"
                  className="rounded-full w-fit mt-6 flex items-center gap-2 hover:shadow-gray-500/30"
                >
                  <IoArrowBackOutline className="w-5 h-5 text-white" />
                  Movies Page
                </Button>
              </div>

              {/* External Links Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col w-full sm:w-3/4 mt-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PlayIcon className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Official & Social Links
                  </h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Official and social media links related to this movie
                </p>

                <MovieExternalLinksSection />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === Trailer Section === */}
          <MovieTrailersSection isTrailerOn={isTrailerOn} />

          {/* Reviews Section */}
          <MovieReviewsSection />

          {/* Cast & Crew */}
          <MovieCastSection />
          <MovieCrewSection />

          {/* Media */}
          <MovieMediaSection />

          {/* Production Companies */}
          <MovieProductionCompaniesSection />

          {/* Similar Section */}
          <MovieSimilarSection />

          {/* Recommendations Section */}
          <MovieRecommendationsSection />
        </>
      )}
    </div>
  );
};

export default MovieDetailsCard;
