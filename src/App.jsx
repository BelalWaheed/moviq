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
import PersonalInfo from "./pages/shared/PersonDetails/PersonalInfo";
import AllPersonSeriesCast from "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonSeriesCast";
import AllPersonMoviesCast from "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonMoviesCast";
import AllPersonSeriesCrew from "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonSeriesCrew";
import AllPersonMoviesCrew from "./pages/shared/PersonDetails/AllPersonCombinedCredits/AllPersonMoviesCrew";
import AllCrewPage from "./pages/series/SeriesSeasons/AllCrewPage";

/* END ALL SERIES IMPORTS */

function App() {
    return (
        <div className=" bg-background-primary">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* START ALL SERIES ROUTES */}
                <Route path="series" element={<Series />} />
                <Route path="PersonalInfo" element={<PersonalInfo />} />
                <Route path="AllCastSeries" element={<AllCastSeries />} />
                <Route path="AllCrewPage" element={<AllCrewPage />} />
                <Route path="AllCrewSeries" element={<AllCrewSeries />} />
                <Route path="seriesDetails" element={<DetailsCard />} />
                <Route path="SeasonDetailsCast" element={<AllCastPage />} />
                <Route path="AllEpisode" element={<AllEpisodes />} />
                <Route path="SeasonDetails" element={<SeasonDetails />} />
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
