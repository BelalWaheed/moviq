import { createSlice as createSlice3, createAsyncThunk as createAsyncThunk3 } from "@reduxjs/toolkit";

export const GetMovieReviews = createAsyncThunk3(
    "GetMovieReviews",
    async ({ movieId, pageNumber = 1 }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=${pageNumber}`,
                options
            );
            const response = await request.json();
            if (response.success === false) return rejectWithValue(response);
            return response;
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const MovieReviews = createSlice3({
    name: "MovieReviews",
    initialState: {
        MovieReviewsDetails: null,
        MovieReviewsDetailsLoading: false,
        MovieReviewsDetailsError: false
    },
    extraReducers: builder => {
        builder
            .addCase(GetMovieReviews.pending, (state) => {
                state.MovieReviewsDetailsLoading = true;
            })
            .addCase(GetMovieReviews.fulfilled, (state, { payload }) => {
                state.MovieReviewsDetails = payload;
                state.MovieReviewsDetailsLoading = false;
            })
            .addCase(GetMovieReviews.rejected, (state) => {
                state.MovieReviewsDetailsError = true;
                state.MovieReviewsDetailsLoading = false;
            });
    }
});

export const MovieReviewsReducer = MovieReviews.reducer;