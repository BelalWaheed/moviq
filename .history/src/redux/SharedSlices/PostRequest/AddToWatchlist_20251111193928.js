import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddToWatchlist = createAsyncThunk(
    "AddToWatchlist",
    async (
        { media_type, media_id, watchlist, accountId, sessionId },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        console.log(watchlist);

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
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
            console.log(payload);

            state.watchlistLoading = false;
        });
        builder.addCase(AddToWatchlist.rejected, (state, { payload }) => {
            state.watchlistError = true;
            state.watchlistLoading = false;
        });
    }
});

export const watchlistReducer = watchlist.reducer;
