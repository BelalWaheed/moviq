import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovieCredits = createAsyncThunk(
    "GetMovieCredits",
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
                `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
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
    MovieCreditsDetails: null,
    MovieCreditsDetailsLoading: false,
    MovieCreditsDetailsError: false
};

const MovieCredits = createSlice({
    name: "MovieCredits",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetMovieCredits.pending, state => {
            state.MovieCreditsDetailsLoading = true;
        });
        builder.addCase(GetMovieCredits.fulfilled, (state, { payload }) => {
            state.MovieCreditsDetails = payload;
            state.MovieCreditsDetailsLoading = false;
        });
        builder.addCase(GetMovieCredits.rejected, state => {
            state.MovieCreditsDetailsError = true;
            state.MovieCreditsDetailsLoading = false;
        });
    }
});

export const MovieCreditsReducer = MovieCredits.reducer;
