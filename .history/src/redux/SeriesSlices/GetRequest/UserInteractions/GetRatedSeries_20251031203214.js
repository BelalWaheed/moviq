import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetRatedSeries = createAsyncThunk(
    "GetRatedSeries",
    async ({ accountId, page = 1, sessionId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/account/${accountId}/rated/tv?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc'`,
                options
            );
            const response = await request.json();

            if (response.success === false) {
                return rejectWithValue(response);
            }
            let allResults = [...allResults, ...response.results];
            for (let page = 2; page <= response.total_pages; page++) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/...page=${page}`
                );
                const data = await res.json();
                allResults = [...allResults, ...data.results];
            }
            console.log(allResults);

            return response;
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    RatedSeriesDetails: null,
    RatedSeriesDetailsLoading: false,
    RatedSeriesDetailsError: false
};

const RatedSeries = createSlice({
    name: "RatedSeries",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetRatedSeries.pending, (state, { payload }) => {
            state.RatedSeriesDetailsLoading = true;
        });
        builder.addCase(GetRatedSeries.fulfilled, (state, { payload }) => {
            state.RatedSeriesDetails = payload;

            state.RatedSeriesDetailsLoading = false;
        });
        builder.addCase(GetRatedSeries.rejected, (state, { payload }) => {
            state.RatedSeriesDetailsError = true;
            state.RatedSeriesDetailsLoading = false;
        });
    }
});

export const RatedSeriesReducer = RatedSeries.reducer;
