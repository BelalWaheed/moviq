import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddMedia = createAsyncThunk(
    "AddMedia",
    async ({ listId, media_id, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg`
                },
                body: JSON.stringify({ media_id })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/list/${listId}/add_item?session_id=${sessionId}`,
                options
            );
            const response = await request.json();
            if (response.status_code === 8) {
                return rejectWithValue({ error: "already_added" });
            }
            if (response.status_code !== 12) {
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
