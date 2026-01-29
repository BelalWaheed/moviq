import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeriesTrailer = createAsyncThunk(
    "getSeriesTrailer",
    async (id, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
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
    // trailer
    seriesTrailerData: null,
    seriesTrailerDataLoading: false,
    seriesTrailerDataError: false,
    // all videos
    seriesVideosData: [],
    seriesVideosDataLoading: false,
    seriesVideosDataError: false
};

const seriesTrailer = createSlice({
    name: "seriesTrailer",
    initialState,
    extraReducers: build => {
        build.addCase(getSeriesTrailer.pending, (state, { payload }) => {
            state.seriesTrailerDataLoading = true;
            state.seriesVideosDataLoading = true;
        });
        build.addCase(getSeriesTrailer.fulfilled, (state, { payload }) => {
            state.seriesTrailerDataLoading = false;
            state.seriesVideosDataLoading = false;
            if (payload && payload.results && payload.results.length > 0) {
                const lastTrailer = payload.results[payload.results.length - 1];
                state.seriesTrailerData = lastTrailer;
            } else {
                state.seriesTrailerData = null;
            }
            state.seriesVideosData = payload;
        });

        build.addCase(getSeriesTrailer.rejected, (state, { payload }) => {
            state.seriesTrailerDataLoading = false;
            state.seriesVideosDataLoading = false;
            state.seriesTrailerDataError = true;
            state.seriesVideosDataError = true;
        });
    }
});

export const seriesTrailerReducer = seriesTrailer.reducer;
