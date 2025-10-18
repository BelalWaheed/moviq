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

const store = configureStore({
    reducer: {
        seriesReducer,
        seriesDetailsReducer,
        seriesSeasonsReducer,
        seriesSeasonsAggregateCreditsReducer,
        SeriesAggregateCreditsReducer,
        PersonReducer,
        personCombinedCreditsReducer,

        mNowReducer,
        mTopReducer,
        tNowReducer,
        tTopReducer,
        movieDetailsReducer,
        seriesTrailerReducer,
        searchReducer
    }
});

export default store;
