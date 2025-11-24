import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const fetchTopRatedMovies = createAsyncThunk(
  "topRated/fetchMovies",
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
      const safeResults = safeFilter(res.results);

      return safeResults;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchTopRatedTV = createAsyncThunk(
  "topRated/fetchTV",
  async ({ page = 1 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
      const req = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_bel}`,
        },
      });

      const res = await req.json();
      const safeResults = safeFilter(res.results);

      return safeResults.filter((show) => show.adult === false);
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

// ======================================================
// Initial State (as you requested)
// ======================================================
const initialState = {
  movies: {
    topMoviesList: [],
    topMoviesIsLoading: false,
    topMoviesError: null,
  },
  tvShows: {
    topTvList: [],
    topTvIsLoading: false,
    topTvError: null,
  },
};

// ======================================================
// Slice
// ======================================================
const topRatedSlice = createSlice({
  name: "topRated",
  initialState,
  reducers: {
    resetTopRated: () => initialState,
  },

  extraReducers: (builder) =>
    builder

      // ============================
      // Movies
      // ============================
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.movies.topMoviesIsLoading = true;
        state.movies.topMoviesError = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
        state.movies.topMoviesList = payload;
        state.movies.topMoviesIsLoading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, { payload, error }) => {
        state.movies.topMoviesIsLoading = false;
        state.movies.topMoviesError =
          payload?.message || error?.message || "Unknown Error";
      })

      // ============================
      // TV Shows
      // ============================
      .addCase(fetchTopRatedTV.pending, (state) => {
        state.tvShows.topTvIsLoading = true;
        state.tvShows.topTvError = null;
      })
      .addCase(fetchTopRatedTV.fulfilled, (state, { payload }) => {
        state.tvShows.topTvList = payload;
        state.tvShows.topTvIsLoading = false;
      })
      .addCase(fetchTopRatedTV.rejected, (state, { payload, error }) => {
        state.tvShows.topTvIsLoading = false;
        state.tvShows.topTvError =
          payload?.message || error?.message || "Unknown Error";
      }),
});

export const { resetTopRated } = topRatedSlice.actions;

export const topRatedReducer = topRatedSlice.reducer;
