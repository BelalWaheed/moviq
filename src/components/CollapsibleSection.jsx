import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

/**
 * A reusable collapsible section component for better performance
 * Content is hidden by default and shown when user clicks to expand
 */
const CollapsibleSection = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false,
  itemCount = 0 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      {/* Header with toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-red-500" />}
          <h2 className="text-2xl font-bold text-red-500 group-hover:text-red-400 transition-colors">
            {title}
          </h2>
          {itemCount > 0 && (
            <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
              {itemCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 group-hover:text-gray-300">
            {isOpen ? "Hide" : "Show"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500"
          >
            <FaChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CollapsibleSection;
