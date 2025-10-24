import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import MovieLoader from "../loading/MovieLoader";
import { fetchMNow } from "../../redux/HomeSlices/mNow";
import { fetchMTop } from "../../redux/HomeSlices/mTop";
import { fetchTNow } from "../../redux/HomeSlices/tNow";
import { fetchTTop } from "../../redux/HomeSlices/tTop";
import MovieCarousel from "../../components/carousel/MovieCarousel";
import SeriesCarousel from "../../components/carousel/SeriesCarousel";
import { Card, CardBody } from "@material-tailwind/react";
import { FaStar, FaPlay, FaFire, FaTrophy } from "react-icons/fa";
import { getSeriesDetails } from "../../redux/SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { ArrowRightIcon } from "lucide-react";
import TopCard from "./TopCard";

const POSTER = path =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.png";

function Home() {
    const dsp = useDispatch();

    const { mNowList, mNIsLoading } = useSelector(s => s.mNowReducer);
    const { mTopList, mTisLoading } = useSelector(s => s.mTopReducer);
    const { tNowList, tNisLoading } = useSelector(s => s.tNowReducer);
    const { tTopList, tTisLoading } = useSelector(s => s.tTopReducer);

    useEffect(() => {
        dsp(fetchMNow());
        dsp(fetchMTop());
        dsp(fetchTNow());
        dsp(fetchTTop());
    }, []);

    const navigate = useNavigate();

    if (mNIsLoading) return <MovieLoader />;

    const cardVariants = {
        hidden: { opacity: 50, y: 60, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 50 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 50, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 20
            }
        }
    };

    return (
        <main className="HomePageaa min-h-screen bg-background-primary text-text-primary relative overflow-hidden">
            <div className="relative z-10">
                <MovieCarousel />

                {/* Trending Series Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                    className="relative mb-20 mt-10">
                    <motion.div
                        variants={titleVariants}
                        className="flex items-center justify-center px-6 md:px-12 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <FaFire className="w-6 h-6 text-accent-primary" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-1">
                                    Trending{" "}
                                    <span className="text-accent-primary">
                                        Series
                                    </span>
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    What's hot right now
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <SeriesCarousel />
                </motion.section>

                {/* Top Rated Movies */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionVariants}
                    className="px-6 md:px-12 mb-24">
                    <motion.div variants={titleVariants} className="mb-12">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-accent-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <FaTrophy className="w-6 h-6 text-accent-secondary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary items-center">
                                Top Rated{" "}
                                <span className="text-accent-secondary">
                                    Movies
                                </span>
                            </h2>
                        </div>
                        <p className="text-center text-text-secondary">
                            The best of the best
                        </p>
                    </motion.div>

                    <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 container mx-auto">
                        {mTopList?.slice(0, 10).map((item, index) => (
                            <TopCard
                                key={item.id || index}
                                item={item}
                                isSeries={false}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Top Rated Series */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionVariants}
                    className="px-6 md:px-12 pb-24">
                    <motion.div variants={titleVariants} className="mb-12">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <FaTrophy className="w-6 h-6 text-accent-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
                                Top Rated{" "}
                                <span className="text-accent-primary">
                                    Series
                                </span>
                            </h2>
                        </div>
                        <p className="text-center text-text-secondary">
                            Critics' choice collection
                        </p>
                    </motion.div>

                    <div className="nigga grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 container mx-auto">
                        {tTopList?.slice(0, 10).map((item, index) => (
                            <TopCard
                                key={item.id || index}
                                item={item}
                                isSeries={true}
                            />
                        ))}
                    </div>
                </motion.section>
            </div>
        </main>
    );
}

export default Home;
