import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MovieLoader from "./pages/loading/MovieLoader";

// ========== Lazy Imports ==========
const Home = lazy(() => import("./pages/home/Home"));
const Movies = lazy(() => import("./pages/movies/Movies"));
const Series = lazy(() => import("./pages/series/Series"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const MovieDetailsCard = lazy(() => import("./pages/movies/MovieDetailsCard"));
const DetailsCard = lazy(() => import("./pages/series/SeriesDetails/DetailsCard"));
const SeasonDetails = lazy(() => import("./pages/series/SeriesSeasons/SeasonDetails"));
const AllCastPage = lazy(() => import("./pages/series/SeriesSeasons/AllCastPage"));
const AllEpisodes = lazy(() => import("./pages/series/SeriesEpisodes/AllEpisodes"));
const AllCastSeries = lazy(() => import("./pages/series/SeriesDetails/AllCastSeries"));
const AllCrewSeries = lazy(() => import("./pages/series/SeriesDetails/AllCrewSeries"));
const PersonalInfo = lazy(() => import("./pages/shared/PersonDetails/PersonalInfo"));

function App() {
  return (
    <div className="bg-background-primary min-h-screen flex flex-col">
      {/* === Header === */}
      <Header />

      {/* === Routes with Suspense Fallback === */}
      <main className="flex-1">
        <Suspense fallback={<MovieLoader />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Series */}
            <Route path="series" element={<Series />} />
            <Route path="seriesDetails" element={<DetailsCard />} />
            <Route path="SeasonDetails" element={<SeasonDetails />} />
            <Route path="SeasonDetailsCast" element={<AllCastPage />} />
            <Route path="AllEpisode" element={<AllEpisodes />} />
            <Route path="AllCastSeries" element={<AllCastSeries />} />
            <Route path="AllCrewSeries" element={<AllCrewSeries />} />

            {/* Personal Info */}
            <Route path="PersonalInfo" element={<PersonalInfo />} />

            {/* Movies */}
            <Route path="movies" element={<Movies />} />
            <Route path="moviedetails" element={<MovieDetailsCard />} />

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
