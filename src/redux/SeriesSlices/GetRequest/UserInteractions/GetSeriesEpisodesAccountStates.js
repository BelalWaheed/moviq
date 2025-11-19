import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesAccountStates = createAsyncThunk(
    "GetSeriesEpisodesAccountStates",
    async ({ seriesId, seasonNumber, episodeNumber, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
            }
        };
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states?session_id=${sessionId}`,
                options
            );
            const response = await request.json();

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    accountSeriesEpisodesStatesDetails: null
};

const accountSeriesEpisodesStates = createSlice({
    name: "accountSeriesEpisodesStates",
    initialState,
    extraReducers: builder => {
        builder.addCase(
            GetSeriesEpisodesAccountStates.pending,
            (state, { payload }) => {}
        );
        builder.addCase(
            GetSeriesEpisodesAccountStates.fulfilled,
            (state, { payload }) => {
                state.accountSeriesEpisodesStatesDetails = payload;
            }
        );
        builder.addCase(
            GetSeriesEpisodesAccountStates.rejected,
            (state, { payload }) => {}
        );
    }
});

export const GetaccountSeriesEpisodesStatesReducer =
    accountSeriesEpisodesStates.reducer;
