import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const MovieTrailersSection = ({ isTrailerOn }) => {
  const { movieTrailerData, movieTrailerDataLoading } = useSelector(
    (state) => state.MovieVideosReducer
  );

  return (
    <AnimatePresence>
      {isTrailerOn && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="pb-10 px-12 w-full flex justify-center"
        >
          {movieTrailerDataLoading ? (
            <span className="loader"></span>
          ) : (
            <>
              {movieTrailerData ? (
                <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] rounded-2xl overflow-hidden shadow-lg border border-red-600">
                  <iframe
                    src={`https://www.youtube.com/embed/${movieTrailerData?.key}`}
                    title="Trailer"
                    allowFullScreen
                    className="w-full h-full bg-black"
                    style={{
                      border: "none",
                      outline: "none",
                    }}
                  ></iframe>
                </div>
              ) : (
                <div className="pb-10 px-12 mx-auto mt-10 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L15 12 9.75 7v10zM19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                  </svg>
                  <h2 className="text-gray-400 text-lg font-semibold mb-2">
                    No Trailer Available
                  </h2>
                  <p className="text-gray-500 text-sm text-center max-w-xs">
                    Sorry, we couldn't find a trailer for this movie.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieTrailersSection;
