import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovieVideos = createAsyncThunk(
    "GetMovieVideos",
    async (id, thunkAPI) => {
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
                `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                options
            );

            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }

            return response;
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    // trailer
    movieTrailerData: null,
    movieTrailerDataLoading: false,
    movieTrailerDataError: false,
    // all videos
    movieVideosData: [],
    movieVideosDataLoading: false,
    movieVideosDataError: false
};

const movieTrailer = createSlice({
    name: "movieTrailer",
    initialState,
    extraReducers: build => {
        build.addCase(GetMovieVideos.pending, state => {
            state.movieTrailerDataLoading = true;
            state.movieVideosDataLoading = true;
        });

        build.addCase(GetMovieVideos.fulfilled, (state, { payload }) => {
            state.movieTrailerDataLoading = false;
            state.movieVideosDataLoading = false;

            if (payload && payload.results && payload.results.length > 0) {
                const lastTrailer = payload.results[payload.results.length - 1];
                state.movieTrailerData = lastTrailer;
            } else {
                state.movieTrailerData = null;
            }

            state.movieVideosData = payload;
        });

        build.addCase(GetMovieVideos.rejected, state => {
            state.movieTrailerDataLoading = false;
            state.movieVideosDataLoading = false;
            state.movieTrailerDataError = true;
            state.movieVideosDataError = true;
        });
    }
});

export const MovieVideosReducer = movieTrailer.reducer;
