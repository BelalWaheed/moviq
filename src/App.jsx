import { Route, Routes } from "react-router-dom";
import Details from "./pages/details/Details";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import NotFound from "./pages/notFound/NotFound";
import Series from "./pages/series/Series";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import MovieDetailsCard from "./pages/movies/MovieDetailsCard";
import DetailsCard from "./pages/series/SeriesDetails/DetailsCard";
import SeasonDetails from "./pages/series/SeriesSeasons/SeasonDetails";
import AllCastPage from "./pages/series/SeriesSeasons/AllCastPage";

function App() {
    return (
        <div className=" bg-background-primary">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="SeasonDetailsCast" element={<AllCastPage />} />
                <Route path="SeasonDetails" element={<SeasonDetails />} />
                <Route path="movies" element={<Movies />} />
                <Route path="series" element={<Series />} />
                <Route path="seriesDetails" element={<DetailsCard />} />
                <Route path="moviedetails" element={<MovieDetailsCard />} />
                <Route path="details" element={<Details />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
