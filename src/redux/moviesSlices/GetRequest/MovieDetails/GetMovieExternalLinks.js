import { createSlice as createSlice5, createAsyncThunk as createAsyncThunk5 } from "@reduxjs/toolkit";

export const GetMovieExternalLinks = createAsyncThunk5(
    "GetMovieExternalLinks",
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
                `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
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

const MovieExternalLinks = createSlice5({
    name: "MovieExternalLinks",
    initialState: {
        MovieExternalLinksDetails: null,
        MovieExternalLinksDetailsLoading: false,
        MovieExternalLinksDetailsError: false
    },
    extraReducers: builder => {
        builder
            .addCase(GetMovieExternalLinks.pending, (state) => {
                state.MovieExternalLinksDetailsLoading = true;
            })
            .addCase(GetMovieExternalLinks.fulfilled, (state, { payload }) => {
                state.MovieExternalLinksDetails = payload;
                state.MovieExternalLinksDetailsLoading = false;
            })
            .addCase(GetMovieExternalLinks.rejected, (state) => {
                state.MovieExternalLinksDetailsError = true;
                state.MovieExternalLinksDetailsLoading = false;
            });
    }
});

export const MovieExternalLinksReducer = MovieExternalLinks.reducer;