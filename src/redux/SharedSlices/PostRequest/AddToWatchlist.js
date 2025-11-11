import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddToWatchlist = createAsyncThunk(
    "AddToWatchlist",
    async (
        { media_type, media_id, watchlist, accountId, sessionId },
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
                    watchlist
                })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`,
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
    watchlistDetails: null,
    watchlistLoading: false,
    watchlistError: false
};

const watchlist = createSlice({
    name: "watchlist",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddToWatchlist.pending, (state, { payload }) => {
            state.watchlistLoading = true;
        });
        builder.addCase(AddToWatchlist.fulfilled, (state, { payload }) => {
            state.watchlistDetails = payload;

            state.watchlistLoading = false;
        });
        builder.addCase(AddToWatchlist.rejected, (state, { payload }) => {
            state.watchlistError = true;
            state.watchlistLoading = false;
        });
    }
});

export const watchlistReducer = watchlist.reducer;
