import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeFilter } from "../../pages/shared/safeSearch";

export const getSeries = createAsyncThunk(
    "/series",
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
    totalPages: 1
};

const series = createSlice({
    name: "series",
    initialState,
    reducers: {
        pageReset: state => {
            state.page = 1;
        },
        setType: (state, action) => {
            state.typing = action.payload;
        }
    },

    extraReducers: builder => {
        builder.addCase(getSeries.pending, (state, { payload }) => {
            state.seriesLoading = true;
        });
        builder.addCase(getSeries.fulfilled, (state, { payload }) => {
            state.seriesList = payload.results;
            state.page = payload.page;
            state.totalPages = payload.total_pages;
            state.seriesLoading = false;
        });

        builder.addCase(getSeries.rejected, (state, { payload }) => {
            state.seriesLoading = false;
            state.seriesError = true;
        });
    }
});

export const seriesReducer = series.reducer;

export const {
    incrementOne,
    decrementOne,
    incrementTen,
    decrementTen,
    pageReset,
    setType
} = series.actions;
