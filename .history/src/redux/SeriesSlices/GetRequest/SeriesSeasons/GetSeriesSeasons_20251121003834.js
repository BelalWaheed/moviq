import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesSeasons = createAsyncThunk(
    "GetSeriesSeasons",
    async ({ seriesId, seasonNumber }, thunkAPI) => {
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`,
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
    seasonDetails: null,
    seasonDetailsLoading: false,
    seasonDetailsError: false
};

const seriesSeasons = createSlice({
    name: "seriesSeasons",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetSeriesSeasons.pending, (state, { payload }) => {
            state.seasonDetailsLoading = true;
        });
        builder.addCase(GetSeriesSeasons.fulfilled, (state, { payload }) => {
            state.seasonDetails = payload;

            state.seasonDetailsLoading = false;
        });
        builder.addCase(GetSeriesSeasons.rejected, (state, { payload }) => {
            state.seasonDetailsError = true;
            state.seasonDetailsLoading = false;
        });
    }
});

export const seriesSeasonsReducer = seriesSeasons.reducer;
