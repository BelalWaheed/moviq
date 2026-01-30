import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CollapsibleSection from "../../../components/CollapsibleSection";
import { FaBuilding } from "react-icons/fa";

const MovieProductionCompaniesSection = () => {
  const { selectedMovieDetails } = useSelector(
    (state) => state.movieDetailsReducer
  );

  // Deduplicate production companies by id
  const uniqueCompanies = useMemo(() => {
    if (!selectedMovieDetails?.production_companies) return [];
    const seen = new Set();
    return selectedMovieDetails.production_companies.filter((comp) => {
      if (seen.has(comp.id)) return false;
      seen.add(comp.id);
      return true;
    });
  }, [selectedMovieDetails?.production_companies]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  if (!uniqueCompanies.length) return null;

  return (
    <CollapsibleSection 
      title="Production Companies" 
      icon={FaBuilding}
      itemCount={uniqueCompanies.length}
    >
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
        {uniqueCompanies.map((comp) => (
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
        ))}
      </div>
    </CollapsibleSection>
  );
};

export default MovieProductionCompaniesSection;
