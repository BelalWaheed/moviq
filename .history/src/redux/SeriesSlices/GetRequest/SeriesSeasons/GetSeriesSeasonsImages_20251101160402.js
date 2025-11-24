import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesSeasonsImages = createAsyncThunk(
    "GetSeriesSeasonsImages",
    async ({ seriesId, seasonNumber }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/images`,
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
    SeriesSeasonsImagesDetails: null,
    SeriesSeasonsImagesDetailsLoading: false,
    SeriesSeasonsImagesDetailsError: false
};

const SeriesSeasonsImagesDetails = createSlice({
    name: "SeriesSeasonsImagesDetails",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesSeasonsImages.pending,
            (state, { payload }) => {
                state.SeriesSeasonsImagesDetailsLoading = true;
            }
        );
        builder.addCase(
            GetSeriesSeasonsImages.fulfilled,
            (state, { payload }) => {
                state.SeriesSeasonsImagesDetails = payload;
                console.log(payload);

                state.SeriesSeasonsImagesDetailsLoading = false;
            }
        );
        builder.addCase(
            GetSeriesSeasonsImages.rejected,
            (state, { payload }) => {
                state.SeriesSeasonsImagesDetailsError = true;
                state.SeriesSeasonsImagesDetailsLoading = false;
            }
        );
    }
});

export const SeriesSeasonsImagesDetailsReducer =
    SeriesSeasonsImagesDetails.reducer;
