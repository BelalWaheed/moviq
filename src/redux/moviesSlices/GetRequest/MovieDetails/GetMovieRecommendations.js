import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../../../pages/shared/safeSearch";

export const GetMovieRecommendations = createAsyncThunk(
    "GetMovieRecommendations",
    async ({ movieId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
                options
            );
            const response = await request.json();
            if (response.success === false) return rejectWithValue(response);
            const safeResults = safeFilter(response.results);
            return { ...response, results: safeResults };
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const MovieRecommendations = createSlice({
    name: "MovieRecommendations",
    initialState: {
        MovieRecommendationsDetails: null,
        MovieRecommendationsDetailsLoading: false,
        MovieRecommendationsDetailsError: false
    },
    extraReducers: builder => {
        builder
            .addCase(GetMovieRecommendations.pending, (state) => {
                state.MovieRecommendationsDetailsLoading = true;
            })
            .addCase(GetMovieRecommendations.fulfilled, (state, { payload }) => {
                state.MovieRecommendationsDetails = payload;
                state.MovieRecommendationsDetailsLoading = false;
            })
            .addCase(GetMovieRecommendations.rejected, (state) => {
                state.MovieRecommendationsDetailsError = true;
                state.MovieRecommendationsDetailsLoading = false;
            });
    }
});

export const MovieRecommendationsReducer = MovieRecommendations.reducer;
