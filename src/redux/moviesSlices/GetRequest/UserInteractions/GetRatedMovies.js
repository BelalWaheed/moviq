import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetRatedMovies = createAsyncThunk(
    "GetRatedMovies",
    async ({ accountId, page = 1, sessionId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`,
                options
            );
            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }

            // return response
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    RatedMoviesDetails: null,
    RatedMoviesDetailsLoading: false,
    RatedMoviesDetailsError: false
};

const RatedMovies = createSlice({
    name: "RatedMovies",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetRatedMovies.pending, (state, { payload }) => {
            state.RatedMoviesDetailsLoading = true;
        });
        builder.addCase(GetRatedMovies.fulfilled, (state, { payload }) => {
            state.RatedMoviesDetails = payload;

            state.RatedMoviesDetailsLoading = false;
        });
        builder.addCase(GetRatedMovies.rejected, (state, { payload }) => {
            state.RatedMoviesDetailsError = true;
            state.RatedMoviesDetailsLoading = false;
        });
    }
});

export const RatedMoviesReducer = RatedMovies.reducer;
