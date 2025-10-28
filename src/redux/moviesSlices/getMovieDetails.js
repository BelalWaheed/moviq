import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { moveItem } from "framer-motion";

export const getMovieDetails = createAsyncThunk(
  "/movieDetails",
  async (id, thunkAPI) => {
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
      const movieId = id || localStorage.getItem("movieId");

      if (!movieId) {
        return rejectWithValue({ message: "Movie ID is missing." });
      }
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      );

      const response = await request.json();

      if (response.success === false) {
        return rejectWithValue(response);
      }

      return response;
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

const initialState = {
  selectedMovieDetails: null,
  detailsLoading: false,
  detailsError: false,
  movieId: localStorage.getItem("movieId") || null,
};

const movieDetails = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    setMovieId: (state, { payload }) => {
      state.movieId = payload;
      localStorage.setItem("movieId", payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieDetails.pending, (state) => {
      state.detailsLoading = true;
      state.detailsError = false;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.selectedMovieDetails = payload;
      state.detailsLoading = false;
    });
    builder.addCase(getMovieDetails.rejected, (state) => {
      state.detailsLoading = false;
      state.detailsError = true;
    });
  },
});

export const movieDetailsReducer = movieDetails.reducer;
export const { setMovieId } = movieDetails.actions;
