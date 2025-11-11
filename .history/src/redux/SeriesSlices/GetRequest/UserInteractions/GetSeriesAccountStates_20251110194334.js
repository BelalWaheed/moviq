import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesAccountStates = createAsyncThunk(
    "GetSeriesAccountStates",
    async ({ parameter }, thunkAPI) => {
        try {
        } catch (error) {}
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
            }
        );
        builder.addCase(
            GetSeriesAccountStates.rejected,
            (state, { payload }) => {}
        );
    }
});
