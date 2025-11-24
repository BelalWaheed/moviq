import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddSeriesRating = createAsyncThunk(
    "AddSeriesRating",
    async (parameter, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: `{"value":${parameter}}`
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/tv/${parameter}/rating`,
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
