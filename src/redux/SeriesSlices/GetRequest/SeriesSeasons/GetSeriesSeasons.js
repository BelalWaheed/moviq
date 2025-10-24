import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesSeasons = createAsyncThunk(
    "GetSeriesSeasons",
    async ({ seriesId, seasonNumber }, thunkAPI) => {
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
