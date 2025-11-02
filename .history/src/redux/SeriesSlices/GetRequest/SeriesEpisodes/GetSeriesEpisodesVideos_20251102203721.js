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
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
