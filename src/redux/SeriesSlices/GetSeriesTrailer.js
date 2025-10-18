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
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
    seriesTrailerData: [],
    seriesTrailerDataLoading: false,
    seriesTrailerDataError: false
};

const seriesTrailer = createSlice({
    name: "seriesTrailer",
    initialState,
    extraReducers: build => {
        build.addCase(getSeriesTrailer.pending, (state, { payload }) => {
            state.seriesTrailerDataLoading = true;
        });
        build.addCase(getSeriesTrailer.fulfilled, (state, { payload }) => {
            state.seriesTrailerDataLoading = false;
            if (payload && payload.results && payload.results.length > 0) {
                const lastTrailer = payload.results[payload.results.length - 1];
                state.seriesTrailerData = lastTrailer;
            } else {
                state.seriesTrailerData = null;
            }
        });

        build.addCase(getSeriesTrailer.rejected, (state, { payload }) => {
            state.seriesTrailerDataLoading = false;
            seriesTrailerDataError = true;
        });
    }
});

export const seriesTrailerReducer = seriesTrailer.reducer;
