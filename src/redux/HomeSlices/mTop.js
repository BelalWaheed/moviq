import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMTop = createAsyncThunk(
    "m/top",
    async ({ page = 1 } = {}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
            const req = await fetch(url, {
                headers: {
                    accept: "application/json",
                    // Authorization: `Bearer ${import.meta.env.VITE_TMDB_bel}`
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                }
            });
            const res = await req.json();
            return res;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

const initialState = { mTopList: [], mTisLoading: false, mTError: null };

const mTopSlice = createSlice({
    name: "mTop",
    initialState,
    reducers: {
        resetMTop: () => initialState
    },
    extraReducers: builder =>
        builder
            .addCase(fetchMTop.pending, state => {
                state.mTisLoading = true;
                state.mTError = null;
            })
            .addCase(fetchMTop.fulfilled, (state, { payload }) => {
                state.mTopList = payload.results.filter(
                    movie => movie.adult === false || movie.id != 680
                );
                state.mTisLoading = false;
            })
            .addCase(fetchMTop.rejected, (state, { payload, error }) => {
                state.mTisLoading = false;
                state.mTError = payload?.message || error?.message || "Unknown";
            })
});

export const { resetMTop } = mTopSlice.actions;
export const mTopReducer = mTopSlice.reducer;
