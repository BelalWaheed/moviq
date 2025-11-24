import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesCredits = createAsyncThunk(
    "GetSeriesEpisodesCredits",
    async ({ seriesId, seasonNumber, episodeNumber }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`,
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
    SeriesEpisodesCreditsData: null,
    SeriesEpisodesCreditsDataLoading: false,
    SeriesEpisodesCreditsDataError: false
};

const SeriesEpisodesCreditsData = createSlice({
    name: "SeriesEpisodesCreditsData",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesEpisodesCredits.pending,
            (state, { payload }) => {
                state.SeriesEpisodesCreditsDataLoading = true;
            }
        );
        builder.addCase(
            GetSeriesEpisodesCredits.fulfilled,
            (state, { payload }) => {
                state.SeriesEpisodesCreditsData = payload;
                console.log(payload);

                state.SeriesEpisodesCreditsDataLoading = false;
            }
        );
        builder.addCase(
            GetSeriesEpisodesCredits.rejected,
            (state, { payload }) => {
                state.SeriesEpisodesCreditsDataError = true;
                state.SeriesEpisodesCreditsDataLoading = false;
            }
        );
    }
});

export const SeriesEpisodesCreditsDataReducer =
    SeriesEpisodesCreditsData.reducer;
