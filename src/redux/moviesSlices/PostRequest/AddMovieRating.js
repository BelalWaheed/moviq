import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddMovieRating = createAsyncThunk(
    "AddMovieRating",
    async ({ movieId, sessionId, rate }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: `{"value":${rate}}`
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`,
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
    MovieRatingDetails: null,
    MovieRatingLoading: false,
    MovieRatingError: false,
    isRated: false
};

const MovieRating = createSlice({
    name: "MovieRating",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddMovieRating.pending, (state, { payload }) => {
            state.MovieRatingLoading = true;
        });
        builder.addCase(AddMovieRating.fulfilled, (state, { payload }) => {
            state.MovieRatingDetails = payload;
            state.isRated = !state.isRated;

            state.MovieRatingLoading = false;
        });
        builder.addCase(AddMovieRating.rejected, (state, { payload }) => {
            state.MovieRatingError = true;
            state.MovieRatingLoading = false;
        });
    }
});

export const MovieRatingReducer = MovieRating.reducer;
