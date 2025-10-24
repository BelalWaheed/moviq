import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../../../pages/shared/safeSearch";

export const GetSeriesRecommendations = createAsyncThunk(
    "GetSeriesRecommendations",
    async ({ seriesId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
