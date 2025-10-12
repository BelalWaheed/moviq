import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeriesDetails = createAsyncThunk(
    "/seriesDetails",
    async (id, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
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
    selectedSeriesDetails: null,
    detailsLoading: false,
    detailsError: false
};

const seriesDetails = createSlice({
    name: "seriesDetails",
    initialState,
    extraReducers: builder => {
        builder.addCase(getSeriesDetails.pending, (state, { payload }) => {
            state.detailsLoading = true;
        });
        builder.addCase(getSeriesDetails.fulfilled, (state, { payload }) => {
            state.selectedSeriesDetails = payload;
            state.detailsLoading = false;
        });
        builder.addCase(getSeriesDetails.rejected, (state, { payload }) => {
            state.detailsLoading = false;
            state.detailsError = true;
        });
    }
});

export const seriesDetailsReducer = seriesDetails.reducer;
