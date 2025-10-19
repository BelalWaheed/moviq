import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetSeriesDetails";
import { mNowReducer } from "./HomeSlices/mNow";
import { mTopReducer } from "./HomeSlices/mTop";
import { tNowReducer } from "./HomeSlices/tNow";
import { tTopReducer } from "./HomeSlices/tTop";
import { movieDetailsReducer } from "./moviesSlices/getMovieDetails";
import { seriesTrailerReducer } from "./SeriesSlices/GetSeriesTrailer";
import { searchReducer } from "./HomeSlices/searcheSlice.js";
import { seriesSeasonsReducer } from "./SeriesSlices/GetSeriesSeasons.js";
import { seriesSeasonsAggregateCreditsReducer } from "./SeriesSlices/GetSeriesSesonsAggregateCredits.js";
import { SeriesAggregateCreditsReducer } from "./SeriesSlices/GetSeriesAggregateCredits.js";
import { PersonReducer } from "./SeriesSlices/GetPersonDetails.js";
import { personCombinedCreditsReducer } from "./SeriesSlices/GetPersonCombinedCredits.js";
import { SeriesRecommendationsReducer } from "./SeriesSlices/GetSeriesRecommendations.js";
import { SeriesExternalLinksReducer } from "./SeriesSlices/GetSeriesExternalLinks.js";

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

        mNowReducer,
        mTopReducer,
        tNowReducer,
        tTopReducer,
        movieDetailsReducer,
        searchReducer
    }
});

export default store;
