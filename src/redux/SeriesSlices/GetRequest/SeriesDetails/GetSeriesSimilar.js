import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../../../pages/shared/safeSearch";

export const GetSeriesSimilar = createAsyncThunk(
    "GetSeriesSimilar",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/similar?language=en-US&page=1`,
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
    SeriesSimilarDetails: null,
    SeriesSimilarDetailsLoading: false,
    SeriesSimilarDetailsError: false
};

const SeriesSimilar = createSlice({
    name: "SeriesSimilar",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetSeriesSimilar.pending, (state, { payload }) => {
            state.SeriesSimilarDetailsLoading = true;
        });
        builder.addCase(GetSeriesSimilar.fulfilled, (state, { payload }) => {
            state.SeriesSimilarDetails = payload;

            state.SeriesSimilarDetailsLoading = false;
        });
        builder.addCase(GetSeriesSimilar.rejected, (state, { payload }) => {
            state.SeriesSimilarDetailsError = true;
            state.SeriesSimilarDetailsLoading = false;
        });
    }
});

export const SeriesSimilarReducer = SeriesSimilar.reducer;
