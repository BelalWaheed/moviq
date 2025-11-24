import {
  createSlice as createSlice2,
  createAsyncThunk as createAsyncThunk2,
} from "@reduxjs/toolkit";
import { safeFilter } from "../../../../pages/shared/safeSearch";

export const GetMovieSimilar = createAsyncThunk2(
  "GetMovieSimilar",
  async ({ movieId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg",
        },
      };
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
        options
      );
      const response = await request.json();
      if (response.success === false) return rejectWithValue(response);
      const safeResults = safeFilter(response.results);
      return { ...response, results: safeResults };
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

const MovieSimilar = createSlice2({
  name: "MovieSimilar",
  initialState: {
    MovieSimilarDetails: null,
    MovieSimilarDetailsLoading: false,
    MovieSimilarDetailsError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMovieSimilar.pending, (state) => {
        state.MovieSimilarDetailsLoading = true;
      })
      .addCase(GetMovieSimilar.fulfilled, (state, { payload }) => {
        state.MovieSimilarDetails = payload;
        state.MovieSimilarDetailsLoading = false;
      })
      .addCase(GetMovieSimilar.rejected, (state) => {
        state.MovieSimilarDetailsError = true;
        state.MovieSimilarDetailsLoading = false;
      });
  },
});

export const MovieSimilarReducer = MovieSimilar.reducer;
