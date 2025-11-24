import {
    createSlice as createSlice4,
    createAsyncThunk as createAsyncThunk4
} from "@reduxjs/toolkit";

export const GetMovieImages = createAsyncThunk4(
    "GetMovieImages",
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
            .addCase(GetMovieImages.pending, state => {
                state.MovieImagesDetailsLoading = true;
            })
            .addCase(GetMovieImages.fulfilled, (state, { payload }) => {
                state.MovieImagesDetails = payload;
                state.MovieImagesDetailsLoading = false;
            })
            .addCase(GetMovieImages.rejected, state => {
                state.MovieImagesDetailsError = true;
                state.MovieImagesDetailsLoading = false;
            });
    }
});

export const MovieImagesReducer = MovieImages.reducer;
