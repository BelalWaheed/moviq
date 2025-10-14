import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaStar, FaFilm } from "react-icons/fa";
import { PlayIcon } from "@heroicons/react/24/solid";
import { MdSlowMotionVideo } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import MovieLoader from "../loading/MovieLoader";

const MovieDetailsCard = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    backdrop_path: "",
    poster_path: "",
    release_date: "",
    genres: [],
    overview: "",
    vote_average: 0,
    runtime: 0,
  });

  const navigate = useNavigate();

  const { selectedMovieDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.movieDetailsReducer
  );

  useEffect(() => {
    if (selectedMovieDetails) {
      const {
        title,
        backdrop_path,
        poster_path,
        release_date,
        genres,
        overview,
        vote_average,
        runtime,
      } = selectedMovieDetails;

      setMovieData({
        title,
        backdrop_path,
        poster_path,
        release_date,
        genres,
        overview,
        vote_average,
        runtime,
      });
    }
  }, [selectedMovieDetails]);

  if (detailsError) {
    return <NotFound />;
  }

  if (detailsLoading) {
    return <MovieLoader />;
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-poppins">
      {/* 🔹 Backdrop Image */}
      <div className="relative h-[420px] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        {/* 🔹 Movie Title */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            {movieData.title}
          </h1>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <FaCalendarAlt className="text-red-500" />
            Release Date: {movieData.release_date}
          </p>
        </div>
      </div>

      {/* 🔹 Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Poster */}
        <div className="flex justify-center md:justify-start">
          <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt="Poster"
              className="object-cover w-[250px] md:w-full h-full"
            />
          </Card>
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
          {/* Overview */}
          <Typography
            variant="h2"
            className="text-white font-bold tracking-wide"
          >
            Overview
          </Typography>
          <Typography className="text-gray-300 leading-relaxed text-lg">
            {movieData.overview || "No overview available."}
          </Typography>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-gray-300 mt-4">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400 text-lg" />
              <span>
                <strong className="text-yellow-400">Rating:</strong>{" "}
                {movieData.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaFilm className="text-red-500 text-lg" />
              <span>
                <strong className="text-red-500">Runtime:</strong>{" "}
                {movieData.runtime} min
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <PlayIcon className="w-5 h-5 text-red-500" />
              <span>
                <strong className="text-red-500">Genres:</strong>{" "}
                {movieData.genres.length > 0 ? (
                  movieData.genres.map((gen) => (
                    <span
                      key={gen.id}
                      className="inline-block bg-gray-800 rounded-lg px-3 py-1 text-sm mx-1 mt-1"
                    >
                      {gen.name}
                    </span>
                  ))
                ) : (
                  <span>Unknown</span>
                )}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              color="red"
              className="rounded-full w-fit flex items-center gap-2 hover:shadow-red-500/30"
            >
              <PlayIcon className="w-5 h-5 text-white" />
              Watch Trailer
            </Button>

            <Button
              onClick={() => navigate("/movies")}
              color="gray"
              className="rounded-full w-fit flex items-center gap-2 hover:shadow-gray-500/30"
            >
              <MdSlowMotionVideo className="w-5 h-5 text-white" />
              Movies Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
