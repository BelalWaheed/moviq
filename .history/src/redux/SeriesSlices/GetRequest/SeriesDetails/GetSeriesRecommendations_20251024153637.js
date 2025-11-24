import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const GetSeriesRecommendations = createAsyncThunk(
    "GetSeriesRecommendations",
    async ({ seriesId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?language=en-US&page=1`,
                options
            );
            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }
            // filter  content
            const safeResults = safeFilter(response.results);
            return { ...response, results: safeResults };
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    SeriesRecommendationsDetails: null,
    SeriesRecommendationsDetailsLoading: false,
    SeriesRecommendationsDetailsError: false
};

const SeriesRecommendations = createSlice({
    name: "SeriesRecommendations",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesRecommendations.pending,
            (state, { payload }) => {
                state.SeriesRecommendationsDetailsLoading = true;
            }
        );
        builder.addCase(
            GetSeriesRecommendations.fulfilled,
            (state, { payload }) => {
                state.SeriesRecommendationsDetails = payload;

                state.SeriesRecommendationsDetailsLoading = false;
            }
        );
        builder.addCase(
            GetSeriesRecommendations.rejected,
            (state, { payload }) => {
                state.SeriesRecommendationsDetailsError = true;
                state.SeriesRecommendationsDetailsLoading = false;
            }
        );
    }
});

export const SeriesRecommendationsReducer = SeriesRecommendations.reducer;
