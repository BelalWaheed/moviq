import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RequestSingIn = createAsyncThunk(
    "RequestSingIn",
    async (parameter, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                }
            };
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
    RequestSingInDetails: null,
    RequestSingInDetailsLoading: false,
    RequestSingInDetailsError: false
};

const SignInToken = createSlice({
    name: "SignInToken",
    initialState,

    extraReducers: builder => {
        builder.addCase(RequestSingIn.pending, state => {
            state.RequestSingInDetailsLoading = true;
        });
        builder.addCase(RequestSingIn.fulfilled, (state, { payload }) => {
            state.RequestSingInDetails = payload;
            state.RequestSingInDetailsLoading = false;
        });
        builder.addCase(RequestSingIn.rejected, state => {
            state.RequestSingInDetailsError = true;
            state.RequestSingInDetailsLoading = false;
        });
    }
});

export const SignInTokenReducer = SignInToken.reducer;
