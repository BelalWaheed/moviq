import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetSeriesDetails";

const store = configureStore({
    reducer: { seriesReducer, seriesDetailsReducer }
});

export default store;
