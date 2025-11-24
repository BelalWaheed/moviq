import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesDetails = createAsyncThunk(
    "GetSeriesEpisodesDetails",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`,
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
    SeriesEpisodesData: null,
    SeriesEpisodesDataLoading: false,
    SeriesEpisodesDataError: false
};

const SeriesEpisodesData = createSlice({
    name: "SeriesEpisodesData",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesEpisodesDetails.pending,
            (state, { payload }) => {
                state.SeriesEpisodesDataLoading = true;
            }
        );
        builder.addCase(
            GetSeriesEpisodesDetails.fulfilled,
            (state, { payload }) => {
                state.SeriesEpisodesData = payload;
                console.log(payload);

                state.SeriesEpisodesDataLoading = false;
            }
        );
        builder.addCase(
            GetSeriesEpisodesDetails.rejected,
            (state, { payload }) => {
                state.SeriesEpisodesDataError = true;
                state.SeriesEpisodesDataLoading = false;
            }
        );
    }
});

export const SeriesEpisodesDataReducer = SeriesEpisodesData.reducer;
