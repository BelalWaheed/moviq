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
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
