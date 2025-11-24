import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const fetchNowPlayingMovies = createAsyncThunk(
  "nowPlaying/fetchMovies",
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
      const safeResults = safeFilter(res.results);

      return { ...res, results: safeResults };
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchNowAiringTV = createAsyncThunk(
  "nowPlaying/fetchTV",
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
      const safeResults = safeFilter(res.results);

      return { ...res, results: safeResults };
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  movies: {
    moviesList: [],
    moviesisLoading: false,
    error: null,
  },
  tvShows: {
    tvList: [],
    tvIsLoading: false,
    error: null,
  },
};

const nowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {
    resetNowPlaying: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      // ---------------------------------
      // Movies Handlers
      // ---------------------------------
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.movies.moviesisLoading = true;
        state.movies.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, { payload }) => {
        state.movies.moviesisLoading = false;
        state.movies.moviesList = payload.results;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, { payload, error }) => {
        state.movies.moviesisLoading = false;
        state.movies.error =
          payload?.message || error?.message || "Unknown error";
      })

      // ---------------------------------
      // TV Shows Handlers
      // ---------------------------------
      .addCase(fetchNowAiringTV.pending, (state) => {
        state.tvShows.tvIsLoading = true;
        state.tvShows.error = null;
      })
      .addCase(fetchNowAiringTV.fulfilled, (state, { payload }) => {
        state.tvShows.tvIsLoading = false;
        state.tvShows.tvList = payload.results.filter(
          (show) => show.adult === false
        );
      })
      .addCase(fetchNowAiringTV.rejected, (state, { payload, error }) => {
        state.tvShows.tvIsLoading = false;
        state.tvShows.error =
          payload?.message || error?.message || "Unknown error";
      }),
});

export const { resetNowPlaying } = nowPlayingSlice.actions;

export const nowPlayingReducer = nowPlayingSlice.reducer;
