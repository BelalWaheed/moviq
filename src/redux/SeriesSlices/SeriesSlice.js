import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeries = createAsyncThunk(
  "/series",
  async ({ type }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const state = thunkAPI.getState();

    const { page, typing } = state.seriesReducer;

    const currentType = type || typing;

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
        `https://api.themoviedb.org/3/tv/${currentType}?language=en-US&page=${page}`,
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
  seriesList: [],
  seriesLoading: false,
  seriesError: false,
  page: 1,
  typing: "airing_today",
  totalPages: 1,
};

const series = createSlice({
  name: "series",
  initialState,
  reducers: {
    incrementOne: (state) => {
      state.page = state.page + 1;
    },
    decrementOne: (state) => {
      state.page = state.page - 1;
    },
    incrementTen: (state) => {
      if (state.page + 10 >= state.totalPages) {
        state.page = state.totalPages;
      } else {
        state.page += 10;
      }
    },
    decrementTen: (state) => {
      if (state.page - 10 <= 1) {
        state.page = 1;
      } else {
        state.page -= 10;
      }
    },
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
