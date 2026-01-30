import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovieWatchProviders = createAsyncThunk(
    "GetMovieWatchProviders",
    async ({ movieId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
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
    MovieWatchProvidersDetails: null,
    MovieWatchProvidersDetailsLoading: false,
    MovieWatchProvidersDetailsError: false
};

const MovieWatchProviders = createSlice({
    name: "MovieWatchProviders",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetMovieWatchProviders.pending,
            (state, { payload }) => {
                state.MovieWatchProvidersDetailsLoading = true;
                state.MovieWatchProvidersDetails = null;
            }
        );
        builder.addCase(
            GetMovieWatchProviders.fulfilled,
            (state, { payload }) => {
                state.MovieWatchProvidersDetails = payload;
                state.MovieWatchProvidersDetailsLoading = false;
            }
        );
        builder.addCase(
            GetMovieWatchProviders.rejected,
            (state, { payload }) => {
                state.MovieWatchProvidersDetailsError = true;
                state.MovieWatchProvidersDetailsLoading = false;
            }
        );
    }
});

export const MovieWatchProvidersReducer = MovieWatchProviders.reducer;
