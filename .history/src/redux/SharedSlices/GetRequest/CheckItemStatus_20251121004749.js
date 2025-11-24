import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CheckItemStatus = createAsyncThunk(
    "CheckItemStatus",
    async ({ listId, mediaId }, thunkAPI) => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/list/${listId}/item_status?movie_id=${mediaId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_TMDB_v3_omar
                        }`,
                        accept: "application/json"
                    }
                }
            );

            const data = await res.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const CheckItemStatusSlice = createSlice({
    name: "CheckItemStatusSlice",
    initialState: {
        statusData: null,
        loading: false,
        error: null
    },
    extraReducers: builder => {
        builder
            .addCase(CheckItemStatus.pending, state => {
                state.loading = true;
            })
            .addCase(CheckItemStatus.fulfilled, (state, action) => {
                state.statusData = action.payload;
                state.loading = false;
            })
            .addCase(CheckItemStatus.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const CheckItemStatusReducer = CheckItemStatusSlice.reducer;
