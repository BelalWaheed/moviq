import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const MovieProductionCompaniesSection = () => {
  const { selectedMovieDetails } = useSelector(
    (state) => state.movieDetailsReducer
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        Production Companies
      </h2>
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
        {selectedMovieDetails?.production_companies?.length > 0 ? (
          selectedMovieDetails.production_companies.map((comp) => (
            <motion.div
              key={comp.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-[#0f0f0f] rounded-xl border border-gray-800 overflow-hidden"
            >
              {comp.logo_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${comp.logo_path}`}
                  alt={comp.name}
                  className="object-contain w-full h-full max-w-full max-h-full"
                />
              ) : (
                <p className="text-gray-400 text-center text-sm px-2 text-ellipsis overflow-hidden line-clamp-2">
                  {comp.name}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-lg font-medium">
              ❌ No Production Companies available for this movie.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              This movie doesn't have production company information.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MovieProductionCompaniesSection;
