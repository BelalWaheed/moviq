import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesEpisodesImages = createAsyncThunk(
    "GetSeriesEpisodesImages",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
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
    SeriesEpisodesImages: null,
    SeriesEpisodesImagesLoading: false,
    SeriesEpisodesImagesError: false
};

const SeriesEpisodesImages = createSlice({
    name: "SeriesEpisodesImages",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesEpisodesImages.pending,
            (state, { payload }) => {
                state.SeriesEpisodesImagesLoading = true;
            }
        );
        builder.addCase(
            GetSeriesEpisodesImages.fulfilled,
            (state, { payload }) => {
                state.SeriesEpisodesImages = payload;

                state.SeriesEpisodesImagesLoading = false;
            }
        );
        builder.addCase(
            GetSeriesEpisodesImages.rejected,
            (state, { payload }) => {
                state.SeriesEpisodesImagesError = true;
                state.SeriesEpisodesImagesLoading = false;
            }
        );
    }
});

export const SeriesEpisodesImagesReducer = SeriesEpisodesImages.reducer;
