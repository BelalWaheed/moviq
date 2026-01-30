import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovieAccountStates = createAsyncThunk(
    "GetMovieAccountStates",
    async ({ movieId, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
            }
        };
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/account_states?session_id=${sessionId}`,
                options
            );
            const response = await request.json();

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    accountMovieStatesDetails: null
};

const accountMovieStates = createSlice({
    name: "accountMovieStates",
    initialState,
    extraReducers: builder => {
        builder.addCase(
            GetMovieAccountStates.pending,
            (state, { payload }) => {
                state.accountMovieStatesDetails = null;
            }
        );
        builder.addCase(
            GetMovieAccountStates.fulfilled,
            (state, { payload }) => {
                state.accountMovieStatesDetails = payload;
            }
        );
        builder.addCase(
            GetMovieAccountStates.rejected,
            (state, { payload }) => {}
        );
    }
});

export const GetAccountMovieStatesReducer = accountMovieStates.reducer;
