import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MovieLoader from "./pages/loading/MovieLoader";
import SearchPage from "./pages/shared/SearchPage";

// ========== Lazy Imports ========== //
const Home = lazy(() => import("./pages/home/Home"));
const Movies = lazy(() => import("./pages/movies/Movies"));
const Series = lazy(() => import("./pages/series/Series"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const MovieDetailsCard = lazy(() => import("./pages/movies/MovieDetailsCard"));

/* === Series === */
const DetailsCard = lazy(() =>
    import("./pages/series/SeriesDetails/DetailsCard")
);
const SeasonDetails = lazy(() =>
    import("./pages/series/SeriesSeasons/SeasonDetails")
);
const AllCastPage = lazy(() =>
    import("./pages/series/SeriesSeasons/AllCastPage")
);
const AllEpisodes = lazy(() =>
    import("./pages/series/SeriesEpisodes/AllEpisodes")
);
const EpisodeCard = lazy(() =>
    import("./pages/series/SeriesEpisodes/EpisodeCard")
);
const AllCastSeries = lazy(() =>
    import("./pages/series/SeriesDetails/AllCastSeries")
);
const AllCastEpisodesPage = lazy(() =>
    import("./pages/series/SeriesEpisodes/AllCastEpisodesPage")
);
const AllCrewSeries = lazy(() =>
    import("./pages/series/SeriesDetails/AllCrewSeries")
);
const AllCrewPage = lazy(() =>
    import("./pages/series/SeriesSeasons/AllCrewPage")
);
const RecommendationsSection = lazy(() =>
    import("./pages/series/SeriesDetails/RecommendationsSection")
);
const AllReviewsSeries = lazy(() =>
    import("./pages/series/SeriesDetails/AllReviewsSeries")
);
const PostersSeasonsPage = lazy(() =>
    import("./pages/series/SeriesSeasons/PostersSeasonsPage")
);
const AllSeasonsVideos = lazy(() =>
    import("./pages/series/SeriesSeasons/AllSeasonsVideos")
);
/* === Person === */
const PersonalInfo = lazy(() =>
    import("./pages/shared/PersonDetails/PersonalInfo")
);
const AllPersonSeriesCast = lazy(() =>
    import(
        "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonSeriesCast"
    )
);
const AllPersonMoviesCast = lazy(() =>
    import(
        "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonMoviesCast"
    )
);
const AllPersonSeriesCrew = lazy(() =>
    import(
        "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonSeriesCrew"
    )
);
const AllPersonMoviesCrew = lazy(() =>
    import(
        "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonMoviesCrew"
    )
);
const BackdropsPage = lazy(() =>
    import("./pages/series/SeriesImages/BackdropsPage")
);
const LogosPage = lazy(() => import("./pages/series/SeriesImages/LogosPage"));
const PostersPage = lazy(() =>
    import("./pages/series/SeriesImages/PostersPage")
);

//

// Import movie pages
const AllCastMovie = lazy(() => import("./pages/movies/AllCastMovie"));
const AllCrewMovie = lazy(() => import("./pages/movies/AllCrewMovie"));

function App() {
    return (
        <div className="bg-background-primary min-h-screen flex flex-col">
            {/* === Header === */}
            <Header />

            <main className="flex-1">
                <Suspense fallback={<MovieLoader />}>
                    <Routes>
                        {/* Home */}
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<SearchPage />} />

                        {/* Movies */}
                        <Route path="movies" element={<Movies />} />
                        <Route
                            path="moviedetails"
                            element={<MovieDetailsCard />}
                        />

                        <Route path="AllCastMovie" element={<AllCastMovie />} />
                        <Route path="AllCrewMovie" element={<AllCrewMovie />} />

                        {/* Series */}
                        <Route path="series" element={<Series />} />
                        <Route path="seriesDetails" element={<DetailsCard />} />
                        <Route
                            path="SeasonDetails"
                            element={<SeasonDetails />}
                        />
                        <Route
                            path="SeasonDetailsCast"
                            element={<AllCastPage />}
                        />
                        <Route path="AllEpisode" element={<AllEpisodes />} />
                        <Route path="EpisodeCard" element={<EpisodeCard />} />
                        <Route
                            path="AllCastSeries"
                            element={<AllCastSeries />}
                        />
                        <Route
                            path="AllCrewSeries"
                            element={<AllCrewSeries />}
                        />
                        <Route path="AllCrewPage" element={<AllCrewPage />} />

                        <Route
                            path="BackdropsPage"
                            element={<BackdropsPage />}
                        />
                        <Route path="LogosPage" element={<LogosPage />} />
                        <Route path="PostersPage" element={<PostersPage />} />
                        <Route
                            path="RecommendationsSection"
                            element={<RecommendationsSection />}
                        />
                        <Route
                            path="AllReviewsSeries"
                            element={<AllReviewsSeries />}
                        />
                        <Route
                            path="PostersSeasonsPage"
                            element={<PostersSeasonsPage />}
                        />
                        <Route
                            path="AllSeasonsVideos"
                            element={<AllSeasonsVideos />}
                        />
                        <Route
                            path="AllCastEpisodesPage"
                            element={<AllCastEpisodesPage />}
                        />

                        {/* Person */}
                        <Route path="PersonalInfo" element={<PersonalInfo />} />
                        <Route
                            path="AllPersonSeriesCast"
                            element={<AllPersonSeriesCast />}
                        />
                        <Route
                            path="AllPersonMoviesCast"
                            element={<AllPersonMoviesCast />}
                        />
                        <Route
                            path="AllPersonSeriesCrew"
                            element={<AllPersonSeriesCrew />}
                        />
                        <Route
                            path="AllPersonMoviesCrew"
                            element={<AllPersonMoviesCrew />}
                        />

                        {/* Not Found */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>

            {/* === Footer === */}
            <Footer />
        </div>
    );
}

export default App;
