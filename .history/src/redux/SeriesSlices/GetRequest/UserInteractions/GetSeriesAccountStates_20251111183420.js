import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesAccountStates = createAsyncThunk(
    "GetSeriesAccountStates",
    async ({ seriesId, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
    name: "accountSeriesStates",
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
            }
        );
        builder.addCase(
            GetSeriesAccountStates.rejected,
            (state, { payload }) => {}
        );
    }
});

export const GetAccountSeriesStatesReducer = accountSeriesStates.reducer;
