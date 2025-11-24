import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RequestSingIn = createAsyncThunk(
    "RequestSingIn",
    async thunkAPI => {
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
                `https://api.themoviedb.org/3/authentication/token/new?api_key=${options.headers.Authorization}`,
                options
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
    SeriesAggregateCreditsDetails: null,
    SeriesAggregateCreditsDetailsLoading: false,
    SeriesAggregateCreditsDetailsError: false
};

const SeriesAggregateCredits = createSlice({
    name: "SeriesAggregateCredits",
    initialState,

    extraReducers: builder => {
        builder.addCase(RequestSingIn.pending, (state, { payload }) => {
            state.SeriesAggregateCreditsDetailsLoading = true;
        });
        builder.addCase(RequestSingIn.fulfilled, (state, { payload }) => {
            state.SeriesAggregateCreditsDetails = payload;

            state.SeriesAggregateCreditsDetailsLoading = false;
        });
        builder.addCase(RequestSingIn.rejected, (state, { payload }) => {
            state.SeriesAggregateCreditsDetailsError = true;
            state.SeriesAggregateCreditsDetailsLoading = false;
        });
    }
});

export const SeriesAggregateCreditsReducer = SeriesAggregateCredits.reducer;
