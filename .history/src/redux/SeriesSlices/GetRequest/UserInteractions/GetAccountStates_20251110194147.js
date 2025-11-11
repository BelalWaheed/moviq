import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetaccountSeriesStates = createAsyncThunk(
    "GetaccountSeriesStates",
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
            GetaccountSeriesStates.pending,
            (state, { payload }) => {}
        );
        builder.addCase(
            GetaccountSeriesStates.fulfilled,
            (state, { payload }) => {
                state.accountSeriesStatesDetails = payload;
            }
        );
        builder.addCase(
            GetaccountSeriesStates.rejected,
            (state, { payload }) => {}
        );
    }
});
