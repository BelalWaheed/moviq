import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetRatedSeries = createAsyncThunk(
    "GetRatedSeries",
    async ({ accountId, page = 2, sessionId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/account/${accountId}/rated/tv?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc'`,
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
    RatedSeriesDetails: null,
    RatedSeriesDetailsLoading: false,
    RatedSeriesDetailsError: false
};

const RatedSeries = createSlice({
    name: "RatedSeries",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetRatedSeries.pending, (state, { payload }) => {
            state.RatedSeriesDetailsLoading = true;
        });
        builder.addCase(GetRatedSeries.fulfilled, (state, { payload }) => {
            state.RatedSeriesDetails = payload;

            state.RatedSeriesDetailsLoading = false;
        });
        builder.addCase(GetRatedSeries.rejected, (state, { payload }) => {
            state.RatedSeriesDetailsError = true;
            state.RatedSeriesDetailsLoading = false;
        });
    }
});

export const RatedSeriesReducer = RatedSeries.reducer;
