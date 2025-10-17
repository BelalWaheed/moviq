import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const NetworksSection = () => {
    const { selectedSeriesDetails } = useSelector(
        state => state.seriesDetailsReducer
    );

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" }
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 pb-10">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Networks</h2>
            {selectedSeriesDetails?.networks.length > 0 ? (
                <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                    {selectedSeriesDetails.networks.map(net => (
                        <motion.div
                            key={net.id}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-[#0f0f0f] rounded-xl border border-gray-800 overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${net.logo_path}`}
                                alt={net.name}
                                className="object-contain w-full h-full max-w-full max-h-full"
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}>
                    <p className="text-gray-400 text-lg font-medium">
                        ❌ No Networks available for this series.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        This series doesn’t have any Networks information.
                    </p>
                </motion.div>
            )}
        </section>
    );
};

export default NetworksSection;
