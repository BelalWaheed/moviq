import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaImdb, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { FaWikipediaW } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetSeriesExternalLinks } from "../../../redux/SeriesSlices/GetSeriesExternalLinks";

const ExternalLinksSection = () => {
    const dispatch = useDispatch();
    const {
        SeriesExternalLinksDetails,
        SeriesExternalLinksDetailsLoading,
        SeriesExternalLinksDetailsError
    } = useSelector(state => state.SeriesExternalLinksReducer);

    useEffect(() => {
        dispatch(
            GetSeriesExternalLinks({
                seriesId: localStorage.getItem("seriesId")
            })
        );
    }, [dispatch]);

    const links = [
        {
            id: "imdb_id",
            icon: (
                <FaImdb className="text-yellow-400 text-2xl hover:scale-125 transition-transform" />
            ),
            baseUrl: "https://www.imdb.com/title/"
        },
        {
            id: "facebook_id",
            icon: (
                <FaFacebookF className="text-blue-600 text-2xl hover:scale-125 transition-transform" />
            ),
            baseUrl: "https://www.facebook.com/"
        },
        {
            id: "instagram_id",
            icon: (
                <FaInstagram className="text-pink-500 text-2xl hover:scale-125 transition-transform" />
            ),
            baseUrl: "https://www.instagram.com/"
        },
        {
            id: "twitter_id",
            icon: (
                <FaXTwitter className="text-sky-400 text-2xl hover:scale-125 transition-transform" />
            ),
            baseUrl: "https://twitter.com/"
        },
        {
            id: "wikidata_id",
            icon: (
                <FaWikipediaW className="text-white text-2xl hover:scale-125 transition-transform" />
            ),
            baseUrl: "https://www.wikidata.org/wiki/"
        }
    ];

    if (SeriesExternalLinksDetailsLoading) return null;
    if (SeriesExternalLinksDetailsError) return null;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
            className="flex items-center gap-4 mt-4 flex-wrap">
            {links.map(link => {
                const value = SeriesExternalLinksDetails?.[link.id];
                if (!value) return null;

                return (
                    <a
                        key={link.id}
                        href={`${link.baseUrl}${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-wrap gap-4 justify-start hover:scale-110 transition-transform duration-200">
                        {link.icon}
                    </a>
                );
            })}
        </motion.div>
    );
};

export default ExternalLinksSection;
