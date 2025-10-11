import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeries = createAsyncThunk(
    "/series",
    async ({ pageNumber, type = "airing_today" }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            console.log(pageNumber);

            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${type}?language=en-US&page=${pageNumber}`,
                options
            );

            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const initialState = {
    seriesList: [],
    seriesLoading: false,
    test: false
};

const series = createSlice({
    name: "series",
    initialState,

    extraReducers: builder => {
        builder.addCase(getSeries.pending, (state, { payload }) => {
            state.seriesLoading = true;
        });
        builder.addCase(getSeries.fulfilled, (state, { payload }) => {
            state.seriesList = payload.results;
            state.seriesLoading = false;
        });
        builder.addCase(getSeries.rejected, (state, { payload }) => {
            state.seriesLoading = false;
            console.log("failed");
        });
    }
});

export const seriesReducer = series.reducer;
