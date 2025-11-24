import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesVideos = createAsyncThunk(
    "GetSeriesEpisodesVideos",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos?language=en-US`,
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
    SeriesEpisodesVideos: null,
    SeriesEpisodesVideosLoading: false,
    SeriesEpisodesVideosError: false
};

const SeriesEpisodesVideos = createSlice({
    name: "SeriesEpisodesVideos",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesEpisodesVideos.pending,
            (state, { payload }) => {
                state.SeriesEpisodesVideosLoading = true;
            }
        );
        builder.addCase(
            GetSeriesEpisodesVideos.fulfilled,
            (state, { payload }) => {
                state.SeriesEpisodesVideos = payload;
                console.log(payload);

                state.SeriesEpisodesVideosLoading = false;
            }
        );
        builder.addCase(
            GetSeriesEpisodesVideos.rejected,
            (state, { payload }) => {
                state.SeriesEpisodesVideosError = true;
                state.SeriesEpisodesVideosLoading = false;
            }
        );
    }
});

export const SeriesEpisodesVideosReducer = SeriesEpisodesVideos.reducer;
