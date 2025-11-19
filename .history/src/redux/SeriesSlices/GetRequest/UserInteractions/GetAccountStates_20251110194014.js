import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetaccountSeriesStates = createAsyncThunk(
    "GetaccountSeriesStates",
    async ({ parameter }, thunkAPI) => {
        try {
        } catch (error) {}
    }
);

const initialState = {};

const accountSeriesStates = createSlice({
    key: "accountSeriesStates",
    initialState,
    extraReducers: builder => {
        builder.addCase(
            GetaccountSeriesStates.fulfilled,
            (state, payload) => {}
        );
    }
});
