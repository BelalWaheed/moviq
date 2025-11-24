import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetCheckItemStatus = createAsyncThunk(
    "GetCheckItemStatus",
    async ({ listId, mediaId }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/list/${listId}/item_status?language=en-US&movie_id=${mediaId}`,
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
    itemStatusDetails: null,
    itemStatusLoading: false,
    itemStatusError: false
};

const checkItemStatus = createSlice({
    name: "checkItemStatus",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetCheckItemStatus.pending, (state, { payload }) => {
            state.itemStatusLoading = true;
        });
        builder.addCase(GetCheckItemStatus.fulfilled, (state, { payload }) => {
            state.itemStatusDetails = payload;

            state.itemStatusLoading = false;
        });
        builder.addCase(GetCheckItemStatus.rejected, (state, { payload }) => {
            state.itemStatusError = true;
            state.itemStatusLoading = false;
        });
    }
});

export const getCheckItemStatusReducer = checkItemStatus.reducer;
