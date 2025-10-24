import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const fetchMNow = createAsyncThunk(
  "m/now",
  async ({ page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      const req = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_bel}`,
        },
      });
      const res = await req.json();
      // filter  content
          const safeResults = safeFilter(res.results);
          return { ...res, results: safeResults };
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = { mNowList: [], mNIsLoading: false, mNError: null };

const mNowSlice = createSlice({
  name: "mNow",
  initialState,
  reducers: {
    resetMNow: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMNow.pending, (state) => {
        state.mNIsLoading = true;
        state.mNError = null;
      })
      .addCase(fetchMNow.fulfilled, (state, { payload }) => {
        state.mNowList = payload.results;
        state.mNIsLoading = false;
      })
      .addCase(fetchMNow.rejected, (state, { payload, error }) => {
        state.mNIsLoading = false;
        state.mNError = payload?.message || error?.message || "Unknown";
      }),
});

export const { resetMNow } = mNowSlice.actions;
export const mNowReducer = mNowSlice.reducer;
