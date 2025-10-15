import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchMulti = createAsyncThunk(
  "search/multi",
  async ({ query, page = 1 }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=en-US&page=${page}&include_adult=false`;
      const req = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_bel}`,
        },
      });
      const res = await req.json();
      return res;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  searchResults: [],
  searchQuery: "",
  isSearching: false,
  searchError: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearch: () => initialState,
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(searchMulti.pending, (state) => {
        state.isSearching = true;
        state.searchError = null;
      })
      .addCase(searchMulti.fulfilled, (state, { payload }) => {
        state.searchResults = payload.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        state.isSearching = false;
      })
      .addCase(searchMulti.rejected, (state, { payload, error }) => {
        state.isSearching = false;
        state.searchError = payload?.message || error?.message || "Unknown";
      }),
});

export const { resetSearch, setSearchQuery, clearSearchResults } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
