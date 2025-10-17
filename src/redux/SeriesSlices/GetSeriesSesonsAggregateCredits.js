import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesSeasonsAggregateCredits = createAsyncThunk(
    "GetSeriesSeasonsAggregateCredits",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/aggregate_credits?language=en-US`,
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
    seasonsAggregateCreditsDetails: null,
    seasonsAggregateCreditsDetailsLoading: false,
    seasonsAggregateCreditsDetailsError: false
};

const seriesSeasonsAggregateCredits = createSlice({
    name: "seriesSeasonsAggregateCredits",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesSeasonsAggregateCredits.pending,
            (state, { payload }) => {
                state.seasonsAggregateCreditsDetailsLoading = true;
            }
        );
        builder.addCase(
            GetSeriesSeasonsAggregateCredits.fulfilled,
            (state, { payload }) => {
                state.seasonsAggregateCreditsDetails = payload;

                state.seasonsAggregateCreditsDetailsLoading = false;
            }
        );
        builder.addCase(
            GetSeriesSeasonsAggregateCredits.rejected,
            (state, { payload }) => {
                state.seasonsAggregateCreditsDetailsError = true;
                state.seasonsAggregateCreditsDetailsLoading = false;
            }
        );
    }
});

export const seriesSeasonsAggregateCreditsReducer =
    seriesSeasonsAggregateCredits.reducer;
