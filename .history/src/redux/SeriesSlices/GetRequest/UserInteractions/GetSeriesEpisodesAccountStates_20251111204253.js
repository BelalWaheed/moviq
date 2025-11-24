import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesAccountStates = createAsyncThunk(
    "GetSeriesEpisodesAccountStates",
    async ({ seriesId, seasonNumber, episodeNumber, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
            }
        };
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states?session_id=${sessionId}`,
                options
            );
            const response = await request.json();
            console.log(response);

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
