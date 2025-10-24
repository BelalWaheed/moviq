import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const getSeries = createAsyncThunk(
  "/movies",
  async ({ page = 1, type }, thunkAPI) => {
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
        `https://api.themoviedb.org/3/tv/${type}?language=en-US&page=${page}`,
        options
      );

      const response = await request.json();

      if (response.success === false) {
        return rejectWithValue(response);
      }

      // filter  content
      const safeResults = safeFilter(response.results);
      return { ...response, results: safeResults };
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

const initialState = {
  seriesList: [],
  seriesLoading: false,
  seriesError: false,

  typing: "airing_today",
  totalPages: 1,
};

const series = createSlice({
  name: "series",
  initialState,
  reducers: {
    pageReset: (state) => {
      state.page = 1;
    },
    setType: (state, action) => {
      state.typing = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSeries.pending, (state, { payload }) => {
      state.seriesLoading = true;
    });
    builder.addCase(getSeries.fulfilled, (state, { payload }) => {
      state.seriesList = payload.results.filter(
        (movie) => movie.adult === false
      );
      state.page = payload.page;
      state.seriesList = payload.results;
      state.totalPages = payload.total_pages;
      state.seriesLoading = false;
    });

    builder.addCase(getSeries.rejected, (state, { payload }) => {
      state.seriesLoading = false;
      state.seriesError = true;
    });
  },
});

export const seriesReducer = series.reducer;

export const {
  incrementOne,
  decrementOne,
  incrementTen,
  decrementTen,
  pageReset,
  setType,
} = series.actions;
