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
const AllCrewEpisodesSeries = lazy(() =>
    import("./pages/series/SeriesEpisodes/AllCrewEpisodesSeries")
);
const AllGuestStarsEpisodesPage = lazy(() =>
    import("./pages/series/SeriesEpisodes/AllGuestStarsEpisodesPage")
);
const AllEpisodesVideos = lazy(() =>
    import("./pages/series/SeriesEpisodes/AllEpisodesVideos")
);
const StillsEpisodesPage = lazy(() =>
    import("./pages/series/SeriesEpisodes/StillsEpisodesPage")
);
const AllCrewSeries = lazy(() =>
    import("./pages/series/SeriesDetails/AllCrewSeries")
);
const AllCrewPage = lazy(() =>
    import("./pages/series/SeriesSeasons/AllCrewPage")
);
const RecommendationsSection = lazy(() =>
    import("./pages/series/SeriesDetails/Sections/RecommendationsSection")
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
const AllReviewsMovie = lazy(() => import("./pages/movies/AllReviewsMovie"));
const MovieBackdropsPage = lazy(() => import("./pages/movies/MovieImages/MovieBackdropsPage"));
const MoviePostersPage = lazy(() => import("./pages/movies/MovieImages/MoviePostersPage"));

// Profile
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

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
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/movie/:id" element={<MovieDetailsCard />} />
                        <Route path="/movie/:id/cast" element={<AllCastMovie />} />
                        <Route path="/movie/:id/crew" element={<AllCrewMovie />} />
                        <Route path="/movie/:id/reviews" element={<AllReviewsMovie />} />
                        <Route path="/movie/:id/backdrops" element={<MovieBackdropsPage />} />
                        <Route path="/movie/:id/posters" element={<MoviePostersPage />} />

                        {/* Series */}
                        <Route path="/series" element={<Series />} />
                        <Route path="/series/:id" element={<DetailsCard />} />
                        <Route path="/series/:seriesId/cast" element={<AllCastSeries />} />
                        <Route path="/series/:seriesId/crew" element={<AllCrewSeries />} />
                        <Route path="/series/:seriesId/reviews" element={<AllReviewsSeries />} />
                        <Route path="/series/:seriesId/recommendations" element={<RecommendationsSection />} />
                        <Route path="/series/:seriesId/backdrops" element={<BackdropsPage />} />
                        <Route path="/series/:seriesId/logos" element={<LogosPage />} />
                        <Route path="/series/:seriesId/posters" element={<PostersPage />} />

                        {/* Seasons */}
                        <Route path="/series/:seriesId/season/:seasonNumber" element={<SeasonDetails />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/cast" element={<AllCastPage />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/crew" element={<AllCrewPage />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episodes" element={<AllEpisodes />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/posters" element={<PostersSeasonsPage />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/videos" element={<AllSeasonsVideos />} />

                        {/* Episodes */}
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber" element={<EpisodeCard />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber/cast" element={<AllCastEpisodesPage />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber/crew" element={<AllCrewEpisodesSeries />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber/guests" element={<AllGuestStarsEpisodesPage />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber/videos" element={<AllEpisodesVideos />} />
                        <Route path="/series/:seriesId/season/:seasonNumber/episode/:episodeNumber/stills" element={<StillsEpisodesPage />} />

                        {/* Person */}
                        <Route path="/person/:id" element={<PersonalInfo />} />
                        <Route path="/person/:id/series/cast" element={<AllPersonSeriesCast />} />
                        <Route path="/person/:id/movies/cast" element={<AllPersonMoviesCast />} />
                        <Route path="/person/:id/series/crew" element={<AllPersonSeriesCrew />} />
                        <Route path="/person/:id/movies/crew" element={<AllPersonMoviesCrew />} />

                        {/* Profile */}
                        <Route path="/profile" element={<ProfilePage />} />

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
