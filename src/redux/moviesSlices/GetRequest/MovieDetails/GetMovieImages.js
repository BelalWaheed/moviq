import { createSlice as createSlice4, createAsyncThunk as createAsyncThunk4 } from "@reduxjs/toolkit";

export const GetMovieImages = createAsyncThunk4(
    "GetMovieImages",
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
                `https://api.themoviedb.org/3/movie/${movieId}/images`,
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

const MovieImages = createSlice4({
    name: "MovieImages",
    initialState: {
        MovieImagesDetails: null,
        MovieImagesDetailsLoading: false,
        MovieImagesDetailsError: false
    },
    extraReducers: builder => {
        builder
            .addCase(GetMovieImages.pending, (state) => {
                state.MovieImagesDetailsLoading = true;
            })
            .addCase(GetMovieImages.fulfilled, (state, { payload }) => {
                state.MovieImagesDetails = payload;
                state.MovieImagesDetailsLoading = false;
            })
            .addCase(GetMovieImages.rejected, (state) => {
                state.MovieImagesDetailsError = true;
                state.MovieImagesDetailsLoading = false;
            });
    }
});

export const MovieImagesReducer = MovieImages.reducer;