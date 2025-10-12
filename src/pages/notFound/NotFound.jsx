import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
    return (
        <div className="bg-black flex flex-col items-center justify-center py-20">
            <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}>
                <div className="absolute inset-0 rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff0000]"></div>

                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-red-600 rounded-full"
                        style={{
                            transform: `rotate(${i * 30}deg) translate(45px)`
                        }}
                    />
                ))}

                <FaExclamationTriangle className="text-red-600 text-3xl sm:text-4xl drop-shadow-[0_0_10px_#ff0000]" />
            </motion.div>

            <motion.p
                className="mt-6 text-red-600 text-lg sm:text-2xl font-bold tracking-widest"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8 }}>
                ERROR OCCURRED
            </motion.p>
        </div>
    );
}

export default NotFound;
