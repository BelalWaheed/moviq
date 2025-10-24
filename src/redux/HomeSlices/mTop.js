import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const fetchMTop = createAsyncThunk(
  "m/top",
  async ({ page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
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

const initialState = { mTopList: [], mTisLoading: false, mTError: null };

const mTopSlice = createSlice({
  name: "mTop",
  initialState,
  reducers: {
    resetMTop: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMTop.pending, (state) => {
        state.mTisLoading = true;
        state.mTError = null;
      })
      .addCase(fetchMTop.fulfilled, (state, { payload }) => {
        state.mTopList = payload.results;
        state.mTisLoading = false;
      })
      .addCase(fetchMTop.rejected, (state, { payload, error }) => {
        state.mTisLoading = false;
        state.mTError = payload?.message || error?.message || "Unknown";
      }),
});

export const { resetMTop } = mTopSlice.actions;
export const mTopReducer = mTopSlice.reducer;
