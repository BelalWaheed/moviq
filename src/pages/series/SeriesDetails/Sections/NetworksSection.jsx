import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { FaBroadcastTower } from "react-icons/fa";

const NetworksSection = () => {
    const { selectedSeriesDetails } = useSelector(
        state => state.seriesDetailsReducer
    );

    // Deduplicate networks by id
    const uniqueNetworks = useMemo(() => {
        if (!selectedSeriesDetails?.networks) return [];
        const seen = new Set();
        return selectedSeriesDetails.networks.filter((net) => {
            if (seen.has(net.id)) return false;
            seen.add(net.id);
            return true;
        });
    }, [selectedSeriesDetails?.networks]);

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" }
        }
    };

    if (!uniqueNetworks.length) return null;

    return (
        <CollapsibleSection 
            title="Networks" 
            icon={FaBroadcastTower}
            itemCount={uniqueNetworks.length}
        >
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-indicator pb-4">
                {uniqueNetworks.map(net => (
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
                        {net.logo_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${net.logo_path}`}
                                alt={net.name}
                                className="object-contain w-full h-full max-w-full max-h-full"
                            />
                        ) : (
                            <p className="text-gray-400 text-center text-sm px-2 text-ellipsis overflow-hidden line-clamp-2">
                                {net.name}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </CollapsibleSection>
    );
};

export default NetworksSection;
