import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetSeriesDetails";
import { seriesTrailerReducer } from "./SeriesSlices/GetSeriesTrailer";

const store = configureStore({
    reducer: { seriesReducer, seriesDetailsReducer, seriesTrailerReducer }
});

export default store;
