import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesWatchProviders = createAsyncThunk(
    "GetSeriesWatchProviders",
    async ({ seriesId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/watch/providers`,
                options
            );
            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    SeriesWatchProvidersDetails: null,
    SeriesWatchProvidersDetailsLoading: false,
    SeriesWatchProvidersDetailsError: false
};

const SeriesWatchProviders = createSlice({
    name: "SeriesWatchProviders",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesWatchProviders.pending,
            (state, { payload }) => {
                state.SeriesWatchProvidersDetailsLoading = true;
            }
        );
        builder.addCase(
            GetSeriesWatchProviders.fulfilled,
            (state, { payload }) => {
                state.SeriesWatchProvidersDetails = payload;

                state.SeriesWatchProvidersDetailsLoading = false;
            }
        );
        builder.addCase(
            GetSeriesWatchProviders.rejected,
            (state, { payload }) => {
                state.SeriesWatchProvidersDetailsError = true;
                state.SeriesWatchProvidersDetailsLoading = false;
            }
        );
    }
});

export const SeriesWatchProvidersReducer = SeriesWatchProviders.reducer;
