import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetSeriesExternalLinks = createAsyncThunk(
    "GetSeriesExternalLinks",
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
                `https://api.themoviedb.org/3/tv/${seriesId}/external_ids`,
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
    SeriesExternalLinksDetails: null,
    SeriesExternalLinksDetailsLoading: false,
    SeriesExternalLinksDetailsError: false
};

const SeriesExternalLinks = createSlice({
    name: "SeriesExternalLinks",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetSeriesExternalLinks.pending,
            (state, { payload }) => {
                state.SeriesExternalLinksDetailsLoading = true;
            }
        );
        builder.addCase(
            GetSeriesExternalLinks.fulfilled,
            (state, { payload }) => {
                state.SeriesExternalLinksDetails = payload;

                state.SeriesExternalLinksDetailsLoading = false;
            }
        );
        builder.addCase(
            GetSeriesExternalLinks.rejected,
            (state, { payload }) => {
                state.SeriesExternalLinksDetailsError = true;
                state.SeriesExternalLinksDetailsLoading = false;
            }
        );
    }
});

export const SeriesExternalLinksReducer = SeriesExternalLinks.reducer;
