import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import NotFound from "./pages/notFound/NotFound";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import MovieDetailsCard from "./pages/movies/MovieDetailsCard";

/* START ALL SERIES IMPORTS */
import DetailsCard from "./pages/series/SeriesDetails/DetailsCard";
import SeasonDetails from "./pages/series/SeriesSeasons/SeasonDetails";
import AllCastPage from "./pages/series/SeriesSeasons/AllCastPage";
import AllEpisodes from "./pages/series/SeriesEpisodes/AllEpisodes";
import Series from "./pages/series/Series";
import AllCastSeries from "./pages/series/SeriesDetails/AllCastSeries";
import AllCrewSeries from "./pages/series/SeriesDetails/AllCrewSeries";
/* END ALL SERIES IMPORTS */

function App() {
    return (
        <div className=" bg-background-primary">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* START ALL SERIES ROUTES */}
                <Route path="series" element={<Series />} />
                <Route path="AllCastSeries" element={<AllCastSeries />} />
                <Route path="AllCrewSeries" element={<AllCrewSeries />} />
                <Route path="seriesDetails" element={<DetailsCard />} />
                <Route path="SeasonDetailsCast" element={<AllCastPage />} />
                <Route path="AllEpisode" element={<AllEpisodes />} />
                <Route path="SeasonDetails" element={<SeasonDetails />} />
                {/* END ALL SERIES ROUTES */}

                <Route path="movies" element={<Movies />} />
                <Route path="moviedetails" element={<MovieDetailsCard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
