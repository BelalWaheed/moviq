import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AccountInfo = createAsyncThunk(
    "AccountInfo",
    async (parameter, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/authentication/token/new?api_key=a2cd04b33ce3164e397311c0fdf1a793`
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
    AccountInfoDetails: null,
    AccountInfoDetailsLoading: false,
    AccountInfoDetailsError: false
};

const AccountInfoSlice = createSlice({
    name: "AccountInfoSlice",
    initialState,

    extraReducers: builder => {
        builder.addCase(AccountInfo.pending, state => {
            state.AccountInfoDetailsLoading = true;
        });
        builder.addCase(AccountInfo.fulfilled, (state, { payload }) => {
            state.AccountInfoDetails = payload;
            state.AccountInfoDetailsLoading = false;
        });
        builder.addCase(AccountInfo.rejected, state => {
            state.AccountInfoDetailsError = true;
            state.AccountInfoDetailsLoading = false;
        });
    }
});

export const AccountInfoSliceReducer = AccountInfoSlice.reducer;
