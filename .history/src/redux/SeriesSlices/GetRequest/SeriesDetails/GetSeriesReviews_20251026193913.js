import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../../../pages/shared/safeSearch";

export const GetSeriesReviews = createAsyncThunk(
    "GetSeriesReviews",
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
    SeriesReviewsDetails: null,
    SeriesReviewsDetailsLoading: false,
    SeriesReviewsDetailsError: false
};

const SeriesReviews = createSlice({
    name: "SeriesReviews",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetSeriesReviews.pending, (state, { payload }) => {
            state.SeriesReviewsDetailsLoading = true;
        });
        builder.addCase(GetSeriesReviews.fulfilled, (state, { payload }) => {
            state.SeriesReviewsDetails = payload;

            state.SeriesReviewsDetailsLoading = false;
        });
        builder.addCase(GetSeriesReviews.rejected, (state, { payload }) => {
            state.SeriesReviewsDetailsError = true;
            state.SeriesReviewsDetailsLoading = false;
        });
    }
});

export const SeriesReviewsReducer = SeriesReviews.reducer;
