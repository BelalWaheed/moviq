import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails.js";
import { mNowReducer } from "./HomeSlices/mNow";
import { mTopReducer } from "./HomeSlices/mTop";
import { tNowReducer } from "./HomeSlices/tNow";
import { tTopReducer } from "./HomeSlices/tTop";
import { movieDetailsReducer } from "./moviesSlices/getMovieDetails";
import { seriesTrailerReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer.js";
import { searchReducer } from "./HomeSlices/searcheSlice.js";
import { seriesSeasonsReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasons.js";
import { seriesSeasonsAggregateCreditsReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSesonsAggregateCredits.js";
import { SeriesAggregateCreditsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesAggregateCredits.js";
import { PersonReducer } from "./SharedSlices/GetRequest/Person/GetPersonDetails.js";
import { personCombinedCreditsReducer } from "./SharedSlices/GetRequest/Person/GetPersonCombinedCredits.js";
import { SeriesRecommendationsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesRecommendations.js";
import { SeriesExternalLinksReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesExternalLinks.js";
import { SeriesImagesDetailsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesImages.js";
import { SignInTokenReducer } from "./AuthSlices/RequestSingIn.js";
import { AccountInfoSliceReducer } from "./AuthSlices/AccountInfo.js";
import { RequestSignOutReducer } from "./AuthSlices/RequestSignOut.js";
import { SeriesSimilarReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesSimilar.js";

const store = configureStore({
    reducer: {
        seriesReducer,
        seriesDetailsReducer,
        seriesTrailerReducer,
        seriesSeasonsReducer,
        seriesSeasonsAggregateCreditsReducer,
        SeriesAggregateCreditsReducer,
        PersonReducer,
        personCombinedCreditsReducer,
        SeriesRecommendationsReducer,
        SeriesExternalLinksReducer,
        SeriesImagesDetailsReducer,
        SignInTokenReducer,
        AccountInfoSliceReducer,
        RequestSignOutReducer,
        SeriesSimilarReducer,

        mNowReducer,
        mTopReducer,
        tNowReducer,
        tTopReducer,
        movieDetailsReducer,
        searchReducer
    }
});

export default store;
