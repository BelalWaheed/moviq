import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeriesDetails = createAsyncThunk(
    "series/getDetails",
    async (id, { rejectWithValue }) => {
        try {
            const seriesId = id || localStorage.getItem("seriesId");

            if (!seriesId) {
                return rejectWithValue({ message: "Series ID is missing." });
            }

            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                }
            };

            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`,
                options
            );
            const data = await response.json();

            if (!response.ok || data.success === false) {
                return rejectWithValue(data);
            }

            return data;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

const initialState = {
    selectedSeriesDetails: null,
    detailsLoading: false,
    detailsError: null,
    seriesId: localStorage.getItem("seriesId") || null
};

const seriesDetails = createSlice({
    name: "seriesDetails",
    initialState,
    reducers: {
        setSeriesId: (state, { payload }) => {
            state.seriesId = payload;
            localStorage.setItem("seriesId", payload);
        },
        clearSeriesDetails: state => {
            state.selectedSeriesDetails = null;
            state.detailsError = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getSeriesDetails.pending, state => {
                state.detailsLoading = true;
                state.detailsError = null;
            })
            .addCase(getSeriesDetails.fulfilled, (state, { payload }) => {
                state.detailsLoading = false;
                state.selectedSeriesDetails = payload;
            })
            .addCase(getSeriesDetails.rejected, (state, { payload }) => {
                state.detailsLoading = false;
                state.detailsError =
                    payload?.message || "Failed to fetch series details";
            });
    }
});

export const seriesDetailsReducer = seriesDetails.reducer;
export const { setSeriesId, clearSeriesDetails } = seriesDetails.actions;
