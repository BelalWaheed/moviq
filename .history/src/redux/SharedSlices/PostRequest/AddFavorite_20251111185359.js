import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddFavorite = createAsyncThunk(
    "AddFavorite",
    async (
        { media_type, media_id, favorite, accountId, sessionId },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                },
                body: JSON.stringify({
                    media_type,
                    media_id,
                    favorite
                })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`,
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
    SeriesRatingError: false,
    isRated: false
};

const SeriesRating = createSlice({
    name: "SeriesRating",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddFavorite.pending, (state, { payload }) => {
            state.SeriesRatingLoading = true;
        });
        builder.addCase(AddFavorite.fulfilled, (state, { payload }) => {
            state.SeriesRating = payload;
            state.isRated = true;

            state.SeriesRatingLoading = false;
        });
        builder.addCase(AddFavorite.rejected, (state, { payload }) => {
            state.SeriesRatingError = true;
            state.SeriesRatingLoading = false;
        });
    }
});

export const SeriesRatingReducer = SeriesRating.reducer;
