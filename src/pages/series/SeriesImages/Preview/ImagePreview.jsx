import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ImagePreview = ({ image, onClick }) => {
    if (!image) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
                <motion.div
                    key="preview-box"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative flex flex-col md:flex-row gap-6 w-[90%] max-w-5xl bg-gradient-to-br from-[#121212]/90 to-[#1b1b1b]/90 backdrop-blur-lg rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 md:p-10 overflow-hidden">
                    {/* close button*/}
                    <button
                        onClick={onClick}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
                        <IoMdClose size={26} />
                    </button>

                    {/* image */}
                    <motion.div
                        className="flex-1 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                            alt="preview"
                            className="max-h-[70vh] rounded-2xl object-contain shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        />
                    </motion.div>

                    {/* details */}
                    <motion.div
                        className="flex-1 flex flex-col justify-center space-y-4 text-gray-200"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}>
                        <h2 className="text-3xl font-semibold text-white tracking-wide">
                            Image Info
                        </h2>

                        <div className="space-y-3 text-base md:text-lg leading-relaxed">
                            <p>
                                <span className="text-gray-400">
                                    Resolution:
                                </span>{" "}
                                <span className="text-white font-medium">
                                    {image.width} × {image.height}
                                </span>
                            </p>
                            <p>
                                <span className="text-gray-400">
                                    Aspect Ratio:
                                </span>{" "}
                                <span className="text-white font-medium">
                                    {image.aspect_ratio}
                                </span>
                            </p>
                            {image.iso_639_1 && (
                                <p>
                                    <span className="text-gray-400">
                                        Language:
                                    </span>{" "}
                                    <span className="text-white font-medium uppercase">
                                        {image.iso_639_1}
                                    </span>
                                </p>
                            )}
                            <p>
                                <span className="text-gray-400">Votes:</span>{" "}
                                <span className="text-white font-medium">
                                    {image.vote_count} (
                                    {image.vote_average?.toFixed(1)})
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImagePreview;
