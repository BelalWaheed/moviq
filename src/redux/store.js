import { configureStore } from "@reduxjs/toolkit";
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetSeriesDetails";
import { mNowReducer } from "./HomeSlices/mNow";
import { mTopReducer } from "./HomeSlices/mTop";
import { tNowReducer } from "./HomeSlices/tNow";
import { tTopReducer } from "./HomeSlices/tTop";
import { movieDetailsReducer } from "./moviesSlices/getMovieDetails";

const store = configureStore({
  reducer: {
    seriesReducer,
    seriesDetailsReducer,
    mNowReducer,
    mTopReducer,
    tNowReducer,
    tTopReducer,
    movieDetailsReducer,
  },
});

export default store;
