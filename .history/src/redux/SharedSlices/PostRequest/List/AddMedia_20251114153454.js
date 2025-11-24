import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddMedia = createAsyncThunk(
    "AddMedia",
    async ({ name, description, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    language: "en"
                })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/list?session_id=${sessionId}`,
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
    listDetails: null,
    listLoading: false,
    listError: false
};

const list = createSlice({
    name: "list",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddMedia.pending, (state, { payload }) => {
            state.listLoading = true;
        });
        builder.addCase(AddMedia.fulfilled, (state, { payload }) => {
            state.listDetails = payload;

            state.listLoading = false;
        });
        builder.addCase(AddMedia.rejected, (state, { payload }) => {
            state.listError = true;
            state.listLoading = false;
        });
    }
});

export const AddMediaReducer = list.reducer;
