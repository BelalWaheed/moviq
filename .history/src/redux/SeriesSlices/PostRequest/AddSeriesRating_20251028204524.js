import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddSeriesRating = createAsyncThunk(
    "AddSeriesRating",
    async ({ seriesId, rate }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/tv/${seriesId}/rating?session_id=${localStorage.getItem(
                    "sessionId"
                )}`,
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
    SeriesRatingDetails: 0,
    SeriesRatingLoading: false,
    SeriesRatingError: false
};

const SeriesRating = createSlice({
    name: "SeriesRating",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddSeriesRating.pending, (state, { payload }) => {
            state.SeriesRatingLoading = true;
        });
        builder.addCase(AddSeriesRating.fulfilled, (state, { payload }) => {
            state.SeriesRating = payload;

            state.SeriesRatingLoading = false;
        });
        builder.addCase(AddSeriesRating.rejected, (state, { payload }) => {
            state.SeriesRatingError = true;
            state.SeriesRatingLoading = false;
        });
    }
});

export const SeriesRatingReducer = SeriesRating.reducer;
