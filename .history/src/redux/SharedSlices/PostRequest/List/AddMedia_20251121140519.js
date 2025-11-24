import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const AddMedia = createAsyncThunk(
    "AddMedia",
    async ({ listId, media_id, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const { statusData } = useSelector(
                state => state.CheckItemStatusReducer
            );
            console.log(statusData);

            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: JSON.stringify({ media_id })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/list/${listId}/add_item?session_id=${sessionId}`,
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
    statusDetails: null,
    statusLoading: false,
    statusError: false
};

const addMediaSlice = createSlice({
    name: "addMediaSlice",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddMedia.pending, (state, { payload }) => {
            state.statusLoading = true;
        });
        builder.addCase(AddMedia.fulfilled, (state, { payload }) => {
            state.statusDetails = payload;

            state.statusLoading = false;
        });
        builder.addCase(AddMedia.rejected, (state, { payload }) => {
            state.statusError = true;
            state.statusLoading = false;
        });
    }
});

export const AddMediaReducer = addMediaSlice.reducer;
