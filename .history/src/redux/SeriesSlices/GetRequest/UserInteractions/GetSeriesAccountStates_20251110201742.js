import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesAccountStates = createAsyncThunk(
    "GetSeriesAccountStates",
    async ({ seriesId, sessionId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/account_states?session_id=${sessionId}`,
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
    accountSeriesStatesDetails: null
};

const accountSeriesStates = createSlice({
    key: "accountSeriesStates",
    initialState,
    extraReducers: builder => {
        builder.addCase(
            GetSeriesAccountStates.pending,
            (state, { payload }) => {}
        );
        builder.addCase(
            GetSeriesAccountStates.fulfilled,
            (state, { payload }) => {
                state.accountSeriesStatesDetails = payload;
                console.log(payload);
            }
        );
        builder.addCase(
            GetSeriesAccountStates.rejected,
            (state, { payload }) => {}
        );
    }
});

export const GetAccountSeriesStatesReducer = accountSeriesStates.reducer;
