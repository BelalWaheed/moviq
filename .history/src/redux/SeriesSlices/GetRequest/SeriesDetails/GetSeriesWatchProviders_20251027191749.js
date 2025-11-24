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
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
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
            console.log(Object.keys(response?.results));

            return response;
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
