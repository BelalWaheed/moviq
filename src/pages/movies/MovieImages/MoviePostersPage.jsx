import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetMovieImages } from "../../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieImages";
import { IoArrowBackOutline } from "react-icons/io5";
import ImagePreview from "../../series/SeriesImages/Preview/ImagePreview";

const MoviePostersPage = () => {
  const { id: movieId } = useParams();
  const { MovieImagesDetails } = useSelector(
    (state) => state.MovieImagesReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showHeaderButtons, setShowHeaderButtons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images using URL params
  useEffect(() => {
    if (movieId) {
      dispatch(GetMovieImages({ movieId }));
    }
  }, [dispatch, movieId]);

  // Hide / Show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeaderButtons(
        !(currentScrollY > lastScrollY && currentScrollY > 100)
      );
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [MovieImagesDetails]);

  return (
    <div className="min-h-screen bg-black text-white font-poppins px-6 py-10 max-w-6xl mx-auto">
      {/* ===== Header Buttons (Fixed) ===== */}
      <AnimatePresence>
        {showHeaderButtons && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 w-full px-6 z-40 flex justify-between items-center py-3"
          >
            <h1 className="text-3xl font-bold text-red-500 bg-black/30 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
              Posters
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/movie/${movieId}`)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 px-5 py-2 rounded-full shadow-md hover:shadow-red-500/30 transition"
            >
              <IoArrowBackOutline className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Back</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Grid of Posters ===== */}
      <div className="mt-28 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {MovieImagesDetails?.posters?.map((img, idx) => (
          <motion.div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="rounded-2xl overflow-hidden bg-[#1a1a1a] hover:scale-105 cursor-pointer transition-transform duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
              alt="poster"
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
        {/* Image preview */}
        <ImagePreview
          image={selectedImage}
          onClick={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
};

export default MoviePostersPage;
