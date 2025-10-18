import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MovieLoader from "./pages/loading/MovieLoader";

//  Lazy load all route components for code splitting
const Home = lazy(() => import("./pages/home/Home"));
const Movies = lazy(() => import("./pages/movies/Movies"));
const Series = lazy(() => import("./pages/series/Series"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const MovieDetailsCard = lazy(() => import("./pages/movies/MovieDetailsCard"));
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
const AllCastSeries = lazy(() =>
  import("./pages/series/SeriesDetails/AllCastSeries")
);

function App() {
  return (
    <div>
      <h2>hello</h2>
    </div>
  );
}

export default App;
