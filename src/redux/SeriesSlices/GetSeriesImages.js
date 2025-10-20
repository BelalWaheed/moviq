import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesImages = createAsyncThunk(
    "GetSeriesImages",
    async ({ seriesId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/images`,
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
    SeriesImagesDetails: null,
    SeriesImagesDetailsLoading: false,
    SeriesImagesDetailsError: false
};

const SeriesImagesDetails = createSlice({
    name: "SeriesImagesDetails",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetSeriesImages.pending, (state, { payload }) => {
            state.SeriesImagesDetailsLoading = true;
        });
        builder.addCase(GetSeriesImages.fulfilled, (state, { payload }) => {
            state.SeriesImagesDetails = payload;

            state.SeriesImagesDetailsLoading = false;
        });
        builder.addCase(GetSeriesImages.rejected, (state, { payload }) => {
            state.SeriesImagesDetailsError = true;
            state.SeriesImagesDetailsLoading = false;
        });
    }
});

export const SeriesImagesDetailsReducer = SeriesImagesDetails.reducer;
