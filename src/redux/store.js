import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";

const store = configureStore({
    reducer: { seriesReducer }
});

export default store;
