import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTTop = createAsyncThunk(
    "t/top",
    async ({ page = 1 } = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
            const req = await fetch(url, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_bel}`
                }
            });
            const res = await req.json();
            return res;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

const initialState = { tTopList: [], tTisLoading: false, tTError: null };

const tTopSlice = createSlice({
    name: "tTop",
    initialState,
    reducers: {
        resetTTop: () => initialState
    },
    extraReducers: builder =>
        builder
            .addCase(fetchTTop.pending, state => {
                state.tTisLoading = true;
                state.tTError = null;
            })
            .addCase(fetchTTop.fulfilled, (state, { payload }) => {
                state.tTopList = payload.results.filter(
                    show => show.adult === false
                );
                state.tTisLoading = false;
            })
            .addCase(fetchTTop.rejected, (state, { payload, error }) => {
                state.tTisLoading = false;
                state.tTError = payload?.message || error?.message || "Unknown";
            })
});

export const tTopReducer = tTopSlice.reducer;
export const { resetTTop } = tTopSlice.actions;
