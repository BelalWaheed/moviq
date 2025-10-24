import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const fetchTNow = createAsyncThunk(
  "t/now",
  async ({ page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`;
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

const initialState = { tNowList: [], tNisLoading: false, tNError: null };

const tNowSlice = createSlice({
  name: "tNow",
  initialState,
  reducers: {
    resetTNow: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTNow.pending, (state) => {
        state.tNisLoading = true;
        state.tNError = null;
      })
      .addCase(fetchTNow.fulfilled, (state, { payload }) => {
        state.tNowList = payload.results.filter((show) => show.adult === false);
        state.tNisLoading = false;
      })
      .addCase(fetchTNow.rejected, (state, { payload, error }) => {
        state.tNisLoading = false;
        state.tNError = payload?.message || error?.message || "Unknown";
      }),
});

export const { resetTNow } = tNowSlice;
export const tNowReducer = tNowSlice.reducer;
