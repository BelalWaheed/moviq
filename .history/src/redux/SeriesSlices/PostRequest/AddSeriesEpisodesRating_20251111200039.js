import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddSeriesEpisodesRating = createAsyncThunk(
    "AddSeriesEpisodesRating",
    async (
        { seriesId, seasonNumber, episodeNumber, sessionId, rate },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: `{"value":${rate}}`
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/rating?session_id=c`,
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
    episodesRatingDetails: 0,
    episodesRatingLoading: false,
    episodesRatingError: false,
    isRated: false
};

const episodesRating = createSlice({
    name: "episodesRating",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            AddSeriesEpisodesRating.pending,
            (state, { payload }) => {
                state.episodesRatingLoading = true;
            }
        );
        builder.addCase(
            AddSeriesEpisodesRating.fulfilled,
            (state, { payload }) => {
                state.episodesRating = payload;
                state.isRated = true;

                state.episodesRatingLoading = false;
            }
        );
        builder.addCase(
            AddSeriesEpisodesRating.rejected,
            (state, { payload }) => {
                state.episodesRatingError = true;
                state.episodesRatingLoading = false;
            }
        );
    }
});

export const episodesRatingReducer = episodesRating.reducer;
