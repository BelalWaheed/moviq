import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const getMovies = createAsyncThunk(
    "/movies",
    async ({ page = 1, type }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`,
                options
            );

            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }

            // filter NSFW content
            const safeResults = safeFilter(response.results);
            return { ...response, results: safeResults };
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    moviesList: [],
    moviesLoading: false,
    moviesError: false,
    page: 1,
    typing: "now_playing",
    totalPages: 1,
    currentType: "now_playing"
};

const movies = createSlice({
    name: "movies",
    initialState,
    reducers: {
        pageReset: state => {
            state.page = 1;
        },
        setType: (state, action) => {
            state.typing = action.payload;
            state.currentType = action.payload;
        }
    },

    extraReducers: builder => {
        builder.addCase(getMovies.pending, state => {
            state.moviesLoading = true;
        });
        builder.addCase(getMovies.fulfilled, (state, { payload }) => {
            state.moviesList = payload.results;
            state.page = payload.page;
            state.totalPages = payload.total_pages;
            state.moviesLoading = false;
        });

        builder.addCase(getMovies.rejected, state => {
            state.moviesLoading = false;
            state.moviesError = true;
        });
    }
});

export const moviesReducer = movies.reducer;
export const { pageReset, setType } = movies.actions;
