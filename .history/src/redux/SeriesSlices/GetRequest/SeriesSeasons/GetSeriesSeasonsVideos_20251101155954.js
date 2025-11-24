import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesSeasonsVideos = createAsyncThunk(
    "GetSeriesSeasonsVideos",
    async ({ seriesId, seasonId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonId}/videos?language=en-US`,
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
    // all videos
    SeriesSeasonsVideosData: [],
    SeriesSeasonsVideosDataLoading: false,
    SeriesSeasonsVideosDataError: false
};

const SeriesSeasonsVideos = createSlice({
    name: "SeriesSeasonsVideos",
    initialState,
    extraReducers: build => {
        build.addCase(GetSeriesSeasonsVideos.pending, (state, { payload }) => {
            state.SeriesSeasonsVideosDataLoading = true;
        });
        build.addCase(
            GetSeriesSeasonsVideos.fulfilled,
            (state, { payload }) => {
                state.SeriesSeasonsVideosDataLoading = false;

                state.SeriesSeasonsVideosData = payload;
            }
        );

        build.addCase(GetSeriesSeasonsVideos.rejected, (state, { payload }) => {
            state.SeriesSeasonsVideosDataLoading = false;

            state.SeriesSeasonsVideosDataError = true;
        });
    }
});

export const SeriesSeasonsVideosReducer = SeriesSeasonsVideos.reducer;
